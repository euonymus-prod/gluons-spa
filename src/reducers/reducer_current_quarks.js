import { FETCH_QUARKS, FETCH_QUARKS_FAILURE, SEARCH_QUARKS, SEARCH_QUARKS_FAILURE, INIT_QUARKS } from '../types/quark';
import { CHANGE_PRIVACY } from '../types/privacy';

const initState = {results:[], pagination:{current_page:0, has_next:true, has_prev:false}};
export default (state = initState, action) => {
  
  switch(action.type) {

    case FETCH_QUARKS:
    case SEARCH_QUARKS:
	    //return action.payload.response;
	    //console.log([...state, ...action.payload.response]);
	    // return [...state, ...action.payload.response];
	    return {results:[...state.results, ...action.payload.response.results], pagination:action.payload.response.pagination};

    case FETCH_QUARKS_FAILURE:
    case SEARCH_QUARKS_FAILURE:
	    //return [{'error': 'failed to fetch'}]
	    return {results:[], pagination:{current_page:0, has_next:false, has_prev:false}, error: 'failed to fetch'};

    case INIT_QUARKS:
    case CHANGE_PRIVACY:
	    return initState

    default :
	    return state
  }
}
