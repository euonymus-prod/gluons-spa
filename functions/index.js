const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const fb_user_logs = () => admin.firestore().collection('user_logs')
const fb_user_log = user_log_id => fb_user_logs().doc(user_log_id)

// NOTE: HTTP request trigger sample
exports.helloWorld = functions.https.onRequest((request, response) => {

  const fields = ['timestamp', 'uuid', 'locale', 'is_session_start', 'quark_id', 'quark_name']

  
  fb_user_logs().get().then(snapshot => {
    const res = []
    snapshot.forEach(user_log => {
      generateCsvRecord(user_log.data())
      res.push(user_log.data())
    })
    // console.log(res)
    response.send(res)
  })
})

function generateCsvRecord(data) {
  
  console.log(data.timestamp._seconds)
  console.log(data.uuid)
  console.log(data.locale)
  console.log(data.is_session_start)
  console.log(data.quark_id)
  console.log(data.quark_name)
}

// function convertCsvStr(data) {
//   const escMsg = msg.replaceAll("\"", "\\\\\"")
//   console.log(escMsg)
//   // escMsg.replaceAll("'", "\\\\'")
// }
