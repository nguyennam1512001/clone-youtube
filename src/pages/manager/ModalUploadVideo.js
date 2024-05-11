import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '~/store/actions';
import { Box, Button, Stack } from '@mui/material';
import C_Modal from '~/components/Modal';
import Dropzone from 'react-dropzone';
import { isVideoFile } from '~/utils';
import ModalEditVideo from './ModalEditVideo';

function ModalUploadVideo({ isLoggedIn, show, setShow }) {
  const history = useHistory();
  const fileInputRef = useRef(null);
  const [err, setErr] = useState('');
  const [video, setVideo] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleOnchange = async (e) => {
    let file = e.target.files[0];
    if (file && isVideoFile(file)) {
      setVideo(file);
      setShow(false);
      setEditModal(true);
      setErr('');
    } else {
      setErr('Định dạng tệp không hợp lệ');
      setVideo(null);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && isVideoFile(file)) {
      setVideo(file);
    }
  };

  return (
    <>
      <C_Modal title={'Tải video lên'} show={show} setShow={setShow} modalWidth={'960'} backdrop={true}>
        <Stack direction={'column'} alignItems={'center'} sx={{ padding: '16px 50px' }}>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Box
                  sx={{ width: '136px', height: '136px', borderRadius: '50%', backgroundColor: '#f9f9f9' }}
                  className="flex-center cursor-pointer"
                >
                  <Box className="fa-solid fa-upload" sx={{ fontSize: '4rem' }}></Box>
                </Box>
              </div>
            )}
          </Dropzone>
          <Box sx={{ fontSize: '1.5rem', lineHeight: '2.4rem', color: 'text.prymary' }} mt={3}>
            Kéo và thả tệp video để tải lên
          </Box>
          <Box sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
            Các video của bạn sẽ ở chế độ riêng tư cho đến khi bạn xuất bản.
          </Box>
          <Box sx={{ fontSize: '1.3rem', color: 'red' }} mt={2}>
            {err}
          </Box>
          <Button
            size="medium"
            variant="contained"
            sx={{ fontSize: '1.4rem', margin: '24px 0' }}
            onClick={handleButtonClick}
          >
            Chọn tệp
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => handleOnchange(e)} />
          </Button>
        </Stack>
      </C_Modal>
      <ModalEditVideo video={video} show={editModal} setShow={setEditModal} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    show: state.video.isUploadModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    setShow: (language) => dispatch(actions.setUploadModal(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUploadVideo);
