import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import * as icons from '~/public/assets/icons';
import * as actions from '~/store/actions';
function PlayListItem({ item, isPrivate }) {
  return (
    <Box py={3}>
      <Box className="behind"></Box>
      <Box width={210} height={118} sx={{ borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
        <img src={item.snippet.thumbnails.medium.url} alt=""></img>
        <Box
          position={'absolute'}
          display={'inline-flex'}
          bgcolor={'rgba(40, 36, 30, 0.8)'}
          p={0.5}
          sx={{ color: '#fff', fontSize: '12px', fontWeight: 500, bottom: '8px', right: '8px' }}
        >
          <span style={{ height: '20px', marginRight: '4px' }}>
            <icons.PlayList />
          </span>
          {item.contentDetails.itemCount} video
        </Box>
      </Box>
      <Box py={1} className="text-one-line text-md-5" sx={{ display: 'block' }}>
        {item.snippet.title}
      </Box>
      <Box
        display={isPrivate ? 'inline-flex' : 'none'}
        px={0.5}
        sx={{ color: 'text.secondary', fontSize: '12px', fontWeight: 500, bgcolor: 'bgcolor.secondary' }}
      >
        <span style={{ width: '16px', marginRight: '4px' }}>
          <icons.Lock />
        </span>
        Riêng tư
      </Box>
      <Box sx={{ fontSize: '1.2rem', fontWeight: 500, color: 'text.secondary' }}>Xem toàn bộ danh sách</Box>
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayListItem);
