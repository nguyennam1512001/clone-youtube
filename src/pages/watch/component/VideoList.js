import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './VideoList.module.scss';
import * as actions from '~/store/actions';
import VideoItem from './VideoItem';

function VideoList({ videoList }) {
  const [idItem, setIdItem] = useState(null);

  const history = useHistory();
  const listRef = useRef(null);

  //   useEffect(() => {
  //     if (isShowMenuPopup && idItem !== null && listRef.current) {
  //       listRef?.current?.children[idItem]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  //       document.body.style.overflow = 'hidden';
  //     } else {
  //       document.body.style.overflow = 'auto';
  //     }
  //   }, [isShowMenuPopup, idItem]);
  return (
    <div className={clsx(style.grid_row)}>
      <div className={clsx(style.list)} ref={listRef}>
        {videoList &&
          videoList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <VideoItem item={item} index={index} idItem={idItem} setIdItem={setIdItem} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStart: (max) => dispatch(actions.getVideoStart(max)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
