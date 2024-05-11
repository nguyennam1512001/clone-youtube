import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { Tick } from '~/public/assets/icons';
import style from './Details.module.scss';
import * as actions from '~/store/actions';
import { convertViewCount, calculateTimeDifference, path } from '~/utils';

function Details({ item, currentPage }) {
  const history = useHistory();

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <div className={clsx(style.meta)}>
      <h3 className={clsx('d-inline-flex m-0 p-0', style.video_name)}>
        <div className={clsx('simple-endpoint', style.video_title_link)} title={item.snippet.title}>
          <div className={clsx('text-two-line', 'text-md-5', style.video_title)}>{item.snippet.title}</div>
        </div>
      </h3>
      <div className={clsx(style.meta_block)}>
        <div className={clsx('d-flex flex-column mw-100', style.metadata)}>
          <div className={clsx('d-flex', style.byline_container)}>
            {currentPage === '/' && (
              <div
                className={clsx('simple-endpoint', style.avatar_link)}
                onClick={() => handleRedirect(path.CHANNEL + '?id=' + item?.snippet.channelId)}
              >
                <div className={clsx('img-36-round', style.avatar)}>
                  <img className={clsx(style.avatar_img)} alt="channelImg" src={item.avatar} />
                </div>
              </div>
            )}
            <div className={clsx('flex-align-center flex-row text-sm-4 mw-100', style.channel_name)}>
              <div
                data-tooltip-id="channel_name_tooltip"
                data-tooltip-content={item.snippet.channelTitle}
                className={clsx('mw-100', style.text)}
              >
                <div className={clsx('text-one-line', style.channel_link)}>{item.snippet.channelTitle}</div>
                <Tooltip arrowColor="transparent" id="channel_name_tooltip" className="normal_tooltip" />
              </div>
              <div className={clsx(style.channel_icon)}>
                <div data-tooltip-id="channel_icon_tooltip" data-tooltip-content="Đã xác minh">
                  <div className={clsx(style.icon_shape)}>
                    <Tick />
                  </div>
                  <Tooltip arrowColor="transparent" id="channel_icon_tooltip" className="normal_tooltip" />
                </div>
              </div>
            </div>
          </div>
          <div className={clsx('text-one-line text-sm-4 d-flex', style.metadata_line)}>
            <span className={clsx(style.inline_metadata_item)}>
              {convertViewCount(item.statistics.viewCount)} lượt xem &nbsp;&nbsp;
            </span>
            <span className={clsx(style.inline_metadata_item)}>
              • {calculateTimeDifference(item.snippet.publishedAt)}
            </span>
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
  return {
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
