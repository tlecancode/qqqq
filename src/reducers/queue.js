import {
  FETCH_Q
} from '../actions/QAction.js'

export default function q(state = {
  department: {
    name: '',
    doctor_name: '',
    doctor_position: ''
  },
  queue: []
}, action) {
  switch (action.type) {
    case FETCH_Q:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}
