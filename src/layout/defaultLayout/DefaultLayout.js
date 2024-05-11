// Layout.js
import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './DefaultLayout.module.scss';
import Header from '../component/header';
import Sidebar from '../component/sidebar';
import SideBarMini from '../component/sidebar/SideBarMini';
import { sidebarMiniArr, sidebarItems } from '../component/sidebar/sideBarItems';

function Layout({ props, children, isHidenSibarMini }) {
  return (
    <div className={clsx('d-flex w-100', style.app)}>
      <Header {...props} />
      <div className={clsx('w-100', style.contain)}>
        {isHidenSibarMini && <SideBarMini sidebarMiniArr={sidebarMiniArr} />}
        <Sidebar sidebarItems={sidebarItems} footer={true} />
        {children}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isHidenSibarMini: state.app.isHidenSibarMini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
