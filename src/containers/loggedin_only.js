// react
import { Component } from 'react'
import { withRouter } from "react-router-dom";
// redux
import LoginUtil from '../utils/login'

class LoggedinOnly extends Component {
  state = {
    quark: null
  }

  componentDidMount() {
    this.loginCheck()
  }

  loginCheck = () => {
    const login_util = new LoginUtil()
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'))
    if (!login_util.isLoggedIn(logged_in_user)) {
  	  this.props.history.push('/')
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(LoggedinOnly)
