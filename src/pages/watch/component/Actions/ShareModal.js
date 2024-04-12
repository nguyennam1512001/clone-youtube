import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import * as actions from '~/store/actions';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from '~/public/assets/icons';
import { Box, List, ListItem, Modal, Paper, Stack } from '@mui/material';
import { Close } from '~/public/assets/icons';

import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  VKShareButton,
  OKShareButton,
  TumblrShareButton,
  LinkedinShareButton,
} from 'react-share';

import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  VKIcon,
  OKIcon,
  TumblrIcon,
  LinkedinIcon,
} from 'react-share';

const shareModal = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  maxHeight: 500,
  p: 3,
};
const shareButtons = [
  { Button: FacebookShareButton, Icon: FacebookIcon, text: 'Facebook' },
  { Button: WhatsappShareButton, Icon: WhatsappIcon, text: 'Whatsapp' },
  { Button: EmailShareButton, Icon: EmailIcon, text: 'Email' },
  { Button: RedditShareButton, Icon: RedditIcon, text: 'Reddit' },
  { Button: VKShareButton, Icon: VKIcon, text: 'VK' },
  { Button: OKShareButton, Icon: OKIcon, text: 'OK' },
  { Button: TumblrShareButton, Icon: TumblrIcon, text: 'Tumblr' },
  { Button: LinkedinShareButton, Icon: LinkedinIcon, text: 'Linkedin' },
];

function ShareModal({ isOpen, handleClose, shortVideoStart, videosShort }) {
  const shareUrl = window.location.href;
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    if (sliderRef.current) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollWidth - clientWidth > scrollLeft + 1);
      };
      const handleResize = () => {
        handleScroll();
      };
      handleScroll();
      sliderRef.current.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      return () => {
        if (sliderRef && sliderRef.current) {
          sliderRef.current.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [sliderRef.current]);

  const handleScrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -250,
      behavior: 'smooth',
    });
  };
  const handleScrollRight = () => {
    sliderRef.current.scrollBy({
      left: 250,
      behavior: 'smooth',
    });
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{ zIndex: '2202' }}
    >
      <Paper
        sx={(theme) => ({
          ...shareModal,
          borderRadius: '20px',
          bgcolor: theme.palette.mode === 'light' ? 'bgcolor.default' : '#212121',
        })}
      >
        <Stack mb={1} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
          <Box>Chia sẻ</Box>
          <Box
            sx={{ color: 'text.primary', cursor: 'pointer', marginTop: '-8px !important' }}
            width={'24px'}
            height={'24px'}
            onClick={handleClose}
          >
            <Close />
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: 'relative' }}>
          {showLeftArrow && (
            <Box sx={{ position: 'absolute', zIndex: 1, top: '18px', left: '-16px' }}>
              <Paper
                elevation={3}
                sx={{ borderRadius: '50%', bgcolor: 'bgcolor.default' }}
                className="inline-flex-center bg-40-round cursor-pointer"
                onClick={handleScrollLeft}
              >
                <Box height={'24px'} width={'24px'}>
                  <ChevronLeft />
                </Box>
              </Paper>
            </Box>
          )}
          <Box sx={{ bgcolor: 'bgcolor.default', overflow: 'hidden' }}>
            <List ref={sliderRef} sx={{ display: 'flex', overflow: 'auto', scrollbarWidth: 'none' }}>
              {shareButtons.map(({ Button, Icon, text }) => (
                <ListItem key={text} sx={{ padding: '0 8px' }}>
                  <Button url={shareUrl}>
                    <Icon round size={60} />
                    <Box sx={{ color: 'text.primary' }} fontSize={12} mt={1}>
                      {text}
                    </Box>
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
          {showRightArrow && (
            <Box sx={{ position: 'absolute', zIndex: 1, top: '18px', right: '-16px' }}>
              <Paper
                elevation={3}
                sx={{ borderRadius: '50%', bgcolor: 'bgcolor.default' }}
                className="inline-flex-center bg-40-round cursor-pointer"
                onClick={handleScrollRight}
              >
                <Box height={'24px'} width={'24px'}>
                  <ChevronRight />
                </Box>
              </Paper>
            </Box>
          )}
        </Stack>
      </Paper>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
