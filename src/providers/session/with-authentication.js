import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../firebase'
import * as LOCALSTORAGE from '../../constants/localstorage'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: JSON.parse(localStorage.getItem(LOCALSTORAGE.AUTH_USER))
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem(LOCALSTORAGE.AUTH_USER, JSON.stringify(authUser))
          this.setState({ authUser })
        },
        () => {
          localStorage.removeItem(LOCALSTORAGE.AUTH_USER)
          this.setState({ authUser: null })
        }
      )
    }

    componentWillUnmount() {
      // To avoid memory leaks
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
