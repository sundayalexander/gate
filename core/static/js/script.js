function call_api(method, url, headers, data, element) {
    var modal = $('#dynamic-modal');
    var process = true;
    var cType = 'application/x-www-form-urlencoded; charset=UTF-8';
    if (method === 'POST') {
        process = false;
        cType = false
    }
    data.csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();

    $.ajax({
        url: url,
        method: method,
        headers: headers,
        contentType: cType,
        processData: process,
        data: data,
        beforeSend: function () {
            if (method.toLowerCase() === 'delete') {
                return confirm('u sure?')
            }
        },
        success: function (data) {
            var carousel = $('#carousel1');
            switch (data.response) {
                case 'type':
                    carousel.slick('slickNext');
                    break;
                case 'cat':
                    $('.door-style').html(data.html);
                    carousel.slick('slickNext');
                    break;
                case 'door':
                    $('.door-color').html(data.html_colors);
                    $('.frame-style').html(data.html_frames);
                    carousel.slick('slickNext');
                    break;
                case 'frame':
                    $('.frame-color').html(data.html);
                    carousel.slick('slickNext');
                    break;
                case 'ordered':
                    $.unblockUI();
                    Swal.fire({
                        title: 'Success',
                        text: 'Your order has been successfully placed,You will be contacted with a quote.',
                        imageUrl: '/static/image/happy.png',
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        animation: true
                    });
                    setTimeout(function () {
                        window.location.href = "/";
                    }, 4000);
                    break;
                case 'render':
                    modal.modal('show');
                    modal.find('.modal-body').html(data.html);
                    modal.find('.slider').slick({
                        dots: true,
                        autoplay: true,
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    });
                    modal.on('opened', function () {
                        $('.slider').slick("setPosition", 0);
                    });

                    break;
                case 'conf':
                    notify('success', 'Success', 'fa fa-times', 3000);
                    modal.modal('hide');
                    if (method.toLowerCase() === 'delete') {
                        $(element.parentsUntil('tbody')[1]).fadeOut('slow');
                    }
                    break;
                case 'error':
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.details
                    });
                    break;
                default:
                    notify('error', 'Shit happened', 'fa fa-times', 3000);
                    break;
            }
        },
        error: function (error) {
            if (error.responseJSON.redirect) {
                window.location.href = error.responseJSON.redirect;
            }
            if (error.responseJSON.details) {
                content = error.responseJSON.details;
            }
            else {
                content = 'Something went wrong. Reload and try again. 😊'
            }
            notify('error', content, 'fa fa-times', 3000);
        }
    })
}

function notify(type, content, icon, timeout) {
    new Noty({
        type: type,
        text: '<i class="' + icon + ' m-r-10"></i>&nbsp;' + content,
        layout: 'topRight',
        theme: 'metroui',
        animation: {
            open: 'animated bounceIn',
            close: 'animated bounceOut'
        },
        timeout: timeout
    }).show()
}