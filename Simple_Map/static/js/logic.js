// add console.log to check to see if code is working
console.log("working");

// create the map object with center and zoom level
    // assign map variable to L.map() object
    // mapid references id tag in <div> element
    // setView([lat, long, zoom]) - zoom 0-18
let map = L.map('mapid').setView([40.7, -94.5], 4);

// create tile layer to be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: Api_Key
});

// add 'graymap' tile layer to the map
streets.addTo(map);


