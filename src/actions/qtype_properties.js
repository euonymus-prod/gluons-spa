import axios from 'axios';
import { INIT_QTYPE_PROPERTIES, INIT_QTYPE_PROPERTIES_FAILURE } from '../types/qtype_property';
import { API_URI } from '../statics';

export const initQtypeProperties = () => {
    let qtype_properties = JSON.parse(localStorage.getItem('qtype_properties'));
    if (qtype_properties) {
	return {
	    type: INIT_QTYPE_PROPERTIES,
	    payload: qtype_properties
	};
    }

    return dispatch => {
	axios.get(`${API_URI}/qtype_properties`)
	    .then((response) => {
		localStorage.setItem('qtype_properties', JSON.stringify(response.data));
		dispatch({
		    type: INIT_QTYPE_PROPERTIES,
		    payload: response.data
		});
	    }).catch((response) => dispatch({
		type: INIT_QTYPE_PROPERTIES_FAILURE,
		error: response.error
	    }))
    }
}
