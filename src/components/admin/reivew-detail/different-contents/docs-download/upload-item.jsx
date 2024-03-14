import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/constant';
import { useBoolean } from '@/hooks';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { UpdateHistoryModal } from '../../update-history';
import { ImgPreview } from './img-preview';
export const UploadItem = ({ isMultiple, name, subTitle, hasChangeLog }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { touched, error } = meta;
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
            isMultiple ? setValue([...meta.value, ...newFiles]) : setValue(newFiles);
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
    },
    [setValue, meta.value, isMultiple]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: isMultiple,
    accept: ALLOWED_IMAGE_TYPES,
    maxSize: MAX_SIZE_FILE,
  });

  const handleDelete = (index) => {
    setValue(meta.value.filter((_, i) => i !== index));
  };

  const { value: open, onTrue: onModalOpen, onFalse: onModalClose } = useBoolean(false);
  const { value: imgPreviewOpen, onTrue: onImgPreviewOpen, onFalse: onImgPreviewClose } = useBoolean(false);

  const [hoverImg, setHoverImg] = useState({});
  const [mouseEnterOnImg, setMouseEnterOnImg] = useState(false);
  const handleMouseEnter = (img) => {
    onImgPreviewOpen();
    setHoverImg(img);
  };
  const handleMouseLeave = () => {
    if (!mouseEnterOnImg) {
      onImgPreviewClose();
      setHoverImg({});
    }
  };
  const isDisabled = false;

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Stack direction={'row'} flexWrap={'wrap'} maxWidth={240}>
        <Typography variant="docs_subtitle" ml={7}>
          {subTitle}
        </Typography>
      </Stack>

      <Stack>
        <Stack
          width={'340px'}
          minHeight={'45px'}
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          backgroundColor={'gray.20'}
          padding={1}
        >
          <Stack flex={1} px={2} pt={'2px'} justifyContent={'center'} spacing={'6px'} maxWidth={'55%'}>
            {meta.value?.map((file, index) => (
              <Stack key={index} direction={'row'} alignItems={'center'} spacing={'5px'}>
                <CancelIcon
                  sx={{ width: 15, height: 15, color: 'gray.70', cursor: 'pointer' }}
                  onClick={() => handleDelete(index)}
                />
                <Typography
                  variant="docs_upload_filename"
                  onMouseEnter={() => handleMouseEnter(file)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {file.name}
                </Typography>
                <ImgPreview
                  open={imgPreviewOpen}
                  file={hoverImg}
                  handleMouseOn={setMouseEnterOnImg}
                  handleMouseLeave={onImgPreviewClose}
                />
              </Stack>
            ))}
          </Stack>
          {hasChangeLog && (
            <Box
              sx={{
                lineHeight: 1,
                fontSize: '24px',
                cursor: 'pointer',
              }}
              onClick={onModalOpen}
            >
              ...
            </Box>
          )}

          <Button
            disabled={isDisabled}
            sx={{
              padding: '8px 16px',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
              '&:disabled': {
                color: 'primary.main',
              },
            }}
            {...getRootProps()}
          >
            <Typography variant="docs_upload_button">ファイルを選択</Typography>
            <input {...getInputProps()} name={field.name} />
          </Button>
        </Stack>
        {!touched && error && (
          <Stack direction={'row'} textAlign={'right'} flexWrap={'wrap'} width={330}>
            <Typography variant="docs_upload_error">{error}</Typography>
          </Stack>
        )}
      </Stack>
      <UpdateHistoryModal open={open} onModalClose={onModalClose} title="チラシ・パンフレットの修正履歴" />
    </Stack>
  );
};

UploadItem.propTypes = {
  isMultiple: PropTypes.bool,
  name: PropTypes.string,
  subTitle: PropTypes.string,
  hasChangeLog: PropTypes.bool,
};
