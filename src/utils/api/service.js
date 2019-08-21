import Repository from './repository'
import LoginUtil from '../login'

class ApiService {
  useDifferentEndpointForPrivate = false

  constructor(useDifferentEndpointForPrivate = false) {
    this.useDifferentEndpointForPrivate = useDifferentEndpointForPrivate
  }

  call = (action, method, params) => {
    const auth = {}
    const login_util = new LoginUtil()
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'))
    if (login_util.isLoggedIn(logged_in_user)) {
      if (this.useDifferentEndpointForPrivate) {
        action = 'private_' + action
      }
 		  auth.username =  logged_in_user.username
 		  auth.password = logged_in_user.api_key_plain
    }

    const repository = new Repository()
    repository.setAuth(auth)
    return repository.call(action, method, params)
  }
}
export default ApiService
