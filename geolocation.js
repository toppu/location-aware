var mapContainer = document.getElementById('map');
var map;

function init() {

    //Google map settings (zoom level, map type etc.)
    var mapOptions = {
        zoom: 16,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //map will be drawn inside the mapContainer
    map = new google.maps.Map(mapContainer, mapOptions);
    detectLocation();

}

function detectLocation() {

    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000,
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

//callback function of getCurrentPosition(),
//pinpoints location on Google map
function drawLocationOnMap(position) {

    //get latitude/longitude from Position object
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var msg = "Your location: Latitude "+lat+", Longitude "+lon;

    //mark current location on Google map
    var pos = new google.maps.LatLng(lat, lon);
    var infoBox = new google.maps.InfoWindow({
        content: msg
    });
    var marker = new google.maps.Marker({
        position: pos,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
       infoBox.open(map, marker);
    });
    map.setCenter(pos);

}

function handleError() {

    alert("Sorry, couldn't get your geolocation :-(");

}

google.maps.event.addDomListener(window, 'load', init);
//window.onload = init;