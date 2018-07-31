import { DELETE_QUARK, REMOVE_DELETED_QUARK } from '../types/quark';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {

    case DELETE_QUARK:
	return action.payload;

    case REMOVE_DELETED_QUARK:
       return initState

    default :
	return state
    }
}
