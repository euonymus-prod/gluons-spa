// react
import React, { Component } from 'react'
// redux
import AddGluon     from '../containers/add_gluon'
import LoggedinOnly from '../containers/loggedin_only'
import Api from '../utils/api'

class AddGluonWrapper extends Component {
  state = {
    quark: null
  }

  componentDidMount() {
    this.setQuark()
  }

  setQuark = async () => {
    const api = new Api()
    const result = await api.call(`quarks/${this.props.match.params.quark_id}`, 'get')
    const quark = result.data
    this.setState({quark})
  }

  render () {
    const { quark } = this.state
    if (!quark) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <LoggedinOnly>
        <AddGluon subject_quark={{...quark.values, identity:this.props.match.params.quark_id}} />
      </LoggedinOnly>
    )
  }
}

export default AddGluonWrapper
