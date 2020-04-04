// Edit the center point and zoom level
var map = L.map('map', {
  center: [41.76, -72.69],
  zoom: 12,
  scrollWheelZoom: false
});

// set bounds for geocoder
var minLatLng = [41.711356, -72.802452];
var maxLatLng = [41.813259, -72.567709];
var bounds = L.latLngBounds(minLatLng, maxLatLng);

var choroplethLayer;
var choroplethOpacity = 0.7;

// create custom pane for town layer, set to display below overlay zIndex 400
map.createPane('towns');
map.getPane('towns').style.zIndex = 350;

new L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

var searchControl = L.esri.Geocoding.geosearch({
  placeholder: "Search the Hartford area...",
  searchBounds: bounds
}).addTo(map);

// Prepend attribution to "Powered by Esri"
map.attributionControl.setPrefix('View\
  <a href="https://github.com/ontheline/otl-redlining" target="_blank">sources and code on GitHub</a>,\
  created with ' + map.attributionControl.options.prefix);

 var results = L.layerGroup().addTo(map);

 searchControl.on('results', function (data) {
   results.clearLayers();
   for (var i = data.results.length - 1; i >= 0; i--) {
     results.addLayer(L.marker(data.results[i].latlng));
   }
 });

L.control.scale().addTo(map);

// town outline layer, with custom pane set to display at lower z-index
$.getJSON("src/ct-towns-simple.geojson", function (data) {
  L.geoJson(data, {
    style: function (feature) {
      return {
        'color': 'gray',
        'weight': 1,
        fillOpacity: 0
      }
    },
    onEachFeature: function( feature, layer) {
      var popupText = "<b>" + feature.properties.town + "</b>";
      layer.bindPopup(popupText);
    },
    pane: 'towns'
  }).addTo(map);
});

var choroplethStyle = function(f) {
  var grade2color = {
    'A': 'green',
    'B': '#3399ff', // light blue
    'C': 'yellow',
    'D': 'red',
  }

  return {
    'color': 'black',
    'weight': 1,
    'fillColor': grade2color[ f.properties.grade ] || 'gray', // gray if no data
    'fillOpacity': choroplethOpacity
  }
}

// redlining polygons with fillColor
$.getJSON("polygons.geojson", function (data) {
  choroplethLayer = L.geoJson(data, {
    style: choroplethStyle,
    onEachFeature: function( feature, layer) {
      var popupText = "<b>Area " + feature.properties.name + " - " + feature.properties.town + "</b><br />"
         + "<a href='https://ontheline.github.io/otl-redlining/pdf/" + feature.properties.name + ".pdf' target='_blank'>Neighborhood report (PDF in new tab)</a>";
      layer.bindPopup(popupText);
    }
  }).addTo(map);

  map.fitBounds(choroplethLayer.getBounds())
});

// redlining points with colored numeric markers; see also style.css
$.getJSON("points.geojson", function (data){
  L.geoJson(data, {
    pointToLayer: function( feature, latlng) {
      var colors = {
        'A': 'green',
        'B': 'blue',
        'C': 'yellow',
        'D': 'red',
      }
      var mIcon = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: feature.properties.name,
        markerColor: colors[feature.properties.grade]
      });
      var marker = L.marker(latlng, {icon: mIcon});
      var popupText = "<b>Area " + feature.properties.name + " - " + feature.properties.town + "</b><br />"
         + "<a href='https://ontheline.github.io/otl-redlining/pdf/" + feature.properties.name + ".pdf' target='_blank'>Neighborhood report (PDF in new tab)</a>";
      marker.bindPopup(popupText);
      return marker;
    }
  }).addTo(map);
});


// Add Opacity control
var opacity = L.control({position: 'bottomleft'});
opacity.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'control-custom range');
  div.innerHTML = '<h4>Opacity</h4>';
  div.innerHTML += '<input id="rangeSlider" type="range" min="0" max="100" value="70">';

  // Make sure the map doesn't move with slider change
  L.DomEvent.disableClickPropagation(div);
  return div;
};
opacity.addTo(map);

$('#rangeSlider').on('input', function() {
  choroplethOpacity = $(this).val() / 100;

  if (choroplethLayer) {
    choroplethLayer.setStyle(choroplethStyle);
  }
})