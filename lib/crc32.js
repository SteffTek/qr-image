"use strict";
import { Buffer } from "node:buffer";

var crc_table = [];

(function() {
    for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) {
            if (c & 1) {
                c = 0xedb88320 ^ (c >>> 1);
            } else {
                c = c >>> 1;
            }
        }
        crc_table[n] = c >>> 0;
    }
})();

function update(c, buf) {
    var l = buf.length;
    for (var n = 0; n < l; n++) {
        c = crc_table[(c ^ buf[n]) & 0xff] ^ (c >>> 8);
    }
    return c;
}

function crc32(/* arguments */) {
    var l = arguments.length;
    var c = -1;
    for (var i = 0; i < l; i++) {
        c = update(c, new Buffer(arguments[i]));
    }
    c = (c ^ -1) >>> 0;
    return c;
}

export default crc32;
