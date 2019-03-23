import * as firebase from 'firebase/firebase-browser';
import * as types from './actionTypes';
import isEmpty from '../utilities/is-empty';

// Create a new message
export const createMessage = (message, key) => dispatch => {
  const ref = firebase.database().ref(`/chatrooms/${key}/messages`);
  const newMessage = ref.push();
  newMessage.set({ content: message.content, userId: message.userId });
};

// Track new message added
export const addNewMessage = key => dispatch => {
  const ref = firebase.database().ref(`/chatrooms/${key}/messages`);
  ref.limitToLast(1).on('child_added', message => {
    dispatch({
      type: types.ADD_NEW_MESSAGE,
      payload: message,
      activeRoomUID: key
    });
  });
};

// Reload previous messages
export const loadLastTenMessages = key => dispatch => {
  dispatch(loadingMessages());
  const ref = firebase.database().ref(`/chatrooms/${key}/messages`);
  ref
    .limitToLast(10)
    .once('value')
    .then(messages => {
      let payload = { [key]: Object.assign({}, messages.val(), { unread: 0 }) };
      if (isEmpty(messages.val())) {
        payload = {};
      }
      dispatch({
        type: types.LOAD_MESSAGES,
        payload: payload,
        activeRoomUID: key
      });
    });
  dispatch(addNewMessage(key));
};

// Clear unread messages
export const clearUnread = key => {
  return {
    type: types.CLEAR_UNREAD,
    activeRoomUID: key
  };
};

// Loading messages
export const loadingMessages = () => {
  return {
    type: types.LOADING_MESSAGES
  };
};

// Delete ALL messages
export const deleteAllMessages = () => dispatch => {
  const ref = firebase.database().ref('/messages');
  /* eslint-disable no-console */
  ref
    .remove()
    .then(() => console.log('Messages deleted.'))
    .catch(err => console.log(err));
};
