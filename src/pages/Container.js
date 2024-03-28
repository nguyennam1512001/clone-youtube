import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';

import * as actions from '~/store/actions';
import style from './Container.module.scss';
import Home from './home/Home';
import Short from './shorts/Short';
import Search from './search/Search';
import Watch from './watch/Watch';

const views = [
  {
    component: <Home />,
    path: '/',
  },
  {
    component: <Short />,
    path: '/shorts',
  },
  {
    component: <Search />,
    path: '/search',
  },
  {
    component: <Watch />,
    path: '/watch',
  },
];

function Container({ is_sidebar_mini, is_sidebar_modal, isHidenSibarMini, hidenSidebarMini }) {
  const location = useLocation();

  useEffect(() => {
    if ('/' + location.pathname.split('/')[1] === '/watch') {
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
      {views.map((item, index) => {
        return (
          <div hidden={'/' + location.pathname.split('/')[1] !== item.path} key={index}>
            {item.component}
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.user.is_sidebar_mini,
    is_sidebar_modal: state.user.is_sidebar_modal,
    isHidenSibarMini: state.user.isHidenSibarMini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidenSidebarMini: (value) => dispatch(actions.hidenSidebarMini(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
