import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Input, InputAdornment, Stack } from '@mui/material';
import * as actions from '~/store/actions';

function InputCmt({
  isLoggedIn,
  item,
  setOpen,
  imgSm,
  isRep,
  topCmt,
  postCommentThreads,
  postComment,
  myChannelInfo,
  access_token,
  videoWatch,
}) {
  const [inputValue, setInputValue] = useState('');
  const [adornment, setAdornment] = useState('');
  useEffect(() => {
    if (isRep) {
      let value = item?.snippet.authorDisplayName;
      setAdornment(value);
      setInputValue('  ');
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (!event.target.value) {
      setAdornment('');
    }
  };

  const handleSubmit = async () => {
    const data = {
      channelId: videoWatch[0].snippet.channelId,
      videoId: videoWatch[0].id,
      textOriginal: inputValue.trim(),
    };

    const dataCmt = {
      parentId: isRep ? item?.snippet.parentId : item?.id,
      textOriginal: (adornment ? `@${adornment.toString()} ` : '') + inputValue.toString().trim(),
    };
    if (topCmt && !isRep) {
      await postComment(dataCmt, access_token);
    }
    if (isRep && dataCmt.textOriginal && dataCmt.parentId) {
      await postComment(dataCmt, access_token);
    }
    if (!topCmt && !isRep && data.textOriginal && data.channelId && data.videoId) {
      await postCommentThreads(data, access_token);
    }
    setInputValue('');
  };
  const handleOnKey = (e) => {
    if (e.key === 'enter') {
      handleSubmit();
    }
  };

  return (
    <Box mr={2} className="input-box">
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box>
          <img className={clsx(imgSm ? 'img-24-round' : 'img-40-round')} src={myChannelInfo.thumbnails} alt="avatar" />
        </Box>
        <Box sx={{ flex: '1' }}>
          <Input
            startAdornment={
              <InputAdornment sx={{ mr: '0' }} position="start">
                <b>{adornment}</b>
              </InputAdornment>
            }
            placeholder={'Viết bình luận...'}
            sx={{
              width: '100%',
              color: 'text.secondary',
              fontSize: '1.4rem',
              lineHeight: '1.4rem',
            }}
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleOnKey}
          />

          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Box></Box>
            <Stack pt={1} direction="row" alignItems="flex-end" spacing={1}>
              <Button
                sx={{
                  borderRadius: '100px',
                  fontSize: '1.4rem',
                  lineHeight: '2rem',
                  textTransform: 'unset',
                  '&:hover': { bgcolor: 'bgcolor.secondary' },
                  color: 'text.primary',
                }}
                variant="text"
                size="medium"
                onClick={() => setOpen(false)}
              >
                Huỷ
              </Button>
              <Button
                sx={{
                  borderRadius: '100px',
                  fontSize: '1.4rem',
                  lineHeight: '2rem',
                  bgcolor: '#3EA6FF',
                  color: 'text.primary',
                  textTransform: 'unset',
                  '&:hover': { bgcolor: '#65b8ff' },
                }}
                disabled={inputValue.trim() && inputValue.trim() !== item?.snippet.authorDisplayName ? false : true}
                variant="contained"
                size="medium"
                onClick={handleSubmit}
              >
                Bình luận
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    myChannelInfo: state.video.myChannelInfo,
    commentThreads: state.video.commentThreads,
    videoWatch: state.video.videoWatch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentThreads: (id, max) => dispatch(actions.getCommentThreads(id, max)),
    postCommentThreads: (data, access_token) => dispatch(actions.postCommentThreads(data, access_token)),
    postComment: (data, access_token) => dispatch(actions.postComment(data, access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCmt);
