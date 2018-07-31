import _ from 'lodash';
import { FETCH_ONE_QUARK, FETCH_ONE_QUARK_FAILURE, FETCH_QUARKS, SEARCH_QUARKS, FETCH_PICKUPS, ADD_QUARK,
	 FETCH_EDITING_QUARK, EDIT_QUARK, DELETE_QUARK } from '../types/quark';
import { ADD_GLUON, EDIT_GLUON, DELETE_GLUON } from '../types/gluon';
import { FETCH_GLUONS } from '../types/gluon';
import { CHANGE_PRIVACY } from '../types/privacy';
import Util from '../utils/common';
import QuarkUtil from '../utils/quark';
import GluonUtil from '../utils/gluon';

const initState = {list: {}, quark_name2id: {}};
export default (state = initState, action) => {
    let copiedState = JSON.parse(JSON.stringify(state));
    let quark_util = new QuarkUtil();
    
    let newQuarks = {};
    let newQuarkName2Id = {};
    let quark = {};

    switch(action.type) {
    case FETCH_ONE_QUARK:
	quark = quark_util.addExtendedInfo(action.payload.response, action.payload.qtype_properties);
	newQuarks = {
	    list:          { ...state.list, [quark.id]: quark },
	    quark_name2id: {...state.quark_name2id, [quark.name]: quark.id }
	};
	return newQuarks;
    case FETCH_ONE_QUARK_FAILURE:
	newQuarks = {
	    list:          state.list,
	    quark_name2id: state.quark_name2id,
	    error_message: 'failed to fetch'
	};
	return newQuarks;

    case FETCH_EDITING_QUARK:
	quark = quark_util.addExtendedInfo(action.payload.response, action.payload.qtype_properties);
	newQuarks = {
	    list:          { ...state.list, [quark.id]: quark },
	    quark_name2id: {...state.quark_name2id, [quark.name]: quark.id }
	};
	return newQuarks;
    case FETCH_GLUONS:
	// add gluons on current quark 
	let current_quark = JSON.parse(JSON.stringify(quark_util.addExtendedInfo(copiedState.list[action.payload.quark.id], action.payload.qtype_properties)));
	copiedState.list[action.payload.quark.id] = quark_util.addGluons(current_quark, action.payload.response);

	// add quarks on gluons
	Object.keys(action.payload.response).map((value, index) => {
	    action.payload.response[value].map(x => {
		let gluon_util = new GluonUtil();
		quark = gluon_util.gluedQuark(action.payload.quark, x);
		if (!quark) {
		    return false;
		}
		if (state.list[quark.id] && state.list[quark.id].is_gluon_fetched) {
		    return false;
		}
		quark = quark_util.addExtendedInfo(quark, action.payload.qtype_properties);

		newQuarks[quark.id] = quark;
		newQuarkName2Id[quark.name] = quark.id;
	    });
	});
	copiedState = {
	    list:          {...copiedState.list, ...newQuarks },
	    quark_name2id: {...state.quark_name2id, ...newQuarkName2Id }
	};
	return copiedState;

    case FETCH_QUARKS:
    case SEARCH_QUARKS:
	action.payload.response.results.map(quark => {
	    quark = quark_util.addExtendedInfo(quark, action.payload.qtype_properties);

	    newQuarks[quark.id] = quark;
	    newQuarkName2Id[quark.name] = quark.id;
	});
	copiedState = {
	    list:          {...copiedState.list, ...newQuarks },
	    quark_name2id: {...state.quark_name2id, ...newQuarkName2Id }
	};

	return copiedState;

    case FETCH_PICKUPS:
	action.payload.response.map(quark => {
	    quark = quark_util.addExtendedInfo(quark, action.payload.qtype_properties);

	    newQuarks[quark.id] = quark;
	    newQuarkName2Id[quark.name] = quark.id;
	});
	copiedState = {
	    list:          {...copiedState.list, ...newQuarks },
	    quark_name2id: {...state.quark_name2id, ...newQuarkName2Id }
	};
	return copiedState;

    case ADD_QUARK:
	if (action.payload.status == 1) {
	    quark = quark_util.addExtendedInfo(action.payload.result, null);
	    let newState = {
		list:          { ...state.list, [quark.id]: quark },
		quark_name2id: {...state.quark_name2id, [quark.name]: quark.id }
	    };
	    return newState;
	} else {
	    return state
	}

    // This should be optimized to be more presisely configured when reducer should return initState
    case CHANGE_PRIVACY:
    case ADD_QUARK:
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

