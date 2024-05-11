import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import * as icon from '~/public/assets/icons';
import C_Modal from '~/components/Modal';

function EditModal({ video, updateVideo, access_token, setShow, show }) {
  const [updating, setUpdating] = useState(false);

  const [data, setData] = useState({
    title: '',
    description: '',
    privacyStatus: '',
  });

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setData({
      ...data,
      [e.target.name]: inputValue,
    });
  };

  useEffect(() => {
    setData({
      title: video.snippet.title.trim(),
      description: video.snippet.description.trim(),
      privacyStatus: video.status.privacyStatus,
    });
  }, []);

  const handleSave = () => {
    if (data.title) {
      setUpdating(true);
      const updateData = {
        videoId: video.id,
        snippet: {
          title: data.title,
          description: data.description,
        },
        status: {
          privacyStatus: data.privacyStatus,
        },
      };
      updateVideo(updateData, access_token).finally(() => {
        setUpdating(false);
        setShow(false);
      });
    }
  };

  return (
    <C_Modal title={'Chỉnh sửa thông tin'} show={show} setShow={setShow} modalWidth={'500'}>
      <Box sx={{ flex: 'auto' }} className="detail" px={3} pt={3}>
        <Box position={'relative'}>
          <TextField
            inputProps={{
              maxLength: 100,
            }}
            name="title"
            label="Tiêu đề (bắt buộc)"
            id="outlined-size-normal"
            defaultValue={data.title}
            color={data.title ? 'primary' : 'warning'}
            sx={{
              '>.MuiInputBase-root, >.MuiFormLabel-root': { fontSize: '1.5rem' },
              width: '100%',
            }}
            onChange={handleChange}
          />
          <Box className="text-sm-4" sx={{ color: 'text.secondary', bottom: 4, right: 8 }} position={'absolute'}>
            {data.title.length}/100
          </Box>
        </Box>
        {!data.title ? (
          <Box mt={0.5} sx={{ color: 'red', fontSize: '1.2rem' }}>
            Vui lòng bổ xung thông tin này
          </Box>
        ) : (
          ''
        )}
        <Box sx={{ fontSize: '1.5rem', lineHeight: '2.4rem', mt: '24px' }}>
          <Box mt={0.5} sx={{ color: 'text.secondary', fontSize: '1.4rem' }}>
            Mô tả
          </Box>
          <Box position={'relative'}>
            <textarea
              maxLength={5000}
              name="description"
              defaultValue={data.description}
              rows="4"
              style={{ width: '100%', maxHeight: '96px', whiteSpace: 'pre-wrap', padding: '4px 10px' }}
              placeholder="Thêm nội dung mô tả"
              onChange={handleChange}
            />
            <Box className="text-sm-4" sx={{ color: 'text.secondary', bottom: 8, right: 8 }} position={'absolute'}>
              {data.description.length}/5000
            </Box>
          </Box>
        </Box>
        <FormControl sx={{ mt: '24px' }}>
          <FormLabel
            id="radio-buttons-group-label"
            sx={{ fontSize: '1.4rem', fontWeight: '400', color: 'text.secondary' }}
          >
            Chế độ hiển thị
          </FormLabel>
          <Box sx={{}} pl={2}>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              defaultValue={data.privacyStatus}
              name="privacyStatus"
              onChange={handleChange}
            >
              <FormControlLabel
                sx={{ '>.MuiTypography-root': { fontSize: '1.5rem' } }}
                value="private"
                control={<Radio />}
                label="Riêng tư"
              />
              <FormControlLabel
                sx={{ '>.MuiTypography-root': { fontSize: '1.5rem' } }}
                value="public"
                control={<Radio />}
                label="Công khai"
              />
            </RadioGroup>
          </Box>
        </FormControl>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button variant="text" onClick={() => setShow(false)} sx={{ fontSize: '1.4rem' }}>
            Huỷ
          </Button>
          <Button
            variant="text"
            onClick={() => handleSave()}
            disabled={!updating && data.title ? false : true}
            sx={{ fontSize: '1.4rem' }}
          >
            {!updating ? (
              'Lưu'
            ) : (
              <CircularProgress sx={{ width: '16px!important', height: '16px!important', color: 'text.secondary' }} />
            )}
          </Button>
        </Stack>
      </Box>
    </C_Modal>
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
    updateVideo: (data, token) => dispatch(actions.updateVideo(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
