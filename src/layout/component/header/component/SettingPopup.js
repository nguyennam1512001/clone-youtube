import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './SettingPopup.module.scss';
import * as actions from '~/store/actions';
import menuSettingArr from './MenuSettingArr';
import Item from '~/components/listItem/Item';
import { useHistory } from 'react-router-dom';
function SettingPopup({ isLoggedIn, userInfo, setIsShow }) {
  const history = useHistory();
  console.log(userInfo);
  const handleItemClick = (item) => {
    if (item.path) {
      history.push(item.path);
    }
  };
  return (
    <>
      {isLoggedIn && (
        <div className={clsx(style.popup_header)}>
          <div className={clsx(style.account_header)}>
            <div className={clsx('img-40-round', style.account_avatar)}>
              <img
                draggable="false"
                alt=""
                height="40"
                width="40"
                src={userInfo?.items[0]?.snippet.thumbnails.default.url}
              />
            </div>
            <div className={clsx(style.account_container)}>
              <div className={clsx('text-one-line text-nomal-4', style.account_name)}>
                {userInfo.items[0].snippet.title}
              </div>
              <div className={clsx('text-one-line text-nomal-4', style.channel_name)}>
                {userInfo.items[0].snippet.customUrl}
              </div>
              <div className={clsx('text-md-4 cursor-pointer', style.manage_account)}>Xem kênh của bạn</div>
            </div>
          </div>
        </div>
      )}
      <div className={clsx(style.popup_container)}>
        <div className={clsx(style.sections)}>
          {menuSettingArr &&
            menuSettingArr.map((section, index) => {
              if (section.auth && isLoggedIn === false) {
                return <React.Fragment key={index}></React.Fragment>;
              } else {
                return (
                  <div className={clsx(style.section_render)} key={index}>
                    <div className={clsx(style.section_title)}></div>
                    <div className={clsx('cursor-pointer', style.items)}>
                      {section.items.map((item, index) => {
                        return (
                          <div key={index} onClick={() => handleItemClick(item)}>
                            <Item
                              leftIcon={item.iconLeft}
                              text={item.text}
                              rightIcon={item.rightIcon}
                              setIsShow={setIsShow}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPopup);
