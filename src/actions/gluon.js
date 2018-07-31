import axios from 'axios';

import { // fetch gluon list
         FETCH_GLUONS, FETCH_GLUONS_FAILURE,
         // adding
         ADD_GLUON, ADD_GLUON_FAILURE,
         // editing
         FETCH_EDITING_GLUON, FETCH_EDITING_GLUON_FAILURE,
         EDIT_GLUON, EDIT_GLUON_FAILURE,
         // deleting
         DELETE_GLUON, DELETE_GLUON_FAILURE,
} from '../types/gluon';
import { API_URI } from '../statics';
import LoginUtil from '../utils/login';
import GluonUtil from '../utils/gluon';

export const fetchGluons = (quark, qtype_properties, privacy, limit = 100) => {
    const login_util = new LoginUtil();
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (!login_util.isLoggedIn(logged_in_user)) {
	logged_in_user = {}
	logged_in_user.username = 'dummy';
	logged_in_user.api_key_plain = 'dummy';
    }

    let endpoint = 'gluons'
    let privacy_level = ''
    if (parseInt(privacy) !== 1) {
	endpoint = 'private_gluons'
	privacy_level = privacy
    }

    return dispatch => {
	axios.get(`${API_URI}/${endpoint}/${quark.id}/${quark.quark_type_id}/${privacy_level}?limit=${limit}`, {
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: FETCH_GLUONS,
		    payload: {qtype_properties, quark, response: response.data}
		});
	    }).catch((response) => dispatch({
		type: FETCH_GLUONS_FAILURE,
		error: response.error
	    }))
    }
}

export const addGluon = (quark_id, form) => {
    const gluon_util = new GluonUtil();
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user)) {
	    return {
		type: ADD_GLUON_FAILURE,
		payload: false
	    };
	}

	let sendingForm = gluon_util.sanitizeFormData(form);
	let params = new URLSearchParams(sendingForm);
	axios.post(`${API_URI}/gluons/${quark_id}`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: ADD_GLUON,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: ADD_GLUON_FAILURE,
		error: response.error
	    }))
    }
}

export const fetchEditingGluon = (gluon_id) => {
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user)) {
	    return {
		type: ADD_GLUON_FAILURE,
		payload: false
	    };
	}
	axios.get(`${API_URI}/gluons/${gluon_id}`, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: FETCH_EDITING_GLUON,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: FETCH_EDITING_GLUON_FAILURE,
		error: response.error
	    }))
    }

}

export const editGluon = (form) => {
    const gluon_util = new GluonUtil();
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user) || !form.id ) {
	    return {
		type: EDIT_GLUON_FAILURE,
		payload: false
	    };
	}

	let sendingForm = gluon_util.sanitizeFormData(form);
	let params = new URLSearchParams(sendingForm);
	axios.patch(`${API_URI}/gluons/${form.id}`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: EDIT_GLUON,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: EDIT_GLUON_FAILURE,
		error: response.error
	    }))
    }
}


export const deleteGluon = (gluon_id) => {
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user)) {
	    return {
		type: DELETE_GLUON_FAILURE,
		payload: false
	    };
	}

	axios.delete(`${API_URI}/gluons/${gluon_id}`,  {
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: DELETE_GLUON,
		    payload: {gluon_id, response: response.data}
		});
	    }).catch((response) => dispatch({
		type: DELETE_GLUON_FAILURE,
		error: response.error
	    }))
    }
}

