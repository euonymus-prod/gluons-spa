import axios from 'axios';

import { SEND_CONTACT_FORM, SEND_CONTACT_FORM_FAILURE } from '../types/contact';
import { API_URI } from '../statics';
import LoginUtil from '../utils/login';

export const sendContactForm = (form) => {
    return dispatch => {
	let params = new URLSearchParams(form);
	axios.post(`${API_URI}/contacts`, params, {
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	})
	    .then((response) => {
		dispatch({
		    type: SEND_CONTACT_FORM,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: SEND_CONTACT_FORM_FAILURE,
		error: response.error
	    }))
    }
}
