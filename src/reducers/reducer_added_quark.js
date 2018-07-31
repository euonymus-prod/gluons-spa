import { ADD_QUARK } from '../types/quark';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {

    case ADD_QUARK:
	return action.payload;

    default :
	return state
    }
}
