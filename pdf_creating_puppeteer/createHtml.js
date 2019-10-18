const fs = require('fs');

const data = require('./data.json');
const { buildPathHtml } = require('./buildPaths');
const { createUserInfor } = require('./createuserInfor');
const { createInvoiceInfor } = require('./createInvoiceInfor');
const { createRow } = require('./createRow');

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (rows) => `
  <table>
    <tr class='row-title'>
        <th>ITEM</td>
        <th>Description</td>
        <th>Qty</td>
        <th>Unit Price</td>
        <th>Amount (THB)</td>
    </tr>
    ${rows}
  </table>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (data) => {
  /* generate rows of items */
  const rows = data.items.map(createRow).join('');
  /* generate table */
  const table = createTable(rows);
  /* generate user information */
  const userInfor = createUserInfor(data.user);
  /* generate invoice information */
  const invoiceInfor = createInvoiceInfor(data);

  /* return html */
  return `
  <html>
    <head>
      <style>
        body {
          padding: 30px;
        }
        p {
          line-height: 0.5
        }
        table {
          width: 100%;
          border-collapse: collapse;
          border-bottom: 2px solid #CCC;
        }
        tr {
          text-align: left;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
        .user-infor {
          float: left
        }
        .invoice-infor {
          float: right
        }
        .clear-float {
          clear: both
        }
        .logo {
          height: 60px;
          width: 60px;
          -webkit-print-color-adjust: exact;
          background-color: #CCC;
          border: 1px solid #000;
        }
        .invoice-bottom-border {
          border-bottom: 1px solid #000;
        }
        .row-title > th {
          -webkit-print-color-adjust: exact;
          border-bottom: 2px solid #CCC;
        }
      </style>
    </head>
    <body>
        <div>
          ${userInfor}
          ${invoiceInfor}
          <div class='clear-float'></div>
        </div>
      ${table}
      <div>
        <p>
          <span>${data.itemsTotal.stringValue}</span>
          <span>Total</span>
          <span>${data.itemsTotal.numberValue}</span>
        </p>
        <p>VAT (7%) <span>${data.itemsTotal.vat}</span></p>
      </div>
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
