import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import * as actions from '~/store/actions';
import style from './Container.module.scss';
import Home from './home/Home';
import Short from './shorts/Short';
import Search from './search/Search';
import Watch from './watch/Watch';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { path } from '~/utils';
import Trending from './trending/Trending';
import MyChannel from './myChannel/MyChannel';
import SubChannel from './subChannel/SubChannel';

function Container({
  is_sidebar_mini,
  is_sidebar_modal,
  isHidenSibarMini,
  hidenSidebarMini,
  changeSideBarMini,
  setIsLoadingBar,
}) {
  const [reloadState, setReloadState] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const targetElement = document.getElementById('watch-video-play');
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top - 56;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
    setIsLoadingBar(true);
    setTimeout(() => {
      setIsLoadingBar(false);
    }, 1000);
  }, [location, reloadState]);

  // Scroll to top of the page when browser back/forward button is clicked
  useEffect(() => {
    window.onload = () => {
      setReloadState(!reloadState);
    };
  }, []);

  useEffect(() => {
    if ('/' + location.pathname.split('/')[1] === path.WATCH) {
      changeSideBarMini(true);
      hidenSidebarMini(false);
    } else {
      hidenSidebarMini(true);
    }
  }, [location.pathname, hidenSidebarMini]);

  return (
    <div
      className={clsx(
        style.page_manager,
        { [style.sidebar_mini]: is_sidebar_mini },
        { [style.sidebar_modal]: is_sidebar_modal },
        { [style.sidebar_mini_hiden]: !isHidenSibarMini },
      )}
    >
      <Switch>
        <Route path={`${path.SHORTS}`} component={Short} />
        <Route path={`${path.WATCH}`} component={Watch} />
        <Route path={`${path.SEARCH}`} component={Search} />
        <Route path={`${path.MY_CHANNEL}`} component={MyChannel} />
        <Route path={`${path.CHANNEL}`} component={SubChannel} />
        <Route path={`${path.TRENDING}`} component={Trending} />
        <Route path={`${path.HOMEPAGE}`} component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.app.is_sidebar_mini,
    is_sidebar_modal: state.app.is_sidebar_modal,
    isHidenSibarMini: state.app.isHidenSibarMini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidenSidebarMini: (value) => dispatch(actions.hidenSidebarMini(value)),
    changeSideBarMini: (value) => dispatch(actions.changeSideBarMini(value)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
