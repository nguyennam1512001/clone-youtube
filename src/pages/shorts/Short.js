import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import style from './Short.module.scss';
import * as actions from '~/store/actions';
import Action from './component/Action';
import { ArrowDown, ArrowUp } from '../../public/assets/icons';
import { Box, Skeleton, Stack } from '@mui/material';

function Short({ shortVideoStart, videosShort, firstShortVideo, setIsLoadingBar, isLoadingBar }) {
  const [maxResult, setMaxResult] = useState(5);
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const history = useHistory();
  const [videoList, setVideoList] = useState(null);
  const [fakes, setFake] = useState([1]);

  useEffect(() => {
    shortVideoStart(maxResult);
  }, [maxResult]);
  useEffect(() => {
    setVideoList(videosShort);
    if (videosShort && firstShortVideo) {
      const newList = [firstShortVideo, ...videosShort];
      setVideoList(newList);
    }
  }, [videosShort]);

  const handleWheel = (e) => {
    // const delta = Math.sign(e.deltaY);
    const delta = e.deltaY;
    if (delta > 10) {
      // Cuộn xuống
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    } else if (delta < -10) {
      // Cuộn lên
      if (sliderRef.current) {
        sliderRef.current.slickPrev();
      }
    }
  };

  const handleAfterChange = (current) => {
    setActiveSlide(current);
    // Kiểm tra xem phần tử hiện tại có phải là phần tử cuối cùng của slider hay không
    if (sliderRef.current && current === sliderRef.current.props.children.length - 1) {
      setMaxResult(maxResult + 5);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true, // Thiết lập cuộn dọc
    verticalSwiping: true, // Cho phép cuộn dọc
    centerMode: true,
    centerPadding: '0',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: handleAfterChange,
  };
  function NextArrow() {
    return null;
  }
  function PrevArrow() {
    return null;
  }

  return (
    <div className={clsx(style.page_container)}>
      <div className={clsx(style.shorts_container)}>
        {activeSlide > 0 && (
          <div
            className={clsx('flex-center cursor-pointer rounded-circle', style.prev_arrow)}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <div className={clsx(style.icon_shap)}>
              <div className={clsx(style.icon)}>
                <ArrowUp />
              </div>
            </div>
          </div>
        )}
        <div className={clsx('flex-column flex-align-center', style.shorts_inner_container)} onWheel={handleWheel}>
          <Slider
            ref={sliderRef}
            {...settings}
            style={{
              width: 'calc(390px + 72px)',
              height: 'calc(100vh - 56px)',
              overflowY: 'hidden',
            }}
          >
            {' '}
            {isLoadingBar &&
              fakes.map((item, index) => (
                <div className={clsx(style.short_video_render)} key={index}>
                  <Stack
                    direction={'row'}
                    alignItems={'flex-end'}
                    spacing={1}
                    className={clsx(style.short_video_container)}
                  >
                    <div className={clsx(style.player_wrapper)}>
                      <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                    </div>
                    <Stack spacing={1} width={72} height={400}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                    </Stack>
                  </Stack>
                </div>
              ))}
            {!isLoadingBar &&
              videoList &&
              videoList.map((item, index) => {
                return (
                  <div className={clsx(style.short_video_render)} key={index}>
                    <div className={clsx(style.short_video_container)}>
                      <div className={clsx(style.player_wrapper)} onWheel={handleWheel}>
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${item.id}${
                            activeSlide === index ? '?autoplay=1&mute=1&rel=0' : ''
                          }`}
                          title={item.snippet.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          onWheel={(e) => e.stopPropagation()}
                        ></iframe>
                      </div>
                      <Action item={item} />
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
        <div
          className={clsx('flex-center cursor-pointer rounded-circle', style.next_arrow)}
          onClick={() => sliderRef.current.slickNext()}
        >
          <div className={clsx(style.icon_shap)}>
            <div className={clsx(style.icon)}>
              <ArrowDown />
            </div>
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
    videosShort: state.video.videosShort,
    firstShortVideo: state.video.firstShortVideo,
    isLoadingBar: state.video.isLoadingBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shortVideoStart: (maxResult) => dispatch(actions.shortVideoStart(maxResult)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Short);
