import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';

import style from './Popup.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils/constant';
import icons, { Search } from '~/public/assets/icons';
function Popup({ maxWidth, maxHeight, left, right, display, children }) {
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={clsx(style.popup)}
      style={{ left: left, right: right, display: display }}
      onClick={handlePopupClick}
    >
      <div className={clsx(style.wrap)} style={{ maxWidth: maxWidth, maxHeight: maxHeight }}>
        {children}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
