import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import {
  CommentBold,
  DisLike,
  DisLikeBold,
  Download,
  Like,
  LikeBold,
  Menu,
  MenuHorizontal,
  Share,
  ShareBold,
} from '~/public/assets/icons';
import style from './Action.module.scss';
import * as actions from '~/store/actions';
import { convertViewCount } from '~/utils';
import ShareModal from './ShareModal';

function Action({ isLoggedIn, item, rate, postRate, access_token, getRate }) {
  const [rating, setRating] = useState('');
  const [openModalShare, setOpenModalShare] = React.useState(false);
  const handleOpenModalShare = () => {
    setOpenModalShare(true);
  };
  const handleCloseModalShare = () => {
    setOpenModalShare(false);
  };
  const history = useHistory();

  useEffect(() => {
    if (access_token) {
      getRate(item.id, access_token);
    }
  }, []);

  useEffect(() => {
    if (rate && rate.items && rate.items.length > 0 && isLoggedIn) {
      console.log(rate);
      setRating(rate.items[0].rating);
    }
  }, [rate, isLoggedIn]);

  useEffect(() => {
    const handlePostAndFetchRate = async () => {
      if (rating && access_token) {
        try {
          await postRate(item.id, rating, access_token);
          getRate(item.id, access_token);
        } catch (error) {
          console.error('Error while posting rate:', error);
        }
      }
    };
    handlePostAndFetchRate();
  }, [rating]);

  const handleLike = () => {
    if (rating === 'like') {
      setRating('none');
    }
    if (rating === 'none') {
      setRating('like');
    }
    if (rating === 'dislike') {
      setRating('like');
    }
  };

  const handleDislike = () => {
    if (rating === 'dislike') {
      setRating('none');
    }
    if (rating === 'none') {
      setRating('dislike');
    }
    if (rating === 'like') {
      setRating('dislike');
    }
  };

  return (
    <>
      <div className={clsx('flex-center flex-row', style.likes, style.actions_btn)}>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape, style.like)}>
          <div
            className={clsx('flex-center simple-endpoint', style.icon_shape)}
            data-tooltip-id="short-action-icon"
            data-tooltip-content="Tôi thích video này"
            onClick={() => handleLike()}
          >
            <div className={clsx(style.icon)}>{rating === 'like' ? <LikeBold /> : <Like />}</div>
          </div>
          <Tooltip place="bottom" arrowColor="transparent" id="short-action-icon" className="normal_tooltip"></Tooltip>
          <div className={clsx('text-one-line text-md-6', style.text)}>
            {convertViewCount(
              rating === 'like' ? parseInt(item?.statistics.likeCount) + 1 : item?.statistics.likeCount,
            )}
          </div>
        </div>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape, style.dislike)}>
          <div
            className={clsx('flex-center simple-endpoint', style.icon_shape)}
            data-tooltip-id="short-action-icon"
            data-tooltip-content="Tôi không thích video này"
            onClick={() => handleDislike()}
          >
            <div className={clsx(style.icon)}>{rating === 'dislike' ? <DisLikeBold /> : <DisLike />}</div>
          </div>
          <div className={clsx('text-one-line text-md-4', style.text)}>Không thích</div>
        </div>
      </div>
      {/* <div className={clsx(style.comments_btn, style.actions_btn)}>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape)}>
          <div
            className={clsx('flex-center simple-endpoint', style.icon_shape)}
            data-tooltip-id="short-action-icon"
            data-tooltip-content="Bình luận"
          >
            <div className={clsx(style.icon)}>
              <CommentBold />
            </div>
          </div>
          <div className={clsx('text-one-line text-md-4', style.text)}>
            {convertViewCount(item?.statistics.commentCount)}
          </div>
        </div>
      </div> */}
      <div className={clsx('flex-center', style.share_btn, style.actions_btn)}>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape)} onClick={handleOpenModalShare}>
          <div
            className={clsx('flex-center simple-endpoint', style.icon_shape)}
            data-tooltip-id="short-action-icon"
            data-tooltip-content="Chia sẻ"
          >
            <div className={clsx(style.icon)}>
              <Share />
              {/* <ShareBold /> */}
            </div>
          </div>
          <div className={clsx('text-one-line text-md-6', style.text)}>Chia sẻ</div>
        </div>
        <ShareModal isOpen={openModalShare} handleClose={handleCloseModalShare} />
      </div>
      <div className={clsx('flex-center', style.dowload_btn, style.actions_btn)}>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape)}>
          <div
            className={clsx('flex-center simple-endpoint', style.icon_shape)}
            data-tooltip-id="short-action-icon"
            data-tooltip-content="Chia sẻ"
          >
            <div className={clsx(style.icon)}>
              <Download />
              {/* <ShareBold /> */}
            </div>
          </div>
          <div className={clsx('text-one-line text-md-6', style.text)}>Tải xuống</div>
        </div>
      </div>
      <div className={clsx('flex-center', style.menu_btn, style.actions_btn)}>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape, style.menu)}>
          <div className={clsx('flex-center simple-endpoint', style.icon_shape)}>
            <div className={clsx(style.icon)}>
              <MenuHorizontal />
              {/* <Menu/> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={clsx(style.pivot_btn)} data-tooltip-id="short-action-icon" data-tooltip-content="Âm thanh gốc">
        <div className={clsx(style.img)}>
          <img src={item?.avatar} alt="channel" />
        </div>
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    rate: state.video.rate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRate: (id, access_token) => dispatch(actions.getRate(id, access_token)),
    postRate: (id, rating, access_token) => dispatch(actions.postRate(id, rating, access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Action);
