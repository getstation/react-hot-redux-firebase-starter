import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../actions/authActions';

class Layout extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { auth, actions, loading, user } = this.props;
    return (
      <div className="container-fluid">
        <Header
          signOut={actions.signOut}
          auth={auth}
          loading={loading}
          user={user}
        />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    user: state.user,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ signOut }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
