# otl-redlining
Leaflet map of HOLC "redlining" security map for Hartford CT area, 1937

## Link
- https://jackdougherty.github.io/otl-redlining/index.html

## Credits and dependencies
- Numeric icon markers thanks to https://github.com/coryasilva/Leaflet.ExtraMarkers and StackOverflow suggestions for modification
- L.GeoSearch with Google geocode provider https://github.com/smeijer/L.GeoSearch

## Known issues
- Console warning: Google Maps API warning -  NoApiKeys. Read more at https://developers.google.com/maps/documentation/javascript/error-messages#no-api-keys See L.Geosearch issue submitted to provide option to insert Google API key for searches https://github.com/smeijer/L.GeoSearch/issues/77

## ToDo
- Need help: I wish to display default blue markers as numeric markers, with numbers pulled from points.geojson file, properties.name  (e.g. A1), similar to appearance in https://jackdougherty.github.io/leaflet-storymap/
  - I have uploaded the same "markers" folder (with leaflet.extra-markers.min.css and .js) to the local directory, and listed them in index.html
  - I have listed the font-awesome CDN
  - but see my code errors in script.js around line 89

- later, Jack will declutter the markers layer
- later, Jack will create an index-frame.html, based on old MAGIC Google version
http://magic.lib.uconn.edu/otl/doclink_holc.html
