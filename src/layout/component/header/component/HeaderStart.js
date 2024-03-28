import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import style from './HeaderStart.module.scss';
import * as actions from '~/store/actions';
import icons from '~/assets/icons';
import logoSvg from '~/assets/logo.svg';

function HeaderStart({ changeSideBarMiniRedux, is_sidebar_mini }) {
  const history = useHistory();

  const handleChangeSideBar = () => {
    changeSideBarMiniRedux(!is_sidebar_mini);
  };

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className={clsx(style.start)}>
      <div
        className={clsx(style.btn_icon)}
        onClick={() => {
          handleChangeSideBar();
        }}
      >
        <div className={clsx(style.icon, 'cursor-pointer')}>
          <img src={icons.bar} alt="" />
        </div>
      </div>
      <div className={clsx(style.logo)}>
        <div className={clsx(style.logo_link)} onClick={handleLogoClick}>
          <div className={clsx(style.logo_icon, 'cursor-pointer')}>
            <img src={logoSvg} alt="" />
          </div>
        </div>
        <span className={clsx(style.country_code)}>VN</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.user.is_sidebar_mini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    changeSideBarMiniRedux: (isShow) => dispatch(actions.changeSideBarMini(isShow)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStart);
