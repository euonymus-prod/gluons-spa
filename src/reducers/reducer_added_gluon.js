import { ADD_GLUON } from '../types/gluon';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {

    case ADD_GLUON:
	return action.payload;

    default :
	return state
    }
}
