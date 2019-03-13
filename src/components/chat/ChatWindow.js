import React, { Component } from 'react';

import checkAuth from '../requireAuth';
import MessageList from './MessageList';

class ChatWindow extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">Chat Rooms</div>
          <div className="col-9">
            <MessageList />
          </div>
        </div>
      </div>
    );
  }
}

export default checkAuth(ChatWindow);
