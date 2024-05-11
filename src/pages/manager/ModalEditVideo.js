import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import * as actions from '~/store/actions';
import C_Modal from '~/components/Modal';
import { getFileNameWithoutExtension } from '~/utils';

function ModalEditVideo({ video, access_token, postVideo, isUploading, setUploading, show, setShow }) {
  const [videoURL, setVideoURL] = useState('');
  const [data, setData] = useState({
    title: '',
    description: '',
    categoryId: '22',
    privacyStatus: 'public',
    tags: ['nam'],
  });
  const [isVideoErr, setIsVideoErr] = useState(false);
  const [isRequied, setIsRequied] = useState(false);

  const handleVideoError = () => {
    setIsVideoErr(true);
  };
  useEffect(() => {
    if (data.title === '') {
      setIsRequied(true);
    } else {
      setIsRequied(false);
    }
  }, [data.title]);

  useEffect(() => {
    setIsVideoErr(false);
    if (video) {
      setData((prevData) => ({
        ...prevData,
        title: getFileNameWithoutExtension(video.name),
      }));
      setVideoURL(URL.createObjectURL(video));
    }
  }, [video]);

  const handleVideoLoadedMetadata = (event) => {
    const videoElement = event.target;
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;

    const ratio = (width / height).toFixed(2); // Tỷ lệ khung hình
    const duration = videoElement.duration; // thời lượng

    setData((prevData) => {
      if (ratio < 1 && duration < 240) {
        const newTags = prevData.tags.includes('shorts') ? prevData.tags : [...prevData.tags, 'shorts'];
        return {
          ...prevData,
          tags: newTags,
        };
      } else {
        const newTags = prevData.tags.filter((tag) => tag !== 'shorts');
        return {
          ...prevData,
          tags: newTags,
        };
      }
    });
  };

  const handleSave = async () => {
    if (data.title) {
      let postData = {
        snippet: {
          title: data.title.trim(),
          description: data.description.trim(),
          categoryId: data.categoryId,
          tags: data.tags,
          madeForKids: false,
        },
        status: {
          privacyStatus: data.privacyStatus,
        },
      };
      const formData = new FormData();
      formData.append('videoFile', video);
      formData.append('title', postData.snippet.title);
      formData.append('description', postData.snippet.description || '');
      formData.append('categoryId', postData.snippet.categoryId);
      formData.append('tags', postData.snippet.tags);
      formData.append('madeForKids', postData.snippet.madeForKids);
      formData.append('privacyStatus', postData.status.privacyStatus);
      formData.append('access_token', access_token);
      setUploading(true);
      try {
        await postVideo(formData);
      } finally {
        setUploading(false);
        setShow(false);
      }
      // for (const [key, value] of formData.entries()) {
      //   console.log(`Key: ${key}, Value: ${value}`);
      // }
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setData({
      ...data,
      [e.target.name]: inputValue,
    });
  };

  return (
    <C_Modal
      title={data.title}
      show={show}
      setShow={setShow}
      modalWidth={'960'}
      backdrop={true}
      isLoading={isUploading}
    >
      <Box mx={3} position={'relative'}>
        <Box sx={{ fontSize: '2.5rem', fontWeight: '500' }}>Chi tiết</Box>
        <Stack direction={'row'} mt={3}>
          <Box sx={{ flex: 'auto' }} className="detail" pr={3}>
            <Box position={'relative'}>
              <TextField
                inputProps={{
                  maxLength: 100,
                }}
                name="title"
                label="Tiêu đề (bắt buộc)"
                id="outlined-size-normal"
                defaultValue={video && getFileNameWithoutExtension(video.name)}
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
              <Box mt={0.5} sx={{ color: 'text.primary', fontSize: '1.4rem' }}>
                Mô tả
              </Box>
              <Box position={'relative'}>
                <textarea
                  maxLength={5000}
                  name="description"
                  rows="4"
                  style={{ width: '100%', maxHeight: '96px', whiteSpace: 'pre-wrap', padding: '4px 10px' }}
                  placeholder="Giới thiệu về video của bạn cho người xem"
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
                sx={{ fontSize: '2.5rem', fontWeight: '500', color: 'text.primary' }}
              >
                Chế độ hiển thị
              </FormLabel>
              <Box sx={{}} pl={2}>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="public"
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
          </Box>

          <Box className="preview" sx={{ width: '306px' }}>
            <Box sx={{ height: 'auto' }}>
              <video
                controls
                width="100%"
                src={videoURL}
                onError={handleVideoError}
                onLoadedMetadata={handleVideoLoadedMetadata}
              />
              {isVideoErr && <Box sx={{ color: 'red' }}>Video đã bị lỗi</Box>}
            </Box>
          </Box>
        </Stack>
        <Box mt={2} sx={{ textAlign: 'end' }}>
          <Button
            size="medium"
            variant="contained"
            sx={{ fontSize: '1.4rem' }}
            onClick={handleSave}
            disabled={isVideoErr || isRequied ? true : false}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </C_Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    videoPost: state.video.videoPost,
    message: state.video.message,
    isUploading: state.video.isUploadingVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    postVideo: (data, access_token) => dispatch(actions.postVideo(data, access_token)),
    setUploading: (value) => dispatch(actions.setUploadingVideo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditVideo);
