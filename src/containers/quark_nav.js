// react
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
// redux
import { connect } from 'react-redux';
// action
import { deleteQuark, removeDeletedQuark } from '../actions/quark';
import { execLogout } from '../actions/login';
// common util
import LoginUtil from '../utils/login';


class QuarkNav extends Component {
    componentWillReceiveProps(nextProps) {
	if (nextProps.submit_count > this.props.submit_count) {
	    if (nextProps.deleted_quark) {
		if (!nextProps.deleted_quark.message) {
		    alert('Please login again');
		    this.props.execLogout();
		} else {
		    alert(nextProps.deleted_quark.message);
		}

		// NOTE: removeDeletedQuark is required, because this is located in navbar.
		this.props.removeDeletedQuark()
		if (nextProps.deleted_quark.status === 1) {
		    this.props.history.push('/subjects');
		}
	    }
	}
    }

    onDeleteClick = () => {
	let r = window.confirm(`Are you sure you want to delete ${this.props.current_quark.name}?`);
	if (r === true) {
	    this.props.deleteQuark(this.props.current_quark.id);
	}
    }

    render () {
        const { current_quark, logged_in_user } = this.props;

	var re = new RegExp("^/subjects/relations/");
	if (!re.test(this.props.location.pathname) || !current_quark) {
	    return '';
	}
	const login_util = new LoginUtil();
	if (!login_util.isAuthorized(logged_in_user, current_quark)) {
	    return '';
	}
	return (
           <li className="dropdown">
{/*
              <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Quark <span className="caret"></span></a>
*/}
              <button className="dropdown-toggle plain" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Quark <span className="caret"></span></button>
              <ul className="dropdown-menu">
                 <li><Link to={`/subjects/edit/${current_quark.id}`}>Edit Quark</Link></li>
                 <li>
{/*
<a href="javascript:void(0)" onClick={this.onDeleteClick}>Delete</a>
*/}
                    <button type="submit" className="plain" onClick={this.onDeleteClick}>Delete</button>
                 </li>
              </ul>
           </li>
	)
    }
}
export default withRouter(connect(state => state, { deleteQuark, removeDeletedQuark, execLogout })(QuarkNav));
