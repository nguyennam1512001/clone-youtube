import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';

import style from './SideBarMini.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils/constant';
import { debounce } from 'lodash';
import { sidebarMiniArr } from './sideBarItems';

function SideBarMini({ is_sidebar_mini }) {
  const [pathname, setPathname] = useState('');
  const history = useHistory();

  const handleItemClick = (url) => {
    setPathname(url);
    history.push(url);
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    setPathname(pathname);
  }, []);

  return (
    <div className={clsx(style.sidebar_mini, { [style.is_mini]: !is_sidebar_mini })}>
      <div className={clsx(style.items)}>
        {sidebarMiniArr &&
          sidebarMiniArr.map((item, index) => (
            <div className={clsx(style.item)} key={index}>
              <NavLink
                exact={item.exact}
                to={item.path}
                activeClassName={clsx(style.active)}
                onClick={() => {
                  handleItemClick(item.path);
                }}
                className={clsx(style.link)}
              >
                <div className={clsx(style.icon)}>
                  <div className={clsx(style.icon_shape)}>{pathname === item.path ? item.iconActive : item.icon}</div>
                </div>
                <div className={clsx(style.text)}>{item.text}</div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    is_sidebar_mini: state.user.is_sidebar_mini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMini);
