// samples.js
// npm i geo-hash

'use strict';

const fs = require('fs');
var geo = require('geo-hash');
//var hash = geo.encode(10.3, -2.4);
var bigInt = require("big-integer"); // npm i big-integer


var level = 9; // geohash precision


let rawdata = fs.readFileSync('samples.json');
let geosamples = JSON.parse(rawdata);
//console.log(geosamples);

console.log("---- LEVEL "+level+" ----");
for (const i of geosamples) {
        level = 2+Math.round(i.level/3.01)
	var id = geo.encode(i.lat, i.lon, level);
	console.log(i.g+"\tQ"+i.qid+":\t"+id,level);
        if (i.lonpt!=undefined) {
          var id = geo.encode(i.latpt, i.lonpt, level);
          console.log(i.g+"-pt\tQ"+i.qid+":\t"+id,level);
        }
}

/*
        var hx = bigInt(id).toString(cutBase);
        var hx2 = hx.replace(/0+$/g,'');
        var show = bigInt(hx2,cutBase).toString(showBase);
*/
