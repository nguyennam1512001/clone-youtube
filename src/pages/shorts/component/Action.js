import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { CommentBold, DisLikeBold, LikeBold, Menu, ShareBold } from '~/assets/icons';
import style from './Action.module.scss';
import * as actions from '~/store/actions';
import { convertViewCount } from '~/utils';

function Action({ item }) {
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const history = useHistory();

  const handleLike = () => {
    setLikeActive(!likeActive);
    setDislikeActive(false);
  };

  const handleDislike = () => {
    setDislikeActive(!dislikeActive);
    setLikeActive(false);
  };

  return (
    <div className={clsx(style.action_container)}>
      <div className={clsx(style.actions)}>
        <div className={clsx(style.likes, style.actions_btn)}>
          <div className={clsx(style.btn_shape)}>
            <div
              className={clsx(style.icon_shape, { [style.active]: likeActive })}
              data-tooltip-id="short-action-icon"
              data-tooltip-content="Tôi thích video này"
              onClick={() => handleLike()}
            >
              <div className={clsx(style.icon)}>
                <LikeBold />
              </div>
            </div>
            <Tooltip place="left" arrowColor="transparent" id="short-action-icon" className="normal_tooltip"></Tooltip>
            <div className={clsx(style.text)}>{convertViewCount(item.statistics.likeCount)}</div>
          </div>
          <div className={clsx(style.btn_shape)}>
            <div
              className={clsx(style.icon_shape, { [style.active]: dislikeActive })}
              data-tooltip-id="short-action-icon"
              data-tooltip-content="Tôi không thích video này"
              onClick={() => handleDislike()}
            >
              <div className={clsx(style.icon)}>
                <DisLikeBold />
              </div>
            </div>
            <div className={clsx(style.text, 'ellipsis')}>Không thích</div>
          </div>
        </div>
        <div className={clsx(style.comments_btn, style.actions_btn)}>
          <div className={clsx(style.btn_shape)}>
            <div
              className={clsx(style.icon_shape)}
              data-tooltip-id="short-action-icon"
              data-tooltip-content="Bình luận"
            >
              <div className={clsx(style.icon)}>
                <CommentBold />
              </div>
            </div>
            <div className={clsx(style.text)}>{convertViewCount(item.statistics.commentCount)}</div>
          </div>
        </div>
        <div className={clsx(style.share_btn, style.actions_btn)}>
          <div className={clsx(style.btn_shape)}>
            <div className={clsx(style.icon_shape)} data-tooltip-id="short-action-icon" data-tooltip-content="Chia sẻ">
              <div className={clsx(style.icon)}>
                <ShareBold />
              </div>
            </div>
            <div className={clsx(style.text)}></div>
          </div>
        </div>
        <div className={clsx(style.menu_btn, style.actions_btn)}>
          <div className={clsx(style.btn_shape)}>
            <div className={clsx(style.icon_shape)}>
              <div className={clsx(style.icon)}>
                <Menu />
              </div>
            </div>
            <div className={clsx(style.text)}></div>
          </div>
        </div>
        <div className={clsx(style.pivot_btn)} data-tooltip-id="short-action-icon" data-tooltip-content="Âm thanh gốc">
          <div className={clsx(style.img)}>
            <img src={item.avatar} alt="channel" />
          </div>
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Action);
