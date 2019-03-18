import * as firebase from 'firebase/firebase-browser';
import * as types from './actionTypes';

// Create a new message
export const createMessage = (message, key) => dispatch => {
  const ref = firebase.database().ref(`/chatrooms/${key}/messages`);
  const newMessage = ref.push();
  newMessage.set({ content: message.content, userId: message.userId });
};

// Reload previous messages
export const loadMessages = key => dispatch => {
  dispatch(loadingMessages());
  const ref = firebase.database().ref(`/chatrooms/${key}/messages`);
  let messages = [];
  ref.on('child_added', message => {
    messages = [
      ...messages,
      {
        content: message.val().content,
        uid: message.key,
        userId: message.val().userId
      }
    ];
    dispatch({
      type: types.LOAD_MESSAGES,
      payload: messages
    });
  });
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
  ref
    .remove()
    .then(() => console.log('Messages deleted.'))
    .catch(err => console.log(err));
};
