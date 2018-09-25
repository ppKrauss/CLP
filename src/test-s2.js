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

//         var hx = bigInt(id).toString(cutBase);

var dentro = ['94de949b2c7c','94de949b2b9c','94de949b2c5b'];
var box = '94de949c';

var box_id = bigInt(box,16).toString(2);
var dentro0 = bigInt(dentro[0],16).toString(2);
var dentro1 = bigInt(dentro[1],16).toString(2);
var dentro2 = bigInt(dentro[2],16).toString(2);


console.log("\n\tbx= "+box_id+"\n\tdo= "+dentro0+"\n");
console.log("\n\td1= "+dentro1+"\n\td2= "+dentro2);

console.log("\nd0="+bigInt('0110010110001111100',2).toString(32) );


console.log("\nd1="+bigInt('0110010101110011100',2).toString(32) );
console.log("\nd2="+bigInt('0110010110001011011',2).toString(32) );


console.log("\nxxx="+bigInt('31',10).toString(32) );

/////////

function showId2(lat,lon,level) {
        var key = S2.latLngToKey(lat,lon,level);
        var id = S2.keyToId(key);
        console.log("\n new Id ="+ bigInt(id).toString(16) );
}

showId2(-24.007,-46.8264088,20);
showId2(-23.3570001,-46.3650899,20);
showId2(-24.007,-46.3650899,20);


