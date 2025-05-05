$(document).ready(function () {

try { 

var owl = $('.landing-slider');
owl.owlCarousel({
loop: owl.children().length > 1,
nav: false,
items: 1,
animateOut: 'fadeOut',
animateIn: 'fadeIn',
dots: true,
autoplay: true,
autoplaySpeed: 450,
onTranslated: function () {
if ($(".owl-item.active .owl-video-wrapper", this.$element).length) {
$(".owl-video-play-icon").trigger("click");
}
}
});
$('#homeicontacterrmsg').hide();
$('#homeicontactmsg').hide();

}
catch (err) {

}

if ($('#homepage_news_rssfeed').length > 0) { 
$.ajax({
type: "POST",
data: { },
timeout: 20000,
url: '/base/NewRSSFeedHandler/GetHomepageNewsFeed',
success: function (data) {
$('#homepage_news_rssfeed').find('ul.press_list_home').append(data);
if ($(window).width() < 780) {
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
}

}, error: function (request, error) {

}
});
}


});


$('#btnhomeicontact').click(function (e) {
if ($('#icontactname').val() == "") {
$('#homeicontacterrmsg').show().html($('#homeicontacterrmsg').attr('mandatory-msg')).fadeOut(5000);
$('#icontactname').focus();
return false;
} else if ($('#icontactemail').val() == "") {
$('#homeicontacterrmsg').show().html($('#homeicontacterrmsg').attr('mandatory-msg')).fadeOut(5000);
$('#icontactemail').focus();
return false;
}
if (!isEmail($('#icontactemail').val())) {
$('#homeicontacterrmsg').show().html($('#homeicontacterrmsg').attr('invalid-email-msg')).fadeOut(5000);
$('#icontactemail').focus();
return false;
}
var email = $('#icontactemail').val();
var fullName = $('#icontactname').val();

var firstName = fullName.split(' ').slice(0, -1).join(' ');
var lastName = fullName.split(' ').slice(-1).join(' ');
var lang = window.location.href.indexOf('/ar') > 0 ? 'ar' : 'en';
$.ajax({
type: "POST",
timeout: 20000,
url: '/base/IContactHandler/AddIContact',
data: {
email: email,
firstName: firstName,
lastName: lastName,
lang : lang
},
success: function (data) {
if (data == "true") {
//success message
$('#homeicontactmsg').show().html($('#homeicontactmsg').attr('success-msg')).fadeOut(5000);

} else {
$('#homeicontactmsg').show().html($('#homeicontactmsg').attr('error-msg')).fadeOut(5000);
}

}, error: function (request, error) {

}
});
});

function isEmail(email) {
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
return regex.test(email);
}


$('.pie_progress').asPieProgress({
namespace: 'pie_progress'
});

$('.pie_progress').asPieProgress('start');