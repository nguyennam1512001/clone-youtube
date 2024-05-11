import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { FilterList } from '~/public/assets/icons';
import { convertDuration, convertViewCount, formatDate } from '~/utils';
import Actions from '../actions/Actions';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function TabContent({ isShortVideo, items, isDown, setUploadModal }) {
  const [checked, setChecked] = React.useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  return (
    <Box>
      {/* <Stack
        direction={'row'}
        alignItems={'center'}
        gap={5}
        sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: '16px' }}
      >
        <Box sx={{ width: '24px', height: '24px' }} ml={3}>
          <FilterList />
        </Box>
        <input placeholder="Lọc" style={{ fontSize: '1.5rem', flex: '1' }} />
      </Stack> */}
      <Table sx={{ position: 'relative' }}>
        <TableHead sx={{ position: 'sticky', top: 65, zIndex: 10, bgcolor: 'bgcolor.default' }}>
          <TableRow
            sx={{
              '>.MuiTableCell-root': {
                fontSize: '1.2rem',
                fontWeight: '500',
                color: 'text.secondary',
                padding: '8px 16px',
              },
            }}
          >
            <TableCell sx={{ width: 40 }}>
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                disabled={items.length === 0}
              />
            </TableCell>
            <TableCell>Video</TableCell>
            <TableCell>Chế độ hiển thị</TableCell>
            <TableCell>Hạn chế</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell>Số lượt xem</TableCell>
            <TableCell>Số bình luận</TableCell>
            <TableCell>Lượt thích %</TableCell>
          </TableRow>
        </TableHead>

        {items && items.length > 0 ? (
          <TableBody>
            {items.map((item, index) => {
              const labelId = `checkbox-list-label-${item}`;
              return (
                <TableRow
                  key={item.id}
                  sx={{
                    '>.MuiTableCell-root': { fontSize: '1.3rem', fontWeight: '400', color: 'text.prypary' },
                    '&:hover': {
                      bgcolor: '#f9f9f9',
                      [`& .actions${index}`]: {
                        display: 'flex !important',
                      },
                      [`.desc${index}`]: {
                        display: 'none !important',
                      },
                    },
                    bgcolor: showMenu ? '#f9f9f9' : 'bgcolor.default',
                  }}
                  className="font-antialiased"
                >
                  <TableCell onClick={handleToggle(item)}>
                    <Checkbox
                      checked={checked.indexOf(item) !== -1}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction={'row'} sx={{ position: 'relative' }}>
                      <Box sx={{ width: 120, height: 68 }} className="simple-endpoint position-relative">
                        {isDown && (
                          <Box className="flex-center" sx={{ position: 'absolute', zIndex: 100, inset: '0 0 0 0' }}>
                            <CircularProgress sx={{ width: '24px!important', height: '24px!important' }} />
                          </Box>
                        )}
                        <img src={item.snippet.thumbnails.default.url} alt="anh" />
                        <Box
                          className="d-flex flex-row position-absolute"
                          sx={{ bgcolor: '#0f0f0f', color: '#fff', borderRadius: '4px', bottom: 4, right: 4 }}
                          px={0.5}
                        >
                          <div className="d-inline-flex align-items-center flex-row">
                            <span className="overflow-hidden">
                              {convertDuration(item?.contentDetails && item?.contentDetails?.duration)}
                            </span>
                          </div>
                        </Box>
                      </Box>
                      <Box maxWidth={240} pl={2}>
                        <Box className="text-one-line" sx={{ display: 'block', lineHeight: '2.4rem' }}>
                          {item.snippet.title}
                        </Box>
                        <Box
                          className={`text-two-line text-sm-4 desc${index}`}
                          sx={{ fontSize: '1.2rem', color: 'text.secondary', display: showMenu ? 'none' : 'block' }}
                        >
                          {item.snippet.description || 'Thêm nội dung mô tả'}
                        </Box>
                        <Stack
                          direction={'row'}
                          className={`actions${index}`}
                          sx={{
                            display: showMenu ? 'flex' : 'none',
                            mt: '4px',
                            '& > *': { padding: 1, opacity: 0.6 },
                            '& > *:hover': { cursor: 'pointer', opacity: 1 },
                          }}
                        >
                          <Actions isShortVideo={isShortVideo} item={item} setShow={setShowMenu} show={showMenu} />
                        </Stack>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ height: 68 }}>
                      {item?.contentDetails?.regionRestriction ? 'bị chặn' : item.status.privacyStatus}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {isDown ? (
                      <Box>Đang tải...</Box>
                    ) : (
                      <Box sx={{ height: 68 }}>
                        {item.contentDetails.regionRestriction && item.contentDetails.regionRestriction.blocked
                          ? 'Bản quyền'
                          : 'Không có'}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ height: 68 }}>
                      <Box>{formatDate(item?.snippet.publishedAt)}</Box>
                      <Box className="text-sm-4" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
                        Ngày tải lên
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ height: 68 }}>{convertViewCount(item.statistics && item.statistics.viewCount)}</Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ height: 68 }}>{convertViewCount(item.statistics && item.statistics.commentCount)}</Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ height: 68 }}>
                      {item.statistics && item.statistics.favoriteCount > 0
                        ? (item.statistics.likeCount % item.statistics.favoriteCount) * 100 + '%'
                        : '--'}{' '}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <Box className="flex-center" sx={{ width: '100%', position: 'absolute' }}>
            <Stack direction={'column'} alignItems={'center'}>
              <Box sx={{ width: 200, height: 200 }}>
                <img
                  alt=""
                  src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3.svg"
                ></img>
              </Box>
              <Box sx={{ color: 'text.primmay', fontSize: '1.5rem' }} pb={1}>
                Không có nội dung
              </Box>
              <Button variant="contained" size="large" sx={{ fontSize: '1.4rem' }} onClick={() => setUploadModal(true)}>
                Tải video lên
              </Button>
            </Stack>
          </Box>
        )}
      </Table>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    videosSearch: state.video.videosSearch,
    isSpinner: state.video.isSpinner,
    videoPost: state.video.videoPost,
    myVideo: state.video.myVideo,
    message: state.video.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyVideo: (max, token) => dispatch(actions.getMyVideo(max, token)),
    resetVideoPost: () => dispatch(actions.resetVideoPost()),
    setUploadModal: (boolean) => dispatch(actions.setUploadModal(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
