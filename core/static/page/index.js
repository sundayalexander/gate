/** Ajax function
 *
 * @param form
 * @param successCallback
 * @param errorCallback
 * @param token
 * @param header
 */
function ajax(form, successCallback, errorCallback, token=null, header) {
    // let phone_number_pattern = new RegExp('([0-9]{11})|([0-9]{13})');
    let formData = form !== null ? new FormData(form) :  new FormData();
    let method = form !== null ?$(form).attr('method') : header.method;
    if (token !== null){
        formData.append('csrfmiddlewaretoken', token);
    }
    if(header && header.data){
        for(let i = 0; i < header.data.length; i++){
            formData.append(header.data[i].key, header.data[i].value);
        }
    }
    $.ajax({
        url: form !== null ? $(form).attr('action') : header.url,
        method: method,
        data: method === 'GET' ? undefined : formData,
        cache: true,
        processData: false,
        contentType: false,
        beforeSend: function () {
        },
        success: successCallback,
        error: errorCallback
    });
}

/**
 * Add door image
 */
function addItem(ev, ele){
    ev.preventDefault();
    $.get(ele.attr('href')).done(function (data) {
        $('.ui-widget-overlay').removeClass('setting-d-none');
        $('.ui-dialog ').removeClass('setting-d-none');
        $('#ui-dialog-title').text(data.title);
        $('#ui-dialog-content').html(data.form);
        $('#dialogForm').attr('action', data.url);
        $('#ui-dialog-content select').removeClass('selectpicker');
        $('#ui-dialog-content select').removeClass('bs-select-hidden');
        $('#ui-dialog-content select').addClass('form-control');
    }).fail(function (response) {
         SweetAlert.fire({
             title: 'Request Error.',
             text: response.responseText
         });
    });
}
$(document).ready(function () {
    let header = {method: 'POST', data:[], url:''};
    let token = $(TOKEN).val();
     //Authenticate user
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        $.post(form.attr('action'), form.serialize()).done(function (data, status) {
            location.href = location.protocol+'//'+location.host+data.url;
        }).fail(function (respose) {
            $('#error-pane').text(respose.responseText);
        });
    });

    //Submit form
     $('#form').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        ajax(this, function (data) {
             SweetAlert.fire({
                title: 'Success',
                text: data.message
            });
             form[0].reset();
        }, function (response) {
             SweetAlert.fire({
                title: 'Error',
                html: response.responseText
            });
        }, token);
    });


     //Process modal form
     $('#dialogForm').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        $('.ui-widget-overlay').addClass('setting-d-none');
        $('.ui-dialog ').addClass('setting-d-none');
        ajax(this, function (data) {
             SweetAlert.fire({
                title: 'Success',
                text: data.message
            });
             form[0].reset();
             if(window.RELOAD){
                    window.location.reload();
                }
        }, function (response) {
             SweetAlert.fire({
                title: 'Error',
                html: response.responseText
            });
        }, token);
    });

    $('.update-status a').click(function (event) {
        event.preventDefault();
        let element = $(this);
        if(element.attr('data-menuindex') === '3'){
            location.href = location.protocol+'//'+location.host+element.attr('href');
        }else if(element.attr('data-menuindex') === '0' || element.attr('data-menuindex') === '1' || element.attr('data-menuindex') === '2'){
             addItem(event, element);
        }else if(element.attr('data-menuindex') === '90'){
             window.open(element.attr('href'));

        }else if(element.attr('data-menuindex') === '4'){
             SweetAlert.fire({
                 title: 'Delete',
                 text: 'Delete '+element.attr('data-doorname')+'?',
                 showConfirmButton: true,
                 showCancelButton: true,
                 confirmButtonText: 'Delete',
                 preConfirm: () => {
                     return fetch(element.attr('href'))
                         .then(response => {
                             if (!response.ok) {
                                 throw new Error(response.statusText)
                             }
                             return response.json()
                         })
                         .catch(error => {
                             Swal.showValidationMessage(
                                 `Request failed: ${error}`
                             )
                         })
                 },
            }).then((result) => {
                if(result.value.status === 200){
                    SweetAlert.fire({
                        title: 'Request successful.',
                        text: result.value.message
                    });
                     element.parent().parent().parent().parent().parent().remove();
                }
             });
        }

    });

//    Add more image btn
    $('#addImageBtn').click(function (event) {
       addItem(event, $(this));
    });



});