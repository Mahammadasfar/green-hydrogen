
var ww = $(window).width();
var limit = 858;

function refresh() {
    ww = $(window).width();
    var w = ww < limit ? (location.reload(true)) : (ww > limit ? (location.reload(true)) : ww = limit);
}

var tOut;
$(window).resize(function () {
    var resW = $(window).width();
    clearTimeout(tOut);
    if ((ww > limit && resW < limit) || (ww < limit && resW > limit)) {
        tOut = setTimeout(refresh, 100);
    }
});

$(document).ready(function ($) {

    /* prepend menu icon */
    $('header .wrap .left-col').prepend('<div class="nav-trigger"><span></span><span></span><span></span></div>');




    /* toggle nav */
    $(".nav-trigger").click(function () {
        $(".navbar nav").slideToggle();
        $(".navbar").removeClass('animated');
        $(this).toggleClass("active");
    });

    if ($(window).width() < 800) {
        $('.chart-list').bxSlider({
            controls: true,
            pager: false,
            hideControlOnEnd: true,
            infiniteLoop: false
        });


    }

   /* else {

        $(".menu-1").hover(function () {
            $('#menu-1').slideDown( 800, function () {
            });

            $('#menu-2').slideUp();
            $('#menu-3').slideUp();
            $('#menu-4').slideUp();
            $('#menu-5').slideUp();
            $('#menu-6').slideUp();
            //},function(){
            //    $('#menu-1').slideUp();

        });




        $(".menu-2").hover(function () {
            $('#menu-2').slideDown( 800, function () {
            });

            $('#menu-1').slideUp();

            $('#menu-3').slideUp();
            $('#menu-4').slideUp();
            $('#menu-5').slideUp();
            $('#menu-6').slideUp();
            //},function(){
            //$('#menu-2').slideUp();
        });

        $(".menu-3").hover(function () {
            $('#menu-3').slideDown( 800, function () {
            });

            $('#menu-1').slideUp();
            $('#menu-2').slideUp();
            $('#menu-4').slideUp();
            $('#menu-5').slideUp();
            $('#menu-6').slideUp();
            //},function(){
            //$('#menu-3').slideUp();
        });

        $(".menu-4").hover(function () {
            $('#menu-4').slideDown( 800, function () {
            });



            $('#menu-1').slideUp();
            $('#menu-2').slideUp();
            $('#menu-3').slideUp();
            $('#menu-5').slideUp();
            $('#menu-6').slideUp();
            //},function(){
            //$('#menu-3').slideUp();
        });

        $(".menu-5").hover(function () {
            $('#menu-5').slideDown( 800, function () {
            });

            $('#menu-6').slideUp();
            $('#menu-3').slideUp();
            $('#menu-4').slideUp();

            $('#menu-2').slideUp();
            $('#menu-1').slideUp();

            //},function(){
            //$('#menu-3').slideUp();
        });

        $(".menu-6").hover(function () {
            $('#menu-6').slideDown( 800, function () {
            });

            $('#menu-5').slideUp();
            $('#menu-4').slideUp();
            $('#menu-3').slideUp();
            $('#menu-2').slideUp();
            $('#menu-1').slideUp();
            //},function(){
            //$('#menu-3').slideUp();
        });

        $(".menu-7").hover(function () {
            $('#menu-3').slideUp();

            $('#menu-1').slideUp();
            $('#menu-2').slideUp();
            $('#menu-3').slideUp();
            $('#menu-4').slideUp();
            $('#menu-5').slideUp();
            $('#menu-6').slideUp();
            //},function(){
            //$('#menu-3').slideUp();
        });

        $(".wrap").mouseleave(function () {
            $('#menu-1').slideUp();
            $('#menu-2').slideUp();
            $('#menu-3').slideUp();
            $('#menu-4').slideUp();
            $('#menu-5').slideUp();
            $('#menu-6').slideUp();
            $('#menu-7').slideUp();
        });

    }*/

  

    var searchHTML = $('.mobile-sub-menu_search').parent().find('div.mobile-sub-menu_search');
    var searchParent = $('.mobile-sub-menu_search').parent();
    
    $('.mobile-sub-menu_search').parent().find('div.mobile-sub-menu_search').remove();
    searchParent.find('li.mobile_menu_search').html(searchHTML.children());
});
//$(document).ready(function () {
//$('.power-chart').css({ "display": "none" });
// setTimeout(function () {
//    $('.power-chart').css({ "display": "block" }, 4000);
//  });
//});
$(window).load(function () {
    $('.members-slide').bxSlider({
        controls: true,
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        auto: false,
        autoHover: false,
        speed: 1000,
        mode: 'fade'
    });


    $('.press-slide').bxSlider({
        controls: true,
        pager: false,
        hideControlOnEnd: true,
        infiniteLoop: false
    });

    $('.our-values').bxSlider({
        mode: 'fade',
        controls: true,
        pager: false,
        hideControlOnEnd: true,
        infiniteLoop: false
    });

    $('.mission-vison-slider').bxSlider({
        mode: 'fade',
        controls: true,
        pager: false,
        hideControlOnEnd: true,
        infiniteLoop: false
    });

});



$(document).ready(function () {
    new WOW().init();
    //$('.power-chart').delay(1500).fadeInDown(5000);
    $('.navbar').delay(400).fadeIn(1000);

});

 $(document).ready(function () {
        new WOW().init();

    if ($(window).width() > 650) {

    $(".search-toggle").click(function () {
        $(".search-wrap").toggle();
		 $(".search-wrap").find('input').focus();
        $(".search-toggle").toggleClass("active-search");
        $('*').removeClass("animated");
    });

    $("html").mouseup(function (e) {
        var subject = $(".search-wrap");
        if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
            subject.fadeOut();
            $(".search-toggle").removeClass("active-search");
        }

    }); 

        $('.search-box').on('focus', function (event) {
            $(".search-wrap").show();
        });
        
    }
    });




//Share Button Initialization

 $(window).load(function () {

     setTimeout(function () {
         if ($('.btn-share-holder').sharrre) {
             $('.btn-share-holder').sharrre({
                 share: {
                     facebook: true,
                     twitter: true,
                     googlePlus: true,
                     linkedin: true
                 },
                 buttons: {
                     facebook: { action: 'recommend', layout: 'button_count' },
                     twitter: { via: '@osn', count: 'horizontal' },
                     googlePlus: { size: 'medium', annotation: 'bubble' },
                     linkedin: { counter: 'right' }
                 },
                 title: 'Share',
                 enableHover: false,
                 enableCounter: false,
                 enableTracking: false,
                 click: function (api, options) {
                     $(api.element).find('.buttons').toggle();
                     //$(api.element).find('.btn-share').toggleClass("none active-share");

                     $('html').click(function () {
                         $(api.element).find('.buttons').hide();
                     });


                 }


             });
         }
     }, 500);

});


 $(document).ready(function () {
	 $(".search-toggle").keyup(function(event){
    if(event.keyCode == 13){
        $(".search-toggle").click();
    }
});
	 });









