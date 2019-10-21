const fs = require('fs');
const bwipjs = require('bwip-js');

const createBarcodeBlock = () => {
  bwipjs.toBuffer({
    bcid: 'code128',       // Barcode type
    text: '0123456789',    // Text to encode
    scale: 3,               // 3x scaling factor
    height: 10,              // Bar height, in millimeters
    includetext: true,            // Show human-readable text
    textxalign: 'center',        // Always good to set this
  }, function (err, png) {
    if (err) {
      // Decide how to handle the error
      // `err` may be a string or Error object
    } else {
      // `png` is a Buffer
      // png.length           : PNG file length
      console.log(png.length);
      fs.writeFileSync('./barcode-test.png', png);
      // png.readUInt32BE(16) : PNG image width
      // png.readUInt32BE(20) : PNG image height
    }
  });
};

createBarcodeBlock();

module.exports = { createBarcodeBlock };
