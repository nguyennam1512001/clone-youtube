import React from 'react';
import { connect } from 'react-redux';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';

import { Edit, Trash } from '~/public/assets/icons';
import * as actions from '~/store/actions';
import { Flag } from '~/public/assets/icons/iconSideBars';

function MenuPopup({ item, setIsShowMenuPopup, myChannelInfo, deleteComment, access_token }) {
  const handleDelete = async () => {
    if (item) {
      handleClickClose();
      await deleteComment(item.id, access_token);
    }
  };
  const handleClickClose = () => {
    setIsShowMenuPopup(false);
    document.body.style.overflow = 'auto';
  };
  return (
    <Paper
      sx={{
        maxWidth: '300px',
        maxHeight: '410px',
        borderRadius: '12px',
        overflow: 'auto',
      }}
    >
      {item?.snippet?.authorChannelId.value === myChannelInfo.id ? (
        <List>
          {/* <ListItem disablePadding onClick={handleClickClose} sx={{ height: '36px' }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                <Box sx={{ height: '24px', width: '24px' }}>
                  <Edit />
                </Box>
              </ListItemIcon>
              <ListItemText
                sx={{
                  '&.MuiListItemText-root': { WebkitFontSmoothing: 'antialiased', whiteSpace: 'nowrap' },
                }}
              >
                <Box className="text-md-4 text-line-one">Chỉnh sửa</Box>
              </ListItemText>
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding onClick={handleDelete} sx={{ height: '36px' }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                <Box sx={{ height: '24px', width: '24px' }}>
                  <Trash />
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
        </List>
      ) : (
        <List>
          <ListItem disablePadding onClick={handleClickClose} sx={{ height: '36px' }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                <Box sx={{ height: '24px', width: '24px' }}>
                  <Flag />
                </Box>
              </ListItemIcon>
              <ListItemText
                sx={{
                  '&.MuiListItemText-root': { WebkitFontSmoothing: 'antialiased', whiteSpace: 'nowrap' },
                }}
              >
                <Box className="text-md-4 text-line-one">Báo cáo vi phạm</Box>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    myChannelInfo: state.video.myChannelInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id, access_token) => dispatch(actions.deleteComment(id, access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPopup);
