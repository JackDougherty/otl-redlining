# otl-redlining
Leaflet map of HOLC "redlining" security map for Hartford CT area, 1937

## Link
- https://jackdougherty.github.io/otl-redlining/index.html

## Embed shortcode in http://OnTheLine.trincoll.edu
- [iframe src="http://jackdougherty.github.io/otl-redlining/index.html" width=100% height = 480]

## Credits and dependencies
- Thanks @ilyankou for styling
- Thanks Samir Gambhir, Kirwan Institute for the Study of Race and Ethnicity, Ohio State University, for geo-referencing and digitizing the original map scans.
- Thanks UConn MAGIC (http://magic.lib.uconn.edu) for the original 2012 Google Maps design (http://magic.lib.uconn.edu/otl/doclink_holc.html), which is replaced by this 2016 Leaflet map
- Numeric icon markers by https://github.com/coryasilva/Leaflet.ExtraMarkers with StackOverflow suggestions for modification
- L.GeoSearch v1.1.0 with Google geocode provider https://github.com/smeijer/L.GeoSearch

## Known issues
- Console warning: Google Maps API warning -  NoApiKeys. Read more at https://developers.google.com/maps/documentation/javascript/error-messages#no-api-keys See L.Geosearch issue submitted to provide option to insert Google API key for searches https://github.com/smeijer/L.GeoSearch/issues/77

## Historical sources
- Residential Security Maps (Hartford-West Hartford and East Hartford) and Area Descriptions for Hartford area, Connecticut, 1937. Home Owners’ Loan Corporation, box 64, City Survey Files, Record Group 195: Records of the Federal Home Loan Bank Board, National Archives II, College Park, Maryland.
- For the full appraisal report (PDF), see the sources folder
- For geographic data, see polygon.geojson and points.geojson files above, or sources folder for shapefile (.shp) and summary spreadsheet (.csv) and metadata (.xls)
- See also original 1937 maps, scanned from the National Archives, and georeferenced with MapWarper via NYPL: West Hartford-Hartford (http://mapwarper.net/maps/15096) and East Hartford (http://mapwarper.net/maps/15097)
