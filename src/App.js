import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';

import { history } from './redux';
import { userIsAuthenticated, userIsNotAuthenticated } from './hoc/authentication';
import { path } from './utils';
import AppRoutes from './routes/AppRoutes';
import Container from './pages';
import Layout from './layout/defaultLayout';
import * as actions from '~/store/actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getTheme from './utils/getTheme';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

const App = ({ persistor, onBeforeLift, isHidenSibarMini, changeSideBarModal, mode }) => {
  const defaultTheme = createTheme(getTheme(mode));

  const handlePersistorState = () => {
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (onBeforeLift) {
        Promise.resolve(onBeforeLift())
          .then(() => {})
          .catch(() => {});
      }
    }
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1313 || isHidenSibarMini === false) {
      changeSideBarModal(true);
    } else {
      changeSideBarModal(false);
    }
  };
  useEffect(() => {
    handlePersistorState();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [isHidenSibarMini]);

  return (
    <Fragment>
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container scroll_bar">
              <Switch>
                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                <Route path={path.LOGOUT} component={Logout} />
                <Route
                  path={path.HOMEPAGE}
                  render={(props) => (
                    <Layout>
                      <Container {...props} />
                    </Layout>
                  )}
                />
              </Switch>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </ThemeProvider>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    isHidenSibarMini: state.app.isHidenSibarMini,
    mode: state.app.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSideBarModal: (isShow) => dispatch(actions.changeSideBarModal(isShow)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
