// add console.log to check to see if code is working
console.log("working");

// create tile layer to be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: Api_Key
});

// create dark view tile layer as an option for the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: Api_Key
});


// create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// create an earthquake layer for the map
let earthquakes = new L.layerGroup();

// define an object that contains the overlays, this will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// create the map object with center and zoom level
    // assign map variable to L.map() object
    // mapid references id tag in <div> element
    // setView([lat, long, zoom]) - zoom 0-18
let map = L.map('mapid', {
        center: [39.5, -98.5],
        zoom: 3,
        layers: [streets]
    });
    // pass maps layers into the layers control and layers control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// grabbing GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // returns style data for each earthquakes plotted on the map
    // pass magnitude of earthquake in the function to calculate radius
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    // function determines the color of the circle based on magnitude of the earthquake
    function getColor(magnitude) {
        if (magnitude > 5){
            return "#ea2c2c";
        }
        if (magnitude > 4){
            return "#ea822c";
        }
        if (magnitude > 3){
            return "#ee9c00";
        }
        if (magnitude > 2){
            return "#eecc00";
        }
        if (magnitude > 1){
            return "#d4ee00";
        }
        return "#98ee00";
    } 
    // determines radius of earthquake marker based on magnitude
    // earthquakes with magnitude of 0 will be plotted with radius of 1
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    };
    console.log(data);
    
    // creating a GeoJSON layer with the retrieved data
    L.geoJSON(data,{
        // turn each feature to a circle marker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        // set style for each circleMarker using the styleInfo function
        style:styleInfo,
        // create popup for each circleMarker to display the magnitude and location of the earthquake after marker has been created and styled
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
    }).addTo(earthquakes);

    // add earthquakes layer to map
    earthquakes.addTo(map);
});