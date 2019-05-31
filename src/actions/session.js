import { SESSION_STARTED } from '../constants/action_types'

export const sessionStarted = () => {
  return {
	  type: SESSION_STARTED,
	  payload: true
  };
}
