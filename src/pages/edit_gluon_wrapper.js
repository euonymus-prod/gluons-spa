// react
import React, { Component } from 'react'
// redux
import LoggedinOnly from '../containers/loggedin_only'
import EditGluon     from '../containers/edit_gluon'
// import LoginUtil from '../utils/login'
// import { API_URI, RETRY_LIMIT, NO_RETRY_CODE } from '../constants/config'
// import AxiosAgent from 'axios-agent'
import Api from '../utils/api'

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
    const api = new Api()
    const result = await api.call(`gluons/${this.props.match.params.id}`, 'get')
    const gluon = result.data
    this.setState({gluon})
  }
  setActive = async (identity) => {
    const api = new Api()
    const result = await api.call(`quarks/${identity}`, 'get')
    const active = result.data
    this.setState({active})
  }
  setPassive = async (identity) => {
    const api = new Api()
    const result = await api.call(`quarks/${identity}`, 'get')
    const passive = result.data
    this.setState({passive})
  }

  render () {
    const { gluon, active, passive } = this.state
    if (!gluon || !active || !passive) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <LoggedinOnly>
        <EditGluon initialValues={{...gluon.values, identity:this.props.match.params.id}}
                   active={active} passive={passive} />
      </LoggedinOnly>
    )
  }
}

export default EditGluonWrapper
