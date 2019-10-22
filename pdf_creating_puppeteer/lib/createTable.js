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
  <div class='row-item-container row-container'>
    <p class='item-id'>${item.itemId}</p>
    <p class='description'>${item.description}</p>
    <p class='table-value row-value'>${item.quantity}</p>
    <p class='table-value row-value'>${item.unitPrice}</p>
    <p class='table-value row-value'>${item.amount}</p>
  </div>
`;

/**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (items) => {
  /* generate rows of items */
  const rows = items.map(createRow).join('');

  return `
    <div class='table-container'>
      <div class='row-title-container row-container font-weight-bold'>
          <p class='item-id'>ITEM</p>
          <p class='description'>Description</p>
          <p class='table-value row-value'>Qty</p>
          <p class='table-value row-value'>Unit Price</p>
          <p class='table-value row-value'>Amount (THB)</p>
      </div>
      ${rows}
    </div>
  `;
}

module.exports = { createTable };
