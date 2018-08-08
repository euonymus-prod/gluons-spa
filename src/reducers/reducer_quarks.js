import { FETCH_ONE_QUARK, FETCH_ONE_QUARK_FAILURE, FETCH_QUARKS, SEARCH_QUARKS, FETCH_PICKUPS, ADD_QUARK,
	 FETCH_EDITING_QUARK, EDIT_QUARK, DELETE_QUARK } from '../types/quark';
import { ADD_GLUON, EDIT_GLUON, DELETE_GLUON } from '../types/gluon';
import { FETCH_GLUONS } from '../types/gluon';
import { CHANGE_PRIVACY } from '../types/privacy';
import QuarkUtil from '../utils/quark';
import GluonUtil from '../utils/gluon';

const initState = {list: {}, quark_name2id: {}};
export default (state = initState, action) => {
    let quark_util = new QuarkUtil();
    
    let newQuarks = {};
    let newQuarkName2Id = {};

    switch(action.type) {
    case FETCH_ONE_QUARK:
    case FETCH_EDITING_QUARK:
	return {
	    list:{ ...state.list,
		  [action.payload.response.id]: quark_util.addExtendedInfo(action.payload.response, action.payload.qtype_properties)
		 },
	    quark_name2id: {...state.quark_name2id, [action.payload.response.name]: action.payload.response.id }
	};

    case FETCH_ONE_QUARK_FAILURE:
	return {
	    list:          state.list,
	    quark_name2id: state.quark_name2id,
	    error_message: 'failed to fetch'
	};

    case FETCH_GLUONS:
	// add quark_properties on current quark 
	let current_quark = quark_util.addExtendedInfo(state.list[action.payload.quark.id],action.payload.qtype_properties);

	// add glued quarks
	Object.keys(action.payload.response).map((value, index) => {
	    action.payload.response[value].map(x => {
		let gluon_util = new GluonUtil();
		let glued_quark = gluon_util.gluedQuark(action.payload.quark, x);
		if (!glued_quark) {
		    return false;
		}
		if (state.list[glued_quark.id] && state.list[glued_quark.id].is_gluon_fetched) {
		    return false;
		}
		newQuarks[glued_quark.id] = quark_util.addExtendedInfo(glued_quark, action.payload.qtype_properties);
		newQuarkName2Id[glued_quark.name] = glued_quark.id;
		return null
	    });
	    return null
	});

	// add gluons on current quark
	return {
	    list:{...state.list,
		  ...newQuarks,
		  [action.payload.quark.id]: quark_util.addGluons(current_quark, action.payload.response)
		 },
	    quark_name2id: {...state.quark_name2id, ...newQuarkName2Id}
	};

    case FETCH_QUARKS:
    case SEARCH_QUARKS:
    case FETCH_PICKUPS:
	action.payload.response.results.map(quark => {
	    quark = quark_util.addExtendedInfo(quark, action.payload.qtype_properties);

	    newQuarks[quark.id] = quark;
	    newQuarkName2Id[quark.name] = quark.id;
	    return null
	});
	return {
	    list:          {...state.list, ...newQuarks },
	    quark_name2id: {...state.quark_name2id, ...newQuarkName2Id }
	};

    case ADD_QUARK:
	let quark = {};
	if (action.payload.status === 1) {
	    quark = quark_util.addExtendedInfo(action.payload.result, null);
	    return {
		list:          { ...state.list, [quark.id]: quark },
		quark_name2id: {...state.quark_name2id, [quark.name]: quark.id }
	    };
	} else {
	    return state
	}

    // This should be optimized to be more presisely configured when reducer should return initState
    case CHANGE_PRIVACY:
    case EDIT_QUARK:
    case DELETE_QUARK:
    case ADD_GLUON:
    case EDIT_GLUON:
    case DELETE_GLUON:
	return initState

    default :
	return state
    }
}

