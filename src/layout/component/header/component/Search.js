import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import clsx from 'clsx';
import useSound from 'use-sound';
import beep from '~/assets/mp3/beep6.mp3';
import { Tooltip } from 'react-tooltip';
import { useHistory } from 'react-router-dom';

import style from './Search.module.scss';
import * as actions from '~/store/actions';
import { LANGUAGES, googleKey } from '~/utils/constant';
import icons, { Close } from '~/assets/icons';
import SearchSuggest from './SearchSuggest';
import SearchVoiceModal from './SearchVoiceModal';
import { fetchApi } from '~/services/videoService';
import { path } from '~/utils';
import ClickOutside from '~/components/ClickOutside';

function Search({}) {
  const [play] = useSound(beep);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();

  async function getSearchVideo(searchText) {
    if (searchText.trim()) {
      try {
        let res = await fetchApi(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=14&q=${searchText}`,
          googleKey.API_KEY,
        );
        if (res && res.data) {
          console.log(res.data);
          setSearchResult(res.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSearchResult({});
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchVideo(searchText.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  function handelSearch() {
    if (searchText.trim()) {
      history.push(`${path.SEARCH}?query=${searchText}`);
      setIsFocused(false);
    }
  }
  const handleSearchSuggest = (q) => {
    setSearchText(q);
    handelSearch();
  };
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handelSearch();
    }
  }
  const popupSearchSuggestClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className={clsx(style.search)}>
        <div className={clsx(style.search_form, { [style.pl_0]: isFocused }, { [style.form_control]: isFocused })}>
          <div className={clsx(style.container)}>
            <div className={clsx(style.search_icon, { [style.active]: isFocused })}>
              <img src={icons.search} alt="" />
            </div>
            <div className={clsx(style.search_input)}>
              <div className={clsx(style.input_box)}>
                <ClickOutside
                  isActive={isFocused}
                  className={`.${style.input_box}`}
                  onClickOutside={() => setIsFocused(false)}
                >
                  <input
                    placeholder="Tìm kiếm"
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={(e) => handleKeyPress(e)}
                  />
                </ClickOutside>

                <div className={clsx(style.keyboard, 'cursor-pointer', { [style.pr_0]: searchText })}>
                  <img src="https://www.gstatic.com/inputtools/images/tia.png" alt="" />
                </div>
              </div>
            </div>
            <div
              className={clsx(style.search_clear_button, { [style.active]: searchText })}
              onClick={() => {
                setSearchText('');
              }}
            >
              <div className={clsx(style.icon_shape, 'cursor-pointer')}>
                <div className={clsx(style.icon, 'cursor-pointer')}>
                  <Close />
                </div>
              </div>
            </div>
          </div>
          {isFocused && searchResult && Object.keys(searchResult).length !== 0 && (
            <SearchSuggest
              searchResult={searchResult}
              onClick={(e) => popupSearchSuggestClick(e)}
              handleSearchSuggest={handleSearchSuggest}
            />
          )}
        </div>
        <div className={clsx(style.search_btn, 'cursor-pointer')} onClick={() => handelSearch()}>
          <div className={clsx(style.search_icon)}>
            <img src={icons.search} alt="" />
          </div>
        </div>
      </div>
      <div className={clsx(style.voice_search, 'cursor-pointer')}>
        <div
          data-tooltip-id="search_voice_search_icon_tooltip"
          data-tooltip-content="Tìm kiếm bằng giọng nói"
          className={clsx(style.icon)}
          data-bs-toggle="modal"
          data-bs-target="#searchVoiceModal"
          onClick={() => {
            setIsShow(!isShow);
            play();
          }}
        >
          <img src={icons.voiceSearch} alt="" />
        </div>
        <SearchVoiceModal isShow={isShow} setIsShow={setIsShow} />
      </div>
      <Tooltip arrowColor="transparent" id="search_voice_search_icon_tooltip" className="normal_tooltip" />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    videosSearch: state.video.videosSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    searchVideoStart: (q) => dispatch(actions.searchVideoStart(q)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
