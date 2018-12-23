<?php
/**
 * MAKE files HTML da navgegação de testes do Projeto CLP.
 * USO:
 *   php make.php # roda tudo
 *   php make.php nome | more  # debug
 */

$JSLIB = 'lib_geohash';
$MENU1 = [
	"geohash-base32ghs"=>["nome"=>'Geohash padrão (base32ghs)', "digitos"=>12, "digito_sel"=>9, "js_onload"=>''],
	"geohash-base32pt"=>["nome"=>'Geohash com base32pt', "digitos"=>12, "digito_sel"=>9, "js_onload"=>"
		Geohash.base32 = '0123456789BCDFGHJKLMNPQRSTUVWXYZ'; // base32pt, non-silabic (for Portuguese)
                Geohash.base32_case = 'upper';
"],
	"geohash-base4"=>[
           "nome"=>'Geohash com base4', "digitos"=>24, "digito_sel"=>18, "js_onload"=>"
		Geohash.base32 = '0123'; // base4
                Geohash.base32_case = '-';
		Geohash.BitMAX = 2;
"],
];
$RUN_ITEM = ($argc>1)? $argv[1]: '';
if ($RUN_ITEM && !isset($MENU1[$RUN_ITEM])) die("\nERRO, item '$argv[1]' desconhecido. \n");
$RUN_ITENS = $RUN_ITEM? [$RUN_ITEM]: array_keys($MENU1);

// // //  MAIN

foreach($RUN_ITENS as $MENU1_CURRENT):

$OPTS1='';
foreach($MENU1 as $val=>$r) if ($val!=$MENU1_CURRENT)
      $OPTS1.= "\n\t<option value='$val'>{$r['nome']}</option>";

$OPTS2='';
for($i=2; $i<=$MENU1[$MENU1_CURRENT]['digitos']; $i++)
      $OPTS2.= "\n\t<option value='$i'".(($i==$MENU1[$MENU1_CURRENT]['digito_sel'])? " selected": "").">$i dígitos</option>";

$TPL = <<<HTML
<!DOCTYPE html>
<html>
<head>
	<title>CLP Viewer</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css"/>
	<style>
		p, fieldset {margin-left: 10pt;}
		.selected_text {font-weight: bold;}
		.city-PTS span {margin:0;padding:0;}
	</style>

  <script src="http://cdn.rawgit.com/chrisveness/geodesy/v1.1.3/dms.js"></script>
	<script src="http://code.jquery.com/jquery-3.0.0.min.js"></script>
	<script src="./{$JSLIB}.js"></script>

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" crossorigin=""
	  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
	/>
	<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" crossorigin=""
	    integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
	></script>
        <script src="http://lab.digital-democracy.org/leaflet-bing-layer/leaflet-bing-layer.js"></script>

<script>
var cell_geom=null;

// FALTA mudar de Geohash para GeocodeLib

function drawCell(geocode) {  //  refazer, jgando para map.js
	var bg = Geohash.bounds(geocode);
	var bounds = L.latLngBounds( L.latLng(bg.ne.lat, bg.ne.lon), L.latLng(bg.sw.lat, bg.sw.lon) );
	if (cell_geom) cell_geom.remove();
	cell_geom = L.rectangle(bounds, {color: 'blue', weight: 2}).addTo(mapCanvas);
	var bounds = L.latLngBounds( L.latLng(bg.ne.lat, bg.ne.lon), L.latLng(bg.sw.lat, bg.sw.lon) );
	if( $('#fitZoom').is(':checked') )
		mapCanvas.fitBounds( bounds, {padding:[70,70],maxZoom:19} );
}

function drawLabel_latlng(lat, lon, msg) {
	if ( !msg || msg=='' || msg==undefined )
		msg = Geohash.encode( lat, lon, $('#precision').val() );
	var center = Geohash.decode(msg);
	mapCanvas_popup(center.lat, center.lon, msg);
	return msg;
}

function setRefPoint(lat,lon) {  // depends on L and DOM.
    lat = Dms.parseDMS(lat);
    lon = Dms.parseDMS(lon);
    var geocode = Geohash.encode( lat, lon, $('#precision').val() );
    var latlon = Geohash.decode(geocode); // center
    $('#lat').val(latlon.lat);
    $('#lon').val(latlon.lon);
    $('#geocode').val(geocode);
    drawCell(geocode);
    drawLabel_latlng(lat, lon, geocode);
    return geocode;
}

/**
 * Returns specified argument from query string.
 *
 * @params  {string} key - Argument to be returned.
 * @returns {string} Value of key ('' for ?arg=, null for ?arg, undefined if not present).
 */
function getQueryArg(key) {
    // look for key prefixed by ?/&/;, (optionally) suffixed
    // by =val (using lazy match), followed by &/;/# or EOS
    var re = new RegExp('[?&;]'+key+'(=(.*?))?([&;#]|$)');
    var results = re.exec(location.search);
    if (results == null) return undefined;    // not found
    if (results[2] == undefined) return null; // ?key without '='
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getQueryArgSplitFor(key) {
    var srch = location.search.substring(1);  // lose the initial '?'
    var args = srch.split(/[&;]/);            // list of field=value pairs
    for (var i=0; i<args.length; i++) {       // for each arg
        var arg = args[i].split('=');         // split at '='
        if (arg[0] == key) {                  // arg we're looking for?
            if (arg.length == 1) return null; // ?key without '='
            return decodeURIComponent(arg[1].replace(/\+/g, ' '));
        }
    }
    return undefined;                         // not found
}

function onMapClick(e) {  // used by map.js, mapCanvas.on('click')
   if( !$('#ptclick').is(':checked') ) {
       var geocode = drawLabel_latlng(e.latlng.lat, e.latlng.lng);
       drawCell(geocode);
       $('#geocode').val(geocode);
       var c = Geohash.decode(geocode);
       $('#lat').val( Number((c.lat).toFixed(6)) );
       $('#lon').val( Number((c.lon).toFixed(6)) );
    }
}
/////

$(document).ready(function() {  //  ONLOAD

    {$MENU1[$MENU1_CURRENT]['js_onload']}

		$('#ptclick_text').css('font-weight', 'bold');
		$( "#ptclick" ).click(function() {
		     if( $(this).is(':checked') ) {
		       $('#zoomIn_text').css('font-weight', 'bold');
		       $('#ptclick_text').css('font-weight', 'normal');
		     } else {
		       $('#zoomIn_text').css('font-weight', 'normal');
		       $('#ptclick_text').css('font-weight', 'bold');
		     }
		});


		$('#geocode').change( function() {
			// decode geocode
			try {
				if ( Geohash.isValidCode( $('#geocode').val() ) ) {
					$('#geocode').val(Geohash.hash); // set to correct when changed.
					var latlon = Geohash.decode();
					$('#lat').val(latlon.lat);
					$('#lon').val(latlon.lon);
					$('#precision').val( Geohash.hash.length );
					drawCell(Geohash.hash);
					drawLabel_latlng(latlon.lat, latlon.lon, Geohash.hash );
				} // if
			} catch (err) { console.log(err); }
		});

		$('#lat,#lon').change( function() {
			// editing lat or lon, refresh all.
			try {
			    var lat = Dms.parseDMS($('#lat').val());
			    var lon = Dms.parseDMS($('#lon').val());
			    mapCanvas.setView( [lat,lon], 16, { animate: true, duration: 1.8 } );
			    var geocode = Geohash.encode(lat, lon, $('#precision').val());
			    drawCell(geocode);
			    drawLabel_latlng(lat, lon, geocode);
			} catch (err) { console.log(err); }
		});

		$('#precision').change( function() {
			// encode geocode & reset lat/lon to reflect new precision
			try {
			    var geocode = setRefPoint( $('#lat').val(), $('#lon').val() );
			} catch (err) { console.log(err); }
		});


		/*  // initialise maps
		if (qLatlon = getQueryArg('latlon')) {
			var ll = qLatlon.split(',');
			$('#lat').val(ll[0]);
			$('#lon').val(ll[1]);
			$('#lat').trigger('change');
		}
		*/
}); //ONLOAD


</script>
</head>


<body>

<p>Localize-se e obtenha seus geocódigos!
	&nbsp;
	<select name="usetec" id="usetec" onchange="if (this.value) window.open(this.value+'.htm','_self',false);">
	<option value="" selected>-- Selecione o padrão desejado --</option>
	{$OPTS1}
	</select>
	&nbsp;&nbsp;
	<a target="_blank" href="http://www.openstreetmap.com.br/CLP/site/index_CLPcoord/#comparando-candidatos">Tenologia selecionada</a>:
	<b>{$MENU1[$MENU1_CURRENT]['nome']}</b>. Clique no mapa.
</p>

<div id="mapid" style="width: 100%; height: 400px;"></div>
<script src="map.js"></script>

<p>
	Zoom <span id="zoom_val">16</span>:
	&nbsp; &nbsp;
	<label title="Ativa click de pega-ponto no mapa, ou zoom-in onClick">
	  <input type="checkbox" name="ptclick" id="ptclick">
	  <i id="zoomIn_text">double-click zoom-in</i>
	</label>
	&nbsp; &nbsp;
	(or <span id="ptclick_text">click-point</span> <label title="Zoom-fit to the cell">
	    <input type="checkbox" name="fitZoom" id="fitZoom" checked="1">
	    <i>fit zoom to cell</i></label>).
	&nbsp; &nbsp; Para fundo BING, clique nos layers.
</p>

<form><!-- remover tag form -->
	<fieldset><legend>Geocódigo</legend>
		<label style="white-space:nowrap"><b>{$MENU1[$MENU1_CURRENT]['nome']}</b>: <input type="text" size="23" name="geocode" id="geocode"></label>
		&nbsp;&nbsp;&nbsp; <label>Latitude&nbsp;/&nbsp;Longitude:
		<input type="text" name="lat" id="lat" size="11" maxlength="12" class="latlon" placeholder="Latitude (°N/S)" title="Latitude (°N/S)">&nbsp;,&nbsp;<input type="text" name="lon" id="lon" size="11" maxlength="12" class="latlon" placeholder="Longitude (°L/O)" title="Longitude (°L/O)">
		</label>
		&nbsp;&nbsp;&nbsp;
		<label style="white-space:nowrap">Precisão:&nbsp;<select name="precision" id="precision" class="latlon">
			{$OPTS2}
			</select></label>
	</fieldset>

	<div id="city-ALL">
		<p class="city-LST">Cidade com bordas apresentadas em vermelho:
		&nbsp;<a href="javascript:void(0);" onclick="cityCanvas.show('sp-spa','city')" id="city-sp-spa">São Paulo (SP)</a>,
		&nbsp;<a href="javascript:void(0);" onclick="cityCanvas.show('pr-cur','city')" id="city-pr-cur">Curitiba (PR)</a>.
		</p>
		<p class="city-PTS">Pontos de controle na cidade selecionada: <span>(clique em cidade)</span>
			<span id="city-PTS-sp-spa" style="display:none">
		   <a href="javascript:void(0);" onclick="setRefPoint(-23.561618,-46.655996);">MASP</a>,
		   <a href="javascript:void(0);" onclick="setRefPoint(-23.550375,-46.633937);">Marco-zero-SP</a>, ...
		  </span>
			<span id="city-PTS-pr-cur" style="display:none">
		   <a href="javascript:void(0);" onclick="setRefPoint(-25.48656,-49.2744);">ponto-lixo1</a>,
		   <a href="javascript:void(0);" onclick="setRefPoint(-25.63145,-49.3595);">ponto-lixo2</a>, ...
		  </span>
		</p>
</div>

</form>

</body>
</html>
HTML;

file_put_contents("$MENU1_CURRENT.htm",$TPL);

endforeach; // $RUN_ITENS
