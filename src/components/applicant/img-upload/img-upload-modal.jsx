import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { ApPrimaryButton } from '../button';
import { Icons } from '@/assets';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/configs';
import { v4 as uuid4 } from 'uuid';
import { toast } from 'react-toastify';

export const ApImageUploadModal = ({ isOpen, onClose, maxFiles, setImages }) => {
  const [showCamera, setShowCamera] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        const fileReaders = acceptedFiles.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({ src: reader.result, name: file.name.includes('pdf') ? file.name : uuid4() });
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
        if (maxFiles === 1 && rejectedFiles.length > 1) {
          toast.error(`複数のファイルをアップロードできません。`);
        }
        const size = rejectedFiles.reduce((accumulator, file) => {
          return accumulator + file.size;
        }, 0);
        if (size > MAX_SIZE_FILE) {
          toast.error(`許容容量 (${Math.round(MAX_SIZE_FILE / 1000 / 1000)}MB) を超えています`);
        }
      }
      onClose();
    },
    [onClose, setImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_IMAGE_TYPES,
    maxSize: MAX_SIZE_FILE,
    maxFiles: 1,
  });
  const handleTakePhoto = (data) => {
    setImages([{ src: data, name: uuid4() }]);
    setShowCamera(false);
    onClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      {!showCamera ? (
        <Box sx={{ my: 'auto', bgcolor: 'white', p: 8, borderRadius: 2 }}>
          <Stack spacing={8} alignItems={'center'}>
            <ApPrimaryButton width={195} height={48} onClick={() => setShowCamera(true)}>
              <Stack spacing={1} direction={'row'} alignItems={'center'} sx={{ width: 1, px: 4 }}>
                <Icons.ApImageUploadIcon sx={{ width: 32, height: 32 }} />
                <Typography variant="radio_checkbox_button" color={'white'}>
                  撮影する
                </Typography>
              </Stack>
            </ApPrimaryButton>
            <Stack {...getRootProps()}>
              <ApPrimaryButton width={195} height={48}>
                <Stack spacing={1} direction={'row'} alignItems={'center'} sx={{ width: 1, px: 4 }}>
                  <input {...getInputProps()} />
                  <Icons.ApImageUploadIcon sx={{ width: 32, height: 32 }} />
                  <Typography variant="radio_checkbox_button" color={'white'}>
                    ファイルを選択
                  </Typography>
                </Stack>
              </ApPrimaryButton>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Box zIndex={99} position={'absolute'} top={0} left={0} sx={{ width: 1, height: 1 }}>
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
          <Button
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              p: 0,
              height: 44,
              minHeight: 44,
              width: 44,
              minWidth: 44,
              bgcolor: 'transparent',
              boxShadow: 'none',
              borderRadius: '2px',
              '&:hover': { bgcolor: 'transparent' },
              zIndex: 3,
            }}
            onClick={() => setShowCamera(false)}
          >
            <Icons.ApHeaderMenuCloseIcon color={'white'} />
          </Button>
        </Box>
      )}
    </Modal>
  );
};
