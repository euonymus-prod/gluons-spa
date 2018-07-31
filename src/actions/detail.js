import { INIT_DETAIL } from '../types/detail';

export const initDetail = (sub_gluon_side) => {
    return dispatch => {
	if (!['active', 'none'].includes(sub_gluon_side)) {
            sub_gluon_side = 'active';
	}
	dispatch({
	    type: INIT_DETAIL,
	    payload: sub_gluon_side
	})
    }
}
