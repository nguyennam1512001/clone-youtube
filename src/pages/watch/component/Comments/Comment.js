import clsx from 'clsx';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Input, List, ListItem, Stack } from '@mui/material';

import { Sort } from '~/public/assets/icons';
import * as actions from '~/store/actions';
import { convertViewCount } from '~/utils';
import CommentItem from './CommentItem';
import InputCmt from './InputCmt';
import useClickOutside from '~/hooks/useClickOutside';

function Comment({
  videoId,
  isLoggedIn,
  getCommentThreads,
  commentThreads,
  resPostCmt,
  resPostCmtRep,
  cmtDeleted,
  myChannelInfo,
}) {
  const [openInput, setOpenIpnut] = useState(false);
  const [pageToken, setPageToken] = useState(' ');
  useEffect(() => {
    getCommentThreads(videoId, pageToken);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoId) {
        getCommentThreads(videoId, pageToken);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [videoId, pageToken, resPostCmt, resPostCmtRep, cmtDeleted]);

  return (
    <>
      <Box mt={3} mb={4} sx={{}} className="header">
        <Stack mb={3} direction="row" alignItems="center" spacing={3} sx={{}} className="title">
          <Box sx={{ color: 'text.primary' }} className="count text-lg-6">
            {commentThreads && commentThreads?.pageInfo?.totalResults} Bình luận
          </Box>
          {/* <Stack direction="row" alignItems="center" spacing={1} sx={{}} className="sort-menu">
            <Box sx={{ width: '24px', height: '24px' }} className="icon">
              <Sort />
            </Box>
            <Box sx={{}} className="icon-label text-md-4">
              Sắp xếp theo
            </Box>
          </Stack> */}
        </Stack>
        {openInput ? (
          <InputCmt setOpen={setOpenIpnut} />
        ) : (
          <Box mr={2} className="input-box">
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box>
                <img className={clsx('img-40-round')} src={myChannelInfo.thumbnails} alt="avatar" />
              </Box>
              <Box sx={{ flex: '1' }}>
                <Input
                  placeholder="Viết bình luận..."
                  onFocus={() => setOpenIpnut(true)}
                  sx={{
                    width: '100%',
                    color: 'text.secondary',
                    fontSize: '1.4rem',
                    lineHeight: '1.4rem',
                  }}
                />
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
      <List className="contents">
        {commentThreads && commentThreads?.items?.length > 0 && (
          <>
            {resPostCmt &&
              resPostCmt.map((item, index) => {
                const isDeleted = cmtDeleted.includes(item.id);
                return isDeleted ? (
                  <Fragment key={index}></Fragment>
                ) : (
                  <ListItem className="comment-thread" key={index + 'resPostCmt'}>
                    <CommentItem item={item?.snippet?.topLevelComment} totalReplyCount={0} replist={null} />
                  </ListItem>
                );
              })}
            {commentThreads.items.map((item, index) => {
              const matchingItems = resPostCmtRep.filter((reply) => reply.snippet.parentId === item.id);
              const matchingItemCount = matchingItems.length;
              const totalReply = item.snippet.totalReplyCount + matchingItemCount;
              const isDeleted = cmtDeleted.includes(item.id);

              return isDeleted ? (
                <Fragment key={index}></Fragment>
              ) : (
                <ListItem className="comment-thread" key={index}>
                  <CommentItem
                    item={item.snippet.topLevelComment}
                    totalReplyCount={totalReply}
                    replist={item.replies}
                  />
                </ListItem>
              );
            })}
          </>
        )}
      </List>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    commentThreads: state.video.commentThreads,
    resPostCmt: state.video.resPostCmt,
    resPostCmtRep: state.video.resPostCmtRep,
    cmtDeleted: state.video.cmtDeleted,
    myChannelInfo: state.video.myChannelInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentThreads: (id, max) => dispatch(actions.getCommentThreads(id, max)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
