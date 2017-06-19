const express = require('express')
const admin = require('firebase-admin')
const app = express()
const serviceAccount = require('./route64-cecb6-firebase-adminsdk-tqabj-e79b45567d.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://route64-cecb6.firebaseio.com'
});

app.get('/', function (req, res) {
  // temporary hardcoded token
  const registrationToken = 'e0Q1cu9E0Cs:APA91bHbhWjYMOWbwCqRCvIOoNUnCIlCWo4gS7mTV709R1LNPbt90UAMafmoPTCV0fyZatk8PeE9YIEE7mZiQ-oAsedDsAPBSaRU6KO2bGsCUctRU6kxj54yb9EuqbQLW6cLpx3E8--V'
  var payload = {
    data: {
      score: '850',
      time: '2:45'
    }
  }
  admin.messaging().sendToDevice(registrationToken, payload)
    .then(function (response) {
      console.log('Successfully sent message:', response);
    })
    .catch(function (error) {
      console.log('Error sending message:', error);
    })
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Start listening on port 3000')
})
