import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/';

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
