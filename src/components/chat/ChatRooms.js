import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import isEmpty from '../../utilities/is-empty';
import {
  createChatRoom,
  loadChatRooms,
  setActiveChatRoom
} from '../../actions/chatroomActions';
import {
  addNewMessage,
  loadLastTenMessages,
  clearUnread
} from '../../actions/messageActions';

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingRoom: false,
      roomName: ''
    };

    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
    this.cancelCreateRoom = this.cancelCreateRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  componentDidMount() {
    this.props.loadChatRooms();
    if (
      isEmpty(this.props.chatroom.activeChatroom) &&
      !isEmpty(this.props.chatroom.rooms)
    ) {
      this.setActiveRoom(
        Object.keys(this.props.chatroom.rooms)[0],
        Object.values(this.props.chatroom.rooms)[0]
      );
      Object.keys(this.props.chatroom.rooms).map(key => {
        return this.props.loadLastTenMessages(key);
      });
    }
  }

  handleCreateRoom() {
    this.setState({ creatingRoom: true });
  }

  handleCreateRoomSubmit(event) {
    event.preventDefault();
    if (isEmpty(this.state.roomName)) return;
    this.props.createChatRoom(this.state.roomName, this.props.user.uid);
    this.setState({
      roomName: '',
      creatingRoom: false
    });
  }

  cancelCreateRoom() {
    this.setState({ creatingRoom: false });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  setActiveRoom(key, room) {
    this.props.setActiveChatRoom(key, room);
    this.props.clearUnread(key);
  }

  render() {
    const { creatingRoom } = this.state;
    const { chatroom } = this.props;

    // Buttons and form to create new room
    let createRoomElement;
    if (creatingRoom) {
      createRoomElement = (
        <form onSubmit={this.handleCreateRoomSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="chat-input"
              placeholder="Room name"
              name="roomName"
              value={this.state.roomName}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add
          </button>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={this.cancelCreateRoom}
          >
            Cancel
          </button>
        </form>
      );
    } else {
      createRoomElement = (
        <button
          className="btn btn-outline-primary btn-block"
          onClick={this.handleCreateRoom}
        >
          Create a new room
        </button>
      );
    }

    // List of rooms
    let joinedRoomList;
    let availableRoomList;
    if (chatroom.loading || isEmpty(chatroom.rooms)) {
      joinedRoomList = <div />;
      availableRoomList = <div />;
    } else {
      const count = key => {
        if (
          chatroom.activeChatroom.uid === key ||
          isEmpty(this.props.messages[key])
        ) {
          return 0;
        } else {
          return this.props.messages[key].unread;
        }
      };
      joinedRoomList = Object.keys(chatroom.rooms).map(key => {
        if (
          !isEmpty(chatroom.rooms[key].participants) &&
          chatroom.rooms[key].participants.includes(this.props.user.uid)
        ) {
          return (
            <a
              key={key}
              href="#"
              className={classnames(
                'list-group-item list-group-item-primary list-group-item-action d-flex justify-content-between align-items-center',
                {
                  'active text-white':
                    key === this.props.chatroom.activeChatroom.uid
                }
              )}
              onClick={() => this.setActiveRoom(key, chatroom.rooms[key])}
            >
              {chatroom.rooms[key].name}
              <span className="badge badge-primary badge-pill">
                {count(key)}
              </span>
            </a>
          );
        }
      });
      availableRoomList = Object.keys(chatroom.rooms).map(key => {
        if (
          isEmpty(chatroom.rooms[key].participants) ||
          !chatroom.rooms[key].participants.includes(this.props.user.uid)
        ) {
          return (
            <a
              key={key}
              href="#"
              className={classnames(
                'list-group-item list-group-item-action d-flex justify-content-between align-items-center',
                {
                  'active text-white':
                    key === this.props.chatroom.activeChatroom.uid
                }
              )}
              onClick={() => this.setActiveRoom(key, chatroom.rooms[key])}
            >
              {chatroom.rooms[key].name}
              <span className="badge badge-primary badge-pill">
                {count(key)}
              </span>
            </a>
          );
        }
      });
    }
    return (
      <div>
        <div className="list-group mb-3" id="chat-room-list" role="tablist">
          <hr />
          <div className="text-center text-muted">--- JOINED ---</div>
          <hr />
          {joinedRoomList}
          <hr />
          <div className="text-center text-muted">--- AVAILABLE ---</div>
          {availableRoomList}
        </div>
        {createRoomElement}
      </div>
    );
  }
}

ChatRooms.propTypes = {
  createChatRoom: PropTypes.func.isRequired,
  loadChatRooms: PropTypes.func.isRequired,
  setActiveChatRoom: PropTypes.func.isRequired,
  addNewMessage: PropTypes.func.isRequired,
  loadLastTenMessages: PropTypes.func.isRequired,
  clearUnread: PropTypes.func.isRequired,
  chatroom: PropTypes.object.isRequired,
  chatroom: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  chatroom: state.chatroom,
  messages: state.message.messages
});

export default connect(
  mapStateToProps,
  {
    createChatRoom,
    loadChatRooms,
    setActiveChatRoom,
    addNewMessage,
    loadLastTenMessages,
    clearUnread
  }
)(ChatRooms);
