import AxiosAgent from 'axios-agent'
import { API_URI, RETRY_LIMIT, NO_RETRY_CODE } from './constants/config'

class ApiRepository {
  static headers = {}
  static auth = {}

  setHeaders(headers = {}) {
    this.headers = headers
  }
  setAuth(auth = {}) {
    this.auth = auth
  }

  getHeaders() {
    return this.headers
  }
  getAuth() {
    return this.auth
  }

  call = (action, method, params = {}) => {
    const headers = this.getHeaders()
    const auth = this.getAuth()
    const axios = new AxiosAgent({ baseURL: API_URI, headers, auth }, RETRY_LIMIT, NO_RETRY_CODE)
    return axios.call(action, method, params)
  }
}
export default ApiRepository
