import { FETCH_QUARK_TYPES } from '../types/quark_types';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {
    case FETCH_QUARK_TYPES :
	return action.payload;
    default :
	return state
    }
}
