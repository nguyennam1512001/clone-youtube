import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Input, List, ListItem, Stack } from '@mui/material';

import { Sort } from '~/public/assets/icons';
import * as actions from '~/store/actions';
import { convertViewCount } from '~/utils';
import CommentItem from './CommentItem';

function Comment({ videoWatch, isLoggedIn, access_token, userInfo, googleUserInfo }) {
  console.log(videoWatch);
  return (
    <>
      <Box mt={3} mb={4} sx={{}} className="header">
        <Stack mb={3} direction="row" alignItems="center" spacing={3} sx={{}} className="title">
          <Box sx={{ color: 'text.primary' }} className="count text-lg-6">
            45 bình luận
          </Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{}} className="sort-menu">
            <Box sx={{ width: '24px', height: '24px' }} className="icon">
              <Sort />
            </Box>
            <Box sx={{}} className="icon-label text-md-4">
              Sắp xếp theo
            </Box>
          </Stack>
        </Stack>
        <Box mr={2}>
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <Box>
              <img
                className={clsx('img-40-round')}
                src={
                  (userInfo &&
                    userInfo?.items &&
                    userInfo.items.length > 0 &&
                    userInfo.items[0]?.snippet?.thumbnails?.default?.url) ||
                  googleUserInfo.photoUrl
                }
                alt="avatar"
              />
            </Box>
            <Box sx={{ flex: '1' }}>
              <Input
                placeholder="Viết bình luận..."
                sx={{
                  width: '100%',
                  color: 'text.secondary',
                  fontSize: '1.4rem',
                  lineHeight: '1.4rem',
                }}
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
                    disabled
                    variant="contained"
                    size="medium"
                  >
                    Bình luận
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
      <List className="contents">
        <ListItem className="comment-thread">
          <CommentItem />
        </ListItem>
      </List>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
    googleUserInfo: state.user.googleUserInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRate: (id, access_token) => dispatch(actions.getRate(id, access_token)),
    postRate: (id, rating, access_token) => dispatch(actions.postRate(id, rating, access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
