import { SESSION_STARTED } from '../constants/action_types'

const initState = true
export default (state = initState, action) => {
  switch(action.type) {

    case SESSION_STARTED:
	    return false

    default :
	    return state
  }
}
