import { Icons } from '@/assets';
import { API_500_ERROR } from '@/constant';
import { AdMainWrapper } from '@/containers';
import { useBoolean, useCurrSearchParams, useIsManager } from '@/hooks';
import { routeNames } from '@/router/settings';
import { adGetArchiveFile, adUpdateArchiveFile } from '@/services';
import { downloadFileAsync } from '@/utils';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteModal } from './delete-modal';
import { ImgPreview } from './img-preview';

export const AdDocumentsDetailPage = () => {
  const isManager = useIsManager();
  const navigate = useNavigate();
  const id = useCurrSearchParams().get('id');
  const [images, setImages] = useState([]);

  const { value: imgPreviewOpen, onTrue: onImgPreviewOpen, onFalse: onImgPreviewClose } = useBoolean(false);
  const { value: openModal, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);

  const [hoverImg, setHoverImg] = useState({});

  const handleMouseEnter = (img) => {
    onImgPreviewOpen();
    setHoverImg(img);
  };
  const handleMouseLeave = () => {
    onImgPreviewClose();
    setHoverImg({});
  };

  const fecthData = async () => {
    try {
      const res = await adGetArchiveFile(id);
      if (!res.data?.length) return navigate(routeNames.adSalesPersonDocumentsPage.path);
      setImages(res.data);
    } catch (error) {
      console.debug(error);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  const handleDelete = async (file_id) => {
    try {
      await adUpdateArchiveFile(file_id);
      handleCloseModal();
      await fecthData();
    } catch (error) {
      console.debug(error);
    }
  };

  const isPdf = (uploadFile) => {
    return uploadFile?.name?.split('.')[1] === 'pdf';
  };

  const handleFileClick = (file) => {
    localStorage.setItem('fileData', file.src);
    localStorage.setItem('fileName', file.name);
    window.open(file.src, '_blank', 'noopener,noreferrer');
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
            詳細
          </Typography>
        </Stack>
      }
    >
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
              <Stack alignItems={'center'} direction={'row'} justifyContent={'center'} width={100} minWidth={100}>
                <Typography
                  sx={{
                    fontFamily: 'Hiragino Sans',
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: '16.8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ファイルID
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
          <Stack bgcolor={'white'}>
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
                  justifyContent={'center'}
                  width={100}
                  minWidth={100}
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
                    {item.id}
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
                      cursor: isPdf(item) ? 'pointer' : 'default',
                    }}
                    variant="files_upload_filename"
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={() => handleMouseLeave()}
                    onClick={isPdf(item) ? () => handleFileClick(item) : null}
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
                  spacing={4}
                >
                  <Button
                    sx={{
                      width: '125px',
                      height: '30px',
                      bgcolor: 'white',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      color: 'primary.main',
                      borderRadius: '2px',
                      '&:hover': {
                        bgcolor: 'white',
                        opacity: 0.9,
                      },
                    }}
                    onClick={async () => await downloadFileAsync(item.src, item.name)}
                  >
                    <Typography variant="doc_download_button">ダウンロード</Typography>
                  </Button>
                  {!isManager && (
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
                      onClick={handleOpenModal}
                    >
                      <Typography variant="doc_download_button">削除</Typography>
                    </Button>
                  )}
                  <DeleteModal
                    open={openModal}
                    onClose={handleCloseModal}
                    onDelete={async () => await handleDelete(item?.id)}
                    file_name={item?.name}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </AdMainWrapper>
  );
};
