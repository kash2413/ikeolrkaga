$(function () {
    $('time.timeago').timeago();

    if($('body').hasClass('single') == false) {
        $(window).load(function () {
            $('.articles').masonry({
                itemSelector: '.article',
                columnWidth: '.article'
            });
            $('.carousel').carousel();

            $('.slide-item').on('click', '.likes', function (e) {
                $('.likes-data a.dot-irecommendthis', $(this).parents('.slide-item')).trigger('click');
                e.preventDefaults();
                e.stopPropagation();
            });
            $('.carousel').on('slid.bs.carousel', function () {
              fixSlides();
            });
            $('.carousel').trigger('slid.bs.carousel');
        });

        function fixSlides() {
            $('.item.active .likes').each(function () {
                  var offset = $(this).offset(),
                      likeData = $('.likes-data', $(this).parents('.slide-item'));
                  var slideItemOffset = $(this).parents('.slide-item').offset();

                 likeData.removeAttr('style');
                 likeData.css({ top: offset.top + 'px',
                    left: (offset.left - slideItemOffset.left) + 'px'
                  });
                });
        }

        $(window).resize(function () {
            try {
            $('.articles').masonry('destroy');
            $('.articles').masonry({
                itemSelector: '.article',
                columnWidth: '.article'
            });
            fixSlides();
            //$('.navbar.navbar-inverse.navbar-fixed-top').width($(window).width());
            } catch(error) {}
        });

        setTimeout(function () {
            $(document).trigger('resize');
            $(window).trigger('resize');
        }, 0);
    } else {
        window.semafor = false;
        $(window).scroll(function () {
            if($(window).scrollTop() > 50) {
                if(window.semafor == false) {
                    window.semafor = true;
                    $('body').addClass('show-share');
                }
            } else {
                if(window.semafor == true) {
                    window.semafor = false;
                    $('body').removeClass('show-share');
                }
            }
        })
    }

    $(window).ready(function () {
        //$('#loader').fadeOut();
        //$('.navbar.navbar-inverse.navbar-fixed-top').width($(window).width());
    });

    $('body').on('click', '#navigation-label, #wrapper-overlay', function () {
        if ($('body').hasClass('open-menu')) {
            $('body').removeClass('open-menu');
        } else {
            $('body').addClass('open-menu')
        }
    });

})
