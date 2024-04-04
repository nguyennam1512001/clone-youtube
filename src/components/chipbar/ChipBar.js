import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import style from './ChipBar.module.scss';
import { Tooltip } from 'react-tooltip';

import { ChevronLeft, ChevronRight } from '../../public/assets/icons';
function ChipBar({ is_sidebar_mini, chipArr }) {
  const chips = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

  useEffect(() => {
    if (chips.current) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = chips.current;
        setShowLeftArrow(scrollLeft);
        setShowRightArrow(scrollWidth - clientWidth > scrollLeft + 1);
      };
      const handleResize = () => {
        handleScroll();
      };
      handleScroll();
      chips.current.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      return () => {
        if (chips && chips.current) {
          chips.current.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [chips.current, is_sidebar_mini]);

  const handleScrollLeft = () => {
    chips.current.scrollBy({
      left: -250,
      behavior: 'smooth',
    });
  };
  const handleScrollRight = () => {
    chips.current.scrollBy({
      left: 250,
      behavior: 'smooth',
    });
  };

  const handleSelected = (index) => {
    setIsSelected(index);
  };

  return (
    <>
      <div
        className={clsx(style.left_arrow_wrap, {
          [style.showArrow]: showLeftArrow,
        })}
      >
        <div className={clsx('h-100', style.left_arrow)}>
          <div className={clsx('flex-align-center h-100', style.arrow)}>
            <div
              data-tooltip-id="arrow_left_btn_bar"
              data-tooltip-content="trước"
              className={clsx('inline-flex-center bg-40-round cursor-pointer', style.arrow_btn)}
              onClick={handleScrollLeft}
            >
              <div className={clsx(style.btn_arrow_shape)}>
                <ChevronLeft />
              </div>
              <Tooltip
                place="bottom"
                arrowColor="transparent"
                id="arrow_left_btn_bar"
                className="normal_tooltip"
              ></Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(style.scroll_container)}>
        <ul ref={chips} className={clsx(style.chips, 'nav-pills scroll_bar')}>
          {chipArr &&
            chipArr.map((item, index) => (
              <li
                className={clsx('nav-item inline-flex-center flex-row ', {
                  [style.selected]: isSelected == index,
                })}
                key={index}
                onClick={() => handleSelected(index)}
              >
                <button className={clsx('text-md-5')} type="button">
                  {item.text}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div
        className={clsx(style.right_arrow_wrap, {
          [style.showArrow]: showRightArrow,
        })}
      >
        <div className={clsx('h-100', style.right_arrow)}>
          <div className={clsx('flex-align-center', style.arrow)}>
            <div
              data-tooltip-id="arrow_right_btn_bar"
              className={clsx('inline-flex-center bg-40-round cursor-pointer', style.arrow_btn)}
              onClick={handleScrollRight}
            >
              <div className={clsx(style.btn_arrow_shape)}>
                <ChevronRight />
              </div>
              <Tooltip place="bottom" arrowColor="transparent" id="arrow_right_btn_bar" className="normal_tooltip">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Tiếp</span>
                  <span>theo</span>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.app.is_sidebar_mini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChipBar);
