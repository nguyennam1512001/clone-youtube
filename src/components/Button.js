import React from 'react';

import style from './Button.module.scss';
import clsx from 'clsx';

function Button({ icon, text, color, fs, fw, radius }) {
    color = color || 'black';
    fs = fs || '16px';
    fw = fw || 'normal';
    radius = radius || '10px';

    return (
        <div className={clsx(style.wrap_btn)}>
            <div className={clsx(style.btn)} style={{ borderRadius: radius }}>
                <div className={clsx(style.btn_icon)}>
                    <div className={clsx(style.icon, 'cursor-pointer')}>
                        <img src={icon} alt="" />
                    </div>
                </div>
                <div className={clsx(style.text_content)} style={{ color: color, fontSize: fs, fontWeight: fw }}>
                    <span className={clsx(style.text, 'cursor-pointer')}>{text}</span>
                </div>
            </div>
        </div>
    );
}

export default Button;
