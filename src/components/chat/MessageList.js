import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Message from './Message';
import guid from '../../utilities/guid';
import isEmpty from '../../utilities/is-empty';
import { createMessage, loadMessages } from '../../actions/messageActions';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.loadMessages();
    this.scrollToLatestMessage();
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
    this.props.createMessage({
      content: this.state.currentMessage,
      userId: this.props.user.uid
    });
    this.setState({ currentMessage: '' });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  render() {
    const { messages, message, loading } = this.props.message;
    let messageList;
    if (loading) {
      messageList = <div>Loading</div>;
    } else {
      messageList = messages.map(message => (
        <Message message={message} key={message.uid} />
      ));
    }
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
          </div>
        </div>
      </div>
    );
  }
}

MessageList.propTypes = {
  createMessage: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  user: state.user
});

export default connect(
  mapStateToProps,
  { createMessage, loadMessages }
)(MessageList);
