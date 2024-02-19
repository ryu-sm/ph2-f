import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/constant';
import { useDropzone } from 'react-dropzone';
import { ApModalWrapper } from '../modal-wrapper';
import { Box, Stack, Typography } from '@mui/material';
import { ApImageUploadIcon } from '@/assets/icons/ap-image-upload';
import { ApUploadFileIcon } from '@/assets/icons/ap-upload-file';
import CloseIcon from '@mui/icons-material/Close';
import { ApPrimaryButton } from '../button';

export const ImageUploadModal = ({ open, setImages, onClose, field }) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        const fileReaders = acceptedFiles.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({ src: reader.result, name: file.name });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        });

        Promise.all(fileReaders)
          .then((newFiles) => {
            setImages(newFiles);
          })
          .catch((error) => {
            console.error('Error in converting files to Base64:', error);
          });
      }
      if (rejectedFiles.length > 0) {
        toast.error(`許容容量 (${Math.round(MAX_SIZE_FILE / 1000 / 1000)}MB) を超えています`, {
          position: 'top-right',
        });
      }
      onClose();
    },
    [onClose, setImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_IMAGE_TYPES,
    maxSize: MAX_SIZE_FILE,
  });

  const [showCamera, setShowCamera] = useState(false);
  const handleTakePhoto = (data) => {
    setImages([{ src: data, name: 'camera' }]);
    setShowCamera(false);
    onClose();
  };
  return (
    <>
      <ApModalWrapper open={open}>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={8} width={'100%'}>
          <ApPrimaryButton onClick={() => setShowCamera(true)}>
            <Stack
              sx={{ width: 1, py: 2, px: 4 }}
              direction={'row'}
              alignItems={'center'}
              spacing={2}
              justifyContent={'flex-start'}
            >
              <ApImageUploadIcon size="sm" />
              <Typography color={'white'}>撮影する</Typography>
            </Stack>
          </ApPrimaryButton>

          <ApPrimaryButton {...getRootProps()}>
            <input {...getInputProps()} {...field} />
            <Stack sx={{ width: 1, py: 2, px: 4 }} direction={'row'} alignItems={'center'} spacing={2}>
              <ApUploadFileIcon />
              <Typography color={'white'}>ファイルを選択</Typography>
            </Stack>
          </ApPrimaryButton>
        </Stack>
      </ApModalWrapper>
      {showCamera && (
        <Box zIndex={9999} position={'fixed'} top={0} left={0}>
          <Camera
            isMaxResolution={true}
            isFullscreen={true}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            imageType={IMAGE_TYPES.JPG}
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri);
            }}
            onCameraError={() => setShowCamera(false)}
          />
          <CloseIcon
            fontSize="large"
            sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', color: 'white' }}
            onClick={() => setShowCamera(false)}
          />
        </Box>
      )}
    </>
  );
};

ImageUploadModal.propTypes = {
  open: PropTypes.bool,
  setImages: PropTypes.func,
  onClose: PropTypes.func,
  field: PropTypes.object,
};
