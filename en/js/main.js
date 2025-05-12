var tOut, ww = $(window).width(),
    limit = 858;

function refresh() {
    (ww = $(window).width()) < limit ? location.reload(!0) : ww > limit ? location.reload(!0) : ww = limit
}
$(window).resize(function () {
    var e = $(window).width();
    clearTimeout(tOut), (ww > limit && e < limit || ww < limit && e > limit) && (tOut = setTimeout(refresh, 100))
}), $(document).ready(function (e) {
    e("header .wrap .left-col").prepend('<div class="nav-trigger"><span></span><span></span><span></span></div>'), e(".nav-trigger").click(function () {
        e(".navbar nav").slideToggle(), e(".navbar").removeClass("animated"), e(this).toggleClass("open")
    }), e(window).width() < 800 && e(".chart-list").bxSlider({
        controls: !0,
        pager: !1,
        hideControlOnEnd: !0,
        infiniteLoop: !0,
        auto: !0,
        autoHover: !0,
        autoStart: !0
    });
    var o = e(".mobile-sub-menu_search").parent().find("div.mobile-sub-menu_search"),
        n = e(".mobile-sub-menu_search").parent();
    e(".mobile-sub-menu_search").parent().find("div.mobile-sub-menu_search").remove(), n.find("li.mobile_menu_search").html(o.children())
}), $(window).load(function () {

    /*
    $(".members-slide").bxSlider({
        controls: !0,
        pager: !1,
        infiniteLoop: !0,
        hideControlOnEnd: !0,
        auto: !0,
        autoStart: !0,
        autoHover: !0,
        speed: 1e3,
        mode: "fade"
    }), $(".press-slide").bxSlider({
        controls: !0,
        pager: !1,
        hideControlOnEnd: !0,
        infiniteLoop: !0,
        auto: !0,
        autoHover: !0,
        autoStart: !0
    }), $(".our-values").bxSlider({
        mode: "fade",
        controls: !0,
        pager: !1,
        hideControlOnEnd: !0,
        infiniteLoop: !0,
        auto: !0,
        autoHover: !0,
        autoStart: !0
    }), $(".mission-vison-slider").bxSlider({
        mode: "fade",
        controls: !0,
        pager: !1,
        hideControlOnEnd: !0,
        infiniteLoop: !0,
        auto: !0,
        autoHover: !0,
        autoStart: !0
    }), $(window).scroll(function () {
        $(window).scrollTop() >= 80 ? $(".top-bar").hide() : $(".top-bar").show(), $(window).scrollTop() >= 100 ? $(".top-scroll").css("display", "block") : $(".top-scroll").css("display", "none")
    }), $(".smooth-scroll").on("click", function (e) {
        if ("" !== this.hash) {
            e.preventDefault();
            var o = this.hash;
            $("html, body").animate({
                scrollTop: $(o).offset().top - "60"
            }, 800, function () { })
        }
    })*/
}), $(document).ready(function () {
    }), $(document).ready(function () {
    
}), $(window).load(function () {
    setTimeout(function () {
        $(".btn-share-holder").sharrre && $(".btn-share-holder").sharrre({
            share: {
                facebook: !0,
                twitter: !0,
                googlePlus: !0,
                linkedin: !0
            },
            buttons: {
                facebook: {
                    action: "recommend",
                    layout: "button_count"
                },
                twitter: {
                    via: "@osn",
                    count: "horizontal"
                },
                googlePlus: {
                    size: "medium",
                    annotation: "bubble"
                },
                linkedin: {
                    counter: "right"
                }
            },
            title: "Share",
            enableHover: !1,
            enableCounter: !1,
            enableTracking: !1,
            click: function (e, o) {
                $(e.element).find(".buttons").toggle(), $("html").click(function () {
                    $(e.element).find(".buttons").hide()
                })
            }
        })
    }, 500)
}), $(document).ready(function (e) {
    new function () {
        var o = e(".sub-menu-action"),
            n = e(".menu-item"),
            t = e(".menu-item-open-url"),
            i = e(".sub-menu-items"),
            a = "slide-up-triggerd",
            r = "slide-down-triggerd",
            l = !0,
            s = function (o, n) {
                var t = o.attr("data-action"),
                    i = e("#" + t);
                o.hasClass(a) ? (i.slideDown(), o.removeClass(a), o.html("-"), o.addClass(r)) : (i.slideUp(), o.addClass(a), o.html("+"), o.removeClass(r)), n && setTimeout(function () {
                    window.location.href = n
                }, 100), setTimeout(function () {
                    l = !0
                })
            };
        e(window).width() <= 800 && (i.css("display", "block"), i.slideUp(), o.addClass(a), o.click(function (o) {
            l = !1, o.preventDefault();
            var n = e(this);
            s(n, !1)
        }), t.click(function (o) {
            o.stopPropagation(), o.preventDefault();
            var n = e(this).closest("a").attr("href");
            window.location.href = n
        }), n.click(function (o) {
            o.preventDefault();
            var n = e(this);
            l && (n.hasClass("menu-item") && (n.attr("href"), n = n.find(".sub-menu-action")), s(n, !1))
        }))
    }
}), $(window).scroll(function () {
    $(window).scrollTop() > 200 ? $(".navbar, .head-tickker").addClass("fixed-header") : $(".navbar, .head-tickker").removeClass("fixed-header")
});


//$('#demo').readmore({
    //moreLink: '<a href="#">Usage, examples, and options</a>',
   // collapsedHeight: 384,
   // afterToggle: function (trigger, element, expanded) {
       // if (!expanded) { // The "Close" link was clicked
           // $('html, body').animate({ scrollTop: element.offset().top }, { duration: 100 });
        //}
    //}
//});

//$('article').readmore({ speed: 500 });


$(".board-sec a").click(function () {
    $('html, body').animate({
        scrollTop: $(".committee").offset().top - 70
    }, 2000);
});

    $(function () {
        $('.imp-tab a').on('click', function () {
            $('.triangle-container').remove();
            show_content($(this).index());
        });

        show_content(0);

        function show_content(index) {
            // Make the content visible
            $('.tabs .content.visible').removeClass('visible');
            $('.tabs .content:nth-of-type(' + (index + 1) + ')').addClass('visible');

            // Set the tab to selected
            $('.imp-tab a.selected').removeClass('selected');
            $('.imp-tab a:nth-of-type(' + (index + 1) + ')').addClass('selected');
            // Add arrow
            //$('.imp-tab a.selected').append("<div class='triangle-container'><img src='http://rebornshare.com/right-arrow-red.png'></div>");
            // How to remove the arrow and only show it on the selected tab?
        }
    });

    
    $(document).ready(function () {

        $(".set > button").on("click", function (e) {
            e.preventDefault();
            if ($(this).hasClass("active")) {
                $(".set > button").removeClass("active");
                $(".panel").hide();
                $(this).removeClass("active");
                $(this).siblings(".panel").hide();
            } else {
                $(".set > button").removeClass("active");
                $(".panel").hide();
                $(this).addClass("active");
                $(this).siblings(".panel").show();
            }
            return;

        });

        $('ul.tab li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.tab li').removeClass('current');
            $('.event-tab-content').removeClass('current');

            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        })
    });
 
    $(window).load(function () {
        $("body").trigger("apply.daterangepicker");

        var owl = $('.fuel-landing-slider');
        owl.owlCarousel({
            loop: owl.children().length > 1,
            nav: true,
            navText: [
           '<i class="fa fa-angle-left"></i>',
           '<i class="fa fa-angle-right"></i>'
            ],
            items: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 450,
            onTranslated: function () {
                if ($(".owl-item.active .owl-video-wrapper", this.$element).length) {
                    $(".owl-video-play-icon").trigger("click");
                }
            }
        });

       

        $("#right-arrow").click(function () {
            $("#panel").slideToggle("slow");
        });



    });

    $(document).ready(function () {
        //Accordian
        $('.accordion-ir').each(function () {
            var $accordian = $(this);
            $accordian.find('.accordion-head-ir').on('click', function () {
                $accordian.find('.accordion-body-ir').slideUp();
                $('.accordion-head-ir').removeClass('accordian-head-active');
                if (!$(this).next().is(':visible')) {
                    $(this).next().slideDown();
                    $(this).addClass('accordian-head-active');

                }
            });
        });
		

        //IPO script


        // hide all contents accept from the first div
        $('.tabContent .tab-content-list:not(:first)').toggle();

        // hide the previous button
        $('.previous').css("pointer-events","none");

        $('.tabs li').click(function () {

            if ($(this).is(':last-child')) {
                $('.next').css("pointer-events", "none");
            } else {
                $('.next').css("pointer-events", "auto");
            }

            if ($(this).is(':first-child')) {
                $('.previous').css("pointer-events", "none");
            } else {
                $('.previous').css("pointer-events", "auto");
            }

            var position = $(this).position();
            var corresponding = $(this).data("id");

            // scroll to clicked tab with a little gap left to show previous tabs
            scroll = $('.tabs').scrollLeft();
            $('.tabs').animate({
                'scrollLeft': scroll + position.left - 0
            }, 200);

            // hide all content divs
            //$('.tabContent .tab-content-list').hide();
            // show content of corresponding tab
            //$('div.' + corresponding).toggle();

            // remove active class from currently not active tabs
            $('.tabs li').removeClass('active');

            // add active class to clicked tab
            $(this).addClass('active');
        });
        //var currentActive;
        $('.contentWrapper a').click(function (e) {
            e.preventDefault();
            var check = $(this).closest('section').hasClass('fixed-tab');
            $('li.active').next('li').trigger('click');
            if (check) {
                var hash = $($(this).attr('href'));
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 150
                }, 800);
            } else {
                var hash = $($(this).attr('href'));
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 250
                }, 800);
            }
        });


        $(".key-doc-list").hover(function () {
            $(this).addClass('active');
        }, function () {
            $(this).removeClass('active');
        });

       

        $(window).scroll(function () {
            var scrollDistance = $(window).scrollTop() + 200;
            // Assign active class to nav links while scolling
            $('.ipo_sections').each(function (i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.contentWrapper .tabs li.active').removeClass('active');
                    $('.contentWrapper .tabs li').eq(i).addClass('active');
                }
            });
            
        }).scroll();

        // $(window).scroll(function () {
        //     var scroll1 = $(window).scrollTop() + 230;
        //     var scroll2 = $(window).scrollTop();
        //     var scroll3 = $(window).scrollTop();
        //     var left_scroll = $('#bank').offset().top;
        //     var right_scroll = $('#ipo_timeline').offset().top - 160;
        //     var right_scroll2 = $('#key_doc').offset().top - 160;
        //     if (scroll1 >= left_scroll) {
        //         $('li.active').next('li').trigger('click');
        //     }
        //     if (scroll2 <= right_scroll) {
        //         $('li.active').prev('li').trigger('click');
        //     }
        //     if (scroll3 <= right_scroll2) {
        //         $('li.active').prev('li').trigger('click');
        //     }
        // });

        $('.next').click(function (e) {
            e.preventDefault();
            $('li.active').next('li').trigger('click');
        });
        $('.previous').click(function (e) {
            e.preventDefault();
            $('li.active').prev('li').trigger('click');
        });

        var heights = $("div.status").map(function () {
            return $(this).height();
        }).get();

        maxHeight = Math.max.apply(null, heights);

        $('.status').height(maxHeight);

        $(window).scroll(function () {
            var window_top = $(window).scrollTop();
            if (window_top > 500) {
                $('.contentWrapper').addClass('fixed-tab');
            }
            else {
                $('.contentWrapper').removeClass('fixed-tab');
            }
        });


		
    });