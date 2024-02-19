import { ApImageAddIcon } from '@/assets/icons/ap-image-add';
import { ApImageUploadIcon } from '@/assets/icons/ap-image-upload';
import { useBoolean } from '@/hooks';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ImageDeleteModal } from './image-delete-modal';
import { ImageUploadModal } from './image-upload-modal';
export const ImageUpload = ({ isDisabled, isSingleFile, ...props }) => {
  const { value: isUploadOpen, onTrue: setUploadOpen, onFalse: setUploadClose } = useBoolean(false);
  const { value: isDeleteOpen, onTrue: setDeleteOpen, onFalse: setDeleteClose } = useBoolean(false);

  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  const [clickedImage, setClickedImage] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleRemoveImage = (e, index) => {
    setClickedImage({ index, src: e.target.src });
    setDeleteOpen();
  };

  useEffect(() => {
    if (confirmRemove) {
      const newValue = meta.value.filter((_, i) => i !== clickedImage.index);
      setValue(newValue);
    }
  }, [confirmRemove]);

  const setImages = (newFiles) => {
    setValue([...meta.value, ...newFiles]);
  };
  return (
    <>
      <Stack direction={'row'} spacing={3}>
        {meta.value?.length === 0 && (
          <Stack
            direction={'column'}
            alignItems={'center'}
            spacing={2}
            py={3}
            px={2}
            bgcolor={'primary.main'}
            borderRadius={'14px'}
            sx={{ opacity: isDisabled ? 0.2 : 1, '&:hover': { opacity: isDisabled ? 0.2 : 0.85, cursor: 'pointer' } }}
            onClick={setUploadOpen}
          >
            <ApImageUploadIcon size="large" />
            <Typography color={'white'}>画像アップロード</Typography>
          </Stack>
        )}

        {meta.value?.length > 0 && (
          <Stack direction={'row'} overflow={'auto'} spacing={2}>
            {meta.value?.map((file, index) => (
              <Stack
                flexShrink={0}
                key={`image-${file.name}`}
                width={'136px'}
                height={'100px'}
                py={1}
                px={0.5}
                onClick={(e) => handleRemoveImage(e, index)}
              >
                <Button sx={{ bgcolor: 'background.neutral', border: 'none', boxShadow: 0, p: 0 }}>
                  <Avatar
                    variant="square"
                    src={file.src}
                    alt={file.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Button>
              </Stack>
            ))}

            {!isSingleFile && (
              <Button
                sx={{
                  borderRadius: '14px',
                  width: '90px',
                  height: '88px',
                  bgcolor: 'white',
                  border: (theme) => `1px solid ${theme?.palette?.primary[40]}`,
                  '&:hover': { bgcolor: 'white' },
                }}
              >
                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <ApImageAddIcon />
                  <Typography sx={{ whiteSpace: 'nowrap', color: 'primary.main' }}>画像追加</Typography>
                </Stack>
              </Button>
            )}
          </Stack>
        )}
      </Stack>
      <ImageUploadModal open={isUploadOpen} setImages={setImages} onClose={setUploadClose} field={field} />
      <ImageDeleteModal
        open={isDeleteOpen}
        onClose={setDeleteClose}
        clickedImage={clickedImage}
        setConfirmRemove={setConfirmRemove}
      />
    </>
  );
};

ImageUpload.propTypes = {
  isDisabled: PropTypes.bool,
  isSingleFile: PropTypes.bool,
};
