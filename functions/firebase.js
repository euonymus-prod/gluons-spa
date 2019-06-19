const admin = require('firebase-admin')

class Firebase {

  constructor(config) {
    this.user_logs = () => admin.firestore().collection('user_logs')
    this.user_log = user_log_id => fb_user_logs().doc(user_log_id)

    /* Firebase APIs */
    this.auth = admin.auth()
  }
}

module.exports = Firebase
