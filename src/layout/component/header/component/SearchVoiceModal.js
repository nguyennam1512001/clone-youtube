import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';
import useSound from 'use-sound';
import beep from '~/assets/mp3/beep6.mp3';

import style from './SearchVoiceModal.module.scss';
import * as actions from '~/store/actions';
import { MicroPhone } from '~/assets/icons';
import C_Modal from '~/components/Modal';

function SearchVoiceModal({ isShow, setIsShow }) {
  const [play, { stop }] = useSound(beep);
  return (
    <C_Modal show={isShow} setShow={setIsShow}>
      <div className={clsx(style.wrap)}>
        <div className={clsx(style.title)}>Tìm kiếm bằng giọng nói</div>
        <div className={clsx(style.content)}>
          <div className={clsx(style.desc)}>
            Để tìm kiếm bằng giọng nói, hãy chuyển đến phần cài đặt trong trình duyệt của bạn và cho phép truy cập vào
            micrô
          </div>
          <div className={clsx(style.microphone)} onClick={() => play()}>
            <div className={clsx(style.icon)}>
              <div className={clsx(style.icon_shape)}>
                <MicroPhone />
              </div>
            </div>
          </div>
        </div>
      </div>
    </C_Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchVoiceModal);
