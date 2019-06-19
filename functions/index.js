// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require('firebase-admin')
admin.initializeApp()

// Delete authentications having no votes =======================================
exports.helloWorld = require('./csv-log')
