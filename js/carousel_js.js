$(document).ready(function(){
    $('.carousel').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        variableWidth: true,
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
});