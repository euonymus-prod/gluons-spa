import axios from 'axios';

import {
         // preparation for current quark
	 FETCH_ONE_QUARK, FETCH_ONE_QUARK_FAILURE, FETCH_ONE_QUARK_NOT_FOUND,
	 CHANGE_CURRENT_QUARK,
         // fetch quark list
         FETCH_QUARKS, FETCH_QUARKS_FAILURE,
         FETCH_PICKUPS, FETCH_PICKUPS_FAILURE,
         // search quark
         SEARCH_QUARKS, SEARCH_QUARKS_FAILURE,
         // adding
         ADD_QUARK, ADD_QUARK_FAILURE,
         // editing
         FETCH_EDITING_QUARK, FETCH_EDITING_QUARK_FAILURE,
         READ_EDITING_QUARK, READ_EDITING_QUARK_FAILURE,
         EDIT_QUARK, EDIT_QUARK_FAILURE,
         // deleting
         DELETE_QUARK, DELETE_QUARK_FAILURE,
         REMOVE_DELETED_QUARK,
} from '../types/quark';
import { API_URI } from '../statics';
import LoginUtil from '../utils/login';
import QuarkUtil from '../utils/quark';

export const fetchCurrentQuark = (quark_name, qtype_properties, privacy) => {
    const login_util = new LoginUtil();
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (!login_util.isLoggedIn(logged_in_user)) {
	logged_in_user = {}
	logged_in_user.username = 'dummy';
	logged_in_user.api_key_plain = 'dummy';
    }

    let endpoint = 'quarks'
    let privacy_level = ''
    if (parseInt(privacy) !== 1) {
	endpoint = 'private_quarks'
	privacy_level = privacy
    }

    return dispatch => {
	axios.get(`${API_URI}/${endpoint}/name/${quark_name}/${privacy_level}`, {
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		if (response.data.status && response.data.status == 0) {
		    dispatch({
			type: FETCH_ONE_QUARK_NOT_FOUND,
			payload: response.data
		    });
		} else {
		    dispatch({
			type: FETCH_ONE_QUARK,
			payload: {qtype_properties, response: response.data}
		    });
		}
	    }).catch((response) => dispatch({
		type: FETCH_ONE_QUARK_FAILURE,
		error: response.error
	    }))
    }
}
export const changeCurrentQuark = (quark) => {
    return {
	type: CHANGE_CURRENT_QUARK,
	payload: quark
    };
}

export const fetchQuarks = (qtype_properties, privacy, limit = 100, page = 1) => {
    const login_util = new LoginUtil();
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (!login_util.isLoggedIn(logged_in_user)) {
	logged_in_user = {}
	logged_in_user.username = 'dummy';
	logged_in_user.api_key_plain = 'dummy';
    }

    let endpoint = 'quarks'
    let privacy_level = ''
    if (parseInt(privacy) !== 1) {
	endpoint = 'private_quarks'
	privacy_level = privacy
    }

    return dispatch => {
	axios.get(`${API_URI}/${endpoint}/${privacy_level}?limit=${limit}&page=${page}`, {
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: FETCH_QUARKS,
		    payload: {qtype_properties, response: response.data}
		});
	    }).catch((response) => dispatch({
		type: FETCH_QUARKS_FAILURE,
		error: response.error
	    }))
    }
}

export const fetchPickups = (qtype_properties) => {
    return dispatch => {
	axios.get(`${API_URI}/quarks?is_pickup=1`)
	    .then((response) => {
		dispatch({
		    type: FETCH_PICKUPS,
		    payload: {qtype_properties, response: response.data.results}
		});
	    }).catch((response) => dispatch({
		type: FETCH_PICKUPS_FAILURE,
		error: response.error
	    }))
    }
}

export const searchQuarks = (qtype_properties, keywords, privacy, limit = 100, page = 1) => {
    const login_util = new LoginUtil();
    let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
    if (!login_util.isLoggedIn(logged_in_user)) {
	logged_in_user = {}
	logged_in_user.username = 'dummy';
	logged_in_user.api_key_plain = 'dummy';
    }

    let endpoint = 'quarks'
    let privacy_level = ''
    if (parseInt(privacy) !== 1) {
	endpoint = 'private_quarks'
	privacy_level = privacy
    }

    return dispatch => {
	axios.get(`${API_URI}/${endpoint}/${privacy_level}?keywords=${keywords}&limit=${limit}&page=${page}`, {
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: SEARCH_QUARKS,
		    payload: {qtype_properties, response: response.data}
		});
	    }).catch((response) => dispatch({
		type: SEARCH_QUARKS_FAILURE,
		error: response.error
	    }))
    }
}

export const addQuark = (form) => {
    const quark_util = new QuarkUtil();
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user)) {
	    return {
		type: ADD_QUARK_FAILURE,
		payload: false
	    };
	}

	// let params = new URLSearchParams();
	// Object.keys(form).map((value, index) => {
	//     params.append(value, form[value]);
	// });
	let sendingForm = quark_util.sanitizeFormData(form);
	let params = new URLSearchParams(sendingForm);
	axios.post(`${API_URI}/quarks`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: ADD_QUARK,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: ADD_QUARK_FAILURE,
		error: response.error
	    }))
    }
}

export const fetchEditingQuark = (quark_id, qtype_properties) => {
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user) ) {
	    return {
		type: FETCH_EDITING_QUARK_FAILURE,
		payload: false
	    };
	}

	axios.get(`${API_URI}/quarks/${quark_id}`, {
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: FETCH_EDITING_QUARK,
		    payload: {qtype_properties, response: response.data}
		});
	    }).catch((response) => dispatch({
		type: FETCH_EDITING_QUARK_FAILURE,
		error: response.error
	    }))
    }
}
export const readEditingQuark = (quark_id, quarks) => {
    if (!quarks || !quarks.list || Object.keys(quarks.list).length == 0) {
	return {
	    type: READ_EDITING_QUARK_FAILURE,
	    payload: null
	};
    }
    return {
	type: READ_EDITING_QUARK,
	payload: quarks.list[quark_id]
    };
}
export const editQuark = (form) => {
    const quark_util = new QuarkUtil();
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user) || !form.id ) {
	    return {
		type: EDIT_QUARK_FAILURE,
		payload: false
	    };
	}

	let sendingForm = quark_util.sanitizeFormData(form);
	let params = new URLSearchParams(sendingForm);
	axios.patch(`${API_URI}/quarks/${form.id}`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: EDIT_QUARK,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: EDIT_QUARK_FAILURE,
		error: response.error
	    }))
    }
}

export const deleteQuark = (quark_id) => {
    const login_util = new LoginUtil();
    return dispatch => {
	let logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
	if (!login_util.isLoggedIn(logged_in_user)) {
	    return {
		type: DELETE_QUARK_FAILURE,
		payload: false
	    };
	}

	axios.delete(`${API_URI}/quarks/${quark_id}`, {
	    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    auth: {
		username: logged_in_user.username,
		password: logged_in_user.api_key_plain
	    }
	})
	    .then((response) => {
		dispatch({
		    type: DELETE_QUARK,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: DELETE_QUARK_FAILURE,
		error: response.error
	    }))
    }
}

export const removeDeletedQuark = () => {
    return {
       type: REMOVE_DELETED_QUARK,
       payload: null
    };
}
