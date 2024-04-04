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

function Action({ item }) {
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const history = useHistory();
  const handleLike = () => {
    if (!likeActive || (likeActive && dislikeActive)) {
      setLikeActive(!likeActive);
      setDislikeActive(false);
    } else {
      setLikeActive(false);
    }
  };

  const handleDislike = () => {
    if (!dislikeActive || (likeActive && dislikeActive)) {
      setDislikeActive(!dislikeActive);
      setLikeActive(false);
    } else {
      setDislikeActive(false);
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
            <div className={clsx(style.icon)}>{likeActive ? <LikeBold /> : <Like />}</div>
          </div>
          <Tooltip place="bottom" arrowColor="transparent" id="short-action-icon" className="normal_tooltip"></Tooltip>
          <div className={clsx('text-one-line text-md-6', style.text)}>
            {convertViewCount(item?.statistics.likeCount)}
          </div>
        </div>
        <div className={clsx('flex-center cursor-pointer', style.btn_shape, style.dislike)}>
          <div
            className={clsx('flex-center simple-endpoint', style.icon_shape)}
            data-tooltip-id="short-action-icon"
            data-tooltip-content="Tôi không thích video này"
            onClick={() => handleDislike()}
          >
            <div className={clsx(style.icon)}>{dislikeActive ? <DisLikeBold /> : <DisLike />}</div>
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
        <div className={clsx('flex-center cursor-pointer', style.btn_shape)}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Action);
