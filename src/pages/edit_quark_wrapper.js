// react
import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import LoggedinOnly from '../containers/loggedin_only'
import EditQuark     from '../containers/edit_quark'
import Api from '../utils/api'

class EditQuarkWrapper extends Component {
  state = {
    quark: null
  }

  componentDidMount() {
    this.setQuark()
  }

  setQuark = async () => {
    const api = new Api()
    const result = await api.call(`quarks/${this.props.match.params.id}`, 'get')
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
        <EditQuark initialValues={{...quark.values, identity:this.props.match.params.id}} />
      </LoggedinOnly>
    )
  }
}

export default connect(state => state, {})(EditQuarkWrapper)
