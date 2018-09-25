// 2041129074

'use strict';

var bigInt = require("big-integer"); // npm i big-integer

var id  = '2041129074';

        var cutBase = 2;
        var showBase = 16; //  16, 32, 36
        var hx = bigInt(id).toString(32);

console.log(id, hx);

