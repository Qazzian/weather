/**
 * Created by Ian on 14/03/14.
 */



module("API Calls");

test('API Ready', function(){
    ok(window.OpenWeatherMap, 'Have an api handler');
});

asyncTest('CitySearch', function(){
    expect(2);
    var owm = new OpenWeatherMap();

    owm.citySearch('Lond', function(err, data){
        ok(!err, 'There should not be any errors from the api.');
        ok(data, 'Expecting some data from the api.');
        console.log('City search result: ', data);
        start();
    })


});