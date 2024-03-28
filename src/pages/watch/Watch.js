import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import ChipBar from '~/components/chipbar/ChipBar';
import style from './Watch.module.scss';
import * as actions from '~/store/actions';
import EndOfListObserver from '~/components/EndOfListObserver';
import Spinner from '~/components/Spinner';
import Button from '~/components/Button';
import VideoList from './component/VideoList';

function Watch({ videosInfo }) {
  const [maxResult, setMaxResult] = useState(20);
  const history = useHistory();
  const [endOfListReached, setEndOfListReached] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);

  const chipArr = [
    {
      path: 'Tất cả',
      text: 'Tất cả',
    },
    {
      path: '',
      text: `Của lẩu nhạc remix`,
    },
    {
      path: '',
      text: 'Dành cho bạn',
    },
    {
      path: '',
      text: 'Trực tiếp',
    },
    {
      path: '',
      text: 'Tải lên gần đây',
    },
    {
      path: '',
      text: 'Đã xem',
    },
  ];

  // useEffect(() => {
  //   setIsSpinner(true);
  //   setIsLoadingBar(true);
  //   getVideoStart(maxResult)
  //     .then(() => {
  //       setIsSpinner(false);
  //       setIsLoadingBar(false);
  //     })
  //     .catch((error) => {
  //       setIsLoadingBar(false);
  //       setIsSpinner(false);
  //       console.error('Error loading videos:', error);
  //     });
  // }, [maxResult]);

  const handleEndOfListReached = () => {
    setMaxResult((prevMaxResult) => prevMaxResult + 10);
  };

  return (
    <div className={clsx(style.page_container)}>
      <div className={clsx(style.browse_results_renderer)}>
        <div className={clsx(style.primary)}>
          {/* <div className={clsx(style.avatar_link)}>
                                  <div className={clsx(style.avatar)}>
                                    <img className={clsx(style.avatar_img)} alt="" width="36" src={item.avatar} />
                                  </div>
                                </div> */}
        </div>
        <div className={clsx(style.secondary)}>
          <div className={clsx(style.grid_renderer)}>
            <div className={clsx(style.header)}>
              <div className={clsx(style.chat_container)}>
                <div className={clsx(style.chat)}>
                  <div className={clsx(style.show_hide_button)}>
                    <Button
                      text={'Hiện nội dung phát lại cuộc trò chuyện'}
                      color={'#0f0f0f'}
                      fs={'1.4rem'}
                      fw={'500'}
                      height={'34px'}
                    />
                  </div>
                </div>
              </div>

              <div className={clsx(style.chips_bar)}>
                <div className={clsx(style.chips_wrapper)}>
                  <div className={clsx(style.chips_content)}>
                    <ChipBar chipArr={chipArr} />
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(style.contents)}>
              <VideoList videoList={videosInfo} />
              <EndOfListObserver
                onEndOfListReached={handleEndOfListReached}
                setEndOfListReached={setEndOfListReached}
              />
            </div>
            {isSpinner && endOfListReached && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    videosInfo: state.video.videosInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStart: (max) => dispatch(actions.getVideoStart(max)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
