$(document).ready(function () {

    var language;
    var currentclickedfilter = ''
    var filteredProject = [];


    $('iframe').load(function () {
        this.style.height =
        $(this.contentWindow.document.body)[0].offsetHeight + 20 + 'px';
    });


    if (window.location.href.indexOf('/en/') > 0) {
        language = "en";
    }
    else {
        language = "ar";
    }


    function resetfilters() {
        $('#filter-by-products input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('checked');
        });

        $('#filter-by-status input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('checked');
        });

        $('#filter-by-energy-sources input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('checked');
        });

    }

    function resetdisabledfilters() {
        $('#filter-by-products input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('disable');
            $(this).removeAttr('disabled');
        });

        $('#filter-by-status input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('disable');
            $(this).removeAttr('disabled');
        });

        $('#filter-by-energy-sources input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('disable');
            $(this).removeAttr('disabled');
        });

    }

    function hideResetButton() {
        if ($('#filter-by-products .checked').length > 0) {
            $('.tab-link button:eq(0)').show();

        }
        else {
            $('.tab-link button:eq(0)').hide();
        }


        if ($('#filter-by-status .checked').length > 0) {
            $('.tab-link button:eq(1)').show();

        } else {
            $('.tab-link button:eq(1)').hide();
        }


        if ($('#filter-by-energy-sources .checked').length > 0) {
            $('.tab-link button:eq(2)').show();
        }
        else {
            $('.tab-link button:eq(2)').hide();
        }

    }


    function hideHeading() {
        $('#headingfeatured').text('');
        $('.project-header').css('margin-bottom', '26px !important');

    }


    function resetddl() {

        $.ajax({
            type: "POST",
            timeout: 20000,
            url: '/base/ProjectSearch/getCountryProjectList',
            data: { lang: language },
            success: function (data) {

                //console.log(data);

                $("#Searchbykeyword").empty().selectBoxIt("refresh");
                $("#FilterbyProject").empty().selectBoxIt("refresh");

                var data = JSON.parse(data);

                $.each(data.country, function (i, item) {
                    $("#Searchbykeyword").data("selectBox-selectBoxIt").add({
                        value: item.countryValue, text: item.countryText, 'data-country': item.countryId
                    });

                });

                $.each(data.project, function (i, item) {
                    $("#FilterbyProject").data("selectBox-selectBoxIt").add({
                        value: item.projectValue, text: item.projectText, 'data-country': item.projectId
                    });

                });


            }, error: function (request, error) {

            }
        });


    }


    function resetkeywordfilter() {
        $('#txtSearchKey').val('')
    }


    function getprojectsfound(filtereddata) {

        $.ajax({
            type: "POST",
            url: '/base/ProjectSearch/getProjectsFound',
            data: { filtereddata: filtereddata },
            timeout: 10000,
            error: function (request, error) {

            },
            success: function (result) {

                $('.search-list').html('');
                $('.search-list').html(result);


            }
        });

    }




    function isotopefilters() {

        var filters = '';

        filteredProject = [];
        // Array populated with all the projects
        $.each($('.grid-item'), function (index, value) {

            filteredProject.push($(value).attr('id'));
        });

        switch (currentclickedfilter) {

            case 'keyword':

                var searchtext = $('#txtSearchKey').val();

                if (searchtext != '') {
                    $.ajax({
                        type: "POST",
                        timeout: 20000,
                        async: false,
                        url: '/base/ProjectSearch/getProjectsByKeyWords',
                        data: { lang: language, keyword: searchtext },
                        success: function (data) {

                            filteredProject = [];
                            var temp = data.split(',');

                            if (temp.length > 0) {

                                $.each($('.grid-item'), function (index2, value2) {
                                    for (i = 0; i < temp.length; i++) {
                                        if ($(value2).hasClass(temp[i].replace('.', ''))) {
                                            filteredProject.push($(value2).attr('id'));
                                        }
                                    }
                                });

                            }


                        }, error: function (request, error) {

                        }
                    });
                }

                break;

            case 'projects':

                //projects ddl
                if ($('#FilterbyProject').val() != "all") {
                    //Array populated with specific project

                    filteredProject = [];
                    $.each($('.grid-item'), function (index, value) {
                        if ($(value).hasClass($('#FilterbyProject').val())) {
                            filteredProject.push($(value).attr('id'));
                        }
                    });
                }


                break;

            case 'country':

                //Country ddl
                if ($('#Searchbykeyword').val() != "all") {
                    //Array populated with project from selected country
                    filteredProject = [];
                    $.each($('.grid-item'), function (index, value) {
                        if ($(value).hasClass($('#Searchbykeyword').val())) {
                            filteredProject.push($(value).attr('id'));
                        }
                    });
                }

                break;

            default:

                filteredProject = [];
                // Array populated with all the projects
                $.each($('.grid-item'), function (index, value) {

                    filteredProject.push($(value).attr('id'));
                });

                break;

        }

        var tempFilteredProject = [];
        var productsFilterArray = [];
        var statusFilterArray = [];
        var EnergySourcesFilterArray = [];
        var filteredItemsCount = 0;

        //Products Filter

        $.each($('#filter-by-products .checked'), function (index, item) {
            productsFilterArray.push($(this).attr('data-filter'))
        });

        $.each($('#filter-by-status .checked'), function (index, item) {
            statusFilterArray.push($(this).attr('data-filter'))
        });

        $.each($('#filter-by-energy-sources .checked'), function (index, item) {
            EnergySourcesFilterArray.push($(this).attr('data-filter'))
        });



        for (iter = 0; iter < filteredProject.length; iter++) {
            //Prducts filter
            for (j = 0 ; j < productsFilterArray.length ; j++) {

                if ($('#' + filteredProject[iter]).attr('data-product') != undefined && $('#' + filteredProject[iter]).attr('data-product') != null) {
                    if ($('#' + filteredProject[iter]).attr('data-product').indexOf(productsFilterArray[j]) > -1) {
                        if (tempFilteredProject.indexOf(filteredProject[iter]) == -1) {
                            tempFilteredProject.push(filteredProject[iter]);
                           
                        }
                    }
                }

            }

        }

        //re-assign filterprojects and tempFilteredProject
        if (tempFilteredProject.length > 0) {
            filteredProject = tempFilteredProject;

            if (statusFilterArray.length > 0 || EnergySourcesFilterArray.length >0)
            {
                tempFilteredProject = [];
            }

        }



        for (iter = 0; iter < filteredProject.length; iter++) {
            //status filter
            for (j = 0 ; j < statusFilterArray.length ; j++) {

                if ($('#' + filteredProject[iter]).attr('data-status') != undefined && $('#' + filteredProject[iter]).attr('data-status') != null) {
                    if ($('#' + filteredProject[iter]).attr('data-status').indexOf(statusFilterArray[j]) > -1) {

                        if (tempFilteredProject.indexOf(filteredProject[iter]) == -1) {
                            tempFilteredProject.push(filteredProject[iter]);
                          
                        }
                    }
                }
            }

        }

        //re-assign filterprojects and tempFilteredProject
        if (tempFilteredProject.length > 0) {
            filteredProject = tempFilteredProject;

            if (EnergySourcesFilterArray.length > 0) {
                tempFilteredProject = [];
            }
        }


        for (iter = 0; iter < filteredProject.length; iter++) {
            //energy filter
            for (j = 0 ; j < EnergySourcesFilterArray.length ; j++) {

                if ($('#' + filteredProject[iter]).attr('data-energysource') != undefined && $('#' + filteredProject[iter]).attr('data-energysource') != null) {
                    if ($('#' + filteredProject[iter]).attr('data-energysource').indexOf(EnergySourcesFilterArray[j]) > -1) {
                        if (tempFilteredProject.indexOf(filteredProject[iter]) == -1) {
                            tempFilteredProject.push(filteredProject[iter]);
                            
                        }
                    }
                }
            }
        }


        //if (tempFilteredProject.length > 0) {
        //    filteredProject = tempFilteredProject;
        //}

        if (productsFilterArray.length > 0 || statusFilterArray.length > 0 || EnergySourcesFilterArray.length >0) {
            filteredProject = tempFilteredProject;
        }

        console.log(tempFilteredProject)
        console.log(filteredProject)

        //Map markers update
        updateMapPointers(filteredProject.join(','), false);

        if (currentclickedfilter != '') {
            if ($('#Searchbykeyword').val() != "all" || $('#FilterbyProject').val() != "all" || $('#txtSearchKey').val() != "") {

                //disable filters click
                disablefilters();
            }
            else {
                resetdisabledfilters();
            }
        }



        if ($('#Searchbykeyword').val() == "all" && $('#FilterbyProject').val() == "all") {
            if (tempFilteredProject.length > 0 || $('#txtSearchKey').val() != "") {
                //get project found details
                getprojectsfound(filteredProject.join(','));
                $('.search-result').show();
            }
            else {
                $('.search-result').hide();
            }
        }

        else {
            $('.search-result').hide();
        }


        for (iter = 0; iter < filteredProject.length; iter++) {
            filteredProject[iter] = ".project_" + filteredProject[iter];
        }

        if (filteredProject.length > 0) {
            filters = filteredProject.join(", ");
        }
        else
        {
            filters = '.none';
        }

       

        //Hide/show the resert button
        hideResetButton();

        //Hide featured project heading
        hideHeading()

        if (tempFilteredProject.length > 0) {
            //scroll to projects after the filter
            $('html, body').animate({
                scrollTop: $("#filter-by-energy-sources").offset().top
            }, 2000);

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				 $('html, body').animate({
								scrollTop: 400
							}, 800, function () {
								// window.location.hash = hash;
							});
						}
				}
			
			
            

        //isotope filter
        $('.grid').isotope({ filter: filters });

    }


    //disable filter

    function disablefilters() {

        var checkboxes = [];
        $.each($('.btn-filterbox'), function (index2, value2) {

            for (i = 0; i < filteredProject.length; i++) {
                if ($('#' + filteredProject[i]).attr('data-product') == $(this).attr('data-filter') ||
                $('#' + filteredProject[i]).attr('data-status') == $(this).attr('data-filter') || $('#' + filteredProject[i]).attr('data-energysource') == $(this).attr('data-filter')) {

                    checkboxes.push($(this).find('input').attr('id'));
                }

            }

        });

        $.each($('.btn-filterbox'), function (index, value) {

            if (checkboxes.indexOf($(this).find('input').attr('id')) > -1) {
                $(this).find('input').removeAttr('disabled');
                $(this).removeClass('disable');


            }
            else {
                $(this).addClass('disable');
                $(this).find('input').attr('disabled', 'disabled');
            }

        });

    }



    /* Reset Buttons */
    $('#products-reset').click(function (e) {
        e.preventDefault();
        $('#filter-by-products input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('checked');


        });

        isotopefilters();

    });

    $('#status-reset').click(function (e) {
        e.preventDefault();
        $('#filter-by-status input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('checked');

        });

        isotopefilters();

    });

    $('#energy-reset').click(function (e) {
        e.preventDefault();
        $('#filter-by-energy-sources input[type=checkbox]').each(function () {
            this.checked = false;
            $(this).closest('.tab-content').find('.btn-filterbox').removeClass('checked');

        });

        isotopefilters();

    });


    /* Isotope Flters */
    if ($('.grid').isotope) {

        $('.grid').isotope({
            itemSelector: '.grid-item',
            filter: '.featuredprojects'
        });
    }
    // filter items on button click - products,status,energy sources
    $('.filter-button-group').on('click', '.f-list', function (e) {

        $('.filter-button-group li').removeClass('active');

    });


    /* Filter Checkbox */
    $(".btn-filterbox input[type=checkbox]").on('click', function (e) {

        $(this).parent().toggleClass("checked");
        isotopefilters();


        $('.search-list').on('click', 'li', function (e) {

            var temp = [];
            var currentfilter = $(this).attr('data-filter');

            if (currentfilter == ".all") {
                temp = filteredProject;
            }
            else {
                for (i = 0 ; i < filteredProject.length; i++) {
                    if ($(filteredProject[i]).attr('class').indexOf(currentfilter.replace('.', '')) > -1) {
                        temp.push(filteredProject[i]);
                    }
                }
            }


            if (temp.length > 0) {
                $('.grid').isotope({ filter: temp.join(',') });
            }

        });

    });


    //country and projects dropdown change
    $(".projectsddl").change(function (e) {

        var projectId = $(this).find(':selected').attr('data-project');
        currentclickedfilter = "projects";

        resetfilters();
        resetdisabledfilters();
        resetkeywordfilter();
        isotopefilters();

    });

    $(".countryddl").change(function (e) {

        currentclickedfilter = "country";

        resetfilters();
        resetdisabledfilters();
        resetkeywordfilter();


        var countryId = $(this).find(':selected').attr('data-country');

        if (countryId == null) {
            countryId = 'all';
        }

        $.ajax({
            type: "POST",
            timeout: 20000,
            url: '/base/ProjectSearch/getProjectsByCountry',
            data: { lang: language, countryid: countryId },
            success: function (data) {

                $("#FilterbyProject").empty().selectBoxIt("refresh");

                var countrydata = JSON.parse(data);

                $.each(countrydata, function (i, item) {

                    if (i == 0) {
                        $("#FilterbyProject").data("selectBox-selectBoxIt").add({
                            value: item.projectValue, text: item.projectText, 'data-project': item.projectId, selected: 'selected'
                        });
                    }
                    else {
                        $("#FilterbyProject").data("selectBox-selectBoxIt").add({
                            value: item.projectValue, text: item.projectText, 'data-project': item.projectId
                        });
                    }



                });

            }, error: function (request, error) {

            }
        });


        isotopefilters();

        //updateMapPointers('country', countryId,null);

    });

    $('#btnSearch').on('click', function (e) {

        e.preventDefault();
        currentclickedfilter = "keyword";
        isotopefilters();

    });


    //View all click
    $('#viewall,#resetall').click(function (e) {
        //var filterValue = $(this).attr('data-filter');

        e.preventDefault();

        currentclickedfilter = "";
        resetfilters();
        resetdisabledfilters();
        resetkeywordfilter();
        resetddl();
        isotopefilters();

        if (e.target.id == "resetall") {
            updateMapPointers("", true);
            hideResetButton();
        }

        hideHeading();

    });


    /* Mobile Tabs */
    if ($(window).width() <= 767) {
        $('ul.tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        })
    }

    //Top button

    $(window).scroll(function () {

        if ($(window).scrollTop() >= 600) {
            $('.top-scroll').css('display', 'block');
        }
        else {
            $('.top-scroll').css('display', 'none');
        }


    });

    $(".smooth-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // window.location.hash = hash;
            });
        }
    });



    /* Select Box */
    $(function () {

        if ($("#Searchbykeyword") != null & $("#FilterbyProject") != null) {
            $("#Searchbykeyword").selectBoxIt({
                autoWidth: false,
                //defaultText: "Filter by Country",
                downArrowIcon: "cust-arrow-down"

            });
            $("#FilterbyProject").selectBoxIt({
                autoWidth: false,
                //defaultText: "Filter by Project",
                downArrowIcon: "cust-arrow-down"

            });
        }

    });


    //Filter request from Project details page - Filter click
    $(document).ready(function ()
    {
        var filterParam = '';

        if (window.location.href.indexOf('?') > 0 && window.location.href.indexOf('=') > 0) {

            resetfilters();
            resetdisabledfilters();
            resetkeywordfilter();
            resetddl();
            resetkeywordfilter();

            filterParam = decodeURI(window.location.href.split('=')[1]);
            setTimeout(function () {
                $('.btn-filterbox').each(function () {
                    if ($(this).attr("data-filter") == filterParam) {
                        $(this).find('input').click();
                    }
                });
            }, 1000);
        }
    });


    //Invidual project filter icon click
    $(document).ready(function () {

        $('.countryname img').click(function () {

            resetfilters();
            resetdisabledfilters();
            resetkeywordfilter();
            resetddl();
            resetkeywordfilter();


            var filterParam = $(this).attr("data-filter");
            $('.btn-filterbox').each(function () {
                if ($(this).attr("data-filter") == filterParam) {
                    $(this).find('input').click();
                }
            });
        });
    });



    google.charts.load("current", { packages: ["corechart"] });
    // Draw the pie chart for Sarah's pizza when Charts is loaded.
    // google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var Id = $("iframe#Widget_assetpiechart").attr('pram-value');//$("iframe").contents().find("#hPieChartNodeId").val();
        var ln = "en";
        $.ajax({
            type: "POST",
            url: '/base/PieChartHandler/GenerateValues',
            data: { id: Id },
            timeout: 12000,
            error: function (request, error) {

            },
            success: function (result) {

                var objParam = JSON.parse(result);

                var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  [objParam.PieCategories[0], objParam.PowerValues[0]],
                  [objParam.PieCategories[1], objParam.PowerValues[1]],
                  [objParam.PieCategories[2], objParam.PowerValues[2]],
                ]);



                var data1 = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  [objParam.PieCategories[0], objParam.WaterValues[0]],
                  [objParam.PieCategories[1], objParam.WaterValues[1]],
                  [objParam.PieCategories[2], objParam.WaterValues[2]],
                ]);

                powerchart(data);
                waterchart(data1);
                $('iframe#Widget_assetpiechart')[0].style.height = $('iframe#Widget_assetpiechart')[0].contentWindow.document.body.offsetHeight + 20 + 'px';
                if (ln == 'ar') {
                    if (false || !!document.documentMode) {
                        $('#donutchart-1').find('text').css("font-family", "Tahoma")
                        $('#donutchart-2').find('text').css("font-family", "Tahoma");
                    }
                    else {
                        $('#donutchart-1').find('text').css("font-family", "Cairo")
                        $('#donutchart-2').find('text').css("font-family", "Cairo");
                    }
                }
            }
        });


    }

    function powerchart(data) {
        //var data = google.visualization.arrayToDataTable([
        //  ['Task', 'Water'],
        //  ['Operational', 90],
        //  ['Under Construction', 10],
        //  ['Advanced Development', 10],

        //]);
        var options = {
            title: '',
            titleTextStyle: {
                color: '#343d47',
                fontName: 'Open Sans',
                fontSize: '14',
                bold: 'true',
                italic: 'false'
            },
            backgroundColor: '#f6f6f6',
            legend: 'none',
            pieHole: 0.4,
            width: 135,
            height: 135,
            'chartArea': { 'width': '100%', 'height': '90%' },
            colors: ['#3ead48', '#f6ce3c', '#004a87']
        };
        var chart = new google.visualization.PieChart($("iframe").contents().find("#power")[0]);
        chart.draw(data, options);
    }
    function waterchart(data) {
        //var data = google.visualization.arrayToDataTable([
        //  ['Task', 'Power'],
        //  ['Operational', 50],
        //  ['Under Construction', 39],
        //  ['Advanced Development', 11],

        //]);
        var options = {
            title: '',
            titleTextStyle: {
                color: '#343d47',
                fontName: 'Open Sans',
                fontSize: '14',
                bold: 'true',
                italic: 'false'
            },
            backgroundColor: '#f6f6f6',
            legend: 'none',
            pieHole: 0.4,
            width: 135,
            height: 135,
            'chartArea': { 'width': '100%', 'height': '90%' },
            colors: ['#3ead48', '#f6ce3c', '#004a87']
        };
        var chart = new google.visualization.PieChart($("iframe").contents().find("#water")[0]);
        chart.draw(data, options);
    }


    //Update the pointers on Map
    function updateMapPointers(filtereddata, initialload) {
        try {

            var tempfiltereddata = '';

            if (initialload == true) {
                tempfiltereddata = ''
            }
            else {
                tempfiltereddata = filtereddata;
            }


            $.ajax({
                type: "POST",
                url: '/base/ProjectMapHandler/GenerateCordinates',
                data: { filtereddata: tempfiltereddata, initialload: initialload },
                timeout: 10000,
                error: function (request, error) {

                },
                success: function (result) {
                    var data = JSON.parse(result);

                    var map;
                    var bounds = new google.maps.LatLngBounds();
                    var mapOptions = {
                        // How zoomed in you want the map to start at (always required)
                        zoom: 5,
                        zoomControl: true,
                        // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(0, 0), // New York

                        // How you would like to style the map. 
                        // This is where you would paste any style found on Snazzy Maps.
                        styles: [{ "featureType": "all", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "color": "#67809d" }] }, { "featureType": "all", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "off" }, { "color": "#9893ec" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#2f343b" }, { "weight": 1 }] }, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.country", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.neighborhood", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "color": "#67809d" }, { "visibility": "off" }] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [{ "color": "#12dd76" }] }, { "featureType": "landscape", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape.natural.landcover", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.terrain", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station.airport", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station.bus", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station.rail", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#2f343b" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#343d47" }] }, { "featureType": "water", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }],
                        disableDefaultUI: true
                    };

                    // Display a map on the page
                    map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    map.setOptions({ minZoom: 2, maxZoom: 16 });
                    map.setTilt(45);

                    var markers, markerArray = [], tempMarkerArray = [];

                    // Multiple Markers
                    for (i = 0; i < data.ProjectTitle.length; i++) {
                        markers = [data.ProjectTitle[i].ProjectTitle, data.MapLatitude[i], data.MapLongitutde[i],
                            data.ProjectTitle[i].NodeId, data.ProjectTitle[i].ProjectUrl, data.ProjectTitle[i].Country, data.ProjectTitle[i].Filter];
                        markerArray.push(markers);

                    }

                    // Display multiple markers on a map
                    var infoWindow = new google.maps.InfoWindow(), marker, i;
                    var markerImageUrl = '';


                    if (initialload == true) {
                        markerImageUrl = '/images/icon/google-map-pin.png';
                    }
                    else {
                        markerImageUrl = '/images/icon/searched-pin.png';
                    }

                    // Loop through our array of markers & place each one on the map  
                    for (i = 0; i < markerArray.length; i++) {

                        var markerTitle = '';
                        var labelTitle = '';
                        var filterImages = '';
                        var contentHtml = '';
                        var horizontal = -5;
                        var verticle = 8;

                        if (initialload == true) {
                            //country
                            markerTitle = markerArray[i][5].toUpperCase();
                            labelTitle = markerArray[i][5].toUpperCase()
                            verticle = 2;
                            horizontal = 26;

                            if (language == "ar") {
                                //UAE Node Id
                                if (markerArray[i][5].toUpperCase() == "الإمارات العربية المتحدة") {
                                    verticle = 45;
                                }
                                
                            }
                        }
                        else {
                            //projects
                            markerTitle = markerArray[i][0];
                            labelTitle = ' ';
                        }

                        


                        var markerIcon = {
                            url: markerImageUrl,
                            labelOrigin: new google.maps.Point(verticle, horizontal)
                        };


                        var position = new google.maps.LatLng(markerArray[i][1], markerArray[i][2]);
                        bounds.extend(position);


                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            //title: markerTitle,
                            label: {
                                text: labelTitle,
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: "bold",
                                fontFamily: "Open Sans, sans-serif"
                            },
                            icon: markerIcon,
                            url: markerArray[i][4]
                        });

                        tempMarkerArray.push(marker);

                        //marker infowindow html with filter icons
                        if (initialload != true) {

                            if (markerArray[i][6] != null) {
                                for (j = 0; j < markerArray[i][6].length; j++) {
                                    filterImages = filterImages + "<img src='" + markerArray[i][6][j] + "' class='img-ico' />";
                                }
                                contentHtml = "<p>" + markerTitle + "</p>" + filterImages;
                            }

                        }


                        google.maps.event.addListener(marker, 'mouseover', (function (marker, contentHtml, infoWindow) {
                            return function () {
                                //only for projects marker
                                if (initialload != true) {
                                    infoWindow.setContent(contentHtml);
                                    infoWindow.open(map, marker);
                                    $('.gm-style-iw').parent().addClass('custom-iw');
                                }
                            };
                        })(marker, contentHtml, infoWindow));


                        google.maps.event.addListener(marker, 'mouseout', (function (marker, contentHtml, infoWindow) {
                            return function () {
                                //only for projects marker
                                if (initialload != true) {
                                    infoWindow.close();
                                }
                            };
                        })(marker, contentHtml, infoWindow));


                        //tempMarkerArray.push(marker);
                        // Allow each marker to have an info window    
                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {

                                if (initialload == true) {
                                    $('#Searchbykeyword').selectBoxIt('selectOption', marker.label.text.toLowerCase().replace(' ', '-'));
                                    $('#Searchbykeyword').selectBoxIt("refresh");
                                }
                                else {
                                    window.location.href = markerArray[i][4];
                                }

                            }
                        })(marker, i));

                        // Automatically center the map fitting all markers on the screen
                        map.fitBounds(bounds);
                    }


                    //only for projects
                    if (initialload != true) {

                        // Add a marker clusterer to manage the markers.

                        var clusterStyles = [
                                            {
                                                textColor: '#343E47', url: '/images/icon/m1.png', height: 50, width: 50, backgroundPosition: "-3px -3px"
                                            },
                                           {
                                               textColor: '#343E47', url: '/images/icon/m1.png', height: 50, width: 50, backgroundPosition: "-3px -3px"
                                           },
                                           {
                                               textColor: '#343E47', url: '/images/icon/m1.png', height: 50, width: 50, backgroundPosition: "-3px -3px"
                                           }
                        ];

                        var markerCluster = new MarkerClusterer(map, tempMarkerArray, { imagePath: '/images/icon/m', maxZoom: 16, styles: clusterStyles });

                        google.maps.event.addListener(markerCluster, 'clusterclick', function (event) {

                        });

                    }


                    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
					
					 //Checking if tab to set the zoom level
                    var zoomlevel = 3;

                    if (window.innerWidth <= 768) {

                        zoomlevel = 2;
                    }
					
                    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {

                        //changing zoom value only for country change
                        if ($('#Searchbykeyword').val() != 'all') {
                            this.setZoom(zoomlevel);
                        }
                        else {
                            this.setZoom(zoomlevel);
                        }

                        google.maps.event.removeListener(boundsListener);
                        //setTimeout(function () { google.maps.event.removeListener(boundsListener) }, 2000);
                    });

                    google.maps.event.addListener(map, 'zoom_changed', function (e) { });

                }
            });
        } catch (e) {
            
             console.log(e);

        }
    }



});