import axios from 'axios';
import { FETCH_GLUON_TYPES, FETCH_GLUON_TYPES_FAILURE } from '../types/gluon_types';
import { API_URI } from '../statics';

export const fetchGluonTypes = () => {
    let gluon_types = JSON.parse(localStorage.getItem('gluon_types'));
    if (gluon_types) {
	return {
	    type: FETCH_GLUON_TYPES,
	    payload: gluon_types
	};
    }

    return dispatch => {
	axios.get(`${API_URI}/gluon_types`)
	    .then((response) => {
		localStorage.setItem('gluon_types', JSON.stringify(response.data));
		dispatch({
		    type: FETCH_GLUON_TYPES,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: FETCH_GLUON_TYPES_FAILURE,
		error: response.error
	    }))
    }
}
