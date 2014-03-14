/**
 * Created by Ian on 14/03/14.
 */


(function(global){
    "use strict";

    var owm,
        cityListView,
        cityView;

    $('document').ready(function(){
        init();
    });

    function init(){
        owm = new OpenWeatherMap();
        cityListView = new CityList();
        cityView = new CityView();

        $(document).on('select:city', onCitySelected);

        $('.cityPicker').on('submit', onSearch);
    }

    /**
     * Event handlers
     */
    function onSearch(event){
        event.preventDefault();

        var cityName = $('#cityPickerSearch').val();

        if (!cityName || cityName.length < 3) {
            return;
        }

        owm.citySearch(cityName, onSearchResponse);
    }

    function onSearchResponse(err, data){
        if (err || !data) {
            cityView.clear();
        }
        else if (data.id){
            cityView.render(data);
        }
        else if (data.count && data.count > 0) {
            cityListView.render(data);
        }
        else {
            noResults();
        }
    }

    function onCitySelected(event, cityId){
        owm.getCity(cityId, onCityResponse);
    }

    function onCityResponse(err, data){
        cityView.render(data);
    }

    function noResults(){
        console.log('There were no results for that search.');
    }


})(this);