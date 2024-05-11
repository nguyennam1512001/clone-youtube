// Layout.js
import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import Header from './component/header';
import Sidebar from '../component/sidebar';
import SideBarMini from '../component/sidebar/SideBarMini';
import { sidebarMiniArr, sidebarItems } from './component/sidebar/sideBarItems';

function Layout({ props, children, isHidenSibarMini }) {
  return (
    <div className={clsx('d-flex w-100')}>
      <Header {...props} />
      <div className={clsx('w-100')}>
        {isHidenSibarMini && <SideBarMini sidebarMiniArr={sidebarMiniArr} />}
        <Sidebar sidebarItems={sidebarItems} />
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
