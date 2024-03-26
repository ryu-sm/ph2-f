import { useBoolean } from '@/hooks';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ImgPreview } from './img-preview';
import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/configs';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { FilesUpdateHistoryModal } from './files-update-history';

export const UploadItem = ({ isMultiple, name, isDisabled, subTitle, upConfig }) => {
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
              resolve({ src: reader.result, name: file.name, id: '' });
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

  const {
    preliminaryInfo: { files_p_activities, p_activities, p_application_headers },
  } = usePreliminaryContext();

  const isUpdated = useMemo(() => {
    return files_p_activities.includes(upConfig?.key);
  }, [files_p_activities, upConfig]);

  const isUpdatedBorrowings = useMemo(() => {
    return p_activities.includes(upConfig?.key);
  }, [p_activities, upConfig]);

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
  const handleMouseEnter = (img) => {
    onImgPreviewOpen();
    setHoverImg(img);
  };
  const handleMouseLeave = () => {
    onImgPreviewClose();
    setHoverImg({});
  };

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Stack direction={'row'} flexWrap={'wrap'} maxWidth={240}>
        <Typography variant="files_subtitle" ml={7}>
          {subTitle}
        </Typography>
      </Stack>

      <Stack>
        <Stack
          width={'480px'}
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
                <Stack sx={{ width: 15, height: 15 }}>
                  {file?.owner_type !== '1' && (
                    <CancelIcon
                      sx={{ width: 15, height: 15, color: 'gray.70', cursor: 'pointer' }}
                      onClick={() => handleDelete(index)}
                    />
                  )}
                </Stack>

                <Typography
                  variant="files_upload_filename"
                  onMouseEnter={() => handleMouseEnter(file)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {file.name}
                </Typography>
                <ImgPreview open={imgPreviewOpen} file={hoverImg} />
              </Stack>
            ))}
          </Stack>
          <Stack direction={'row'} spacing={2}>
            {(isUpdated || isUpdatedBorrowings) && (
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
            <FilesUpdateHistoryModal
              open={open}
              onClose={onModalClose}
              title={subTitle}
              upConfig={{ ...upConfig, p_application_header_id: p_application_headers?.id }}
            />

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
              <Typography variant="files_upload_button">ファイルを選択</Typography>
              <input {...getInputProps()} name={field.name} />
            </Button>
          </Stack>
        </Stack>
        {!touched && error && (
          <Stack direction={'row'} textAlign={'right'} flexWrap={'wrap'} width={330}>
            <Typography variant="files_upload_error">{error}</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
