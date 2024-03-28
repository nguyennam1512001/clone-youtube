import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Slider from 'react-slick';

import style from './Short.module.scss';
import * as actions from '~/store/actions';
import Action from './component/Action';
import { ArrowDown, ArrowUp } from '~/assets/icons';

function Short({ shortVideoStart, videosShort }) {
  const [maxResult, setMaxResult] = useState(5);
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // shortVideoStart(maxResult);
  }, []);

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
          <div className={clsx(style.prev_arrow, 'center-flex')} onClick={() => sliderRef.current.slickPrev()}>
            <div className={clsx(style.icon_shap)}>
              <div className={clsx(style.icon)}>
                <ArrowUp />
              </div>
            </div>
          </div>
        )}
        <div className={clsx(style.shorts_inner_container)} onWheel={handleWheel}>
          <Slider ref={sliderRef} {...settings}>
            {videosShort &&
              videosShort.map((item, index) => {
                return (
                  <div className={clsx(style.short_video_render)} key={index}>
                    <div className={clsx(style.short_video_container)}>
                      <div className={clsx(style.player_wrapper)} onWheel={handleWheel}>
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/` + item.id + 'error'}
                          title={item.snippet.title}
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
        <div className={clsx(style.next_arrow, 'center-flex')} onClick={() => sliderRef.current.slickNext()}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shortVideoStart: (maxResult) => dispatch(actions.shortVideoStart(maxResult)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Short);
