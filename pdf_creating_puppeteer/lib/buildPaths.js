const path = require('path');

const buildPaths = {
   htmlFilePath: path.resolve('./storage/build.html'),
   cssFilePath: path.resolve('./invoice.css'),
   pdfFilePath: path.resolve('./storage/build.pdf'),
   barcodeFilePath: path.resolve('./storage/barcode-image.png'),
   qrcodeFilePath: path.resolve('./storage/qrcode-image.png'),
};

module.exports = buildPaths;