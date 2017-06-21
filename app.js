const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
const cors = require('cors')
const app = express()
const serviceAccount = require('./route64-cecb6-firebase-adminsdk-tqabj-e79b45567d.json')

app.set('port', (process.env.PORT || 3000))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://route64-cecb6.firebaseio.com'
})

app.use(cors())
app.use(bodyParser.json())

const db = admin.database()
const tokensRef = db.ref('tokens')

const notify = function (token, payload) {
  admin.messaging().sendToDevice(token, payload)
    .then(function (response) {
      console.log('Successfully sent message:', response)
    })
    .catch(function (error) {
      console.log('Error sending message:', error)
    })
}

const notifyAll = function (payload) {
  tokensRef.once('value', function (data) {
    var tokens = data.val()
    Object.keys(tokens).forEach(function (id) {
      notify(tokens[id].token, payload)
    })
  }, function (errorObject) {
    console.log('The read tokens failed: ' + errorObject.code)
  })
}

app.get('/', function (req, res) {
  res.send('Welcome to Route 64!')
})

app.put('/api/route/:id', function (req, res) {
  var payload = {
    data: {
      title: `${req.body.traveller} updated a route`,
      body: `Route ${req.body.title}`
    }
  }
  notifyAll(payload)
  res.status(204).end()
})

app.listen(app.get('port'), function () {
  console.log('Start listening on port ' + app.get('port'))
})
