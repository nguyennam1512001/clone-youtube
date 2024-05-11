import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Link, Stack } from '@mui/material';

import { ArrowDropDownIcon, ArrowDropUpIcon, DisLike, DisLikeBold, Like, LikeBold, Menu } from '~/public/assets/icons';
import * as actions from '~/store/actions';
import { calculateTimeDifference, convertViewCount } from '~/utils';
import Replist from './Replist';
import InputCmt from './InputCmt';
import useClickOutside from '~/hooks/useClickOutside';
import MenuPopup from './MenuPopup';

function CommentItem({ item, totalReplyCount, replist, isRep, isLoggedIn, access_token }) {
  const [rating, setRating] = useState('none');
  const [readMore, setReadMore] = useState(false);
  const [expander, setExpander] = useState(false);
  const [isContentOverLimit, setIsContentOverLimit] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [isShowMenuPopup, setIsShowMenuPopup] = useState(false);
  const menuRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement.scrollHeight > contentElement.clientHeight) {
      // Nội dung đã bị ngắt dòng
      setIsContentOverLimit(true);
    } else {
      setIsContentOverLimit(false);
    }
  }, []);

  useEffect(() => {
    const contentText = document.getElementById(item.id);
    const textDisplay = item.snippet.textDisplay;

    if (contentText && textDisplay) {
      const formattedText = formatFirstWord(textDisplay);
      contentText.innerHTML = formattedText;
    }
  }, [item]);

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

  function handleClickMenu(e, index) {
    e.stopPropagation();
    document.body.style.overflow = !isShowMenuPopup ? 'hidden' : 'auto';
    // setIdItem(index);
    setIsShowMenuPopup(!isShowMenuPopup);
  }

  const handleClickOutside = () => {
    document.body.style.overflow = 'auto';
    setIsShowMenuPopup(false);
  };
  useClickOutside(menuRef, handleClickOutside);

  function formatFirstWord(str) {
    const words = str.trim().split(' ');
    // Kiểm tra xem từ đầu tiên có chứa @@
    if (words.length > 0 && words[0].includes('@@')) {
      const formattedFirstWord = words[0].replace(/(@{2,})/, '@');
      words[0] = `<a href="/${formattedFirstWord}" style="color:#085ED4">${formattedFirstWord}</a>`;
    }
    return words.join(' ');
  }
  return (
    <Stack direction="column" justifyContent="flex-start" mb={isRep ? 0 : 2} sx={{ width: '100%' }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        className="comment"
        sx={{ '&:hover .action-menu': { display: 'Block' } }}
      >
        <Box className="author-thumbnail" pr={2}>
          <Link
            href="#"
            color="inherit"
            underline="none"
            sx={{ display: 'flex' }}
            className={isRep ? 'img-24-round' : 'img-40-round'}
          >
            <img src={item && item?.snippet?.authorProfileImageUrl} alt="img" />
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
              {item && item?.snippet?.authorDisplayName}
            </Link>
            <span className="text-sm-4">&nbsp; {calculateTimeDifference(item && item?.snippet?.updatedAt)}</span>
          </Stack>
          <Box
            ref={contentRef}
            id={item.id}
            sx={{
              cursor: 'text',
              whiteSpace: 'pre-wrap',
              color: 'text.primary',
              maxHeight: readMore ? 'auto' : '80px',
              overflow: 'hidden',
              display: readMore ? 'block' : '-webkit-box',
              WebkitLineClamp: readMore ? 'initial' : 4,
              WebkitBoxOrient: 'vertical',
              textOverflow: readMore ? 'initial' : 'ellipsis',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
            className="content-text text-md-4"
          ></Box>
          {isContentOverLimit && (
            <Box
              onClick={() => setReadMore(!readMore)}
              className="text-md-5 cursor-pointer"
              sx={{ color: 'text.secondary', display: 'inline-block' }}
              pt={0.5}
            >
              {readMore ? 'Ẩn bớt' : 'Đọc thêm'}
            </Box>
          )}
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
                {convertViewCount(
                  rating === 'like' ? parseInt(item && item?.snippet?.likeCount) + 1 : item && item?.snippet?.likeCount,
                )}
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
              onClick={() => setOpenInput(true)}
            >
              Phản hồi
            </Button>
          </Stack>
          {openInput && <InputCmt item={item} setOpen={setOpenInput} imgSm={true} isRep={isRep} topCmt={true} />}
          <Box
            onClick={(e) => handleClickMenu(e)}
            ref={menuRef}
            sx={{
              display: isShowMenuPopup ? 'block' : 'none',
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '40px',
              height: '24px',
            }}
            className="action-menu cursor-pointer"
          >
            <Menu />
            {isShowMenuPopup && (
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  zIndex: 1,
                }}
              >
                <MenuPopup item={item} setIsShowMenuPopup={setIsShowMenuPopup} />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
      {totalReplyCount && totalReplyCount !== 0 ? (
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
            {totalReplyCount} phản hồi
          </Button>
        </Box>
      ) : (
        <></>
      )}
      {expander && (
        <Box ml={7}>
          <Replist itemParent={item} replist={replist} />
        </Box>
      )}
    </Stack>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
