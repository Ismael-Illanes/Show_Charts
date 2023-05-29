$(document).ready(function () {
    const initDay = $('#initDay');
    const finalDay = $('#finalDay');
    const initHour = $('#initHour');
	const finalHour = $('#finalHour');



    $('.divGrow').click(function () {
        var $element = $(this);

        if ($element.css('max-height') === '350px') {
            $element.css({
                'max-height': 'none',
                'max-width': 'none',
                'position': 'fixed',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
                'z-index': '99999'
            });

            if (!$('.overlay').length) {
                var $overlay = $('<div>').addClass('overlay').css({
                    'position': 'fixed',
                    'top': '0',
                    'left': '0',
                    'width': '100%',
                    'height': '100%',
                    'background-color': 'rgba(0, 0, 0, 0.9)',
                    'z-index': '99998'
                });

                $('body').append($overlay);
                $overlay.click(function () {
                    $element.trigger('click');
                });
            }
        } else {
            $element.css({
                'max-width': '500px',
                'max-height': '350px',
                'position': 'static',
                'left': 'auto',
                'top': 'auto',
                'transform': 'none',
                'z-index': 'auto'
            });
            $('.overlay').remove();
        }
    });









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

