import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip } from '@mui/material';
import * as icon from '~/public/assets/icons';
import useClickOutside from '~/hooks/useClickOutside';
import C_Modal from '~/components/Modal';
import EditModal from './EditModal';

function Actions({ isShortVideo, item, setShow, show, deleteVideo, access_token, setFirstShortVideo }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef(null);
  const history = useHistory();

  const handleRedirect = () => {
    if (isShortVideo) {
      setFirstShortVideo(item);
      history.push('/shorts');
    } else {
      history.push('/watch?v=' + item.id);
    }
  };

  const handleDelete = () => {
    setShow(false);
    deleteVideo(item.id, access_token);
  };
  const handleEdit = () => {
    setShow(false);
    setShowEditModal(true);
  };

  useClickOutside(menuRef, () => setShow(false));

  return (
    <>
      {/* <Tooltip title={'Chi tiết'}>
        <Box>
          <Box sx={{ height: '24px', width: '24px' }}>
            <icon.Edit />
          </Box>
        </Box>
      </Tooltip> */}
      {/* <Tooltip title={'Số liệu phân tích'}>
        <Box>
          <Box sx={{ height: '24px', width: '24px' }}>
            <icon.Analytics />
          </Box>
        </Box>
      </Tooltip> */}
      {/* <Tooltip title={'Bình luận'}>
        <Box>
          <Box sx={{ height: '24px', width: '24px' }}>
            <icon.Comment />
          </Box>
        </Box>
      </Tooltip> */}
      <Tooltip title={'Xem trên Youtube'}>
        <Box onClick={handleRedirect}>
          <Box sx={{ height: '24px', width: '24px' }}>
            <icon.Youtube />
          </Box>
        </Box>
      </Tooltip>

      <Box ref={menuRef} position={'relative'} onClick={() => setShow(!show)} sx={{ opacity: show ? 1 : 0.6 }}>
        <Tooltip title={'Tuỳ chọn'}>
          <Box sx={{ height: '24px', width: '24px' }}>
            <icon.Menu />
          </Box>
        </Tooltip>

        {show && (
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Paper
              sx={{
                maxWidth: '300px',
                maxHeight: '410px',
                borderRadius: '12px',
                overflow: 'auto',
                bgcolor: 'bgcolor.popup',
              }}
            >
              <List>
                <ListItem disablePadding onClick={handleEdit}>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                      <Box sx={{ height: '24px', width: '24px' }}>
                        <icon.Edit />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        '&.MuiListItemText-root': { WebkitFontSmoothing: 'antialiased' },
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Box className="text-md-4 text-line-one">Chỉnh sửa tiêu đề và thông tin mô tả</Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => setConfirmDelete(true)}>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                      <Box sx={{ height: '24px', width: '24px' }}>
                        <icon.Trash />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        '&.MuiListItemText-root': { WebkitFontSmoothing: 'antialiased' },
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Box className="text-md-4 text-line-one">Xoá</Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <C_Modal
                  title={'Delete video'}
                  show={confirmDelete}
                  setShow={setConfirmDelete}
                  footer={true}
                  handle={handleDelete}
                  modalWidth={'400'}
                >
                  <Box className="text-nomal-4" sx={{ color: 'text.primary' }}>
                    Are you sure you want to delete this video?
                  </Box>
                </C_Modal>
              </List>
            </Paper>
          </Box>
        )}
      </Box>
      <EditModal video={item} setShow={setShowEditModal} show={isShowEditModal} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteVideo: (id, access_token) => dispatch(actions.deleteVideo(id, access_token)),
    setFirstShortVideo: (item) => dispatch(actions.setFirstShortVideo(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
