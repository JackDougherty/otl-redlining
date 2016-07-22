// Edit the center point and zoom level
var map = L.map('map', {
  center: [41.76, -72.69],
  zoom: 12,
  scrollWheelZoom: false
});
// // create custom pane for town layer, set below overlay zIndex 400, make non-clickable
// map.createPane('towns');
// map.getPane('towns').style.zIndex = 350;
// map.getPane('towns').style.pointerEvents = 'none';

// Edit links to your GitHub repo and data source credit
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/otl-redlining" target="_blank">sources and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

L.control.scale().addTo(map);

// town outline layer, with custom pane set to lower non-clickable layer
// $.getJSON("src/ct-towns-simple.geojson", function (data) {
//   var geoJsonLayer = L.geoJson(data, {
//     style: function (feature) {
//       return {
//         'color': 'red',
//         'weight': 2,
//         fillOpacity: 0
//       }
//     },
//     pane: 'towns'
//   }).addTo(map);
// });

// redlining layer
$.getJSON("map.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});


// $.getJSON('map.geojson', function(data) {
//   var geojson = L.geoJson(data, {
//     onEachFeature: function (feature, layer) {
//       (function(layer, properties) {
//         // This creates numerical icons to match the ID numbers
//         // OR remove the next 6 lines for default blue Leaflet markers
//         var numericMarker = L.ExtraMarkers.icon({
//           icon: 'fa-number',
//           number: feature.properties['id'],
//           markerColor: 'blue'
//         });
//         layer.setIcon(numericMarker);

function onEachFeature(feature, layer) {
  var popupText = "<b>" + feature.properties.name + "</b><br />";
    //  + "&quot;" + feature.properties.text + "&quot; -- " + feature.properties.date + "<br />"
    //  + "<a href='https://jackdougherty.github.io/otl-covenants/pdf/" + feature.properties.name + ".pdf' target='_blank'>View property deed (PDF opens new tab)</a>";
  layer.bindPopup(popupText);
}

function style(feature) {
  return {
    fillColor: 'purple',
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.7
  };
}

// places a star on state capital of Hartford, CT
// var starIcon = L.icon({
//   iconUrl: 'src/star-18.png',
//   iconRetinaUrl: 'src/star-18@2x.png',
//   iconSize: [18, 18]
// });
// L.marker([41.7646, -72.6823], {icon: starIcon}).addTo(map);
