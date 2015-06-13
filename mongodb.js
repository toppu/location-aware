
db.map.insert({coordinate: {latitude:23.2342987, longitude:90.20348}});
db.map.insert({coordinate: {latitude:23.3459835, longitude:90.92348}});
db.map.insert({coordinate: {latitude:23.6743521, longitude:90.30458}});
db.map.ensureIndex({coordinate: '2d'});

db.restaurants.insert({name:"McDowells", serves: "Fast Food", "location": [23.755235, 90.375739]});
db.restaurants.insert({name:" Bucksters Coffee", serves: "Fast Food", "location": [23.755339, 90.375408]});
db.restaurants.insert({name:"Dinkin Donuts", serves: "Fast Food", "location": [23.752538, 90.382792]});
db.restaurants.ensureIndex({location:"2d"});