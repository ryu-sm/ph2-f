import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/constant';
import { AdDocsWrapper } from '@/containers/ad-layout/ad-doc-wrapper';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export const DocUploadNewDoc = () => {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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
          setImages((prevImages) => [...prevImages, ...newFiles]);
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: ALLOWED_IMAGE_TYPES,
    maxSize: MAX_SIZE_FILE,
  });
  return (
    <AdDocsWrapper secondTitle="アップロード" isDetailPage>
      <Stack width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'} bgcolor={'white'}>
        <Stack
          width={'615px'}
          height={'200px'}
          alignItems={'center'}
          justifyContent={'center'}
          spacing={5}
          sx={{
            border: (theme) => `1px dashed ${theme.palette.primary.main}`,
          }}
        >
          <Button
            sx={{
              width: '325px',
              height: '38px',
              bgcolor: 'white',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'white',
                opacity: 0.9,
              },
            }}
            {...getRootProps()}
          >
            ファイルを選択
            <input {...getInputProps()} />
          </Button>
          <Typography variant="doc_upload_page_text">
            ファイルをこのエリアにドロップするか「ファイルを選択」からアップロードしてください
          </Typography>
          <Typography variant="doc_upload_page_text">※アップロード可能拡張子：png、jpg、jpeg、pdf</Typography>
        </Stack>
      </Stack>
    </AdDocsWrapper>
  );
};
