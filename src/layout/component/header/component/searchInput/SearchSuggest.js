import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './SearchSuggest.module.scss';
import * as actions from '~/store/actions';

import { Search } from '../../../../../public/assets/icons';
import Popup from '~/components/popup/Popup';
import Item from '~/components/listItem/Item';

function SearchSuggest({ searchResult, handleSearchSuggest }) {
  return (
    <Popup minWidth="568px" left="0" right="0">
      <ul className={clsx(style.list)}>
        {searchResult &&
          searchResult.items.map((item, index) => {
            let query = item.snippet.title.split(/[-.,?|&(]/)[0].toLowerCase();
            return (
              <div className={clsx(style.item)} key={index} onClick={() => handleSearchSuggest(query)}>
                <Item leftIcon={<Search />} text={query} fz={'1.6rem'} />
              </div>
            );
          })}
      </ul>
    </Popup>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    searchVideoStart: (q) => dispatch(actions.searchVideoStart(q)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSuggest);
