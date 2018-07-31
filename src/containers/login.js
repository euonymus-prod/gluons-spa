/*
  Thanks to react-router-last-location
  github : https://github.com/hinok/react-router-last-location
*/
// react
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
// redux
import { connect } from 'react-redux';
// action
import {execLogin} from '../actions/login';
// component
import Navbar from './navbar';
// common util
import LoginUtil from '../utils/login';


class Login extends Component {
    state = {
	username: '',
	password: []
    };

    handleUsernameChange = (event) => {
	this.setState({username: event.target.value});
    }
    handlePasswordChange = (event) => {
	this.setState({password: event.target.value});
    }
    handleLogin = (event) => {
	event.preventDefault();
	this.props.execLogin(this.state.username, this.state.password);
    };

 render () {
     const { logged_in_user, lastLocation } = this.props

     const login_util = new LoginUtil();
     if (login_util.isLoggedIn(logged_in_user)) {
	 let redirectLocation = '/';
	 if (lastLocation && (lastLocation.pathname != '/signup') && (lastLocation.pathname != '/login')) {
	     redirectLocation = lastLocation;
	 }
	 return (
	    <Redirect to={redirectLocation} />
	 );
     }

  return (
      <div>
         <Navbar />
      <div className="container">
         <div className="logo-top">
            <h1>Login</h1>
            <p>Login to create your own gluons</p>
         </div>
         <div>
            <form method="post" acceptCharset="utf-8" className="search_top text-centerh" onSubmit={this.handleLogin}>
               <div style={{display:'none'}}><input type="hidden" name="_method" value="POST"/></div>
               <div className="form-group center-block input-container-signup">
                  <div className="input text required">
                     <label htmlFor="username">Username</label>
                     <input type="text" name="username" className="form-control" id="username" required="required" maxLength="50"
                            value={this.state.username}
                            onChange={this.handleUsernameChange} />
                  </div>
                  <div className="input password required">
                     <label htmlFor="password">Password</label>
                     <input type="password" name="password" className="form-control" id="password" required="required"
                            value={this.state.password}
                            onChange={this.handlePasswordChange} />
                  </div>
                  <br />
                  <button className="btn btn-primary" type="button" type="submit">Login</button>
               </div>
            </form>
         </div>
      </div>
      </div>
  )
 }
}
// export default connect(state => state)(Login);
export default connect(state => state, { execLogin })(withLastLocation(Login));
