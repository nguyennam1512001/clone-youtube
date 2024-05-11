import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, Switch, Route } from 'react-router-dom';

import * as actions from '~/store/actions';
import style from './ContainerManager.module.scss';
import { Box } from '@mui/material';
import { path } from '~/utils';
import Content from '~/pages/manager/content/Content';
import OverView from '~/pages/manager/overView/OverView';

function ContainerManager({
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
    if ('/' + location.pathname.split('/')[1] === '/watch') {
      changeSideBarMini(true);
      hidenSidebarMini(false);
    } else {
      hidenSidebarMini(true);
    }
  }, [location.pathname, hidenSidebarMini]);

  return (
    <Box
      className={clsx(
        style.page_manager,
        { [style.sidebar_mini]: is_sidebar_mini },
        { [style.sidebar_modal]: is_sidebar_modal },
        { [style.sidebar_mini_hiden]: !isHidenSibarMini },
      )}
      sx={{ borderLeft: 1, borderColor: 'divider' }}
    >
      <Switch>
        <Route path={path.UPLOAD} component={Content} />
        <Route path={path.OVERVIEW} component={OverView} />
      </Switch>
    </Box>
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
    processLogout: (value) => dispatch(actions.processLogout(value)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerManager);
