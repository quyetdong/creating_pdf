const fs = require('fs');
const pdf = require('html-pdf');
const { buildPathHtml, buildPathPdf } = require('./buildPaths');

const html = fs.readFileSync(buildPathHtml, 'utf8');
const options = { format: 'Letter' };
 
pdf.create(html, options).toFile(buildPathPdf, function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});