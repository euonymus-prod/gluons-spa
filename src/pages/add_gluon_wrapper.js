// react
import React, { Component } from 'react'
// redux
import AddGluon     from '../containers/add_gluon'
import LoginUtil from '../utils/login'
import { API_URI, RETRY_LIMIT, NO_RETRY_CODE } from '../constants/config'
import AxiosAgent from 'axios-agent'

class AddGluonWrapper extends Component {
  state = {
    quark: null
  }

  componentDidMount() {
    this.setQuark()
  }

  setQuark = async () => {
   	const result = await this.callAxios(`quarks/${this.props.match.params.quark_id}`)
    const quark = result.data
    this.setState({quark})
  }
  callAxios = (action, params) => {
    const login_util = new LoginUtil()
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'))
    if (!login_util.isLoggedIn(logged_in_user)) {
   	  this.props.history.push('/')
    }
 	  const authconfig = {
      auth: {
 		    username: logged_in_user.username,
 		    password: logged_in_user.api_key_plain
      }
    }

    const axios = new AxiosAgent({ baseURL: API_URI, ...authconfig }, RETRY_LIMIT, NO_RETRY_CODE)
    const method = 'get'
    return axios[method](action, params)
  }

  render () {
    const { quark } = this.state
    if (!quark) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <AddGluon subject_quark={{...quark.values, identity:this.props.match.params.id}} />
    )
  }
}

export default AddGluonWrapper
