import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import style from './Header.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils/constant';
import logoSvg from '~/assets/logo.svg';
import icons from '~/assets/icons';
import Button from '~/components/Button';
import Search from './component/Search';

function Header({ processLogout, changeLanguageAppRedux }) {
    const history = useHistory();

    const changeLanguage = (language) => {
        changeLanguageAppRedux(language);
    };

    const handleLogoClick = () => {
        history.push('/');
    };

    return (
        <div className={clsx(style.header)}>
            <div className={clsx(style.start)}>
                <div className={clsx(style.btn_icon)}>
                    <div className={clsx(style.icon, 'cursor-pointer')}>
                        <img src={icons.headerMenu} alt="" />
                    </div>
                </div>
                <div className={clsx(style.logo)}>
                    <div className={clsx(style.logo_link)} onClick={handleLogoClick}>
                        <div className={clsx(style.logo_icon, 'cursor-pointer')}>
                            <img src={logoSvg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(style.center)}>
                <Search />
            </div>
            <div className={clsx(style.end)}>
                <div className={clsx(style.setting)}>
                    <div className={clsx(style.setting_icon)}>
                        <div className={clsx(style.icon, 'cursor-pointer')}>
                            <img src={icons.ellipsisVertical} alt="" />
                        </div>
                    </div>
                </div>

                <div className={clsx(style.login)}>
                    <Button icon={icons.user} text="Đăng Nhập" color="#085ED4" fs="14px" fw="500" radius="100px" />
                </div>
            </div>
            {/* <div className={clsx(style.a)}></div> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
