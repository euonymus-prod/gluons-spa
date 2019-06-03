const OFFLINE = true

const admin = require('firebase-admin')
const assert = require('chai').assert
const sinon = require('sinon')

try {
  admin.initializeApp()
} catch (e) {
  console.log('error')
}

const offlineTest = require('firebase-functions-test')()
const onlineTest = require('firebase-functions-test')({
  databaseURL: 'https://gluons-dev.firebaseio.com',
  storageBucket: 'gluons-dev.appspot.com',
  projectId: 'gluons-dev',
}, './gluons-dev-firebase-adminsdk-08zkl-c789b9d386.json')

// If index.js calls admin.initializeApp at the top of the file,
// we need to stub it out before requiring index.js. This is because the
// functions will be executed as a part of the require process.
// Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
adminInitStub = sinon.stub(admin, 'initializeApp')

// Firestore Stubs ====================================
const firestoreStub = sinon.stub()
const user_logs_collection = 'user_logs'

const refStub = sinon.stub()
const whereStub = sinon.stub()
const docStub = sinon.stub()

// Stubs Standby ======================================
if (OFFLINE) {
  sinon.stub(admin, 'firestore').get(() => firestoreStub)
}

// Firestore Stubs Standby ============================
firestoreStub.returns({ collection: refStub })
refStub.withArgs(user_logs_collection).returns({ where: whereStub, doc: docStub })

// Import source after generate stub
const myFunctions = require('../index')

// Test delete auths =======================================================
describe("sample job test", () => {
  // const wrapped = (OFFLINE ? offlineTest : onlineTest).wrap(myFunctions.scheduledDeleteAuths)
  // const res = wrapped()
})
