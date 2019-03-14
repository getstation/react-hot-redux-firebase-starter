import React, { Component } from 'react';

import Message from './Message';
import guid from '../../utilities/guid';
import isEmpty from '../../utilities/is-empty';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
          id: guid(),
          userId: 1
        },
        {
          content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hola Amigos!!!',
          id: guid(),
          userId: 2
        }
      ],
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (isEmpty(this.state.message)) return;
    this.setState({
      messages: [
        ...this.state.messages,
        { content: this.state.message, id: guid(), userId: 1 }
      ],
      message: ''
    });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  };

  scrollToLatestMessage = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToLatestMessage();
  }

  componentDidUpdate() {
    this.scrollToLatestMessage();
  }

  render() {
    const { messages } = this.state;
    const messageList = messages.map(message => (
      <Message message={message} key={message.id} />
    ));
    return (
      <div>
        <div className="card">
          <div className="card-header text-center">Chat room name</div>
          <div className="card-body chat-list">
            <div>{messageList}</div>
            {/* Fake element used for scrolling */}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <div className="card-footer">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-10">
                  <textarea
                    className="form-control"
                    id="chat-input"
                    rows="2"
                    placeholder="Your message here..."
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
                <div className="col-2">
                  <button type="submit" className="btn btn-primary btn-block">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageList;
