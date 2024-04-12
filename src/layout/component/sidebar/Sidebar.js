import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import style from './Sidebar.module.scss';
import * as actions from '~/store/actions';
import Button from '~/components/button/Button';
import { sidebarItems } from './sideBarItems';
import clsx from 'clsx';
import Footer from './Footer';
import { NavLink, useHistory } from 'react-router-dom';
import HeaderStart from '../header/component/headerStart/HeaderStart';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function SideBar({ is_sidebar_mini, is_sidebar_modal, changeSidebarMini, isLoggedIn }) {
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

  const handleLoginClick = (url) => {
    history.push(url);
  };

  return (
    <Box
      className={clsx(
        style.sidebar_lg,
        { [style.scrim]: is_sidebar_modal },
        { [style.not_modal]: !is_sidebar_modal },
        { [style.is_mini]: is_sidebar_mini },
      )}
      sx={{ bgcolor: 'bgcolor.default' }}
    >
      <div
        className={clsx({ [style.scrim]: is_sidebar_modal }, { [style.is_lg]: is_sidebar_mini })}
        onClick={() => changeSidebarMini(true)}
      ></div>
      <Box className={clsx(style.contentContainer)} sx={{ bgcolor: 'bgcolor.default' }}>
        <div className={clsx(style.wrap)}>
          {is_sidebar_modal ? (
            <div className={clsx(style.header)}>
              <HeaderStart />
            </div>
          ) : (
            <div className={clsx(style.space)}></div>
          )}
          <div className={clsx(style.content, 'scroll_bar')}>
            <div className={clsx(style.inner_content)}>
              <div className={clsx(style.renderer)}>
                <div className={clsx(style.sections)}>
                  {sidebarItems &&
                    sidebarItems.map((item, index) => {
                      if (item.auth && isLoggedIn === false) {
                        return <React.Fragment key={index}></React.Fragment>;
                      } else {
                        return (
                          <React.Fragment key={index}>
                            {!isLoggedIn && item.type && item.type === 'login' ? (
                              <div className={clsx(style.login_renderer)} key={index + 'login'}>
                                <div className={clsx(style.login_desc)}>{item.descript}</div>
                                <div onClick={() => handleLoginClick(item.path)} className={clsx(style.login_button)}>
                                  <Button icon={item.icon} text="Đăng Nhập" color="#085ED4" fs="14px" fw="500" />
                                </div>
                              </div>
                            ) : (
                              <div
                                className={clsx(style.section_renderer, { [style.none]: item.auth === false })}
                                key={index}
                              >
                                {item.title.text && (
                                  <ListItem disablePadding sx={{ width: 'calc(100% - 12px)' }}>
                                    <ListItemButton sx={{ height: '40px', borderRadius: '10px' }}>
                                      <ListItemText>
                                        <Box
                                          sx={{ color: 'text.primary' }}
                                          className={clsx('text-one-line flex-align-center text-nomal-5')}
                                        >
                                          {item.title.text}
                                        </Box>
                                      </ListItemText>
                                      {item.title.icon && (
                                        <ListItemIcon sx={{ minWidth: '0' }} className={clsx(style.title_icon_shape)}>
                                          <Box sx={{ height: '16px', width: '16px', color: 'icon.primary' }}>
                                            {item.title.icon}
                                          </Box>
                                        </ListItemIcon>
                                      )}
                                    </ListItemButton>
                                  </ListItem>
                                )}
                                {item &&
                                  item.items &&
                                  item.items.map((item, index) => {
                                    if (item.auth && isLoggedIn === false) {
                                      return <React.Fragment key={index}></React.Fragment>;
                                    } else {
                                      return (
                                        <div className={clsx(style.items)} key={item.path}>
                                          <ListItem
                                            disablePadding
                                            className={clsx(style.entry_renderer)}
                                            sx={{ borderRadius: '10px', width: 'calc(100% - 12px)' }}
                                          >
                                            <NavLink
                                              exact={item.exact || true}
                                              to={item.path}
                                              activeClassName={clsx(style.active)}
                                              onClick={() => {
                                                handleItemClick(item.path);
                                              }}
                                              className={clsx(
                                                'flex-align-center simple-endpoint text-nomal-4',
                                                style.link,
                                              )}
                                              key={index}
                                            >
                                              <ListItemIcon sx={{ minWidth: '48px' }}>
                                                <Box
                                                  sx={{
                                                    width: '24px',
                                                    height: '24px',
                                                    color: 'icon.primary',
                                                  }}
                                                >
                                                  {item.icon ? (
                                                    pathname === item.path ? (
                                                      item.iconActive
                                                    ) : item.icon ? (
                                                      item.icon
                                                    ) : null
                                                  ) : (
                                                    <img className={'img-24-round'} src={item.url} alt="" />
                                                  )}
                                                </Box>
                                              </ListItemIcon>
                                              <ListItemText
                                                sx={{
                                                  color: 'text.primary',
                                                  '>.MuiTypography-root': { fontSize: '1.4rem' },
                                                }}
                                                className={clsx('text-one-line', style.text)}
                                              >
                                                {item.text}
                                              </ListItemText>
                                            </NavLink>
                                          </ListItem>
                                        </div>
                                      );
                                    }
                                  })}
                              </div>
                            )}
                          </React.Fragment>
                        );
                      }
                    })}
                </div>
                <div className={clsx(style.footer)}>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <div className={clsx(style.a)}></div>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.app.is_sidebar_mini,
    is_sidebar_modal: state.app.is_sidebar_modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSidebarMini: (isShow) => dispatch(actions.changeSideBarMini(isShow)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
