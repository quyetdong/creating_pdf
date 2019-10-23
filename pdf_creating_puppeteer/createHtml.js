const fs = require('fs');

const data = require('./data.json');

const { htmlFilePath, cssFilePath } = require('./lib/buildPaths');
const { createUserInfor } = require('./lib/createuserInfor');
const { createInvoiceInfor } = require('./lib/createInvoiceInfor');
const { createTable } = require('./lib/createTable');
const { createInvoiceSupplementInfor } = require('./lib/createInvoiceSupplementInfor');
const { createBarcodeBlock } = require('./lib/createBarcodeBlock');
const { createFooter } = require('./lib/createFooter');

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (data) => {
  const { footerNote = 'This is default footer note!' } = data;
  /* generate item table */
  const table = createTable(data.items);
  /* generate user information */
  const userInfor = createUserInfor(data.user);
  /* generate invoice information */
  const invoiceHeaderInfor = createInvoiceInfor(data);
  const invoiceSupplementInfor = createInvoiceSupplementInfor(data);
  const barcodeBlock = createBarcodeBlock();
  const footer = createFooter(footerNote);

  /* return html */
  return `
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="${cssFilePath}">
    </head>
    <body>
        <div>
          ${userInfor}
          ${invoiceHeaderInfor}
          <div class='clear-float'></div>
        </div>
      ${table}
      <div class='item-total-container row-container'>
        <div class='total-string'>
          <p>${data.itemsTotal.stringValue}</p>
        </div>
        <div class='total-title'>
          <p>Total</p>
          <p>VAT (7%)</p>
          <p class='font-weight-bold'>Grand Total</p>
        </div>
        <div class='total-value table-value'>
          <p>${data.itemsTotal.numberValue}</p>
          <p>${data.itemsTotal.vat}</p>
          <p>${data.itemsTotal.grandTotal}</p>
        </div>
      </div>
      ${invoiceSupplementInfor}
      ${barcodeBlock}
      ${footer}
    </body>
  </html>
`;
};

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath 
 * @returns {Boolean}
 */
const doesFileExist = (filePath) => {
  try {
    fs.statSync(filePath); // get information of the specified file path.
    return true;
  } catch (error) {
    return false;
  }
};

try {
  /* Check if the file for `html` build exists in system or not */
  if (doesFileExist(htmlFilePath)) {
    console.log('Deleting old build file');
    /* If the file exists delete the file from system */
    fs.unlinkSync(htmlFilePath);
  }

  const html = createHtml(data);
  /* write the generated html to file */
  fs.writeFileSync(htmlFilePath, html);
  console.log('Succesfully created an HTML table');
} catch (error) {
  console.log('Error generating table', error);
}
