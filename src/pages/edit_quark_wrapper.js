// react
import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import LoggedinOnly from '../containers/loggedin_only'
import EditQuark     from '../containers/edit_quark'
import Util from '../utils/common';
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

    let util = new Util();
	  quark.values.start = util.date2str(quark.values.start, 'day');
	  quark.values.end = util.date2str(quark.values.end, 'day');
    return (
      <LoggedinOnly>
        <EditQuark initialValues={{...quark.values}} />
      </LoggedinOnly>
    )
  }
}

export default connect(state => state, {})(EditQuarkWrapper)
