/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Geohash encoding/decoding and associated functions   (c) Chris Veness 2014-2016 / MIT Licence
   http://cdn.rawgit.com/chrisveness/latlon-geohash/v1.1.0/latlon-geohash.js
  */
/*  !!!new version 2018 for base4 and string validation */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';


/**
 * Geohash encode, decode, bounds, neighbours.
 *
 * @namespace
 */
var Geohash = {};

/* (Geohash-specific) Base32 map */
Geohash.base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // base32ghs, standard Geohash alphabet
Geohash.base32_case = 'lower';
Geohash.hash = '';  // accumulator of the Geohash class

// Geohash.base32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // base32rfc, RFC3548 alphabet
// Geohash.base32 = '0123456789BCDFGHJKLMNPQRSTUVWXYZ'; // base32pt, non-silabic (for Portuguese)
Geohash.BitMAX = 5; // change to 2 for base4

/**
 * Encodes latitude/longitude to geohash, either to specified precision or to automatically
 * evaluated precision.
 *
 * @param   {number} lat - Latitude in degrees.
 * @param   {number} lon - Longitude in degrees.
 * @param   {number} [precision] - Number of characters in resulting geohash.
 * @returns {string} Geohash of supplied latitude/longitude.
 * @throws  Invalid geohash.
 *
 * @example
 *     var geohash = Geohash.encode(52.205, 0.119, 7); // geohash: 'u120fxw'
 */
Geohash.encode = function(lat, lon, precision) {
    // infer precision?
    if (typeof precision == 'undefined') {
        // refine geohash until it matches precision of supplied lat/lon
        for (var p=1; p<=12; p++) {
            var hash = Geohash.encode(lat, lon, p);
            var posn = Geohash.decode(hash);
            if (posn.lat==lat && posn.lon==lon) return hash;
        }
        precision = 12; // else set to maximum
    }

    lat = Number(lat);
    lon = Number(lon);
    precision = Number(precision);

    if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

    var idx = 0; // index into base32 map
    var bit = 0; // each char holds 5 bits
    var evenBit = true;
    var geohash = ''; // or Geohash.hash?

    var latMin =  -90, latMax =  90;
    var lonMin = -180, lonMax = 180;

    while (geohash.length < precision) {
        if (evenBit) {
            // bisect E-W longitude
            var lonMid = (lonMin + lonMax) / 2;
            if (lon >= lonMid) {
                idx = idx*2 + 1;
                lonMin = lonMid;
            } else {
                idx = idx*2;
                lonMax = lonMid;
            }
        } else {
            // bisect N-S latitude
            var latMid = (latMin + latMax) / 2;
            if (lat >= latMid) {
                idx = idx*2 + 1;
                latMin = latMid;
            } else {
                idx = idx*2;
                latMax = latMid;
            }
        }
        evenBit = !evenBit;

        if (++bit == Geohash.BitMAX) {
            // 2 or 5 bits, gives us a character: append it and start over
            geohash += Geohash.base32.charAt(idx); // base4 use the base32 alphabet
            bit = 0;
            idx = 0;
        }
    }

    return geohash;  // or?  return (Geohash.hash=geohash);
};

/**
 * Changes Geohash.hash to correct case or empty when invalid. Generates alert() on-true flag.
 * Can use as isValidCode() with defaults, same as isValidCode(true)
 * as isValidCode(geohash) or isValidCode(false) or isValidCode(geohash,false)
 * MUST change name to hash_isValid().
 */
Geohash.isValidCode = function(a,b) {
  var showAlert=true;
  if (a!==undefined) {
     if (typeof a === 'boolean') showAlert=a;
     else { // int or string
	   Geohash.hash = a;
           if (b!==undefined && !b) showAlert=false;
     }
  } // else using Geohash.hash and showAlert.
  var rgx = new RegExp('^['+Geohash.base32+']+$');
  if (Geohash.hash.length === 0) {
     if (showAlert) alert("Empty geocode");
     return false;
  } else {
          // Normalize case:
	  if (Geohash.base32_case=='lower')
	    Geohash.hash = Geohash.hash.toLowerCase();
	  else if (Geohash.base32_case=='upper')
	    Geohash.hash = Geohash.hash.toUpperCase();
          
	  var r = Geohash.hash.match(rgx); // VALIDATION
	  if (!r) {
	    Geohash.hash = ''; // drop.
	    if (showAlert)
	      alert("The string \n"+Geohash.hash+"\n is not valid!\n All letters MUST be in \n'"+Geohash.base32+"'");
	      //  or  throw new Error('Invalid geohash');
	  }
	  return r;
  }
}


/**
 * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
 *     to reasonable precision).
 *
 * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
 * @returns {{lat:number, lon:number}} (Center of) geohashed location.
 * @throws  Invalid geohash.
 *
 * @example
 *     var latlon = Geohash.decode('u120fxw'); // latlon: { lat: 52.205, lon: 0.1188 }
 */
Geohash.decode = function(geohash) {
    var bounds = Geohash.bounds(geohash); // <-- the hard work and validation
    // now just determine the centre of the cell...

    var latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
    var latMax = bounds.ne.lat, lonMax = bounds.ne.lon;

    // cell centre
    var lat = (latMin + latMax)/2;
    var lon = (lonMin + lonMax)/2;

    // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
    lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10));
    lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10));

    return { lat: Number(lat), lon: Number(lon) };
};


/**
 * Returns SW/NE latitude/longitude bounds of specified geohash.
 *
 * @param   {string} geohash - Cell that bounds are required of.
 * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
 * @throws  Invalid geohash.
 */
Geohash.bounds = function(geohash) {
    if (geohash===undefined) geohash=Geohash.hash;
    if (!Geohash.isValidCode(geohash)) throw new Error('Invalid geohash');
    geohash = Geohash.hash; // valid and normalized

    var evenBit = true;
    var latMin =  -90, latMax =  90;
    var lonMin = -180, lonMax = 180;

    for (var i=0; i<geohash.length; i++) {
        var chr = geohash.charAt(i);
        var idx = Geohash.base32.indexOf(chr);  // ok for base4, use same alphabet.
        if (idx == -1) throw new Error('Invalid geohash');

        for (var n=Geohash.BitMAX-1; n>=0; n--) {  // when (Geohash.BitMAX-1)==4 it is a 5 bits-long (base32)! else is base4 (2 bits).
            var bitN = idx >> n & 1;
            if (evenBit) {
                // longitude
                var lonMid = (lonMin+lonMax) / 2;
                if (bitN == 1) {
                    lonMin = lonMid;
                } else {
                    lonMax = lonMid;
                }
            } else {
                // latitude
                var latMid = (latMin+latMax) / 2;
                if (bitN == 1) {
                    latMin = latMid;
                } else {
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;
        }
    }

    var bounds = {
        sw: { lat: latMin, lon: lonMin },
        ne: { lat: latMax, lon: lonMax },
    };

    return bounds;
};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
if (typeof module != 'undefined' && module.exports) module.exports = Geohash; // CommonJS, node.js
