/**
 * Created by Ian on 14/03/14.
 */

(function(global){
    "use strict";

    global.CityList = function(){
        var self = this,
            template = $('#citySelector').html(),
            placeholder = $('.cityListPlaceholder');

        this.onCitySelect = function(event){
            event.preventDefault();
            var cityId = $(event.target).attr('data-city-id');
            $(document).trigger('select:city', cityId);
            self.hide();
        };

        this.render = function(data){
            var context = {
                cities: data.list
            };
            placeholder.html(Mustache.render(template, context));
            placeholder.show();
        };

        this.hide = function(){
            placeholder.hide().html('');
        };

        placeholder.on('click', 'a', $.proxy(self.onCitySelect, self));
    };


})(this);