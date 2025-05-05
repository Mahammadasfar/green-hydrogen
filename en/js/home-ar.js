


$(document).ready(function () {

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
            rtl:true,
            dots: true,
            autoplay: true,
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
		rtl: true,
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



$('.pie_progress').asPieProgress({
            namespace: 'pie_progress'
        });
		
$('.pie_progress').asPieProgress('start');

