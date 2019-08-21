// react
import React, { Component } from 'react'
// redux
import AddQuark     from '../containers/add_quark'
import LoggedinOnly from '../containers/loggedin_only'

class AddQuarkWrapper extends Component {
  render () {
    return (
      <LoggedinOnly>
        <AddQuark />
      </LoggedinOnly>
    )
  }
}

export default AddQuarkWrapper
