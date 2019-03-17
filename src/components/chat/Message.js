import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Message = props => {
  if (props.message.userId === props.user.uid) {
    return (
      <div className="media m-2 justify-content-end">
        <div className="card text-white bg-primary ml-5">
          <p className="card-text p-2">{props.message.content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="media m-2">
        <img
          className="mr-3 rounded-circle"
          src="https://via.placeholder.com/32"
          alt="avatar"
        />
        <div className="card bg-transparent mr-5">
          <p className="card-text p-2">{props.message.content}</p>
        </div>
      </div>
    );
  }
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Message);
