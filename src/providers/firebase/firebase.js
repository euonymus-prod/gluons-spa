import app from 'firebase/app'
import FirebaseCore from 'firebase-context'

class Firebase extends FirebaseCore {
  // *** Merge Auth and DB User API *** //

  mergeUser = async authUser => {
    if (!authUser) {
      return false
    }
    return authUser
  }

  onAuthUserListener = (next, fallback) => {
    return this.onAuthStateChanged(this.mergeUser, next, fallback)
  }

  // *** User Log API ***
  user_logs = () => this.db.collection('user_logs')
  user_log = uid => this.user_logs().doc(uid)

  // Tools
  // date must be Date type
  generateTimestampType = date => app.firestore.Timestamp.fromDate(date)
}

export default Firebase
