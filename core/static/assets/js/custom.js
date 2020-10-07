$(document).ready(function () {
    $.get('/', {'status': 'get_home'}, function () {
    }).done(function (response) {
        if (response.status === 'success') {
            $('#door_container').html(response.template);
            $('.work-slider').slick({
                infinite: true,
                arrows: true,
                dots: false,
                centerPadding: '60px',
                slidesToShow: 3,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ]
            });
            $('.work-slider-two').slick({
                infinite: true,
                arrows: true,
                dots: false,
                slidesToShow: 5,
                slidesToScroll: 3,
                prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ]
            });

        } else {
            console.log(response.message);
        }
    }).fail(function (error) {
        console.log('failed');
    })
});

function getCategory(pk) {
    $.get('/', {'status': 'single_category', 'pk': pk}, function () {
    }).done(function (response) {
        if (response.status === 'success') {
            $('#category_holder').html(response.template);
            $('.work-slider').slick({
                infinite: true,
                arrows: true,
                dots: false,
                centerPadding: '60px',
                slidesToShow: 3,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ]
            });
            $('.work-slider-two').slick({
                infinite: true,
                arrows: true,
                dots: false,
                slidesToShow: 5,
                slidesToScroll: 3,
                prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="fa fa-angle-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1501,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ]
            });

        } else {
            console.log(response.message);
        }
    }).fail(function (error) {
        console.log('failed');
    })
}