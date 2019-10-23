const createBankAccountList = (bankAccount) => `
  <p class='bank-account-row'>
    <span>Saving Account #${bankAccount.accountNumber}.</span>
    <span>Account Name: ${bankAccount.accountName}.</span>
    <span>Bank Name: ${bankAccount.bankName}</span>
  </p>
`;

const createPaymentReceivedInfor = () => `
  <div class='payment-received-by'>
    <p class='payment-received-by-title font-weight-bold'>Payment received by:</p>
    <p class='payment-received-by-detail'>
      <span class='payment-key'>Total amount</span><span class='payment-value'></span>
      <span class='payment-key'>Received by</span><span class='payment-value'></span>
      <span class='payment-key'>Issued by</span><span class='payment-value'></span>
    </p>
  </div>
`;

const createInvoiceSupplementInfor = (data) => {
  const { bankAccounts = [] } = data;
  const bankAccountList = bankAccounts.map(createBankAccountList).join('');
  const { itemsTotal = {} } = data;
  const paymentReceivedInfor = createPaymentReceivedInfor();

  return `
    <div class='remark-container'>
      <p class='text-opaque remark-title'>Remark / Note</p>
      ${paymentReceivedInfor}
      <div class='bank-account-container'>
        <p class='bank-account-title font-weight-bold'>Bank account information: Please send back transfer to the following account</p>
        <p class='font-weight-bold bank-payment-infor'>
          <span>Total Amount</span><span class='total-amount-value'>${itemsTotal.grandTotal}</span>
          <span>Due Date: ${data.dueDate}</span>
        </p>
        ${bankAccountList}
      </div>
    </div>
  `;
};

module.exports = { createInvoiceSupplementInfor };
