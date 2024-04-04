import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '~/store/actions';
import { googleKey } from '~/utils';

function Logout({ access_token, navigateToHomePage, processLogout }) {
  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    handleLogout();
  }, []);

  const handleLogout = () => {
    revokeAccess();
    navigateToHomePage();
  };

  const revokeAccess = () => {
    fetch(`${googleKey.REVOKE_TOKEN_ENDPOINT}?token=${access_token}`, {
      method: 'POST',
    })
      .then((response) => {
        console.log('Access token revoked successfully', response);
        processLogout();
      })
      .catch((error) => {
        console.error('Failed to revoke access token', error);
      });
  };

  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    navigateToHomePage: () => {
      dispatch(push('/'));
    },
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
