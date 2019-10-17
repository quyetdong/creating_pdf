const fs = require('fs');
// JSON data
const data = require('./data.json');
// Build paths
const { buildPathHtml } = require('./buildPaths');


const createUserInfor = (user) => {
  const { billTo } = user;

  return `
    <div>
      <tr>
        <td>${user.userName}</td>
        <td>${user.addressLines[0]}, ${user.addressLines[1]}${user.addressLines[2] ? `, ${user.addressLines[2]}` : ''}</td>
        <td>Tel: ${user.phoneNumber}</td>
        <td>Tax ID: ${user.taxId}</td>
        <br />
        <td><b>Room Unit:</b> ${user.roomUnit}</td>
        <td><b>Bill to:</b> ${billTo.name}</td>
        <td><b>Address:</b> ${billTo.addressLines[0]}, ${billTo.addressLines[1]}${billTo.addressLines[2] ? `, ${billTo.addressLines[2]}` : ''}</td>
      </tr>
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
    <tr>
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
const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
      ${table}
    </body>
  </html>
`;

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
  /* generate rows */
  const rows = data.map(createRow).join('');
  /* generate table */
  const table = createTable(rows);
  /* generate html */
  const html = createHtml(table);
  /* write the generated html to file */
  fs.writeFileSync(buildPathHtml, html);
  console.log('Succesfully created an HTML table');
} catch (error) {
  console.log('Error generating table', error);
}
