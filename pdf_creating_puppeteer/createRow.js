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

module.exports = { createRow };
