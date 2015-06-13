var mapContainer = document.getElementById('map');
var map;

function init() {
    //Google map settings (map type, zoom level etc.)
    var mapOptions = {
        zoom: 4,
        disableDefaultUI: true,
        mapTypedId: google.maps.MapTypeId.ROADMAP
    };

    //draw map inside the mapContainer
    map = new google.maps.Map(mapContainer, mapOptions);
    detectLocation();
}

function detectLocation() {
    var options = {
        enableHighAccuracy: true,
        timeout: 30000
    };

    //check if the browser supports geolocation
    if (window.navigator.geolocation) {
        //get current position
        window.navigator.geolocation.getCurrentPosition (
            drawLocationOnMap,
            handleError,
            options);
    } else {
        alert("Sorry, your browser doesn't seem to support geolocation :-(");
    }
}

function drawLocationOnMap(position) {
    //get latitude/longitude from Position object
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var msg = "You are here";

    //mark current location on Google map
    var pos = new google.maps.LatLng(lat, lon);
    map.setCenter(pos);

    var infoBox = new google.maps.InfoWindow({
        map: map,
        position:pos,
        content: msg
    });

    //draw a Google Map Marker on current location
    var myMarker = new google.maps.Marker({
        map: map,
        position: pos
    });
    getNearbyRestaurants(lat, lon);
}

function getNearbyRestaurants(lat, lon) {
    $.ajax({
        url: 'query.php?lat='+lat+'&lon='+lon,
        dataType: 'json',
        success: ajaxSuccess
    })
}

function ajaxSuccess(data) {
   //callback function for ajax
   //marks each nearby restaurant on Google map
    data.forEach(function(restaurant){
        var pos = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
        var marker = new google.maps.Marker({
            map: map,
            position: pos
        });
    })

}

function handleError() {
    alert("Sorry, couldn't get your geolocation :-(");
}

window.onload = init;