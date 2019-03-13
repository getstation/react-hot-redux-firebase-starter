import React from 'react';
import PropTypes from 'prop-types';

const LogoutLink = ({ signOut }) => {
  return (
    <a href="#" onClick={signOut}>
      Logout
    </a>
  );
};

LogoutLink.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default LogoutLink;
