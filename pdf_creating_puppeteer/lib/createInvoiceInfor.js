/**
 * create invoice information at the top right of the invoice
 * @param {*} user 
 */
const createInvoiceInfor = (invoice = {}) => {
    return `
      <div class='invoice-infor right-float'>
        <p class='invoice-date text-opaque'>${invoice.createdAt}</p>
        <div class='invoice-header-container'><span class='invoice-header font-weight-bold'>INVOICE</span></div>
        <div><span class='invoice-supplement font-weight-bold'>(Original)</span></div>
        <br />
        <p>${invoice.invoiceNumber}</p>
        <br />
        <p><span class='font-weight-bold'>Billing Date</span> ${invoice.billingDate}</p>
        <p><span class='font-weight-bold'>Due Date</span> ${invoice.dueDate}</p>
      </div>
    `;
};

module.exports = { createInvoiceInfor };
