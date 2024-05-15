import { Icons } from '@/assets';
import { ALLOWED_IMAGE_TYPES, MAX_SIZE_FILE } from '@/configs';
import { AdMainWrapper } from '@/containers';
import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone, ErrorCode } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ImgPreview } from './img-preview';
import { useBoolean, useIsManager } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store';
import { API_500_ERROR } from '@/constant';
import { adAddArchiveFiles } from '@/services';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

export const AdNewDocumentsPage = () => {
  const isManager = useIsManager();
  const navigate = useNavigate();
  const authInfo = useRecoilValue(authAtom);
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
      if (rejectedFiles.find((item) => item.errors.find((e) => e.code.includes(ErrorCode.FileInvalidType)))) {
        return toast.error(`アップロードファイルは不正です。（ ※アップロード可能拡張子：png、jpg、jpeg、pdfです。）`);
      }
      if (rejectedFiles.find((item) => item.errors.find((e) => e.code.includes(ErrorCode.FileTooLarge)))) {
        return toast.error(`許容容量 (${Math.round(MAX_SIZE_FILE / 1000 / 1000)}MB) を超えています`);
      }
      if (rejectedFiles.find((item) => item.errors.find((e) => e.code.includes(ErrorCode.FileTooSmall)))) {
        return toast.error(`ファイルの容量は小さいすぎです。`);
      }
      if (rejectedFiles.find((item) => item.errors.find((e) => e.code.includes(ErrorCode.TooManyFiles)))) {
        return toast.error(`ファイルの数が多いすぎです。`);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: ALLOWED_IMAGE_TYPES,
    maxSize: MAX_SIZE_FILE,
  });

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

  const handelSave = async () => {
    try {
      await adAddArchiveFiles({ files: images });
      toast.success('ファイルをアップロードしました。');
      navigate(routeNames.adSalesPersonDocumentsPage.path);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const handelDelete = (deleteIndex) => {
    const temp = [];
    images.forEach((item, index) => {
      if (index !== deleteIndex) {
        temp.push(item);
      }
    });

    setImages(temp);
  };

  return (
    <AdMainWrapper
      leftContent={
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ cursor: 'pointer' }}
            spacing={1}
            onClick={() =>
              navigate(isManager ? routeNames.adManagerDocumentsPage.path : routeNames.adSalesPersonDocumentsPage.path)
            }
          >
            <Typography variant="main_page_title" color="primary.main">
              アップロード書類一覧
            </Typography>
          </Stack>
          <Icons.AdProgressArrowRight />
          <Typography variant="main_page_title" color="gray.100">
            アップロード
          </Typography>
        </Stack>
      }
    >
      {images.length === 0 && (
        <Stack width={'100%'} flex={1} justifyContent={'center'} alignItems={'center'} bgcolor={'white'}>
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
      )}
      {images.length > 0 && (
        <Stack width={'100%'} flex={1}>
          <Stack>
            <Stack sx={{ p: 2 }}>
              <Stack
                bgcolor={'white'}
                direction={'row'}
                boxShadow={'rgba(59, 118, 129, 0.15) 0px 2px 8px'}
                height={'40px'}
                width={1}
              >
                <Stack alignItems={'center'} direction={'row'} justifyContent={'center'} width={140} minWidth={140}>
                  <Typography
                    sx={{
                      fontFamily: 'Hiragino Sans',
                      fontSize: '12px',
                      fontWeight: 300,
                      lineHeight: '16.8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    番号
                  </Typography>
                </Stack>
                <Stack alignItems={'center'} direction={'row'} justifyContent={'center'} width={500} minWidth={400}>
                  <Typography
                    sx={{
                      fontFamily: 'Hiragino Sans',
                      fontSize: '12px',
                      fontWeight: 300,
                      lineHeight: '16.8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ファイル名
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {images.length > 0 && (
              <Stack direction={'column'}>
                <Stack bgcolor={'white'} sx={{ minHeight: '60dvh' }}>
                  {images.map((item, index) => (
                    <Stack
                      key={index}
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                      borderBottom={'1px solid'}
                      borderColor={'gray.60'}
                      px={'10px'}
                      height={68}
                      maxHeight={68}
                      flexGrow={1}
                    >
                      <Stack
                        alignItems={'center'}
                        direction={'row'}
                        justifyContent={'flex-start'}
                        width={140}
                        minWidth={140}
                        sx={{ borderRight: (theme) => `1px solid ${theme.palette.gray[60]}` }}
                      >
                        <Typography
                          sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: 'gray.100',
                            lineHeight: 1.8,
                            px: '10px',
                            textAlign: 'center',
                            fontFamily: 'Hiragino Sans',
                            fontWeight: '400',
                            fontSize: '14px',
                          }}
                        >
                          {index + 1}
                        </Typography>
                      </Stack>
                      <Stack
                        alignItems={'center'}
                        direction={'row'}
                        justifyContent={'flex-start'}
                        width={500}
                        minWidth={500}
                        sx={{ borderRight: (theme) => `1px solid ${theme.palette.gray[60]}` }}
                      >
                        <Typography
                          sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            px: '10px',
                          }}
                          variant="files_upload_filename"
                          onMouseEnter={() => handleMouseEnter(item)}
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          {item.name}
                        </Typography>
                        <ImgPreview open={imgPreviewOpen} file={hoverImg} />
                      </Stack>

                      <Stack
                        alignItems={'center'}
                        direction={'row'}
                        justifyContent={'flex-start'}
                        width={1}
                        sx={{ px: '10px' }}
                      >
                        <Button
                          sx={{
                            width: '125px',
                            height: '30px',
                            bgcolor: 'secondary.80',
                            borderRadius: '2px',
                            '&:hover': {
                              bgcolor: 'secondary.80',
                              opacity: 0.9,
                            },
                          }}
                          onClick={() => handelDelete(index)}
                        >
                          <Typography variant="doc_download_button">削除</Typography>
                        </Button>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  spacing={3}
                  sx={{ pt: 3, px: 4 }}
                >
                  <Button
                    sx={{
                      width: '145px',
                      height: '36px',
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
                    <input {...getInputProps()} />
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Icons.AdNewApply sx={{ width: 12, height: 14 }} />
                      <Typography variant="doc_download_button">ファイル追加</Typography>
                    </Stack>
                  </Button>
                  <Button
                    sx={{
                      width: '125px',
                      height: '36px',
                      bgcolor: 'secondary.80',
                      borderRadius: '2px',
                      '&:hover': {
                        bgcolor: 'secondary.80',
                        opacity: 0.9,
                      },
                    }}
                    onClick={handelSave}
                  >
                    <Typography variant="doc_download_button">保存</Typography>
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </AdMainWrapper>
  );
};
