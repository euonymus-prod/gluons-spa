// react
import React, { Component } from 'react'
// redux
import EditGluon     from '../containers/edit_gluon'
import LoginUtil from '../utils/login'
import { API_URI, RETRY_LIMIT, NO_RETRY_CODE } from '../constants/config'
import AxiosAgent from 'axios-agent'

class EditGluonWrapper extends Component {
  state = {
    gluon: null,
    active: null,
    passive: null
  }

  componentDidMount() {
    this.setGluon()
  }

  componentDidUpdate(prevProps, prevState){
    const { gluon } = this.state;
    if (gluon) {
      if (!prevState.gluon || (gluon.identity !== prevState.gluon.identity)) {
        this.setActive(gluon.start_node)
        this.setPassive(gluon.end_node)
      }
    }
  }

  setGluon = async () => {
  	const result = await this.callAxios(`gluons/${this.props.match.params.id}`)
    const gluon = result.data
    this.setState({gluon})
  }
  setActive = async (identity) => {
  	const result = await this.callAxios(`quarks/${identity}`)
    const active = result.data
    this.setState({active})
  }
  setPassive = async (identity) => {
  	const result = await this.callAxios(`quarks/${identity}`)
    const passive = result.data
    this.setState({passive})
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
    const { gluon, active, passive } = this.state
    if (!gluon || !active || !passive) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <EditGluon initialValues={{...gluon.values, identity:this.props.match.params.id}}
                 active={active} passive={passive} />
    )
  }
}

export default EditGluonWrapper
