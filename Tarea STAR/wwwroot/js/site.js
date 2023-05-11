$(document).ready(function () {
    const initDay = $('#initDay');
    const finalDay = $('#finalDay');
    const initHour = $('#initHour');
	const finalHour = $('#finalHour');




    initDay.on('input', function () {
        if (initDay.val().length === 0) {
            finalDay.prop('disabled', true);
        } else {
            finalDay.prop('disabled', false);
        }
    });

    initHour.on('input', function () {
        finalHour.attr('min', initHour.val());
    });

    finalDay.on('click', function () {
        finalDay.attr('min', initDay.val());
    });

// FUNCTION Scroll Arrow with Progress Bar

    const calcScrollValue = () => {
        const scrollProgress = $("#progress");
        const progressValue = $("#progress-value");
        const pos = $(document).scrollTop();
        const calcHeight =
            $(document).height() - $(window).height();
        const scrollValue = Math.round((pos * 100) / calcHeight);
        if (pos > 100) {
            scrollProgress.css('display', 'grid');
        } else {
            scrollProgress.css('display', 'none');
        }
        scrollProgress.on("click", () => {
            $(document).scrollTop(0);
        });
        scrollProgress.css('background', `conic-gradient(#243119 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`);
    };

    $(window).scroll(calcScrollValue);
    $(window).on('load', calcScrollValue);
});

 // FUNCTION CLICK ON DIV AND FULLSCREEN EXPANDING

var isFullscreen = false;

function fullscreen() {
    var d = {};
    var speed = 300;
    if (!isFullscreen) { 
        d.width = "100%";
        d.height = "100%";
        isFullscreen = true;
        $("h1").slideUp(speed);
    }
    else {           
        d.width = "300px";
        d.height = "100px";
        isFullscreen = false;
        $("h1").slideDown(speed);
    }
    $("#controls").animate(d, speed);
}