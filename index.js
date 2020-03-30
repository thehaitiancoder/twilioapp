const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

require('dotenv').config();
const client = new twilio(process.env.accountSid, process.env.authToken);

// Create a message
// client.messages.create({
//     body: 'Hello from Node',
//     to: '+18636055705',  // Text this number
//     from: '+12565489466' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));

// Fetch a message
// client.messages('SM23c4342480384f069652a5c7ba65b5bf')
// .fetch()
// .then(message => console.log(message.body))

// Fetch multiple messages
// client.messages.list({limit: 5})
// .then(messages => messages.forEach(m => console.log(m.sid)));

// Update a message
// client.messages('SM7c3ae6ac6f8318ca7579ad41a084f49d')
// .update({body: ''})
// .then(message => process.stdout.write(message.body));

// Delete a message
// client.messages('SM23c4342480384f069652a5c7ba65b5bf').remove();


// Respond to a message
const MessagingResponse = twilio.twiml.MessagingResponse;

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  console.log(req.body.Body);

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));