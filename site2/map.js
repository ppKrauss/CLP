
var map = L.map('map');

L.tileLayer('https://{s}.tiles.mapbox.com/v3/randyme.i0568680/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18
}).addTo(map);


// lupa para a busca de códigos, mesmo com UPGRADE ainda dando pau  
L.control.geocoder('search-6gycfqf0',{"url":"https://pelias.io/api"}).addTo(map); //6gycfqf0 or fljxAAA
// see https://github.com/pelias/api


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

///// for plugin.js

$(document).ready(function() {
  $('#buttons button').on('click', function(event) {
    $('#buttons button').removeClass('active');
    $(event.target).addClass('active');
    changeHashFunction( event.target.id );
  });
});





