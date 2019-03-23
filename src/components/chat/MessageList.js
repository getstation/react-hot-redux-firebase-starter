import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Message from './Message';
import isEmpty from '../../utilities/is-empty';
import { createMessage, clearUnread } from '../../actions/messageActions';
import { joinRoom } from '../../actions/chatroomActions';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    this.scrollToLatestMessage();
    if (!isEmpty(this.props.chatroom.activeChatroom.uid)) {
      this.props.clearUnread(this.props.chatroom.activeChatroom.uid);
    }
  }

  componentDidUpdate() {
    this.scrollToLatestMessage();
  }

  scrollToLatestMessage() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (isEmpty(this.state.currentMessage)) return;
    this.props.createMessage(
      {
        content: this.state.currentMessage,
        userId: this.props.user.uid
      },
      this.props.chatroom.activeChatroom.uid
    );
    this.setState({ currentMessage: '' });
    this.props.clearUnread(this.props.chatroom.activeChatroom.uid);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  joinRoom() {
    const participants = isEmpty(
      this.props.chatroom.activeChatroom.participants
    )
      ? []
      : this.props.chatroom.activeChatroom.participants;
    this.props.joinRoom(
      this.props.chatroom.activeChatroom.uid,
      this.props.user.uid,
      participants
    );
  }

  render() {
    const { messages, loading } = this.props.message;
    const uid = this.props.chatroom.activeChatroom.uid;
    let messageList;
    if (loading) {
      messageList = <div className="text-center text-mute">Loading...</div>;
    } else if (isEmpty(messages[uid])) {
      messageList = <div className="text-center text-mute">No message</div>;
    } else {
      let list = messages[this.props.chatroom.activeChatroom.uid];
      messageList = Object.keys(list).map(key => {
        if (key !== 'unread') {
          return (
            <Message
              message={list[key]}
              chatroom_uid={this.props.chatroom.activeChatroom.uid}
              key={key}
            />
          );
        }
      });
    }
    let inputElement;
    if (
      !isEmpty(this.props.chatroom.activeChatroom.participants) &&
      this.props.chatroom.activeChatroom.participants.includes(
        this.props.user.uid
      )
    ) {
      inputElement = (
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col-10">
              <textarea
                className="form-control"
                id="chat-input"
                rows="2"
                placeholder="Your message here..."
                name="currentMessage"
                value={this.state.currentMessage}
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
      );
    } else {
      inputElement = (
        <div className="text-center">
          <button className="btn btn-primary col-6" onClick={this.joinRoom}>
            Join room
          </button>
        </div>
      );
    }
    return (
      <div>
        <div className="card">
          <div className="card-header text-center">
            {this.props.chatroom.activeChatroom.name}
          </div>
          <div className="card-body chat-list">
            <div>{messageList}</div>
            {/* Fake element used for scrolling */}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <div className="card-footer">{inputElement}</div>
        </div>
      </div>
    );
  }
}

MessageList.propTypes = {
  createMessage: PropTypes.func.isRequired,
  clearUnread: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
  chatroom: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  user: state.user,
  chatroom: state.chatroom
});

export default connect(
  mapStateToProps,
  { createMessage, clearUnread, joinRoom }
)(MessageList);
