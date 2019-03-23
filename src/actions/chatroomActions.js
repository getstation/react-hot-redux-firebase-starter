import * as firebase from 'firebase/firebase-browser';
import * as types from './actionTypes';

// Create a new chat room
export const createChatRoom = (name, userId) => dispatch => {
  const ref = firebase.database().ref('/chatrooms');
  const newRoom = ref.push();
  newRoom.set({ name: name, participants: [userId] });
  dispatch(loadChatRooms());
};

// Load chat rooms
export const loadChatRooms = () => dispatch => {
  dispatch(loadingChatRooms());
  const ref = firebase.database().ref('/chatrooms');
  /* eslint-disable no-console */
  ref
    .once('value')
    .then(rooms => {
      dispatch({
        type: types.LOAD_CHATROOMS,
        payload: rooms.val()
      });
    })
    .catch(err => console.log(err));
};

// Loading chat rooms
export const loadingChatRooms = () => {
  return {
    type: types.LOADING_CHATROOMS
  };
};

// Join room
export const joinRoom = (roomUID, userUID, participants) => dispatch => {
  firebase
    .database()
    .ref(`/chatrooms/${roomUID}`)
    .update({ participants: [...participants, userUID] });
  dispatch({
    type: types.JOIN_ROOM,
    userUID: userUID
  });
  dispatch(loadChatRooms());
};

// Set active chat room
export const setActiveChatRoom = (key, room) => dispatch => {
  const messages = room['messages'] === undefined ? {} : room['messages'];
  const activeRoom = {
    uid: key,
    messages: messages,
    name: room['name'],
    participants: room['participants']
  };
  dispatch({
    type: types.SET_ACTIVE_ROOM,
    payload: activeRoom
  });
};
