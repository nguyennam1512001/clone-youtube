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
import { Snackbar } from '@mui/material';

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

function Container({
  is_sidebar_mini,
  is_sidebar_modal,
  isHidenSibarMini,
  hidenSidebarMini,
  changeSideBarMini,
  message,
}) {
  const [reloadState, setReloadState] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const targetElement = document.getElementById('watch-video-play');
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top - 56;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  }, [location, reloadState]);

  // Scroll to top of the page when browser back/forward button is clicked
  useEffect(() => {
    window.onload = () => {
      setReloadState(true);
    };
  }, []);

  useEffect(() => {
    if ('/' + location.pathname.split('/')[1] === '/watch') {
      changeSideBarMini(true);
      hidenSidebarMini(false);
    } else {
      hidenSidebarMini(true);
    }
  }, [location.pathname, hidenSidebarMini]);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };
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
      <Snackbar
        sx={{ color: 'text.primary', fontSize: '14px' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.app.is_sidebar_mini,
    is_sidebar_modal: state.app.is_sidebar_modal,
    isHidenSibarMini: state.app.isHidenSibarMini,
    userInfo: state.user.userInfo,
    message: state.video.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidenSidebarMini: (value) => dispatch(actions.hidenSidebarMini(value)),
    changeSideBarMini: (value) => dispatch(actions.changeSideBarMini(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
