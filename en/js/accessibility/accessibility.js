(function ($) {
    var callBack = null;
    var items = new Array(),
     bitems = new Array(),
      current = 0,
      rootPath = '/',
    progressPanel = '.progress-panel';
    $.fn.accessibility = function (options) {
        callBack = options.loadComplete;
        options = options ? options : {};
        var acc_align = options.acc_align;
        var settings = $.extend({
            rootPath: options.rootPath ? options.rootPath : rootPath,
            title: options.title ? options.title : 'Accessibility Panel',
            theme: options.theme ? options.theme : 'orange'
        }, options);
        $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/accessibility-' + settings.theme + '.css" type="text/css" />'),
        $(this).append('<div class="acc-root ' + acc_align + '"><div title="Accessibility" class="acc-root-content"><img class="acc-root-icon" src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-main-icon.png" alt="accessibility" /></div></div>');
        $('body').click(function (e) {
            if ($(e.target.closest('div.acc-list-content')).length == 0 && $(e.target.closest('div.acc-root')).length == 0) {
                $('.acc-button-list').hide();
            }
        });
        $('.acc-popup-close img').click(function () {
            $('.acc-button-list').css("display", "none");
        });
        var actions = ["action-1", "action-2", "action-3", "action-4"];
        var maxVal = [3, 2, 2, 1];
        var arrText = [["contrast", "Black and White", "Grey", "DARK Grey"], ["WORD SPACING", "WORD SPACING", "WORD SPACING", "WORD SPACING"], ["Bigger Text", "Bigger Text", "Bigger Text", "Bigger Text"], ["CURSOR STYLE", "CURSOR STYLE"]];

        var _selection = _getAccessibilityCookie('_acc_action');//.split(',');
        if (_selection == null) {
            _setAccessibilityCookie([[0, 0, 0, 0]]);
        } else {
            createTemplate(settings);
            $('.acc-button-list').css("display", "none");
            $.each(_selection.split(','), function (key, _value) {
                _value = parseInt(_value);
                if (_value >= 0) {
                    var item = $("img[data-name='" + actions[key] + "'].acc-list-icon");
                    switch (key) {
                        case 0:
                            if (_value > 0) {
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/contrast_' + _value + '.css" type="text/css" />');
                                $(item).attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-contrast-icon' + _value + '.png');
                                $(item).next('.acc-text').text(arrText[0][_value]);
                                $(item).next().next().next('.acc-dots').find('.acc-dot:nth-child(' + _value + ')').addClass('active');
                            }
                            break;
                        case 1:
                            if (_value > 0) {
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/spacing_' + _value + '.css" type="text/css" />');
                                $(item).attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-resize-icon' + _value + '.png');
                                $(item).next('.acc-text').text(arrText[1][_value]);
                                $(item).next().next().next('.acc-dots').find('.acc-dot:nth-child(' + _value + ')').addClass('active');
                            }
                            break;
                        case 2:
                            if (_value > 0) {
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/fontsize_' + _value + '.css" type="text/css" />');
                                $(item).attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-textsize-icon' + _value + '.png');
                                $(item).next('.acc-text').text(arrText[2][_value]);
                                $(item).next().next().next('.acc-dots').find('.acc-dot:nth-child(' + _value + ')').addClass('active');
                            }
                            break;
                        case 3:
                            if (_value > 0) {
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/cursor_' + _value + '.css" type="text/css" />');
                                $(item).attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-cursor-icon' + _value + '.png');
                                $(item).next('.acc-text').text(arrText[3][_value]);
                                $(item).next().next().next('.acc-dots').find('.acc-dot:nth-child(' + _value + ')').addClass('active');
                            }
                            break;
                    }
                    if (_value > 0) {
                        $(item).closest('.acc-border').addClass('selected').addClass('border');
                        $(item).next().next('.acc-tick').addClass('active');
                        $(item).next().next().next('.acc-dots').addClass('active');
                    }
                }
            });
        }
        $('.acc-root-icon').click(function (e, _value) {
            var contentPanel = $('.acc-button-list');
            if ($('.acc-button-list').length == 0) {
                createTemplate(settings);
            }
            else {
                $(contentPanel).toggle();
            }
            $('.acc-button-list').css('top', e.pageY + $(this).first().width()),
                $('.acc-border').click(function (e) {
                    var switch_status = 0;
                    var selection = _getAccessibilityCookie('_acc_action').split(',');
                    var _value = 0;
                    switch ($(e.target).attr('data-name')) {

                        case actions[0]:
                            _value = parseInt(selection[0]);
                            if (_value != 0)
                                $('link[rel=stylesheet][href~="' + settings.rootPath + '/accessibility/style/contrast_' + _value + '.css"]').remove();
                            $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-contrast-icon.png');
                            selection[0] = _value = _value + 1 <= parseInt(maxVal[0]) ? _value + 1 : 0;
                            $(this).find('.acc-dot').removeClass('active');

                            if (_value != 0) {
                                $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-contrast-icon' + _value + '.png');
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/contrast_' + _value + '.css" type="text/css" />');
                                $(this).find('.acc-list-icon').next('.acc-text').text(arrText[0][_value]);
                                $(this).find('.acc-dots .acc-dot:nth-child(' + _value + ')').addClass('active');
                                switch_status = 1;
                            }
                            break;
                        case actions[1]:
                            _value = parseInt(selection[1]);
                            if (_value != 0)
                                $('link[rel=stylesheet][href~="' + settings.rootPath + '/accessibility/style/spacing_' + _value + '.css"]').remove();
                            $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-resize-icon.png');
                            selection[1] = _value = _value + 1 <= parseInt(maxVal[1]) ? _value + 1 : 0;
                            $(this).find('.acc-dot').removeClass('active');
                            if (_value != 0) {
                                $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-resize-icon' + _value + '.png');
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/spacing_' + _value + '.css" type="text/css" />');
                                $(this).find('.acc-list-icon').next('.acc-text').text(arrText[1][_value]);
                                $(this).find('.acc-dots .acc-dot:nth-child(' + _value + ')').addClass('active');
                                switch_status = 1;
                            }
                            break;
                        case actions[2]:
                            _value = parseInt(selection[2]);
                            if (_value != 0)
                                $('link[rel=stylesheet][href~="' + settings.rootPath + '/accessibility/style/fontsize_' + _value + '.css"]').remove();
                            $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-textsize-icon.png');
                            selection[2] = _value = _value + 1 <= parseInt(maxVal[2]) ? _value + 1 : 0;
                            $(this).find('.acc-dot').removeClass('active');
                            if (_value != 0) {
                                $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-textsize-icon' + _value + '.png');
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/fontsize_' + _value + '.css" type="text/css" />');
                                $(this).find('.acc-list-icon').next('.acc-text').text(arrText[2][_value]);
                                $(this).find('.acc-dots .acc-dot:nth-child(' + _value + ')').addClass('active');
                                switch_status = 1;
                            }
                            break;
                        case actions[3]:
                            _value = parseInt(selection[3]);
                            $('link[rel=stylesheet][href~="' + settings.rootPath + '/accessibility/style/cursor_' + _value + '.css"]').remove();
                            $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-cursor-icon.png');
                            selection[3] = _value = _value + 1 <= parseInt(maxVal[3]) ? _value + 1 : 0;
                            $(this).find('.acc-dot').removeClass('active');
                            if (_value != 0) {
                                $(this).find('.acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-cursor-icon' + _value + '.png');
                                $('head').append('<link rel="stylesheet" href="' + settings.rootPath + '/accessibility/style/cursor_' + _value + '.css" type="text/css" />');
                                $(this).find('.acc-list-icon').next('.acc-text').text(arrText[3][_value]);
                                $(this).find('.acc-dots .acc-dot:nth-child(' + _value + ')').addClass('active');
                                switch_status = 1;
                            }
                            break;
                    }
                    _setAccessibilityCookie(selection.join(","));
                    if (_value >= 1) {
                        $(this).find('.acc-list-icon').addClass('selected');
                        $(this).find('.acc-list-icon').next().next('.acc-tick').addClass('active');
                        $(this).find('.acc-list-icon').next().next().next('.acc-dots').addClass('active');
                        $(this).addClass('border');
                    }
                    else {
                        $(this).find('.acc-list-icon').removeClass('selected');
                        $(this).find('.acc-list-icon').next().next('.acc-tick').removeClass('active');
                        $(this).find('.acc-list-icon').next().next().next('.acc-dots').removeClass('active');
                        $(this).removeClass('border');
                    }
                }),
            $('.acc-reset-icon').click(function () {
                
                _setAccessibilityCookie([[0, 0, 0, 0]]);
                var actionClasses = ["contrast_", "spacing_", "fontsize_", "cursor_"];
                for (var iIndex = 0; iIndex < actions.length; iIndex++) {
                    var itemIndex = maxVal[iIndex];
                    for (var iInner = 1; iInner <= itemIndex; iInner++) {
                        $('link[rel=stylesheet][href~="' + settings.rootPath + '/accessibility/style/' + actionClasses[iIndex] + iInner + '.css"]').remove();
                    }
                }
                debugger;
                $('.acc-dot').removeClass('active');
                $('.acc-border').removeClass('border');
                $('.rtable-cell:nth-child(1) .acc-list-icon').next('.acc-text').text('contrast');
                $('.acc-list-icon').next().next().next('.acc-dots').removeClass('active');
                $('.acc-list-icon').next().next('.acc-tick').removeClass('active');
                $('.acc-list-icon').removeClass('selected');
                $('.rtable-cell:nth-child(1) .acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-contrast-icon.png');
                $('.rtable-cell:nth-child(2) .acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-textsize-icon.png');
                $('.rtable-cell:nth-child(3) .acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-resize-icon.png');
                $('.rtable-cell:nth-child(4) .acc-list-icon').attr('src', '' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-cursor-icon.png');
                _value = 0;
            });
        }),
        window.onscroll = function () {
            if (window.pageYOffset >= 10) {
                $('.acc-root-icon').addClass('sticky');
                $('.acc-button-list').addClass('sticky');

            } else {
                $('.acc-root-icon').removeClass('sticky');
                $('.acc-button-list').removeClass('sticky');
            }
        };

    };
    function _setAccessibilityCookie(value, days) {
        if (!days)
            days = 1;
        var name = '_acc_action';
        var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=-1";// + date.toUTCString();

        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function createTemplate(settings) {
        $('body').append('<div class="acc-button-list"><div class="acc-popup-close"><img class="acc-popup" src="' + settings.rootPath + '/accessibility/images/accessibility-close-icon.png"  alt=""/></div><div class="acc-list-content"><div class="acc-list-header">' + settings.title + '</div><div class="rtable rtable--2cols">' +

                   '<div class="rtable-cell" ><div class="acc-border" data-name="action-1"><img data-name="action-1" src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-contrast-icon.png" class="acc-list-icon" alt=""/><div class="acc-text" data-name="action-1">CONTRAST</div><img src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-tick.png" class="acc-tick" alt=""/><div class="acc-dots"><div class="acc-dot"></div><div class="acc-dot"></div><div class="acc-dot"></div></div></div></div>' +
                   '<div class="rtable-cell" ><div class="acc-border" data-name="action-2"><img data-name="action-2" src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-resize-icon.png" class="acc-list-icon" alt=""/><div class="acc-text" data-name="action-2">WORD SPACING</div><img src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-tick.png" class="acc-tick" alt=""/><div class="acc-dots"><div class="acc-dot"></div><div class="acc-dot"></div></div></div></div>' +
                   '<div class="rtable-cell" ><div class="acc-border" data-name="action-3"><img data-name="action-3"  src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-textsize-icon.png" class="acc-list-icon" alt=""/><div class="acc-text" data-name="action-3">Bigger Text</div><img src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-tick.png" class="acc-tick" alt=""/><div class="acc-dots"><div class="acc-dot"></div><div class="acc-dot"></div></div></div></div>' +
                   '<div class="rtable-cell" ><div class="acc-border" data-name="action-4"><img data-name="action-4"  src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-cursor-icon.png" class="acc-list-icon" alt=""/><div class="acc-text" data-name="action-4">CURSOR STYLE</div><img src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-tick.png" class="acc-tick" alt=""/></div></div></div>' +
                   '<div class="acc-reset-button"><button><img src="' + settings.rootPath + '/accessibility/images/' + settings.theme + '/accessibility-reset-icon.png" class="acc-reset-icon" alt=""/></button></div></div></div>');
    }
    function _getAccessibilityCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function _eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}(jQuery));