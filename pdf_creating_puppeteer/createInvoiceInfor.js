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

module.exports = { createInvoiceInfor };
