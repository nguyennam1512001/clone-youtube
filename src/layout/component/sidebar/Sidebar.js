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
    <div
      className={clsx(
        style.sidebar_lg,
        { [style.scrim]: is_sidebar_modal },
        { [style.not_modal]: !is_sidebar_modal },
        { [style.is_mini]: is_sidebar_mini },
      )}
    >
      <div
        className={clsx({ [style.scrim]: is_sidebar_modal }, { [style.is_lg]: is_sidebar_mini })}
        onClick={() => changeSidebarMini(true)}
      ></div>
      <div className={clsx(style.contentContainer)}>
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
                                  <h3>
                                    <div className={clsx('text-one-line flex-align-center', style.section_title)}>
                                      {item.title.text}
                                    </div>
                                    {item.title.icon && (
                                      <div className={clsx(style.title_icon_shape)}>{item.title.icon}</div>
                                    )}
                                  </h3>
                                )}
                                {item &&
                                  item.items &&
                                  item.items.map((item, index) => {
                                    if (item.auth && isLoggedIn === false) {
                                      return <React.Fragment key={index}></React.Fragment>;
                                    } else {
                                      return (
                                        <div className={clsx(style.items)} key={item.path}>
                                          <div className={clsx(style.entry_renderer)}>
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
                                              <div className={clsx(style.icon)}>
                                                <div className={clsx(style.icon_shape)}>
                                                  {item.icon ? (
                                                    pathname === item.path ? (
                                                      item.iconActive
                                                    ) : item.icon ? (
                                                      item.icon
                                                    ) : null
                                                  ) : (
                                                    <img className={'img-24-round'} src={item.url} alt="" />
                                                  )}
                                                </div>
                                              </div>
                                              <div className={clsx('text-one-line', style.text)}>{item.text}</div>
                                            </NavLink>
                                          </div>
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
      </div>
      <div className={clsx(style.a)}></div>
    </div>
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
