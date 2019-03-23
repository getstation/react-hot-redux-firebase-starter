import * as types from '../actions/actionTypes';

const initialState = {
  messages: {},
  loading: false
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case types.MESSAGES_LOADED_SUCCESS:
      return Object.assign({}, state, action.messages);
    case types.LOAD_MESSAGES:
      return Object.assign({}, state, {
        messages: Object.assign({}, state.messages, action.payload),
        loading: false
      });
    case types.ADD_NEW_MESSAGE:
      return Object.assign({}, state, {
        messages: Object.assign({}, state.messages, {
          [action.activeRoomUID]: Object.assign(
            {},
            state.messages[action.activeRoomUID],
            {
              [action.payload.key]: action.payload.val(),
              unread: state.messages[action.activeRoomUID].unread + 1
            }
          )
        }),
        loading: false
      });
    case types.CLEAR_UNREAD:
      return Object.assign({}, state, {
        messages: Object.assign({}, state.messages, {
          [action.activeRoomUID]: Object.assign(
            {},
            state.messages[action.activeRoomUID],
            {
              unread: 0
            }
          )
        })
      });
    case types.LOADING_MESSAGES:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}
