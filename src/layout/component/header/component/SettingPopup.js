import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import style from './SettingPopup.module.scss';
import * as actions from '~/store/actions';

import { Box, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { ArrowLeft, Check } from '~/public/assets/icons';
import { path } from '~/utils';

const backIconSX = {
  '&:hover': {
    'background-color': 'rgba(255, 255, 255, 0.2)',
  },
};
function SettingPopup({ dataList, isLoggedIn, setIsShow, mode, changeThemeMode, myChannelInfo }) {
  const [childrenPopup, setChildrenPopup] = useState(null);
  const history = useHistory();

  const handleItemClick = (item) => {
    if (item.popup) {
      setChildrenPopup(item.popup);
    }
    if (item.path) {
      history.push(item.path);
    }
    // setIsShow(false);
  };

  const handleSelect = (item) => {
    if (item.theme) {
      changeThemeMode(item.theme);
    }
    setIsShow(false);
  };

  const handleBack = () => {
    setIsShow(true);
    setChildrenPopup(null);
  };

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <>
      {childrenPopup ? (
        <Paper
          elevation={3}
          sx={{
            minWidth: '300px',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'auto',
            bgcolor: 'bgcolor.popup',
          }}
        >
          <List>
            <ListItem sx={{ pl: 1, height: '40px', pt: 0 }}>
              <ListItemIcon sx={{ minWidth: '0' }} onClick={() => handleBack()}>
                <Box className="flex-center bg-40-round " sx={backIconSX} mr={0.5}>
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <ArrowLeft />
                  </Box>
                </Box>
              </ListItemIcon>
              <ListItemText>
                <Box
                  sx={{ color: 'text.primary' }}
                  className="text-nomal-4 text-line-one"
                  style={{ WebkitFontSmoothing: 'auto' }}
                >
                  {childrenPopup.title}
                </Box>
              </ListItemText>
            </ListItem>
            <Divider />
            {childrenPopup.option.map((item, index) => (
              <ListItem disablePadding key={index} sx={{ height: '40px' }} onClick={() => handleSelect(item)}>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: '0', mr: 3 }}>
                    <Box sx={{ width: '24px', height: '24px' }}>{item.theme && item.theme === mode && <Check />}</Box>
                  </ListItemIcon>
                  <ListItemText sx={{ '&.MuiTypography-root': { WebkitFontSmoothing: 'antialiased' } }}>
                    <Box
                      sx={(theme) => ({
                        color: theme.palette.mode === 'light' ? 'text.primary' : '#f1f1f1',
                      })}
                      className="text-md-4 text-line-one"
                      style={{ WebkitFontSmoothing: 'antialiased' }}
                    >
                      {item.text}{' '}
                    </Box>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper
          elevation={3}
          sx={(theme) => ({
            minWidth: '300px',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'auto',
            bgcolor: 'bgcolor.popup',
          })}
        >
          <List>
            {isLoggedIn && (
              <div className={clsx(style.popup_header)}>
                <div className={clsx(style.account_header)}>
                  <div className={clsx('img-40-round', style.account_avatar)}>
                    <img draggable="false" alt="" height="40" width="40" src={myChannelInfo.thumbnails} />
                  </div>
                  <div className={clsx(style.account_container)}>
                    <Box
                      sx={{ color: 'text.primary' }}
                      className={clsx('text-one-line text-nomal-4', style.account_name)}
                    >
                      {myChannelInfo.title}
                    </Box>
                    <Box
                      sx={{ color: 'text.primary' }}
                      className={clsx('text-one-line text-nomal-4', style.channel_name)}
                    >
                      {myChannelInfo.customUrl}
                    </Box>
                    <div
                      className={clsx('text-md-4 cursor-pointer', style.manage_account)}
                      onClick={() => handleRedirect(path.MY_CHANNEL)}
                    >
                      Xem kênh của bạn
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dataList &&
              dataList.map((section, index) => {
                if (section.auth && isLoggedIn === false) {
                  return <React.Fragment key={index}></React.Fragment>;
                } else {
                  return (
                    <Box key={index}>
                      {section.items.map((item, id) => {
                        return (
                          <ListItem
                            disablePadding
                            key={id + 'item'}
                            sx={{ height: '40px' }}
                            onClick={() => handleItemClick(item)}
                          >
                            <ListItemButton>
                              <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                                <Box sx={{ height: '24px', width: '24px', color: 'text.primary' }}>{item.iconLeft}</Box>
                              </ListItemIcon>
                              <ListItemText>
                                <Box
                                  sx={(theme) => ({
                                    color: theme.palette.mode === 'light' ? 'text.primary' : '#f1f1f1',
                                  })}
                                  className="text-md-4 text-line-one"
                                  style={{ WebkitFontSmoothing: 'antialiased' }}
                                >
                                  {item.text === 'Giao diện:'
                                    ? `Giao diện: ${mode === 'light' ? 'Sáng' : 'Tối'}`
                                    : item.text}
                                </Box>
                              </ListItemText>
                              {item.iconRight && <Box sx={{ height: '24px', width: '24px' }}>{item.iconRight}</Box>}
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                      {index !== dataList.length - 1 ? <Divider sx={{ my: '8px' }} /> : <></>}
                    </Box>
                  );
                }
              })}
          </List>
        </Paper>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    mode: state.app.mode,
    isLoggedIn: state.user.isLoggedIn,
    myChannelInfo: state.video.myChannelInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    changeThemeMode: (mode) => dispatch(actions.changeThemeMode(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPopup);
