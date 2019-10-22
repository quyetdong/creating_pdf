const http = require('http');
const fs = require('fs');
const invoice = require('./data.json'); 

// Prepare the JSON in the expected format
const postData = JSON.stringify({
  "document" : invoice
});
 
// Prepare POST options such as correct headers
const postOptions = {
    host: 'localhost',
    port: '9393',
    path: '/render',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};
 
const postRequest = http.request(postOptions, (resp) => {
  let data = '';
 
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // Save the PDF if everything went okay
  resp.on('end', () => {
    response = JSON.parse(data);
    // console.log('+++++00011111', data);
    // console.log('+++++11111', response);

    if (response["data"]) {
      const pdf = Buffer.from(response["data"], 'base64');
 
      fs.writeFile("./invoice_from_node.pdf", pdf, function(err) {
        if(err) {
          return console.log('++++11', err);
        }
 
        console.log("The file was saved!");
      });
    } else {
      console.log("1111Error: " + response["error"])
    }
  });
}).on("error", (err) => {
  console.log("2222Error: " + err.message);
});
 
postRequest.write(postData);
postRequest.end();