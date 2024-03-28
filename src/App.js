import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';

import { history } from './redux';
import { userIsAuthenticated, userIsNotAuthenticated } from './hoc/authentication';
import { path } from './utils';
import AppRoutes from './routes/AppRoutes';
import Login from './Auth/Login';
import Container from './pages';
import Layout from './layout/defaultLayout';
import Logout from './Auth/Logout';
import * as actions from '~/store/actions';

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isHidenSibarMini !== prevProps.isHidenSibarMini) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1313 || this.props.isHidenSibarMini === false) {
      this.props.changeSideBarModal(true);
    } else {
      this.props.changeSideBarModal(false);
    }
  };
  render() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    isHidenSibarMini: state.user.isHidenSibarMini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSideBarModal: (isShow) => dispatch(actions.changeSideBarModal(isShow)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
