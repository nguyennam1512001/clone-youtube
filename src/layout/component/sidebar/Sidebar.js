import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

import style from './Sidebar.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils/constant';
import clsx from 'clsx';

function SideBar({}) {
    return <div className={clsx(style.sidebar_bg)}>sidebar</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
