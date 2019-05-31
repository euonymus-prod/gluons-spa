import app from 'firebase/app'
import FirebaseCore from 'firebase-context'

class Firebase extends FirebaseCore {
  // Tools
  // date must be Date type
  generateTimestampType = date => app.firestore.Timestamp.fromDate(date)
}

export default Firebase
