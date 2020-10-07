let tour = null;
document.addEventListener('contextmenu', event => event.preventDefault());
let header = {method: 'POST', data: [], url: ''};
let token = $(TOKEN).val();

/** Ajax function.
 * @param form
 * @param successCallback
 * @param errorCallback
 * @param token
 * @param header
 */
function ajax(form, successCallback, errorCallback, token = null, header) {
    // let phone_number_pattern = new RegExp('([0-9]{11})|([0-9]{13})');
    let formData = form !== null ? new FormData(form) : new FormData();
    let method = form !== null ? $(form).attr('method') : header.method;
    if (token !== null) {
        formData.append('csrfmiddlewaretoken', token);
    }
    if (header && header.data) {
        for (let i = 0; i < header.data.length; i++) {
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
 * Toast function
 * @param message
 */

function toast(message) {
    Swal.fire({
        title: 'Oops!',
        html: message,
        showConfirmButton: true,
        showCloseButton: true,
        confirmButtonClass: 'swal2-confirm btn-primary',
    });
    $('.swal2-confirm').removeClass('swal2-styled');


}

/***
 * This function partition the door view.
 */
function partition(color) {
    let dimension = $('#frame');
    let pane = $('#partition-container');
    pane.html('');
    window.FRONT_COLORS = [];
    window.DOOR_IMAGES = [];
    for (let i = 0; i < window.PARTITIONS; i++) {
        pane.append('<div data-intro="Select partition (' + (i + 1) + ') and pick a color from the front color pane' +
            ' to change this partition color." ' +
            'class="row dynamic-content" data-index="' + i + '" \n ' +
            'style="width: ' + dimension.width() + 'px; border-bottom: solid #e8e8e8  5px; cursor: pointer; ' +
            'margin-left: auto; margin-right: auto; background-repeat: no-repeat; ' +
            'background-image: url(' + DEFUALT.url + '); ' +
            'height: ' + (dimension.height() / window.PARTITIONS) + 'px;"\n >');
        FRONT_COLORS[i] = window.DEFUALT.name;
        DOOR_IMAGES[i] = window.DEFUALT.id;
    }
    INSIDE_URL = DEFUALT.url;
    OUTSIDE_URL = DEFUALT.url;
    $('#door-front-color').text(window.FRONT_COLORS.join(', '));
    $('#quote-btn').attr('data-step', PARTITIONS + 6);

    //Add event to partition
    $('#partition-container .row').click(function () {
        let element = $(this);
        element.siblings().removeClass('active');
        element.addClass('active');
    });

}

/**
 * Property function
 */
function getProperty() {
    let header = {method: 'GET', url: DOOR_URL + '?id=' + DOOR};
    let token = $(TOKEN).val();
    ajax(null, function (data, status) {
        $('.EmailTemplatePickerView').remove();
        $('#door-name').text(data.door_name);
        $('#handle-panel').html(data.handles);
        $('.door-colors').html(data.images);
        $('#frame-panel').html(data.frames);
        $('#frame-color-panel').html(data.frame_images);
        $('#handle').attr('src', data.handle.image);
        $('#frame').attr('src', data.frame.image);
        $('#door_width').text(DOOR_WIDTH + 'mm');
        $('#door-finish').text(data.finish);
        $('#frame-color').text(data.frame_image.name);
        $('#handle-style').text(data.handle.name);
        $('#door_height').text(DOOR_HEIGHT + 'mm');
        HANDLE = data.handle.id;
        HANDLE_POSITION = 'LEFT';
        $('#handle-position').text('LEFT');
        FRAME = data.frame.id;
        $('#frame-with').text('13mm');
        FRAME_IMAGE = data.frame_image.id;
        DOOR_IMAGE = data.image_id;
        DOOR_BACK_IMAGE = data.image_id;
        window.DEFUALT.id = data.image_id;
        window.DEFUALT.name = data.name;
        window.DEFUALT.url = data.image;
        window.setTimeout(function () {
            if (window.PARTITIONED === 'True') {
                partition();
                $('.change-door-view .btn').css('display', 'none');
            } else {
                $('#door').attr('src', data.image);
                window.INSIDE_URL = data.image;
                window.OUTSIDE_URL = data.image;
                $('#door-front-color').text(data.name);
                $('#door-back-color').text(data.name);
                $('.change-door-view .btn').addClass('display', 'block');
                console.log($('.change-door-view .btn'));
            }
            $('#loader').addClass('setting-d-none');

            introJs().setOption('showProgress', true).start();

            // let intro = introJs();
            // intro.setOptions({
            //     hints: [
            //         {
            //             element: $('#step-menu-link').children().get(1),
            //             hint: "Set Door color",
            //             hintPosition: 'right-middle'
            //         }
            //     ]
            // });
            // intro.addHints();
        }, 3000);


    }, function (response) {
        alert(response.responseText);
    }, token, header);

}

/**
 * Select image function: this function initialize the canvas with the selected image
 * @param image
 */
function selectImage(image) {
    window.DOOR = $(image).attr('data-emailtemplateid');
    window.PARTITIONED = $(image).attr('data-doorpartition')
    $('#loader').removeClass('setting-d-none');
    if (window.PARTITIONED === 'True') {
        $('#partition-pane').removeClass('setting-d-none');
        $('#partition-pane').attr('data-step', '2');
        $('#quote-btn').attr('data-step', PARTITIONS + 6);
        $('#partition-pane').attr('data-intro', "Set door partitions.");
        $('#partition-container').removeClass('setting-d-none');
        $('#back-color-pane').addClass('setting-d-none');
        $('#back-color-pane').removeAttr('data-step')
        $('#back-color-pane').removeAttr('data-intro')
        $('#door-image-pane').addClass('setting-d-none');
    } else {
        $('#partition-pane').addClass('setting-d-none');
        $('#partition-pane').removeAttr('data-step')//
        $('#partition-pane').removeAttr('data-intro')
        $('#partition-container').addClass('setting-d-none');
        $('#door-image-pane').removeClass('setting-d-none');
        $('#back-color-pane').removeClass('setting-d-none');
        $('#back-color-pane').attr('data-step', '2');
        $('#quote-btn').attr('data-step', '6');
        $('#partition-container').html('');
    }
    getProperty();
}


/**
 * Menu Switcher: this function switches between the steps menu items
 * @param el: The menu ite.
 */
function menuSwitcher(el) {
    el.siblings().removeClass('active');
    el.addClass('active');
    let pane = $(el.attr('data-target'));
    pane.siblings().addClass('setting-d-none');
    pane.removeClass('setting-d-none');
    if(el.text().trim() === 'Finish'){
            header.url = FORM_URL;
            header.method = 'POST';
            header.data = [
                {key: 'door_image', value: DOOR_IMAGE},
                {key: 'door_back_image', value: DOOR_BACK_IMAGE},
                {key: 'door', value: DOOR},
                {key: 'door_height', value: DOOR_HEIGHT},
                {key: 'door_width', value: DOOR_WIDTH},
                {key: 'frame_image', value: FRAME_IMAGE},
                {key: 'frame', value: FRAME},
                {key: 'frame_width', value: FRAME_WIDTH},
                {key: 'handle', value: HANDLE},
                {key: 'handle_position', value: HANDLE_POSITION}
            ];
            if (PARTITIONED === 'True') {
                header.data.push({key: 'partitions', value: PARTITIONS});
                header.data.push({key: 'partition_ids', value: window.DOOR_IMAGES});
            }
            ajax(null, function (data, status) {
                    $('#setting-finish .SettingControlView').html(data.form);

                    //Submit order
                    $('#order-form').submit(function (event) {
                        event.preventDefault();
                        $('#loader').removeClass('setting-d-none');
                        Swal.close();
                        ajax(this, function (data, status) {
                                location.href = location.protocol + '//' + location.host + data.url;
                            }, function (response) {
                                toast(response.responseText);
                                $('#loader').addClass('setting-d-none');
                            }, token
                        );
                    });
                }, function (response) {
                    toast(response.responseText);
                }, token, header
            );
        }
}

$(document).ready(function () {

    //Step Menu Handler: This handles the menu steps
    $('#step-menu-link li').click(function (e) {
        e.preventDefault();
        menuSwitcher($(this));
    });

    $('.handle-position a').click(function () {
        let handle = $('#handle');
        let door = $('#door');
        let frame = $('#frame');


        if (window.INSIDE_VIEW === false) {
            if ($(this).attr('data-position') === "left") {
                handle.addClass('place-handle-left');
                handle.removeClass('place-handle-right');
                door.addClass('place-handle-left');
                door.removeClass('place-handle-right');
                // frame.addClass('place-handle-left');
                // frame.removeClass('place-handle-right');
                $('#handle-position').text('LEFT');
                window.HANDLE_POSITION = 'LEFT';

            } else if ($(this).attr('data-position') === "right") {
                handle.addClass('place-handle-right');
                handle.removeClass('place-handle-left');
                // frame.addClass('place-handle-right');
                // frame.removeClass('place-handle-left');
                door.addClass('place-handle-right');
                door.removeClass('place-handle-left');
                $('#handle-position').text('RIGHT');

                //remove view
                window.HANDLE_POSITION = 'RIGHT';
            }
        } else {
            if ($(this).attr('data-position') === "left") {
                handle.addClass('place-handle-right');
                handle.removeClass('place-handle-left');
                door.addClass('place-handle-right');
                door.removeClass('place-handle-left');
                // frame.addClass('place-handle-left');
                // frame.removeClass('place-handle-right');
                $('#handle-position').text('LEFT');
                window.HANDLE_POSITION = 'LEFT';

            } else if ($(this).attr('data-position') === "right") {
                handle.addClass('place-handle-left');
                handle.removeClass('place-handle-right');
                // frame.addClass('place-handle-right');
                // frame.removeClass('place-handle-left');
                door.addClass('place-handle-left');
                door.removeClass('place-handle-right');
                $('#handle-position').text('RIGHT');

                //remove view
                window.HANDLE_POSITION = 'RIGHT';
            }
        }

    });


    //Mobile navigation toggler
    $('.navbar-toggler').click(function () {
        if ($(this).attr('data-menushown') === '1') {
            $('#editorControls').removeClass('show');
            $(this).attr('data-menushown', '0');
            $('.menu-hint').text('Open');
        } else {
            $('#editorControls').addClass('show');
            $(this).attr('data-menushown', '1');
            $('.menu-hint').text('Close');
        }

    });


    //Menu handler: this handles app menu functions
    $('.nav-item').click(function () {
        let navEl = $(this).find('a');
        let dataKey = navEl.attr('data-key');
        if (dataKey === "2") {
            $('#loader').removeClass('setting-d-none');
            ajax(null, function (data, status) {
                    $('body').append(data.modal);
                    $('.tab-menu').click(function () {
                        let element = $(this);
                        let target = $('#' + element.attr('data-id'));
                        target.siblings().removeClass('d-flex');
                        target.siblings().addClass('setting-d-none');
                        target.addClass('d-flex');
                        target.removeClass('setting-d-none');
                        element.siblings().removeClass('active');
                        element.addClass('active')
                    });
                    $('#loader').addClass('setting-d-none');
                }, function (response) {
                    alert(response.responseText);
                }, token, header
            );
        } else if (dataKey === "1") {
            introJs().setOption('showProgress', true).start();
        } else if (dataKey === "6") {
            header.url = FORM_URL;
            header.method = 'POST';
            header.data = [
                {key: 'door_image', value: DOOR_IMAGE},
                {key: 'door_back_image', value: DOOR_BACK_IMAGE},
                {key: 'door', value: DOOR},
                {key: 'door_height', value: DOOR_HEIGHT},
                {key: 'door_width', value: DOOR_WIDTH},
                {key: 'frame_image', value: FRAME_IMAGE},
                {key: 'frame', value: FRAME},
                {key: 'frame_width', value: FRAME_WIDTH},
                {key: 'handle', value: HANDLE},
                {key: 'handle_position', value: HANDLE_POSITION}
            ];
            if (PARTITIONED === 'True') {
                header.data.push({key: 'partitions', value: PARTITIONS});
                header.data.push({key: 'partition_ids', value: window.DOOR_IMAGES});
            }
            ajax(null, function (data, status) {
                    Swal.fire({
                        title: 'Finish & Get Quote',
                        html: data.form,
                        showCloseButton: true,
                        showConfirmButton: false,
                    });
                    $('.swal2-confirm').removeClass('swal2-styled');

                    //Submit order
                    $('#order-form').submit(function (event) {
                        event.preventDefault();
                        $('#loader').removeClass('setting-d-none');
                        Swal.close();
                        ajax(this, function (data, status) {
                                location.href = location.protocol + '//' + location.host + data.url;
                            }, function (response) {
                                toast(response.responseText);
                                $('#loader').addClass('setting-d-none');
                            }, token
                        );
                    });
                }, function (response) {
                    toast(response.responseText);
                }, token, header
            );
        } else if (dataKey === "12") {
            let dataIndex = parseInt(navEl.attr('data-index'));
            if (dataIndex > 0) {
                navEl.attr('data-index', dataIndex - 1)
            }
            if (dataIndex < 5) {
                $('#next-btn').attr('data-index', dataIndex + 1);
                $('#next-btn').text('Next: ' + $($('#step-menu-link').children().get(dataIndex + 1)).text());
            }
            menuSwitcher($($('#step-menu-link').children().get(dataIndex)));
            navEl.text('Back: ' + $($('#step-menu-link').children().get(parseInt(navEl.attr('data-index')))).text());
        } else if (dataKey === "13") {
            let dataIndex = parseInt(navEl.attr('data-index'));
            if (dataIndex < 5) {
                navEl.attr('data-index', dataIndex + 1)
                let intro = introJs();
            }
            if (dataIndex > -1) {
                $('#back-btn').attr('data-index', dataIndex - 1)
                $('#back-btn').text('Back: ' + $($('#step-menu-link').children().get(dataIndex - 1)).text());
            }
            menuSwitcher($($('#step-menu-link').children().get(dataIndex)));
            navEl.text('Nex: ' + $($('#step-menu-link').children().get(parseInt(navEl.attr('data-index')))).text());

        } else if (dataKey === "14") {
            let door = $('#door');
            let handle = $('#handle');
            let span = navEl.find('span');
            handle.removeClass('place-handle-left');
            handle.removeClass('place-handle-right');
            if (window.HANDLE_POSITION === 'LEFT') {
                if (span.text().trim() === 'Inside View') {
                    door.removeClass('place-handle-left');
                    door.addClass('place-handle-right');
                    handle.removeClass('place-handle-left');
                    handle.addClass('place-handle-right');
                    door.attr('src', INSIDE_URL);
                    span.text('Outside View');
                    navEl.find('i').removeClass('fa-door-open');
                    navEl.find('i').addClass('fa-door-closed');
                    navEl.css('background-color', '#212121')
                    window.INSIDE_VIEW = true;
                } else {
                    door.removeClass('place-handle-right');
                    door.addClass('place-handle-left');
                    handle.removeClass('place-handle-right');
                    handle.addClass('place-handle-left');
                    span.text('Inside View');
                    navEl.find('i').removeClass('fa-door-closed');
                    navEl.find('i').addClass('fa-door-open');
                    navEl.removeClass('inside-view');
                    door.attr('src', OUTSIDE_URL);
                    navEl.css('background-color', '#ff8d00')
                    window.INSIDE_VIEW = false;
                }
            } else {
                if (span.text().trim() === 'Inside View') {
                    door.removeClass('place-handle-right');
                    door.addClass('place-handle-left');
                    handle.removeClass('place-handle-right');
                    handle.addClass('place-handle-left');
                    span.text('Outside View');
                    navEl.css('background-color', '#212121')
                    navEl.find('i').removeClass('fa-door-open');
                    door.attr('src', INSIDE_URL);
                    navEl.find('i').addClass('fa-door-closed');
                    navEl.css('background-color', '#212121')
                    window.INSIDE_VIEW = true;
                } else {
                    door.removeClass('place-handle-left');
                    door.addClass('place-handle-right');
                    handle.removeClass('place-handle-left');
                    handle.addClass('place-handle-right');
                    span.text('Inside View');
                    door.attr('src', OUTSIDE_URL);
                    navEl.find('i').removeClass('fa-door-closed');
                    navEl.find('i').addClass('fa-door-open');
                    navEl.css('background-color', '#ff8d00')
                    window.INSIDE_VIEW = false;
                }

            }

        }
    });

    //Tab Accordion: this handles the tab
    $('.se-tab-button').click(function () {
        let element = $(this);
        element.siblings().removeClass('active');
        element.addClass('active');
        element.parent().parent().find('.se-sidebar-content').addClass('setting-d-none');
        $('#' + element.attr('data-id')).removeClass('setting-d-none');
    });

    //Dropdown Accordion: this handles the hide and show drop down.
    $('.se-accordion').click(function () {
        let element = $(this);
        if (element.hasClass('se-collapse')) {
            element.removeClass('se-collapse');
            element.addClass('se-expand');
            $(element.attr('data-target')).removeClass('show');
            $(element.attr('data-target')).addClass('hide');
            element.find('span i').removeClass('fa-minus');
            element.find('span i').addClass('fa-plus');
        } else {
            element.addClass('se-collapse');
            element.removeClass('se-expand');
            $(element.attr('data-target')).addClass('show');
            $(element.attr('data-target')).removeClass('hide');
            element.find('span i').addClass('fa-minus');
            element.find('span i').removeClass('fa-plus');
        }
    });

    $('.pill-input-subtract').click(function () {
        let element = $(this);
        let input = element.parent().parent().find('input[type="number"]');
        input.val(parseInt(input.val()) > parseInt(input.attr('min')) ? parseInt(input.val()) - parseInt(input.attr('step')) : input.val());
        if (input.attr('id').trim() === 'inputHeight') {
            $('#door_height').text(input.val() + 'mm');
            window.DOOR_HEIGHT = parseInt(input.val());
        } else if (input.attr('id').trim() === 'inputWidth') {
            $('#door_width').text(input.val() + 'mm');
            window.DOOR_WIDTH = parseInt(input.val());
        } else if (input.attr('id').trim() === 'inputFrameWidth') {
            window.FRAME_WIDTH = parseInt(input.val());
            $('#frame-with').text(input.val() + 'mm');
        } else if (input.attr('id').trim() === 'inputPartitions') {
            window.PARTITIONS = parseInt(input.val());
            partition();
        }
    });

    $('.pill-input-add').click(function () {
        let element = $(this);
        let input = element.parent().parent().find('input[type="number"]');
        input.val(parseInt(input.val()) < parseInt(input.attr('max')) ? parseInt(input.val()) + parseInt(input.attr('step')) : input.val());
        if (input.attr('id').trim() === 'inputHeight') {
            $('#door_height').text(input.val() + 'mm');
            DOOR_HEIGHT = parseInt(input.val());
        } else if (input.attr('id').trim() === 'inputWidth') {
            $('#door_width').text(input.val() + 'mm');
            DOOR_WIDTH = parseInt(input.val());
        } else if (input.attr('id').trim() === 'inputFrameWidth') {
            FRAME_WIDTH = parseInt(input.val());
            $('#frame-with').text(input.val() + 'mm');
        } else if (input.attr('id').trim() === 'inputPartitions') {
            window.PARTITIONS = parseInt(input.val());
            partition();
        }
    });


    if (DOOR === '-1') {
        header.url = DOORS_URL;
        header.method = 'GET';
        ajax(null, function (data, status) {
            $('body').append(data.modal);
            $('#loader').addClass('setting-d-none');
            $('.tab-menu').click(function () {
                let element = $(this);
                let target = $('#' + element.attr('data-id'));
                target.siblings().removeClass('d-flex');
                target.siblings().addClass('setting-d-none');
                target.addClass('d-flex');
                target.removeClass('setting-d-none');
                element.siblings().removeClass('active');
                element.addClass('active')
            });
        }, function (response) {
            alert(response.responseText);
        }, token, header)
    } else {
        header.url = DOORS_URL;
        header.method = 'GET';
        getProperty();
    }

    $(document).tooltip();
});