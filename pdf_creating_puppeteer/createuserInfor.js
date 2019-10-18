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

module.exports = { createUserInfor };
