import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import style from './VideoList.module.scss';
import * as actions from '~/store/actions';
import VideoItem from './VideoItem/VideoItem';

function VideoList({ videoList }) {
  const [idItem, setIdItem] = useState(null);
  const listRef = useRef(null);

  return (
    <div className={clsx('d-flex w-100 justify-content-center', style.grid_row)}>
      <div className={clsx('d-flex flex-column w-100', style.list)} ref={listRef}>
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
