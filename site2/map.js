
var map = L.map('map');

L.tileLayer('https://{s}.tiles.mapbox.com/v3/randyme.i0568680/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18
}).addTo(map);


// ?? para que isso?
L.control.geocoder('search-6gycfqf0').addTo(map); //6gycfqf0 or fljxAAA

var selectedByUrl = '';
var hash = window.location.hash
hash = hash.replace('#','');
if (hash) {
	// check prefixes "geohash:" (default) or "quadtree:" or "slippy:"
	var prefix = ['geohash','quadtree'];  //,'slippy'];
	var selectedByUrl = 'geohash';
	var pos = hash.indexOf(':');
	if (pos != -1) {
		var aux = hash.substr(0, pos)
		if (prefix.indexOf(aux) == -1) 
			alert("HASH ERROR: no knowed "+aux);
		else 
			selectedByUrl = aux;
 		hash = hash.substr(pos+1)
        }
	console.log("Tentando usar geocodigo:",hash);
	var x = geohash.decode(hash); // usar a string length/2 para obter zoom!
	var hl = (hash.length>9)? 9: hash.length;
	map.setView( new L.LatLng( x.latitude, x.longitude ), 2*hl );

}  else {
	map.setView( new L.LatLng( -23.561540, -46.656141 ), 10 ); // MASP
}


$(document).ready(function() {
  $('#buttons button').on('click', function(event) {
    $('#buttons button').removeClass('active');
    $(event.target).addClass('active');
    changeHashFunction( event.target.id );
  });
});


/////


