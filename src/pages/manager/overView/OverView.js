import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import { Box } from '@mui/material';

function OverView({ setIsLoadingBar, isUploading }) {
  const history = useHistory();

  return (
    <Box sx={{ '>.MuiTabPanel-root': { padding: '16px 0' } }}>
      <Box sx={{ color: 'text.primary', fontSize: '2.5rem', fontWeight: '500' }} pt={3} pl={4}>
        Trang tổng quan của kênh
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideoStart: (q, max) => dispatch(actions.searchVideoStart(q, max)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverView);
