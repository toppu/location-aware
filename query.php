<?php
//echo phpinfo();
error_reporting(E_ALL);
echo extension_loaded("mongo");
ini_set('display_errors', '1');

// MongoDB configuration
$dbhost = 'localhost';
$dbname = 'geolocation';

$lat = (float)$_GET['lat'];
$lon = (float)$_GET['lon'];

// Connect to MongoDB
$m = new MongoClient("mongodb://$dbhost");
$db = $m->$dbname;

// Get the restaurants collection
$c_geolocation = $db->restaurants;

// Query the collection with given latitude and longitude
$q = array('location' => array('$near' => array($lat, $lon)));

$cursor = $c_geolocation->find($q);
$response = array();

while($doc = $cursor->getNext()) {
  $obj = array(
    'name' => $doc['name'],
    'serves' => $doc['serves'],
    'latitude' => $doc['location'][0],
    'longitude' => $doc['location'][1]
  );
  array_push($response, $obj);
}

echo json_encode($response);