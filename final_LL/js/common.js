$(document).ready(function () {
    for (var imageCode in info) {
        if (info.hasOwnProperty(imageCode)) {
            $('.slider-main').append(
                '<div>' +
                ((typeof info[imageCode].url == "undefined") ? 
                '' 
                :
                ('<a href="http://' + info[imageCode].url + '" target="_blank">')) 
                +
                '<img id="' +
                imageCode +
                '" src="' +
                info[imageCode].src +
                '" alt="' +
                info[imageCode].alt +
                '"/>' +
                ((typeof info[imageCode].url == "undefined") ?
                '' : '</a>') +
                '</div>'
            );
            $('.slider-nav').append(
                '<div>' +
                '<img src="' +
                info[imageCode].src +
                '" alt="' +
                info[imageCode].alt +
                '"/></div>'
            );
        }
    }
    $('.slider-main').slick({
        asNavFor: '.slider-nav',
        slidesToShow: 1,
        infinite: true,
        slidesToScroll: 1,
        speed: 700,
        fade: true,
        cssEase: 'linear',
        swipeToSlide: true,
        arrows: true,
        dots: true
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-main',
        dots: true,
        centerMode: false,
        focusOnSelect: true,
        variableWidth: true,
        arrows: false
    });

    // initialize texts
    var firstObj = info[$('.slick-current').find('img').attr('id')];
    $('.start').html(firstObj.start);
    $('.finish').html(firstObj.finish);

    // image changed, now set texts
    $('.slider-main').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var textObj = info[$('.slick-current').find('img').attr('id')];
        $('.start').html(textObj.start);
        $('.finish').css('display', 'none'); // better experience to hid this finish text first
        $('.finish').html(textObj.finish);
    });
    $('.slider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.finish').html('');
        $('.start').html('');
    });

    $('article.post .readmore').click(function () {
        $('article.post .hide').slideDown();
        $(this).slideUp();
    });
    $('article.post .readless').click(function () {
        $('article.post .hide').slideUp();
        $('article.post .readmore').slideDown();
    });

    function resetMoreLess() {
        $('.hide').slideUp(); // hide p with button and "read less " text
        $('.readmore').slideDown(); // show Read More p with button
    }


});