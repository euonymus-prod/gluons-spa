import { READ_EDITING_QUARK, EDIT_QUARK } from '../types/quark';
import Util from '../utils/common';

const initState = null;
export default (state = initState, action) => {
    let util = new Util();
    switch(action.type) {

    case READ_EDITING_QUARK:
	action.payload['status'] = -1;
	action.payload['start'] = util.date2str(action.payload['start'], 'day');
	action.payload['end'] = util.date2str(action.payload['end'], 'day');
	return action.payload;

    case EDIT_QUARK:
	return action.payload;

    default :
	return state
    }
}

