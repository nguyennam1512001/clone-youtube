// Layout.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './DefaultLayout.module.scss';
import Header from '../component/header';
import Sidebar from '../component/sidebar';
import SideBarMini from '../component/sidebar/SideBarMini';

function Layout({ props, children, isHidenSibarMini }) {
  return (
    <div className={clsx(style.app)}>
      <Header {...props} />
      <div className={clsx(style.contain)}>
        {isHidenSibarMini && <SideBarMini />}
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isHidenSibarMini: state.user.isHidenSibarMini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
