// add console.log to check to see if code is working
console.log("working");

// create tile layer to be the background of the map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Light: light,
    Dark: dark
};

// create the map object with center and zoom level
    // assign map variable to L.map() object
    // mapid references id tag in <div> element
    // setView([lat, long, zoom]) - zoom 0-18
let map = L.map('mapid', {
        center: [44.0, -80.0],
        zoom: 2,
        layers: [dark]
    });
    // pass maps layers into the layers control and layers control to the map
L.control.layers(baseMaps).addTo(map);

// accessing the airport GeoJson URL
let torontoData = "https://raw.githubusercontent.com/vanessamignelli/Mapping_Earthquakes/main/torontoRoutes.json";

// create style for the lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
};

// grabbing GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});