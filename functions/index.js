const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const fb_user_logs = () => admin.firestore().collection('user_logs')
const fb_user_log = user_log_id => fb_user_logs().doc(user_log_id)

// NOTE: HTTP request trigger sample
exports.helloWorld = functions.https.onRequest((request, response) => {
  
  fb_user_logs().get().then(snapshot => {
    const res = []
    snapshot.forEach(user_log => {
      res.push(user_log.data())
    })
    console.log(res)
    response.send(res)
  })
})
