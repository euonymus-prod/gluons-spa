import { INIT_PRIVACY, CHANGE_PRIVACY } from '../types/privacy';

const initState = 1;
export default (state = initState, action) => {
    switch(action.type) {
    case INIT_PRIVACY:
	return action.payload;

    case CHANGE_PRIVACY:
	return action.payload;

    default :
	return state
    }
}
