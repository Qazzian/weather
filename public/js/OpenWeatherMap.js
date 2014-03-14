
(function(global){
    "use strict";

    var owmUrl = 'http://api.openweathermap.org/data/2.5/',
        defaultData = {
            lang: 'en',
            units: 'metric'
        };

       var debugData = {"coord":{"lon":74.93,"lat":21.09},"sys":{"message":0.1418,"country":"India","sunrise":1394759361,"sunset":1394802567},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01d"}],"base":"cmc stations","main":{"temp":31.913,"temp_min":31.913,"temp_max":31.913,"pressure":977.17,"sea_level":1023.46,"grnd_level":977.17,"humidity":35},"wind":{"speed":1.42,"deg":189.504},"clouds":{"all":0},"dt":1394801351,"id":1278931,"name":"Lon","cod":200};


    global.OpenWeatherMap = function(){
        var self = this;
        self.inCall = false;

        this.call = function(endPoint, data, callback){
            self.inCall = true;

            var jqXHR = $.getJSON(owmUrl+endPoint, data)
                .done(function(data, status, jqXHR){
                    if (typeof callback === 'function') {
                        callback(null, data);
                    }
                }).fail(function(jqXHR, status, err){
                    if (typeof callback === 'function') {
                        callback(err, null);
                    }
                }).always(function(){
                    self.inCall = false;
                });
            return jqXHR;
        };

        this.citySearch = function(city, callback){
            if (!city.match(',.+')) {
                city += ',UK';
            }
            var data = $.extend({}, defaultData, {q: city, type: 'like'});
            return this.call('find', data, callback);
        };

        this.getCity = function(cityId, callback) {
            var data = $.extend({}, defaultData, {id: cityId});
//            return callback(null, debugData);
            return this.call('weather', data, callback);
        }

    };

})(this);