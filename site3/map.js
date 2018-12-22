/**
 * LeafletJs map initializations.
 */

var BING_KEY = 'AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L';
var MAPBOX_KEY = 'eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.';
var attribMapBase = ' <a href="http://www.openstreetmap.com.br/CLP">OSM and CLP</a> contribs | ';

var bing_options = {
    bingMapsKey: BING_KEY,
    //imagerySet: 'RoadOnDemand',
    attribution: attribMapBase+' BING',
    culture: 'pt-BR',
    maxNativeZoom: 19,
    maxZoom: 21 // see  https://stackoverflow.com/a/53883145/287948  and https://github.com/digidem/leaflet-bing-layer/issues/39
};

var 
  lay_mapbox = L.tileLayer(MAPBOX_URL+MAPBOX_KEY, {
	maxZoom: 21,
	attribution: attribMapBase+' MapBOX',
	id: 'mapbox.streets'
  }),
  lay_bing = L.tileLayer.bing(bing_options)
;

var mapCanvas = L.map('mapid', {
    center: [-23.56149,-46.655953],
    zoom: 16
});
L.control.layers({
    "Standard": lay_mapbox,
    "BING": lay_bing
}).addTo(mapCanvas);
lay_mapbox.addTo(mapCanvas); //  set as default


mapCanvas.on('zoomend', function() {
    var x = mapCanvas.getZoom();
    $('#zoom_val').text(x);
});


/*


var selectedByUrl = '';
var hash = window.location.hash
hash = hash.replace('#','');  // examples #6gzm/SP/MonteiroLobato ,  #6gycf/SP/SaoPaulo or #6gkz/PR/Curitiba
if (hash) {
	// check prefixes "geohash:" (default) or "quadtree:", and city 
	var selectedByUrl = 'geohash';
	var regex = /^((geohash|quadtree):)?(.+?)(\/(.+))?$/;
	var fd = hash.match(regex);
	selectedByUrl = (fd[2]!=undefined)? fd[2]: "geohash";
	hash = fd[3]; // main!
	var city = (fd[5]!=undefined)? fd[5]: "";
	console.log("External parameters:",selectedByUrl,hash,city);
	if (city) {
		var urlCities = "https://raw.githubusercontent.com/datasets-br/city-codes/master/data/dump_osm/";
		var gsl = new L.GeoJSON.AJAX(urlCities+city+".geojson");
		gsl.addTo(map);
		// there are a simple way to get gsl centroid? if no hash, use centroid or bbox center
	}
	// if selectedByUrl=='geohash'
	var x = geohash.decode(hash);
	var hl = (hash.length>9)? 9: hash.length;
	map.setView( new L.LatLng( x.latitude, x.longitude ), (hl<5)? 1+2*hl: 8+hl );
}  else {
	map.setView( new L.LatLng( -23.561540, -46.656141 ), 10 ); // MASP
}



L.control.layers({
    "Standard": lay_mapbox,
    "BING": lay_bing
}).addTo(mapCanvas);
*/


/*old
	var mapCanvas = L.map('mapid').setView([-23.56149,-46.655953], 16);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 22,
		attribution: 'See <a href="http://www.openstreetmap.com.br/CLP">OpenStreetMap and CLP</a> contributors',
		id: 'mapbox.streets'
	}).addTo(mapCanvas);

*/


var popup = L.popup();

function onMapClick(e) {
   if( !$('#ptclick').is(':checked') ) {
       var geohash = drawLabel_latlng(e.latlng);
       drawCell(geohash);
       $('#geohash').val(geohash);
       var c = Geohash.decode(geohash);
       $('#lat').val( Number((c.lat).toFixed(6)) );
       $('#lon').val( Number((c.lon).toFixed(6)) );
    }
}
mapCanvas.on('click', onMapClick);
L.control.scale({imperial:false,updateWhenIdle:false,maxWidth:50}).addTo(mapCanvas);




