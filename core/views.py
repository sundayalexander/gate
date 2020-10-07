from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
from django.shortcuts import render


# Create your views here.
from django.template.loader import render_to_string
from django.views.decorators.http import require_http_methods

from core.models import Gate


def index(request):
    return render(request, 'editor.html', {})

# app view: this handles the editor app ajax request.
@require_http_methods(['POST', 'GET'])
def app(request, which, action=None):
    context = {'status': 400, 'message': 'Bad Request.'}
    if request.method == 'GET':
        if which == 'gates':
            if action == 'list':
                paginator = Paginator(Gate.objects.all(), 50)

                page_number = int(action) if action else 1

                try:
                    object_list = paginator.page(page_number).object_list
                except PageNotAnInteger:
                    object_list = paginator.page(1).object_list
                except EmptyPage:
                    object_list = paginator.page(paginator.num_pages).object_list

                gate = object_list.first
                context = {'image': door.images.first().image.url if door.images.first() else '',
                           'door_name': door.name,
                           'image_id': door.images.first().id if door.images.first() else '',
                           'name': door.images.first().name if door.images.first() else '',
                           'finish': door.images.first().finishing if door.images.first() else '',
                           'handle': {'image': door.handle.first().image.url,
                                      'name': door.handle.first().name,
                                      'id': door.handle.first().id} if door.handle.first() else {'image': '',
                                                                                                 'id': '',
                                                                                                 'name': ''},
                           'frame': {'image': frame_images.first().image.url,
                                     'name': frame_images.first().frame.name,
                                     'id': frame_images.first().frame.id} if frame_images.first() else {'image': '',
                                                                                                        'id': '',
                                                                                                        'name': ''},
                           'frame_image': {'image': frame_images.first().image.url,
                                           'name': frame_images.first().name,
                                           'id': frame_images.first().id} if frame_images.first() else {'image': '',
                                                                                                        'id': '',
                                                                                                        'name': ''},
                           'handles': render_to_string('includes/property.html', {'handles': door.handle.all()}),
                           'frames': render_to_string('includes/property.html', {'frames': frames}),
                           'frame_images': render_to_string('includes/property.html', {'frame_images': frames}),
                           'images': render_to_string('includes/property.html', {'images': door.images.all()}),
                           'status': 200}

    else:
        if which == 'quote':
            if action == 'form':
                context['status'] = 200
                post_data = request.POST.dict()
                del post_data['csrfmiddlewaretoken']
                form = OrderForm(initial=post_data)
                context['form'] = render_to_string('includes/forms.html', {'form': form})

            elif action == 'submit':
                form = OrderForm(request.POST)
                if form.is_valid():
                    order = form.save()
                    order_notification.delay(order.id)
                    context['status'] = 200
                    context['message'] = 'Success'
                    context['url'] = '{}?e={}'.format(reverse('order'), order.email)
                else:
                    context['message'] = str(form.errors)

    return JsonResponse(context if context['status'] in [200, 201] else context['message'], safe=False,
                        status=context['status'])
