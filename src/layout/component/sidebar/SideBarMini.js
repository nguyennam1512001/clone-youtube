import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import style from './SideBarMini.module.scss';
import * as actions from '~/store/actions';
import { Box } from '@mui/material';

function SideBarMini({ is_sidebar_mini, sidebarMiniArr }) {
  const [pathname, setPathname] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div className={clsx(style.sidebar_mini, { [style.is_mini]: !is_sidebar_mini }, 'scroll_bar')}>
      <div className={clsx(style.items)}>
        {sidebarMiniArr &&
          sidebarMiniArr.map((item, index) => {
            return (
              <div className={clsx(style.item)} key={index}>
                <NavLink
                  activeClassName={clsx(style.active)}
                  exact={true}
                  to={item.path}
                  className={clsx('flex-align-center flex-column simple-endpoint', style.link)}
                  onClick={(e) => {
                    if (pathname === item.path) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className={clsx(style.icon)}>
                    <Box
                      sx={{ color: pathname === item.path ? '#CC0100' : 'text.primary' }}
                      className={clsx(style.icon_shape)}
                    >
                      {pathname === item.path ? item.iconActive : item.icon}
                    </Box>
                  </div>
                  {item.text && <div className={clsx('text-one-line mw-100', style.text)}>{item.text}</div>}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    is_sidebar_mini: state.app.is_sidebar_mini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMini);
