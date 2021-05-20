// add console.log to check to see if code is working
console.log("working");

// create the map object with center and zoom level
    // assign map variable to L.map() object
    // mapid references id tag in <div> element
    // setView([lat, long, zoom]) - zoom 0-18
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// coordinates for each point to be used in the line
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];

// create a polyline using the line coordinates and make the line red
L.polyline(line, {
    color: "yellow"
}).addTo(map);

// add a marker to the map for LA, California
    // circle() function will place circle on the map at given coordinates
    // adjust radius so circle is bigger
//let marker = L.circle([34.0522, -118.2437],{
    //radius: 100
//}).addTo(map);

// circleMarker() measures radius of the circle in pixels - default radius = 10
//let marker = L.circleMarker([34.0522, -118.2437],{
    //radius: 300,
    //color: "black",
    //fillColor: '#ffffa1'
//}).addTo(map);

// get data from cities.js
//let cityData = cities;

// loop through the cities array and create a marker for each city
// cityData.forEach(function(city){
   // console.log(city)
    // change marker for each city to a circle that has a radius equivalent to city population
        //L.marker(city.location)
   // L.circleMarker(city.location, {
        // dividw city population by 100,000 so it fits on the map
       // radius: city.population/200000,
       // color: "orange",
       // fillColor: '#ffffa1',
       // weight: 4
  //  })
    // retrieve the name of the city, state and population
        // use toLocaleString() to get thousands seperator in population
  //  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  //  .addTo(map);
//});

// create tile layer to be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: Api_Key
});

// add 'graymap' tile layer to the map
streets.addTo(map);
