import { FETCH_EDITING_GLUON, EDIT_GLUON } from '../types/gluon';
import Util from '../utils/common';

const initState = null;
export default (state = initState, action) => {
    let util = new Util();
    switch(action.type) {

    case FETCH_EDITING_GLUON:
	if (action.payload['status'] == 0) {
	    action.payload['message'] = 'Please login';
	} else {
	    action.payload['status'] = -1;
	}
	action.payload['start'] = util.date2str(action.payload['start'], 'day');
	action.payload['end'] = util.date2str(action.payload['end'], 'day');
	return action.payload;

    case EDIT_GLUON:
	return action.payload;

    default :
	return state
    }
}

