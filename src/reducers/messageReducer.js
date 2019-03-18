import * as types from '../actions/actionTypes';

const initialState = {
  chatroom_uid: 1,
  messages: [],
  message: '',
  loading: false
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case types.MESSAGES_LOADED_SUCCESS:
      return Object.assign({}, state, action.messages);
    case types.LOAD_MESSAGES:
      return Object.assign({}, state, {
        messages: action.payload,
        loading: false
      });
    case types.LOADING_MESSAGES:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}
