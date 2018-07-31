import axios from 'axios';
import { FETCH_QUARK_TYPES, FETCH_QUARK_TYPES_FAILURE } from '../types/quark_types';
import { API_URI } from '../statics';

export const fetchQuarkTypes = () => {
    let quark_types = JSON.parse(localStorage.getItem('quark_types'));
    if (quark_types) {
	return {
	    type: FETCH_QUARK_TYPES,
	    payload: quark_types
	};
    }

    return dispatch => {
	axios.get(`${API_URI}/quark_types`)
	    .then((response) => {
		localStorage.setItem('quark_types', JSON.stringify(response.data));
		dispatch({
		    type: FETCH_QUARK_TYPES,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: FETCH_QUARK_TYPES_FAILURE,
		error: response.error
	    }))
    }
}
