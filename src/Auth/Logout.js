import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GoogleAuthProvider, signOut } from 'firebase/auth';
import { push } from 'connected-react-router';
import * as actions from '~/store/actions';
import { auth } from '~/fireBase/FireBase';

function Logout({ processLogout, navigate }) {
  useEffect(() => {
    console.log('logout');
    localStorage.removeItem('user');
    handleLogout();
  }, []);

  const handleLogout = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signOut(auth);
      processLogout();
      navigate('/');
    } catch (error) {
      navigate('/');
    }
  };

  return <></>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
