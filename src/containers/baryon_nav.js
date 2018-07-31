// react
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
// redux
import { connect } from 'react-redux';
// common util
import LoginUtil from '../utils/login';

class BaryonNav extends Component {
    renderGoToBaryon = (quark_id) => {
	return (
           <li><Link to={`/baryons/quark/${quark_id}`}>Go to Baryon</Link></li>
	);
    }

    render () {
        const { current_quark, logged_in_user } = this.props;
	const login_util = new LoginUtil();
	if (!login_util.isLoggedIn(logged_in_user)) {
	    return '';
	}
	var re = new RegExp("^\/subjects\/relations\/");
	if (!re.test(this.props.location.pathname) || !current_quark) {
	    return '';
        }
	return (
           <li className="dropdown">
              <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Baryon<span className="caret"></span></a>
              <ul className="dropdown-menu">
                 <li><Link to={'/baryons'}>My Baryons</Link></li>
                 {this.renderGoToBaryon(this.props.current_quark.id)}
              </ul>
           </li>
	)
    }
}
export default withRouter(connect(state => state)(BaryonNav));
