import { INIT_QTYPE_PROPERTIES } from '../types/qtype_property';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {
    case INIT_QTYPE_PROPERTIES :
	return action.payload;
    default :
	return state
    }
}
