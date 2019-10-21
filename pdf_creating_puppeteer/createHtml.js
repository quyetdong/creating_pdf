const fs = require('fs');

const data = require('./data.json');
const { buildPathHtml } = require('./lib/buildPaths');
const { createUserInfor } = require('./lib/createuserInfor');
const { createInvoiceInfor } = require('./lib/createInvoiceInfor');
const { createTable } = require('./lib/createTable');
const { createAdditionalInfor } = require('./lib/createAdditionalInfor');

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (data) => {
  /* generate item table */
  const table = createTable(data.items);
  /* generate user information */
  const userInfor = createUserInfor(data.user);
  /* generate invoice information */
  const invoiceHeaderInfor = createInvoiceInfor(data);
  const invoiceSupplementInfor = createAdditionalInfor(data);

  /* return html */
  return `
  <html>
    <head>
      <style>
        body {
          margin: 3pt 10pt;
        }
        p {
          line-height: 0.5
        }

        .invoice-date {
          margin: 0;
        }
        .text-opaque {
          font-size: 10pt;
          opacity: 0.6;
          filter: Alpha(opacity=50); /* IE8 and earlier */
        }
        .no-content {
          background-color: red;
        }
        .user-infor {
          float: left;
          margin-top: 20pt;
        }
        .invoice-infor {
          float: right;
          text-align: right;
        }
        .clear-float {
          clear: both
        }
        .logo {
          height: 60pt;
          width: 60pt;
          margin-bottom: 15pt;
          -webkit-print-color-adjust: exact;
          background-color: #CCC;
          border: 0.75pt solid #000;
        }
        .invoice-header-container {
          margin-top: 12pt;
        }
        .invoice-header {
          border-bottom: 0.75pt solid #000;
          margin-top: 10pt;
          margin-left: 0;
          font-size: 18pt;
        }
        .invoice-supplement {
          margin-right: 15pt;
        }
        .row-title-container {
          text-align: center;
          border-bottom: 1.5pt solid #CCC;
        }
        .row-container {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
        }
        .table-container {
          border-bottom: 1.5pt solid #CCC;
        }
        .item-id {
          grid-column: span 1;
        }
        .description {
          grid-column: span 6;
        }

        .total-string {
          grid-column: span 10;
        }
        .total-title {
          grid-column: span 3;
          text-align: right;
        }
        .table-value {
          grid-column: span 3;
          text-align: right;
        }

        /* remark or note block */
        .payment-received-by {
          border-bottom: 2pt dotted #CCC;
          padding-bottom: 10pt;
        }
        .font-weight-bold {
          font-weight: bold;
        }
        p.payment-received-by-title {
          margin: 35pt 0 25pt 0;
        }
        span.payment-key {
          display: inline-block;
          width: 12%;
        }
        span.payment-key:not(:first-child) {
          margin: 0 0 0 2%;
        }
        span.payment-value {
          display: inline-block;
          width: 19%;
          border-bottom: 0.75pt solid black;
        }

        /* bank account information block */
        .bank-account-title {
          margin: 20pt 0 25pt;
        }
        .bank-account-row > span {
          font-size: 11pt;
          margin: 0 2pt;
        }
        .bank-payment-infor {
          margin-bottom: 20pt;
        }
        .bank-payment-infor > span {
          display: inline-block;
          width: 33%;
        }
      </style>
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
  if (doesFileExist(buildPathHtml)) {
    console.log('Deleting old build file');
    /* If the file exists delete the file from system */
    fs.unlinkSync(buildPathHtml);
  }

  const html = createHtml(data);
  /* write the generated html to file */
  fs.writeFileSync(buildPathHtml, html);
  console.log('Succesfully created an HTML table');
} catch (error) {
  console.log('Error generating table', error);
}
