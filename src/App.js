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
import ContainerManager from './layout/managerLayout/ContainerManager';
import Layout from './layout/defaultLayout';
import ManagerLayout from './layout/managerLayout';
import * as actions from '~/store/actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getTheme from './utils/getTheme';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import { Snackbar } from '@mui/material';

const App = ({
  persistor,
  onBeforeLift,
  isHidenSibarMini,
  changeSideBarModal,
  mode,
  message,
  resetMessage,
  setChannelInfo,
  userInfo,
  googleUserInfo,
}) => {
  const [open, setOpen] = useState(false);
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

  const initChannelInfo = () => {
    if (userInfo && userInfo?.items && userInfo?.items?.length > 0) {
      setChannelInfo({
        id: userInfo.items[0].id,
        thumbnails: userInfo.items[0]?.snippet?.thumbnails?.medium?.url,
        title: userInfo.items[0]?.snippet?.title,
        customUrl: userInfo.items[0]?.snippet?.customUrl,
        subscriberCount: userInfo.items[0]?.statistics?.subscriberCount,
      });
    } else if (!userInfo && !userInfo?.items && googleUserInfo) {
      setChannelInfo({
        id: '',
        thumbnails: googleUserInfo.photoUrl,
        title: googleUserInfo.displayName,
        customUrl: googleUserInfo.email,
        subscriberCount: '',
      });
    }
  };

  useEffect(() => {
    initChannelInfo();
    handlePersistorState();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [isHidenSibarMini]);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    resetMessage();
  };
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
                  path={path.MANAGER}
                  component={userIsAuthenticated((props) => (
                    <ManagerLayout {...props}>
                      <ContainerManager {...props} />
                    </ManagerLayout>
                  ))}
                />
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
            <Snackbar
              sx={{ color: 'text.primary', fontSize: '16px', zIndex: 9999 }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={message}
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
    message: state.video.message,
    userInfo: state.user.userInfo,
    googleUserInfo: state.user.googleUserInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSideBarModal: (isShow) => dispatch(actions.changeSideBarModal(isShow)),
    resetMessage: () => dispatch(actions.resetMessage()),
    setChannelInfo: (data) => dispatch(actions.setChannelInfo(data)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
