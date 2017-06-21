const express = require('express')
const admin = require('firebase-admin')
const app = express()
const serviceAccount = require('./route64-cecb6-firebase-adminsdk-tqabj-e79b45567d.json')

app.set('port', (process.env.PORT || 3000))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://route64-cecb6.firebaseio.com'
})

app.get('/', function(req, res) {
  res.send('Welcome to Route 64!')
})

app.put('/api/route/:id', function (req, res) {
  // temporary hardcoded token
  const registrationToken = 'eChFXwTvDHo:APA91bHM36FjAe_d_Bq_eipPkhJpoDJ9x3zw1ay67X5kp2-l8tK_etc0aXgQvVpT1f85so-OZrwtS5SJCTk0W0aNQAKdNCJMZKtFvSf-zZnko0X0yWLpCc7QdqhNJBzb-yhDOAXJypKo'
  var payload = {
    data: {
      score: '850',
      time: '2:45'
    }
  }
  admin.messaging().sendToDevice(registrationToken, payload)
    .then(function (response) {
      console.log('Successfully sent message:', response)
    })
    .catch(function (error) {
      console.log('Error sending message:', error)
    })
})

app.listen(app.get('port'), function () {
  console.log('Start listening on port ' + app.get('port'))
})
