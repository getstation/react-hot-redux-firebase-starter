import * as firebase from 'firebase/firebase-browser';
import * as types from './actionTypes';

import { ajaxCallError, beginAjaxCall } from './ajaxStatusActions';

// Create a new message
export const createMessage = message => dispatch => {
  const messages = firebase.database().ref('/messages');
  const newMessage = messages.push();
  newMessage.set({ content: message.content, userId: message.userId });
  dispatch(loadMessages());
};

// Reload previous messages
export const loadMessages = () => dispatch => {
  dispatch(loadingMessages());
  const ref = firebase.database().ref('/messages');
  let messages = [];
  ref.orderByKey().on('child_added', message => {
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
