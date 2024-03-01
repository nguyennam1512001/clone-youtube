import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';

import style from './Search.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils/constant';
import icons from '~/assets/icons';
import { debounce } from 'lodash';
function Search({ processLogout, changeLanguageAppRedux }) {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    return (
        <>
            <div className={clsx(style.search)}>
                <div
                    className={clsx(
                        style.search_form,
                        { [style.pl_0]: isFocused },
                        { [style.form_control]: isFocused },
                    )}
                >
                    <div className={clsx(style.container)}>
                        <div className={clsx(style.search_icon, { [style.active]: isFocused })}>
                            <img src={icons.search} alt="" />
                        </div>
                        <div className={clsx(style.search_input)}>
                            <div className={clsx(style.input_box)}>
                                <input
                                    placeholder="Tìm kiếm"
                                    type="text"
                                    value={searchText}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                />
                                <div className={clsx(style.keyboard, 'cursor-pointer', { [style.pr_0]: searchText })}>
                                    <img src="https://www.gstatic.com/inputtools/images/tia.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div
                            className={clsx(style.search_clear_button, { [style.active]: searchText })}
                            onClick={() => {
                                setSearchText('');
                            }}
                        >
                            <div className={clsx(style.icon, 'cursor-pointer')}>
                                <img src={icons.closeSearchQuery} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(style.search_btn, 'cursor-pointer')}>
                    <div className={clsx(style.search_icon)}>
                        <img src={icons.search} alt="" />
                    </div>
                </div>
            </div>
            <div className={clsx(style.voice_search, 'cursor-pointer')}>
                <div className={clsx(style.icon)}>
                    <img src={icons.voiceSearch} alt="" />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
