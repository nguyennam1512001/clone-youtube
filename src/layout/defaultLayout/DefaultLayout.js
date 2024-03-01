// Layout.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './DefaultLayout.module.scss';
import Header from '../component/header';
import Sidebar from '../component/sidebar';

function Layout({ props, children }) {
    return (
        <div>
            <Header {...props} />
            <div className={clsx(style.body)}>
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
