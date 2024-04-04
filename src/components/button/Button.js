import React from 'react';

import style from './Button.module.scss';
import clsx from 'clsx';

function Button({ icon, text, color, fs, fw, icon_width, borderRadius, height, backgroundColor }) {
  height = height || '36px';
  borderRadius = borderRadius || '10px';
  color = color || 'black';
  fs = fs || '16px';
  fw = fw || 'normal';
  icon_width = icon_width || '24px';
  return (
    <div className={clsx('flex-justify-center', style.wrap_btn)}>
      <div
        className={clsx('cursor-pointer', style.btn)}
        style={{ borderRadius: borderRadius, height: height, backgroundColor: backgroundColor }}
      >
        {icon && (
          <div className={clsx(style.btn_icon)} style={{ width: icon_width }}>
            <div className={clsx('text-center cursor-pointer', style.icon)}>{icon}</div>
          </div>
        )}
        <div className={clsx(style.text_content)} style={{ color: color, fontSize: fs, fontWeight: fw }}>
          <span className={clsx('cursor-pointer', style.text)}>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default Button;
