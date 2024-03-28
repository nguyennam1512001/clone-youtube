import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

import style from './Sidebar.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils/constant';
import clsx from 'clsx';

function Footer({}) {
    return (
        <>
            <div className={clsx(style.links_primary)}>
                <a slot="guide-links-primary" href="https://www.youtube.com/about/">
                    Giới thiệu
                </a>
                <a slot="guide-links-primary" href="https://www.youtube.com/about/press/">
                    Báo chí
                </a>
                <a slot="guide-links-primary" href="https://www.youtube.com/about/copyright/">
                    Bản quyền
                </a>
                <a slot="guide-links-primary" href="/t/contact_us/">
                    Liên hệ với chúng tôi
                </a>
                <a slot="guide-links-primary" href="https://www.youtube.com/creators/">
                    Người sáng tạo
                </a>
                <a slot="guide-links-primary" href="https://www.youtube.com/ads/">
                    Quảng cáo
                </a>
                <a slot="guide-links-primary" href="https://developers.google.com/youtube">
                    Nhà phát triển
                </a>
            </div>
            <div className={clsx(style.links_secondary)}>
                <a slot="guide-links-secondary" href="/t/terms">
                    Điều khoản
                </a>
                <a slot="guide-links-secondary" href="/t/privacy">
                    Quyền riêng tư
                </a>
                <a slot="guide-links-secondary" href="https://www.youtube.com/about/policies/">
                    Chính sách và an toàn
                </a>
                <a
                    slot="guide-links-secondary"
                    href="https://www.youtube.com/howyoutubeworks?utm_campaign=ytgen&amp;utm_source=ythp&amp;utm_medium=LeftNav&amp;utm_content=txt&amp;u=https%3A%2F%2Fwww.youtube.com%2Fhowyoutubeworks%3Futm_source%3Dythp%26utm_medium%3DLeftNav%26utm_campaign%3Dytgen"
                >
                    Cách YouTube hoạt động
                </a>
                <a slot="guide-links-secondary" href="/new">
                    Thử các tính năng mới
                </a>
            </div>
            <div className={clsx(style.copyright)} slot="copyright">
                <span dir="ltr">© 2024 Google LLC</span>
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
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
