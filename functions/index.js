const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const fb_user_logs = () => admin.firestore().collection('user_logs')
const fb_user_log = user_log_id => fb_user_logs().doc(user_log_id)

exports.helloWorld = functions.https.onRequest((request, response) => {
  return fb_user_logs().get().then(snapshot => {
    let res = '"timestamp", "uuid", "locale", "is_session_start", "quark_id", "quark_name"' + "\n"
    snapshot.forEach(user_log => {
      res += generateCsvRecord(user_log.data()) + "\n"
    })
    return response.send(res)
  })
})

function generateCsvRecord(data) {
  return `${data.timestamp._seconds},${convertCsvStr(data.uuid)},${convertCsvStr(data.locale)},${data.is_session_start},${convertCsvStr(data.quark_id)},${convertCsvStr(data.quark_name)}`
}

function convertCsvStr(data) {
  let ret = data.replace('\\', '\\\\')
  return `"${ret.replace('"', '\\"')}"`
}
