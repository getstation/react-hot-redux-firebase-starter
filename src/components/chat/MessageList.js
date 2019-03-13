import React, { Component } from 'react';

import Message from './Message';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { content: 'Hello world!', id: 1, userId: 1 },
        { content: 'Hello there!', id: 2, userId: 2 }
      ]
    };
  }
  render() {
    const { messages } = this.state;
    const messageList = messages.map(message => (
      <Message message={message} key={message.id} />
    ));
    return (
      <div>
        <div>{messageList}</div>
      </div>
    );
  }
}

export default MessageList;
