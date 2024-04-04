import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import style from './FilterModal.module.scss';
import * as actions from '~/store/actions';
import C_Modal from '~/components/Modal';
import { Close } from '../../../public/assets/icons';

const filterArr = [
  {
    groupName: 'NGÀY TẢI LÊN',
    type: 'publishedAfter',
    searchFilter: [
      { text: 'Một giờ qua', kenhDisable: true },
      { text: 'Hôm nay', kenhDisable: true },
      { text: 'Tuần này', kenhDisable: true },
      { text: 'Tháng này', kenhDisable: true },
      { text: 'Năm nay', kenhDisable: true },
    ],
  },
  {
    groupName: 'LOẠI',
    type: 'type',

    searchFilter: [
      { text: 'Video', active: true },
      { text: 'Kênh', publishDisable: true },
      { text: 'Danh sách phát', publishDisable: true },
      { text: 'Phim', featuredDisable: true },
    ],
  },
  {
    groupName: 'THỜI LƯỢNG',
    type: 'duration',
    searchFilter: [
      { text: 'Dưới 4 phút', kenhDisable: true },
      { text: '4 — 20 phút', kenhDisable: true },
      { text: 'Trên 20 phút', kenhDisable: true },
    ],
  },
  {
    groupName: 'VIDEO NỔI BẬT',
    type: 'featured',

    searchFilter: [
      { text: 'Trực tiếp', kenhDisable: true, phimDisable: true },
      { text: '4K', kenhDisable: true },
      { text: 'HD', kenhDisable: true },
      { text: 'Phụ đề', kenhDisable: true, phimDisable: true },
      { text: 'Giấy phép Creative Commons', kenhDisable: true, phimDisable: true },
      { text: '360°', kenhDisable: true },
      { text: 'VR180', kenhDisable: true },
      { text: '3D', kenhDisable: true, phimDisable: true },
      { text: 'HDR', kenhDisable: true },
      { text: 'Vị trí', kenhDisable: true },
    ],
  },
  {
    groupName: 'SẮP XẾP THEO',
    type: 'order',
    searchFilter: [
      { text: 'Mức độ liên quan', show: true },
      { text: 'Ngày tải lên' },
      { text: 'Lượt xem' },
      { text: 'Xếp hạng' },
    ],
  },
];

function FilterModal({ isShow, setIsShow }) {
  const [filterState, setFilterState] = useState({
    publishedAfter: null,
    type: null,
    duration: null,
    featured: null,
    order: { text: 'Mức độ liên quan', show: true },
  });

  useEffect(() => {
    handleItemClick();
  }, []);

  const handleItemClick = (item, type) => {
    setFilterState((prevState) => {
      let updatedState = {
        ...prevState,
        [type]: prevState[type] === item ? null : item,
      };

      if (filterState.type?.text === 'video') {
        updatedState.type = null;
      }
      if (updatedState.type === null && (type === 'publishedAfter' || type === 'order')) {
        updatedState.type = { text: 'video' };
      }

      return updatedState;
    });
  };
  return (
    <C_Modal title={'Bộ lọc tìm kiếm'} show={isShow} setShow={setIsShow} modalWidth={'700'}>
      <div className={clsx(style.options, 'row')}>
        {filterArr &&
          filterArr.map((group, index) => {
            return (
              <div className={clsx(style.filter_group, 'col-2-4')} key={index}>
                <h4 className={clsx(style.filter_group_name)}>
                  <span className={clsx(style.text)}>{group.groupName}</span>
                </h4>
                {group.searchFilter.map((item, index) => (
                  <div
                    className={clsx('text-md-4-secon flex-align-center cursor-pointer', style.search_filter)}
                    key={index + 'item'}
                  >
                    <span
                      className={clsx(
                        style.text,
                        {
                          [style.active]: [
                            filterState.publishedAfter === item,
                            filterState.type === item,
                            filterState.type?.text === 'video' && item.active,
                            filterState.duration === item,
                            filterState.featured === item,
                            filterState.order === item,
                            filterState.order?.text === 'Mức độ liên quan' && item.show,
                          ].some((condition) => condition),
                        },
                        {
                          [style.disable]: [
                            (filterState.type?.text === 'Kênh' || filterState.type?.text === 'Danh sách phát') &&
                              item.kenhDisable,
                            filterState.type?.text === 'Phim' && item.phimDisable,
                            filterState.publishedAfter && item.publishDisable,
                            filterState.duration && item.publishDisable,
                            filterState.featured && item.publishDisable,
                            ['Trực tiếp', 'Phụ đề', 'Giấy phép Creative Commons', '3D'].includes(
                              filterState.featured?.text,
                            ) && item.featuredDisable,
                          ].some((condition) => condition),
                        },
                      )}
                      onClick={() => handleItemClick(item, group.type)}
                    >
                      {item.text}
                    </span>
                    <div className={clsx(style.icon_shape)}>
                      <Close />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </C_Modal>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
