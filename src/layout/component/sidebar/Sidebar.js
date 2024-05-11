import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import style from './Sidebar.module.scss';
import * as actions from '~/store/actions';
import Button from '~/components/button/Button';
import clsx from 'clsx';
import Footer from './Footer';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import HeaderStart from '../header/component/headerStart/HeaderStart';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
import { path } from '~/utils';

function SideBar({
  sidebarItems,
  footer,
  is_sidebar_mini,
  is_sidebar_modal,
  changeSidebarMini,
  isLoggedIn,
  access_token,
}) {
  const history = useHistory();
  const [pathname, setPathname] = useState('');
  const [subChannel, setSubChannel] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const channelId = queryParams.get('id');

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const handleLoginClick = (url) => {
    history.push(url);
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/subscriptions', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            part: 'snippet,contentDetails',
            mine: true,
            maxResults: 10,
          },
        });

        setSubChannel(response.data.items);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách kênh đã đăng ký:', error);
      }
    };
    fetchSubscriptions();
  }, [access_token]);

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
                      if (index === 2 && isLoggedIn && subChannel) {
                        return (
                          <div className={clsx(style.section_renderer)} key={index}>
                            <ListItem disablePadding sx={{ width: 'calc(100% - 12px)' }}>
                              <ListItemButton sx={{ height: '40px', borderRadius: '10px' }}>
                                <ListItemText>
                                  <Box
                                    sx={{ color: 'text.primary' }}
                                    className={clsx('text-one-line flex-align-center text-nomal-5')}
                                  >
                                    Kênh đăng ký
                                  </Box>
                                </ListItemText>
                              </ListItemButton>
                            </ListItem>
                            {subChannel.map((subItem, subIndex) => {
                              return (
                                <div className={clsx(style.items)} key={subIndex}>
                                  <ListItem
                                    disablePadding
                                    className={clsx(style.entry_renderer)}
                                    sx={{
                                      borderRadius: '10px',
                                      width: 'calc(100% - 12px)',
                                      bgcolor: channelId === subItem.snippet.resourceId.channelId ? '#f2f2f2' : '#fff',
                                    }}
                                  >
                                    <NavLink
                                      to={path.CHANNEL + '?id=' + subItem.snippet.resourceId.channelId}
                                      // activeClassName={clsx(style.active)}
                                      onClick={(e) => {
                                        if (channelId === subItem.snippet.resourceId.channelId) {
                                          e.preventDefault();
                                        }
                                      }}
                                      className={clsx('flex-align-center simple-endpoint text-nomal-4', style.link)}
                                    >
                                      <ListItemIcon sx={{ minWidth: '48px' }}>
                                        <Box
                                          sx={{
                                            width: '24px',
                                            height: '24px',
                                            color:
                                              channelId === subItem.snippet.resourceId.channelId
                                                ? '#CC0100'
                                                : 'text.primary',
                                          }}
                                        >
                                          <img
                                            className={'img-24-round'}
                                            src={subItem.snippet.thumbnails.default.url}
                                            alt=""
                                          />
                                        </Box>
                                      </ListItemIcon>
                                      <ListItemText
                                        sx={{
                                          color:
                                            channelId === subItem.snippet.resourceId.channelId
                                              ? '#CC0100'
                                              : 'text.primary',
                                          '>.MuiTypography-root': { fontSize: '1.4rem' },
                                        }}
                                        className={clsx('text-one-line', style.text)}
                                      >
                                        {subItem.snippet.title}
                                      </ListItemText>
                                    </NavLink>
                                  </ListItem>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
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
                                              onClick={(e) => {
                                                if (pathname === item.path) {
                                                  e.preventDefault();
                                                }
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
                                                    color: pathname === item.path ? '#CC0100' : 'text.primary',
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
                                                  color: pathname === item.path ? '#CC0100' : 'text.primary',
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
                {footer && (
                  <div className={clsx(style.footer)}>
                    <Footer />
                  </div>
                )}
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
    access_token: state.user.access_token,
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
