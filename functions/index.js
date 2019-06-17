const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const fb_user_logs = () => admin.firestore().collection('user_logs')
const fb_user_log = user_log_id => fb_user_logs().doc(user_log_id)

const fields = [
  "timestamp",
  "uuid",
  "locale",
  "is_session_start",
  "quark_id",
  "quark_name",
  "is_mobile",
  "os_type",
  "browser",
  "referrer"
]
// These are Avoiding UUID
const avoids = ["v34D7qaUBQht8wWpVEthbcZ1NSf1", "EJSRp8OjTFTtcAp0WhzTOiyGOUI3", "qTPX2O7pqAM0e9FPUq9F6FYcKE33"]

exports.helloWorld = functions.https.onRequest((request, response) => {
  return fb_user_logs().get().then(snapshot => {

    // Building CSV Header
    let res = ''
    fields.forEach((field, key) => {
      if (key !== 0) {
        res += ','
      }
      res += convertCsvStr(field)
    })
    res += "\n"

    // Building CSV Body
    snapshot.forEach(user_log => {
      if ( avoids.includes(user_log.data().uuid) ) {
        return
      }
      res += generateCsvRecord(user_log.data()) + "\n"
    })
    return response.send(res)
  })
})

function generateCsvRecord(data) {
  // return `${data.timestamp._seconds},${convertCsvStr(data.uuid)},${convertCsvStr(data.locale)},${data.is_session_start},${convertCsvStr(data.quark_id)},${convertCsvStr(data.quark_name)}`

  let res = ''
  fields.forEach((field, key) => {
    if (key !== 0) {
      res += ','
    }
    if ( typeof data[field] === 'undefined' ) {
      return
    }
    if ( ['timestamp', 'is_session_start', 'is_mobile'].includes(field) ) {
      if (field === 'timestamp') {
        res += data[field]._seconds
      } else {
        res += `${data[field]}`
      }
    } else {
      res += convertCsvStr(data[field])
    }
  })
  return res
}

function convertCsvStr(data) {
  let ret = data.replace('\\', '\\\\')
  return `"${ret.replace('"', '\\"')}"`
}
