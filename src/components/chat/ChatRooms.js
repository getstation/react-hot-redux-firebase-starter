import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [
        { name: 'Room1', unread: 0, id: 1 },
        { name: 'Room2', unread: 5, id: 2 },
        { name: 'Room3', unread: 11, id: 3 }
      ]
    };
  }

  render() {
    const { rooms } = this.state;
    const roomList = rooms.map(room => (
      <a
        key={room.id}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        {room.name}
        <span className="badge badge-primary badge-pill">{room.unread}</span>
      </a>
    ));
    return (
      <div>
        <div className="list-group mb-3" id="chat-room-list" role="tablist">
          {roomList}
        </div>
        <button className="btn btn-outline-primary btn-block">
          Create a new room
        </button>
      </div>
    );
  }
}

export default ChatRooms;
