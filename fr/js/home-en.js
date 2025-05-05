


$(document).ready(function () {

    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

    $(".btn-switch").find('a').click(function () {
        if ($(this).hasClass("active")) {
            
            $(".btn-switch").find('a').addClass("active");
            $(this).removeClass("active");
        }
        else {
            
            $(".btn-switch").find('a').removeClass("active");
            $(this).addClass("active");
        }
    })

    try {
        
	// setTimeout(function () {
    //    var slider = $('.home-slider').bxSlider({
	//			 randomStart: false,
	//			 infiniteLoop: true,
	//			 hideControlOnEnd: true,
	//			controls: false,
	//			 pager: true,
	//			 //adaptiveHeight: true,
	//			 auto: true,
	//			responsive: true,
	//			mode: 'horizontal',
	//			//startSlide : 0,
	//			 autoHover: true,  // pause on hover
	//			onSliderLoad: function () {
	//			 }
 

	//		});
    //},150);
	 
	 
        var owl = $('.landing-slider');
        owl.owlCarousel({
            loop: owl.children().length > 1,
            nav: false,
            items: 1,
            dots: true,
            autoplay: 2000,
            rtl:true,
            autoplaySpeed: 450,
            onTranslated: function () {
                if ($(".owl-item.active .owl-video-wrapper", this.$element).length) {
                    $(".owl-video-play-icon").trigger("click");
                }
            }
        });
		
		
    $('.proj-hotstop-list').owlCarousel({
        loop: owl.children().length > 1,
        margin: 15,
        nav: true,
        autoplay: true,
        autoplaySpeed: 450,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });

    $('.latest-news').owlCarousel({
        loop: false,
        margin: 15,
        nav: true,
        navText: [
           '<i class="fa fa-angle-left"></i>',
           '<i class="fa fa-angle-right"></i>'
        ],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1024: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
    $('.board-member-carousel').owlCarousel({
        loop: false,
        margin: 15,
        nav: true,
        navText: [
           '<i class="fa fa-angle-left"></i>',
           '<i class="fa fa-angle-right"></i>'
        ],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1024: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    $('.bank-carousel').owlCarousel({
        loop: false,
        margin: 15,
        nav: true,
        navText: [
           '<i class="fa fa-angle-left"></i>',
           '<i class="fa fa-angle-right"></i>'
        ],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1024: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
//IR Results & Finance Reports//
$('.results-finance').on('mouseover', 'td', function(){
	
	var DOM = $(this);
	var table = $('.results-finance').find('table');
	table.find('.active-td').removeClass('active-td');
	table.find('.active-th').removeClass('active-th');
	$('.results-finance-list .active-td').removeClass('active-td');
	var td_index = DOM.index();
	var tr = DOM.closest('tr');
	var parent_table = tr.closest('table');
	if(DOM.prop('colspan') ===4)
	   parent_table.find('tr:eq(0)').find('th').addClass('active-th');
	else
	   parent_table.find('tr:eq(0)').find('th').eq(td_index).addClass('active-th');
	
	var tr_index = tr.index();
		$('.results-finance-list li').eq(tr_index).addClass('active-td');
	table.each(function(){
		$(this).find('tr').eq(tr_index).find('td').addClass('active-td');
	});
});
$('.results-finance').on('mouseout',function(){
	var table = $('.results-finance').find('table');
	table.find('.active-td').removeClass('active-td');
	table.find('.active-th').removeClass('active-th');
	$('.results-finance-list .active-td').removeClass('active-td');
})
$('.ir-results-finance-reports').owlCarousel({
        loop: false,
        margin: 15,
        nav: true,
        navText: [
           '<i class="fa fa-angle-left"></i>',
           '<i class="fa fa-angle-right"></i>'
        ],
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1024: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


   // $(window).load(function() {
  // $('.home-slider').bxSlider({
                    // infiniteLoop: true,
                    // hideControlOnEnd: true,
                    // controls: false,
                    // pager: true,
                    // //adaptiveHeight: true,
                    // auto: true,
                    // responsive: true,
       // mode: 'horizontal',
                    // autoHover: true,  // pause on hover

                    // onSliderLoad: function () {
                        // // show slider
                         // $('.esaverVideoContent').css("opacity", "1");
                    // }


                // });

/*if ($(window).width() < 780) {
       //Mobile
        $('.press_list_home').bxSlider({
            controls: true,
            pager: false,
            hideControlOnEnd: true,
            infiniteLoop: true,
            auto: true,
	        autoHover: true,
            autoStart: true,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            slideWidth: 500,
            slideMargin: 0
        });
}
  else {
//desktop
    $('.press_list_home').bxSlider({
        controls: true,
        pager: false,
        hideControlOnEnd: true,
        infiniteLoop: true,
		auto: true,
	    autoHover: true,
        autoStart: true,
        minSlides: 2,
        maxSlides: 2,
        moveSlides: 2,
        slideWidth: 500
    });
  }*/


    }
    catch (err) {

    }



});



/*$('.pie_progress').asPieProgress({
            namespace: 'pie_progress'
        });
		
$('.pie_progress').asPieProgress('start');

*/

