import { SEND_CONTACT_FORM } from '../types/contact';

const initState = null;
export default (state = initState, action) => {
    switch(action.type) {
    case SEND_CONTACT_FORM :
	return action.payload;

    default :
	return state
    }
}
