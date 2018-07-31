import axios  from 'axios';

import { INIT_LOGIN, EXEC_LOGIN, EXEC_LOGIN_FAILURE, EXEC_LOGOUT, EXEC_SIGNUP, EXEC_SIGNUP_FAILURE } from '../types/login';
import { API_URI } from '../statics';

export const initLogin = () => {
    let payload = null
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (logged_in_user) {
	payload = logged_in_user
    }
    return {
	type: INIT_LOGIN,
	payload
    };
}

export const execLogin = (username, password) => {
    return dispatch => {
	let params = new URLSearchParams();
	params.append('username', username);
	params.append('password', password);

	axios.post(`${API_URI}/login`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	    .then((response) => {
		localStorage.setItem('logged_in_user', JSON.stringify(response.data));
		dispatch({
		    type: EXEC_LOGIN,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: EXEC_LOGIN_FAILURE,
		error: response.error
	    }))
    }
}

export const execLogout = () => {
    localStorage.setItem('logged_in_user', null);
    localStorage.setItem('qtype_properties', null);
    localStorage.setItem('privacy_mode', null);
    localStorage.setItem('quark_types', null);
    localStorage.setItem('gluon_types', null);
    return {
	type: EXEC_LOGOUT,
	payload: null
    };
}

export const execSignup = (username, password) => {
    // If it's logged in, signup cannot be executed
    let payload = null
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (logged_in_user) {
	payload = logged_in_user
	return {
	    type: EXEC_SIGNUP,
	    payload
	};
    }

    return dispatch => {
	let params = new URLSearchParams();
	params.append('username', username);
	params.append('password', password);

	axios.post(`${API_URI}/signup`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	    .then((response) => {
		localStorage.setItem('logged_in_user', JSON.stringify(response.data));
		dispatch({
		    type: EXEC_SIGNUP,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: EXEC_SIGNUP_FAILURE,
		error: response.error
	    }))
    }
}
