import { INIT_DETAIL } from '../types/detail';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {
    case INIT_DETAIL :
	return action.payload;
    default :
	return state
    }
}
