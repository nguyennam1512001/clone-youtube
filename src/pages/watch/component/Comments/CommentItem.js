import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Link, Stack } from '@mui/material';

import { ArrowDropDownIcon, ArrowDropUpIcon, DisLike, DisLikeBold, Like, LikeBold, Menu } from '~/public/assets/icons';
import * as actions from '~/store/actions';
import { convertViewCount } from '~/utils';

function CommentItem({ item, videoWatch, isLoggedIn, access_token }) {
  console.log(videoWatch);
  const [rating, setRating] = useState('none');
  const [expander, setExpander] = useState(false);
  const handleLike = () => {
    if (rating === 'like') {
      setRating('none');
    } else {
      setRating('like');
    }
  };
  const handleDislike = () => {
    if (rating === 'dislike') {
      setRating('none');
    } else {
      setRating('dislike');
    }
  };
  const handleExpander = () => {
    setExpander(!expander);
  };
  return (
    <Stack direction="column" justifyContent="flex-start">
      <Stack direction="row" alignItems="flex-start" className="comment">
        <Box className="author-thumbnail" pr={2}>
          <Link href="#" color="inherit" underline="none" sx={{}} className="bg-40-round">
            <img src="" alt="" />
          </Link>
        </Box>

        <Box className="main" sx={{ flex: '1' }} pr={4}>
          <Stack direction="row" alignItems="center" mb="2px">
            <Link
              href="#@"
              color="inherit"
              underline="none"
              sx={{
                '&:hover': {
                  color: 'inherit',
                },
                fontSize: '1.3rem',
                fontWeight: '600',
              }}
            >
              @hoangyang1902
            </Link>
            <span className="text-sm-4">&nbsp; 2 ngày trước</span>
          </Stack>
          <Box
            sx={{ cursor: 'text', whiteSpace: 'pre-wrap', color: 'text.primary' }}
            className="content-text text-md-4"
          >
            Video có một số chỗ bị miss sound do lỗi render team t3 kỹ thuật rất xin lỗi ae. Cái này chưa tìm ra nguyên
            nhân. Bọn mình sẽ khắc phục ở các clip sau!
          </Box>

          <Stack direction="row" className="action-buttons" spacing={2} mt={1} ml={-1}>
            <Stack direction="row" alignItems="center">
              <Button
                variant="text"
                size="small"
                sx={{
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  '&:hover': { bgcolor: 'bgcolor.secondary' },
                }}
                onClick={() => handleLike()}
              >
                <Box sx={{ color: 'text.primary' }} className={clsx('icon')}>
                  {rating === 'like' ? <LikeBold /> : <Like />}
                </Box>
              </Button>
              <Box sx={{ color: 'text.secondary' }} className={clsx('text-one-line text-sm-4')}>
                {/* {convertViewCount(
                      rating === 'like' ? parseInt(item?.statistics.likeCount) + 1 : item?.statistics.likeCount,
                    )} */}
                5
              </Box>
            </Stack>

            <Button
              variant="text"
              size="small"
              sx={{
                minWidth: '32px',
                height: '32px',
                borderRadius: '50%',
                '&:hover': { bgcolor: 'bgcolor.secondary' },
              }}
              onClick={() => handleDislike()}
            >
              <Box sx={{ color: 'text.primary' }} className={clsx('icon')}>
                {rating === 'dislike' ? <DisLikeBold /> : <DisLike />}
              </Box>
            </Button>

            <Button
              sx={{
                height: '32px',
                borderRadius: '100px',
                fontSize: '1.2rem',
                lineHeight: '1.8rem',
                fontWeight: '600',
                textTransform: 'unset',
                '&:hover': { bgcolor: 'bgcolor.secondary' },
                color: 'text.primary',
              }}
              variant="text"
              size="small"
            >
              Phản hồi
            </Button>
          </Stack>
          <Box
            sx={{ position: 'absolute', top: '12px', right: '12px', width: '40px', height: '24px' }}
            className="action-menu cursor-pointer"
          >
            <Menu />
          </Box>
        </Box>
      </Stack>
      <Box ml={6} sx={{}}>
        <Button
          variant="text"
          size="large"
          sx={{
            fontSize: '1.4rem',
            textTransform: 'unset',
            color: '#085ED4',
            height: '36px',
            borderRadius: '100px',
            '&:hover': { bgcolor: '#DFF1FE' },
          }}
          onClick={() => handleExpander()}
          startIcon={
            <Box sx={{ width: '24px', height: '24px' }}>{expander ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Box>
          }
        >
          3 phản hồi
        </Button>
      </Box>
    </Stack>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
