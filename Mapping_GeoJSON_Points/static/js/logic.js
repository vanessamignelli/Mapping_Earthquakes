// add console.log to check to see if code is working
console.log("working");



// add GeoJSON data
//let sanFranAirport = {
   // "type": "FeatureCollection", "features":[{
      //  "type":"Feature",
      //  "properties":{
         //   "id":"3469",
          //  "name": "San Francisco International Airport",
         //   "city": "San Francisco",
        //    "faa": "SFO",
         //   "icao": "KSFO",
        //    "alt": "13",
        //    "tz-offset": "-8",
        //    "dst": "A",
        //    "tz":"America/Los_Angeles"},
        //    "geometry":{
         //       "type": "Point",
       //         "coordinates":[-122.375,37.61899948120117]
        //    }
   // }]
//};

// grabbing geojson data
// L.geoJSON(sanFranAirport,{
    // turn each feature into a marker on the map
  //  pointToLayer: function(feature, latlng) {
    //    console.log(feature);
       // return L.marker(latlng)
       // .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", United States </h3>");
   // }
//}).addTo(map);

// grabbing geojson data
//L.geoJSON(sanFranAirport,{
    // turn each feature into a marker on the map
   // onEachFeature: function(feature, layer) {
       // console.log(layer);
       // layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", United States </h3>");
   // }
//}).addTo(map);

// create tile layer to be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: Api_Key
});

// create dark view tile layer as an option for the map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: Api_Key
});

// add 'graymap' tile layer to the map
// streets.addTo(map);

// create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// create the map object with center and zoom level
    // assign map variable to L.map() object
    // mapid references id tag in <div> element
    // setView([lat, long, zoom]) - zoom 0-18
let map = L.map('mapid', {
        center: [30, 30],
        zoom: 2,
        layers: [streets]
    });
    // pass maps layers into the layers control and layers control to the map
L.control.layers(baseMaps).addTo(map);

// accessing the airport GeoJson URL
let airportData = "https://raw.githubusercontent.com/vanessamignelli/Mapping_Earthquakes/main/majorAirports.json";

// grabbing GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJSON(data).addTo(map);
});