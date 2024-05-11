import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './Header.module.scss';
import * as actions from '~/store/actions';
import Search from './component/searchInput/Search';
import HeaderStart from './component/headerStart/HeaderStart';
import HeaderEnd from './component/headerEnd/HeaderEnd';
import { Box } from '@mui/material';

function Header({ isLoadingBar }) {
  return (
    <Box
      sx={{ bgcolor: 'bgcolor.default', boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.2)' }}
      className={clsx('d-flex justify-content-between align-items-center', style.header)}
    >
      <div className="progress" style={{ height: '2px' }}>
        <div
          className={`progress-bar ${isLoadingBar ? ' progress-bar-animated bg-danger' : ''}`}
          role="progressbar"
          aria-valuenow={isLoadingBar ? 100 : 0}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${isLoadingBar ? 100 : 0}%` }}
        ></div>
      </div>

      <HeaderStart />
      <div className={clsx('flex-align-center', style.center, 'hidden_tablet_l', 'hidden_tablet', 'hidden_mobile')}>
        <Search />
      </div>
      <HeaderEnd />
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    oauth2Data: state.user.oauth2Data,
    isLoadingBar: state.video.isLoadingBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
