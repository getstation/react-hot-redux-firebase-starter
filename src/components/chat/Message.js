import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message = null;
    if (this.props.chatroom_uid === this.props.chatroom.activeChatroom.uid) {
      if (this.props.message.userId === this.props.user.uid) {
        message = (
          <div className="media m-2 justify-content-end">
            <div className="card text-white bg-primary ml-5">
              <p className="card-text p-2">{this.props.message.content}</p>
            </div>
          </div>
        );
      } else {
        message = (
          <div className="media m-2">
            <img
              className="mr-3 rounded-circle"
              src="https://via.placeholder.com/32"
              alt="avatar"
            />
            <div className="card bg-transparent mr-5">
              <p className="card-text p-2">{this.props.message.content}</p>
            </div>
          </div>
        );
      }
    }
    return message;
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  chatroom: PropTypes.object.isRequired,
  chatroom_uid: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  chatroom: state.chatroom,
  messages: state.message.messages
});

export default connect(mapStateToProps)(Message);
