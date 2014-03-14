/**
 * Created by Ian on 14/03/14.
 */

(function(global){
    "use strict";

    var CityView = global.CityView = function(){
        var self = this,
            template = $('#weatherDisplay').html(),
            placeholder = $('.weatherResultsPlaceholder');

        function BuildContext(data){
            var context = {
                cityName: data.name,
                lastUpdated: new Date(data.dt),
                main: $.extend({}, data.main)
            }

            for (var k in context.main) {
                context.main[k] = parseInt(context.main[k], 10);
            }

            if (data.clouds && data.clouds.hasOwnProperty('all')) {
                context.clouds = parseInt(data.clouds.all, 10);
            }

            if (data.weather && data.weather.length > 0) {
                context.weather = data.weather[0];
            }

            if (data.wind) {
                context.wind = {
                    speed: parseInt(data.wind.speed, 10),
                    deg: parseInt(data.wind.deg, 10)
                }
            }

            return context;
        }

        this.render = function(data){
            var context = BuildContext(data),
                out = Mustache.render(template, context);

            console.log('context: ', context, '\ntemplate: ', template, '\noutput: ', out);
            placeholder.html(out);


        };

        this.clear = function(){

        };

    }


})(this);