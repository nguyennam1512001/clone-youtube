import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './Item.module.scss';
function Item({ leftIcon, text, rightIcon, setIsShow, fz }) {
  let fontSize = fz || '1.4rem';
  return (
    <div
      className={clsx('flex-align-center cursor-pointer', style.item_link, { [style.m_16]: rightIcon })}
      onClick={() => setIsShow && setIsShow(false)}
    >
      {leftIcon && (
        <div className={clsx(style.left_icon)}>
          <div className={clsx(style.icon_shape)}>{leftIcon}</div>
        </div>
      )}
      <div className={clsx('text-one-line', style.text)} style={{ fontSize: fontSize }}>
        {text}
      </div>
      {rightIcon && (
        <div className={clsx(style.right_icon)}>
          <div className={clsx(style.icon_shape)}>{rightIcon}</div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
