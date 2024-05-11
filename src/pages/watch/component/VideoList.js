import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import style from './VideoList.module.scss';
import * as actions from '~/store/actions';
import VideoItem from './VideoItem/VideoItem';
import { Box, Skeleton, Stack } from '@mui/material';

function VideoList({ videoList, itemHeight, isLoadingBar }) {
  const [idItem, setIdItem] = useState(null);
  const listRef = useRef(null);

  return (
    <div className={clsx('d-flex w-100 justify-content-center', style.grid_row)}>
      <div className={clsx('d-flex flex-column w-100', style.list)} ref={listRef}>
        {isLoadingBar &&
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <Stack direction={'row'} spacing={1} key={index} my={1}>
              <Skeleton variant="rounded" animation="wave" width={168} height={94} />
              <Stack spacing={1} flex={1}>
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={30} />
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={15} />
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={15} />
              </Stack>
            </Stack>
          ))}
        {!isLoadingBar &&
          videoList &&
          videoList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <VideoItem item={item} index={index} idItem={idItem} setIdItem={setIdItem} itemHeight={itemHeight} />
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
    isLoadingBar: state.video.isLoadingBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStart: (max) => dispatch(actions.getVideoStart(max)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
