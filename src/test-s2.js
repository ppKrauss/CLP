// samples.js
// https://docs.google.com/spreadsheets/d/1JmHrY41IVXJQGhiX4VU8KSQ9gOF6S3--RiECxXJcP8w/edit?usp=sharing
// npm install s2-geometry
// PS: alternative lib https://github.com/mapbox/node-s2

'use strict';

var bigInt = require("big-integer"); // npm i big-integer
const fs = require('fs');
var S2 = require("s2-geometry").S2; // see https://www.npmjs.com/package/s2-geometry
var enforce_level = 0; // 25;

let rawdata = fs.readFileSync('samples.json');
let geosamples = JSON.parse(rawdata);
//console.log(geosamples);

console.log("---- LEVEL "+(enforce_level? enforce_level: 'auto')+" ----");
for (const i of geosamples) {
	var level = enforce_level? enforce_level: i.level;
	showId(i.lat,i.lon,level,i,"");
	if (i.lonpt!=undefined) showId(i.latpt,i.lonpt,level,i,"-pt");
}


function showId(lat,lon,level,i,pt) {
        var cutBase = 2;
        var showBase = 16; //  16, 32, 36
        var key = S2.latLngToKey(lat,lon,level);
        var id = S2.keyToId(key);
	var hx = bigInt(id).toString(cutBase);
	var hx2 = hx.replace(/0+$/g,'');
	var show = bigInt(hx2,cutBase).toString(showBase);
        console.log(i.g+pt+"\tQ"+i.qid+":\t"+id+"\t"+show+"\t -- "+hx2);
}

// We can use as "Paris BBOX" a level-7 S2CellId, 47e64, or two level8, where the one that contains A is 47e67.
var cit16='47e64';
var cit2= bigInt(cit16,16).toString(2);
console.log("\nfim paris="+cit16+" = "+cit2);

var cit16='47e67';
var cit2= bigInt(cit16,16).toString(2);
console.log("\nfim paris="+cit16+" = "+cit2);

// Dois numros com mais ou menos precisao:

console.log("\n 29 bits ="+bigInt('00000011111100001011110101001101',2).toString(16));
console.log("\n 20 bits ="+bigInt('00101111110000101111010100110101',2).toString(16));

console.log("\nC.1	47e66fc2f535 turns "+bigInt('00001111110000101111010100110101',2).toString(36));
console.log("\nC.2	47e66fc2f525 "+bigInt('00001111110000101111010100100101',2).toString(36));
console.log("\nC.3	47e66fc2f51f "+bigInt('00001111110000101111010100011111',2).toString(36));
console.log("\nC.4	47e66fc2f4f9 "+bigInt('00001111110000101111010011111001',2).toString(36));


console.log("\n dec-interlaced UTM 4332036448930 ="+bigInt('4332036448930',10).toString(36));

