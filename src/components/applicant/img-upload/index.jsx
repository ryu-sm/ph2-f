import { useBoolean } from '@/hooks';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { ApPrimaryButton } from '../button';
import { Icons } from '@/assets';
import { ApImageUploadModal } from './img-upload-modal';
import { Fragment, useState } from 'react';
import { ApImageDeleteModal } from './img-delete-modal';

export const ApImgUpload = ({ disable, singleFile, ...props }) => {
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;
  const { value: isUploadOpen, onTrue: setUploadOpen, onFalse: setUploadClose } = useBoolean(false);
  const { value: isDeleteOpen, onTrue: setDeleteOpen, onFalse: setDeleteClose } = useBoolean(false);

  const [clickedImage, setClickedImage] = useState(null);

  const handleViewImage = (isPdf, index) => {
    setClickedImage({ index, isPdf, ...meta.value[index] });
    setDeleteOpen();
  };

  const handleRemoveImage = (index) => {
    const newValue = meta.value.filter((_, i) => i !== index);
    setValue(newValue);
  };

  return (
    <Stack name={field.name} direction={'row'} spacing={3} sx={{ width: 1 }}>
      {meta.value.length === 0 && (
        <ApPrimaryButton
          width={136}
          height={100}
          disabled={disable}
          onClick={() => {
            setUploadOpen();
          }}
        >
          <Stack spacing={2} alignItems={'center'}>
            <Icons.ApImageUploadIcon sx={{ width: 48, height: 48 }} />
            <Typography variant="label" color={'white'}>
              画像アップロード
            </Typography>
          </Stack>
        </ApPrimaryButton>
      )}

      {meta.value.length > 0 && (
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          spacing={2}
          sx={{ pb: 1, width: 1, height: 1, maxWidth: '100%' }}
        >
          <Stack direction={'row'} spacing={2} sx={{ minWidth: 136, maxWidth: 'calc(100% - 90px)', overflowX: 'auto' }}>
            {meta.value?.map((file, index) => {
              const isPdf = file.name.includes('pdf');
              return (
                <Fragment key={`image-${file.name}`}>
                  <Box
                    sx={{
                      width: 136,
                      minWidth: 136,
                      height: 100,
                      bgcolor: 'background.wrapper',
                      border: 'none',
                      boxShadow: 0,
                      p: 0,
                      borderRadius: 1,
                    }}
                    onClick={(e) => handleViewImage(isPdf, index)}
                  >
                    {isPdf ? (
                      <Avatar
                        variant="square"
                        alt={file.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          bgcolor: 'background.wrapper',
                          borderRadius: 1,
                        }}
                      >
                        <Icons.ApPdfOutlineBlackIcon sx={{ height: 1, width: 80 }} />
                      </Avatar>
                    ) : (
                      <Avatar
                        variant="square"
                        src={file.src}
                        alt={file.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 1 }}
                      />
                    )}
                  </Box>
                  {isPdf && (
                    <Typography variant="notify" sx={{ lineHeight: '130%', color: 'text.main', textAlign: 'center' }}>
                      {file.name}
                    </Typography>
                  )}
                </Fragment>
              );
            })}
          </Stack>
          {!singleFile && (
            <Stack sx={{ py: '6px' }}>
              <Button
                sx={{
                  borderRadius: '14px',
                  width: 90,
                  minWidth: 90,
                  height: 88,
                  bgcolor: 'white',
                  border: (theme) => `1px solid ${theme?.palette?.primary[40]}`,
                  '&:hover': { bgcolor: 'white' },
                }}
                onClick={setUploadOpen}
              >
                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <Icons.ApImageAddIcon />
                  <Typography sx={{ whiteSpace: 'nowrap', color: 'primary.main' }}>画像追加</Typography>
                </Stack>
              </Button>
            </Stack>
          )}
        </Stack>
      )}

      <ApImageUploadModal
        isOpen={isUploadOpen}
        onClose={setUploadClose}
        setImages={(newFiles) => setValue([...meta.value, ...newFiles])}
      />

      <ApImageDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setClickedImage(null);
          setDeleteClose();
        }}
        clickedImage={clickedImage}
        handleRemoveImage={handleRemoveImage}
      />
    </Stack>
  );
};
