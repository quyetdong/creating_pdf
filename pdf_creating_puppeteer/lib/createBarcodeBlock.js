const fs = require('fs');
const bwipjs = require('bwip-js');

const {
  barcodeFilePath,
  qrcodeFilePath
} = require('./buildPaths');

const createInvoiceCodeImage = (text, { codeType, filePath }) => {
  bwipjs.toBuffer({
    bcid: codeType,       // Barcode type
    text,    // Text to encode
    scale: 3,               // 3x scaling factor
    height: 10,              // Bar height, in millimeters
    includetext: false,            // Dont Show human-readable text
    textxalign: 'center',        // Always good to set this
  }, function (err, png) {
    if (err) {
      // Decide how to handle the error
      // `err` may be a string or Error object
    } else {
      // `png` is a Buffer
      // png.length           : PNG file length
      fs.writeFileSync(filePath, png);
      // png.readUInt32BE(16) : PNG image width
      // png.readUInt32BE(20) : PNG image height
    }
  });
};

const createBarcodeBlock = () => {
  const textValue = '123456789';
  const barcodeType = 'code128';
  const qrcodeType = 'qrcode';

  createInvoiceCodeImage(textValue, { codeType: barcodeType, filePath: barcodeFilePath });
  createInvoiceCodeImage(textValue, { codeType: qrcodeType, filePath: qrcodeFilePath });

  return `
    <div class='invoice-code-container'>
      <p class='invoice-code-instruction'>Payment Barcode by Kbank</p>
      <div class='barcode-container'>
        <p>(Scan QR or Barcode to transfer to bank)</p>
        <img src='barcode-image.png' class='barcode-img' alt='Barcode of Invoice'>
      </div>
      <p class='invoice-code-instruction'>Payment QR code by Kbank</p>
      <div class='qrcode-container'><img src='qrcode-image.png' class='qrcode-img' alt='QR code of Invoice'></div>
    </div>
  `;
};

module.exports = { createBarcodeBlock };
