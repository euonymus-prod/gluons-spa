import { FETCH_PICKUPS } from '../types/quark';

const initState = [];
export default (state = initState, action) => {
    switch(action.type) {

    case FETCH_PICKUPS :
	return action.payload.response;

    default :
	return state
    }
}
