import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './MenuPopup.module.scss';
import * as actions from '~/store/actions';
import menuArr from './MenuArr';
import Item from '~/components/listItem/Item';
import { useHistory } from 'react-router-dom';
function MenuPopup({ isLoggedIn, setIsShow }) {
  const history = useHistory();

  const handleItemClick = (item) => {
    document.body.style.overflow = 'auto';
    if (item.path) {
      history.push(item.path);
    }
  };
  return (
    <>
      <div className={clsx(style.popup_container)}>
        <div className={clsx(style.sections)}>
          {menuArr &&
            menuArr.map((section, index) => {
              if (section.auth && isLoggedIn === false) {
                return <React.Fragment key={index}></React.Fragment>;
              } else {
                return (
                  <div className={clsx(style.section_render)} key={index}>
                    <div className={clsx(style.section_title)}></div>
                    <div className={clsx(style.items)}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPopup);
