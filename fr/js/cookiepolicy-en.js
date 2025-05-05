$(document).ready(function () {
    var dt = new Date();
    dt.setSeconds(dt.getSeconds() + 60);
    document.cookie = "cookietest=1; expires=" + dt.toGMTString();
    var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1;
    if (cookiesEnabled) {
        $('body').ihavecookies({
            title: 'This website uses cookies',
            message: 'We use them to give you the best experience. By continuing to browse our website, you consent to the use of cookies.',
            delay: 600,
            expires: 30,
            link: '/en/cookie-policy/',
            onAccept: function () {
                            
            },
            uncheckBoxes: true,
            acceptBtnLabel: 'Allow all cookies',
            moreInfoLabel: 'Read our cookies policy',
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
