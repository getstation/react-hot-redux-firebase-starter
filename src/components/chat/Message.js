import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  return <div>{props.message.content}</div>;
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
