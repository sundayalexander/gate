function call_api_ay(method, url, headers, data, element) {
    var process = true;
    var cType = 'application/x-www-form-urlencoded; charset=UTF-8';
    // if (method === 'post') {
    //     process = false;
    //     cType = false
    // }
    data.csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();

    $.ajax({
        url: url,
        method: method,
        headers: headers,
        contentType: cType,
        processData: process,
        dataType: 'json',
        data: data,
        beforeSend: function () {
            $('.center').css('display', 'block');
            $('.center').css('display', 'block');

        },
        success: function (data) {
            $('.center').css('display', 'none');
            $('#sh').css('display', 'block').html(data.options);
            $('.car').css('display', 'none');

        },
        error: function (error) {
            $('.center').css('display','none');
            $('.car').css('display', 'block');
        }
    })
}

function call_api_status(method, url, headers, data) {
    var process = true;
    var cType = 'application/x-www-form-urlencoded; charset=UTF-8';
    console.log(data.id);
    $.ajax({
        url: url,
        method: method,
        headers: headers,
        contentType: cType,
        processData: process,
        dataType: 'json',
        data: data,
        beforeSend: function () {
            $('.status_loader').css('display', 'block');
            $('.status_loader').css('display', 'block');

        },
        success: function (data) {
            $('.status_loader').css('display', 'none');
            notify('success', 'Order status successfully updated', 'fa fa-check', 3000);
            location.reload();
        },
        error: function (error) {
            $('.center').css('display', 'none');
            notify('error', 'Order status not successfully updated', 'fa fa-times', 3000);

        }
    })
}

function call_api_get(method, url, headers, data) {
    var modal = $('#status-modal');
    var process = true;
    var cType = 'application/x-www-form-urlencoded; charset=UTF-8';

    $.ajax({
        url: url,
        method: method,
        headers: headers,
        contentType:cType,
        processData: process,
        dataType: 'json',
        data: data,
        success: function (data) {
            modal.modal('show');
            $('#status_show').html(data.option);

        },
        error: function (error) {
            notify('error','Something went wrong','fa fa-times', 3000);

        }
    })

}

function call_api_customer(method, url, headers, data) {
    var modal = $('#status-modal');
    var process = true;
    var cType = 'application/x-www-form-urlencoded; charset=UTF-8';

    $.ajax({
        url: url,
        method: method,
        headers: headers,
        contentType:cType,
        processData: process,
        dataType: 'json',
        data: data,
        success: function (data) {
            modal.modal('show');
            $('#status_show').html(data.option);

        },
        error: function (error) {
            notify('error','Something went wrong','fa fa-times', 3000);

        }
    })

}

