import React, { Component } from 'react';

import checkAuth from '../requireAuth';
import ChatRooms from './ChatRooms';
import MessageList from './MessageList';

class ChatWindow extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="row">
              <div className="col-3">
                <ChatRooms />
              </div>
              <div className="col-9">
                <MessageList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default checkAuth(ChatWindow);
