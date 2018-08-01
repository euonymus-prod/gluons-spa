import { CHANGE_CURRENT_QUARK, EDIT_QUARK, FETCH_ONE_QUARK_NOT_FOUND } from '../types/quark';
import { FETCH_GLUONS, FETCH_GLUONS_FAILURE,
	 ADD_GLUON, EDIT_GLUON, DELETE_GLUON } from '../types/gluon';
import { CHANGE_PRIVACY } from '../types/privacy';
import Util from '../utils/common';
import QuarkUtil from '../utils/quark';

const initState = null;
export default (state = initState, action) => {
    let copiedState = JSON.parse(JSON.stringify(state));
    switch(action.type) {

    case CHANGE_CURRENT_QUARK :
    case EDIT_QUARK:
	let util = new Util();
	action.payload.period_str = util.period2str(action.payload);
	return action.payload;


    case FETCH_GLUONS :
	let quark_util = new QuarkUtil();
	if (state.id === action.payload.quark.id) {
		copiedState = quark_util.addGluons(copiedState, action.payload.response);
	}	
	return copiedState;

    case FETCH_ONE_QUARK_NOT_FOUND:
	return action.payload
	
    // This should be optimized to be more presisely configured when reducer should return initState
    case CHANGE_PRIVACY:
    case ADD_GLUON:
    case EDIT_GLUON:
    case DELETE_GLUON:
	return initState

    // TODO: This should be designed little more specificly
    case FETCH_GLUONS_FAILURE:
    default :
	return state
    }
}
