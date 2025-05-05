$(document).ready(function () {
    var dt = new Date();
    dt.setSeconds(dt.getSeconds() + 60);
    document.cookie = "cookietest=1; expires=" + dt.toGMTString();
    var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1;
    if (cookiesEnabled) {
        $('body').ihavecookies({
            title: 'الموقع يستخدم ملفات تعريف الارتباط',
            message: ' نحن نستخدمها لنمنحك أفضل تجربة. من خلال الاستمرار في تصفح موقعنا، فإنك توافق على استخدام ملفات تعريف الارتباط.',
            delay: 600,
            expires: 30,
            link: '/ar/cookie-policy/',
            onAccept: function () {
                     
            },
            uncheckBoxes: true,
            acceptBtnLabel: 'السماح باستخدام ملفات تعريف الارتباط',
            moreInfoLabel: 'اقرأ سياستنا لملفات تعريف الارتباط',
            fixedCookieTypeLabel: 'Essential'
        });
    }
});
function optIn() {
    try {
        createCookie('cookieControl', '', -1);
        createCookie('cookieControlPrefs', '', -1);
    } catch (e) {

    }
}
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}
