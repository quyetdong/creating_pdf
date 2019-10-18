const fs = require('fs');
// JSON data
const data = require('./data.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');

/**
 * create user information at the top left of the invoice
 * @param {*} user 
 */
const createUserInfor = (user = { addressLines: [] }) => {
  const { billTo = {
    roomUnit: '',
    name: '',
    phoneNumber: '',
    addressLines: []
  } } = user;

  return `
    <div class='user-infor'>
      <div class='logo'></div>
      <p>${user.userName}</p>
      <p>${user.addressLines[0]}, ${user.addressLines[1]}${user.addressLines[2] ? `, ${user.addressLines[2]}` : ''}</p>
      <p>Tel: ${user.phoneNumber}</p>
      <p>Tax ID: ${user.taxId}</p>
      <br />
      <p><b>Room Unit:</b> ${billTo.roomUnit}</p>
      <p><b>Bill to:</b> ${billTo.name}</p>
      <p><b>Tel:</b> ${billTo.phoneNumber}</p>
      <p><b>Address:</b> ${billTo.addressLines[0]}, ${billTo.addressLines[1]}${billTo.addressLines[2] ? `, ${billTo.addressLines[2]}` : ''}</p>
    </div>
  `;
};

/**
 * create invoice information at the top right of the invoice
 * @param {*} user 
 */
const createInvoiceInfor = (invoice = {}) => {
  return `
    <div class='invoice-infor'>
      <p>${invoice.createdAt}</p>
      <h2 class='invoice-bottom-border'>INVOICE</h2>
      <p><b>(Original)</b></p>
      <br />
      <p>${invoice.invoiceNumber}</p>
      <br />
      <p><b>Billing Date</b> ${invoice.billingDate}</p>
      <p><b>Due Date</b> ${invoice.dueDate}</p>
    </div>
  `;
};

/**
 * Take an object which has the following model
 * @param {Object} item 
 * @model
 * {
 *   "invoiceId": `Number`,
 *   "createdDate": `String`,
 *   "dueDate": `String`,
 *   "address": `String`,
 *   "companyName": `String`,
 *   "invoiceName": `String`,
 *   "price": `Number`,
 * }
 * 
 * @returns {String}
 */
const createRow = (item) => `
  <tr>
    <td>${item.itemId}</td>
    <td>${item.description}</td>
    <td>${item.quantity}</td>
    <td>${item.unitPrice}</td>
    <td>${item.amount}</td>
  </tr>
`;

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
        p {
          line-height: 0.5
        }
        table {
          width: 100%;
          border-collapse: collapse;
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
