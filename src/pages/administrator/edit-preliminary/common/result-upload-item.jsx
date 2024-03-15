import { useBoolean } from '@/hooks';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ImgPreview } from './img-preview';
import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/configs';

export const ResultUploadItem = ({ name, isDisabled }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
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
          .then((newFiles) => setValue(newFiles))
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
    [setValue, meta.value]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: MAX_SIZE_FILE,
  });

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 613,
          height: 200,
          m: 'auto',
          border: (theme) => `1px dashed ${theme.palette.primary.main}`,
        }}
      >
        <Stack direction="column" spacing={5}>
          <Button
            disabled={isDisabled}
            sx={{
              py: '9px',
              px: '118px',
              backgroundColor: 'white',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiTypography-root': {
                  color: 'white',
                },
              },
            }}
            {...getRootProps()}
          >
            <Typography variant="files_upload_button">ファイルを選択</Typography>
            <input {...getInputProps()} name={field.name} />
          </Button>
          <Typography variant="pdf_description" color="b_333">
            審査結果のPDFをこのエリアにドロップするかアップロードしてください
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
