import { adPdf } from '@/assets';
import { FILES_CATEGORY, FILES_SUBTITLE_MAP } from '@/constant';
import { adGetFilesView } from '@/services';
import { AdThemeProvider } from '@/styles/ad-theme';
import { downloadImageAsync } from '@/utils';
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  FileDownload,
  KeyboardArrowDown,
  KeyboardArrowUp,
  RotateLeft,
  RotateRight,
} from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { ScrollMode, Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Element, Events, scroller } from 'react-scroll';

export const AdFilesViewPage = () => {
  const [filesOrign, setFilesOrigin] = useState(null);
  const [searchParams] = useSearchParams();
  const p_application_header_id = searchParams.get('p_application_header_id');
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const [currentImage, setCurrentImage] = useState(null);
  const [rotate, setRotate] = useState(0);

  const fetch = useCallback(async () => {
    try {
      const res = await adGetFilesView(p_application_header_id, `${type}__${category}`);
      console.log(res.data);
      setFilesOrigin(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [p_application_header_id, category, type]);

  useEffect(() => {
    fetch();
  }, []);

  const fileItems = useMemo(() => {
    const temp = [];
    if (filesOrign) {
      if (category === 'I') {
        filesOrign.forEach((item, index) => {
          item?.p_borrowings__I?.map((f) => {
            temp.push({
              ...f,
              title: FILES_CATEGORY[category],
              subTitle: `${index + 1}件目の借入`,
              sortKey: item.key,
            });
          });
        });
      } else {
        const fileList = Object.keys(filesOrign).map((key) => ({
          key: key,
          value: filesOrign[key],
        }));

        fileList.forEach((item) => {
          item.value.map((f) => {
            temp.push({
              ...f,
              title: FILES_CATEGORY[category],
              subTitle: FILES_SUBTITLE_MAP[item.key],
              sortKey: item.key,
            });
          });
        });
      }
    }
    setCurrentImage(temp[0]);
    return temp;
  }, [filesOrign, category]);

  const parseOwner = (item) => {
    if (item?.owner_type === 1) return item?.p_applicant_person_name;
    if (item?.owner_type === 2) return item?.s_sales_person_name;
    if (item?.owner_type === 3) return item?.s_manager_name;
  };

  const handleNextImage = () => {
    const index = fileItems.findIndex((e) => e.src === currentImage.src);
    const nextIndex = index < fileItems.length - 1 ? index + 1 : 0;
    scroller.scrollTo(`image-${nextIndex}`, {
      duration: 300,
      smooth: true,
      containerId: 'scroll-images',
      isDynamic: true,
      horizontal: true,
    });

    setCurrentImage(fileItems[nextIndex]);
  };

  const handlePrevImage = () => {
    const index = fileItems.findIndex((e) => e.src === currentImage.src);
    const prevIndex = index > 0 ? index - 1 : fileItems.length - 1;
    scroller.scrollTo(`image-${prevIndex}`, {
      duration: 300,
      smooth: true,
      containerId: 'scroll-images',
      isDynamic: true,
      horizontal: true,
    });
    setCurrentImage(fileItems[prevIndex]);
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadImageAsync(currentImage.src, currentImage.name);
    } catch (e) {
      console.error('error：', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const scrollModePluginInstance = scrollModePlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;

  const AllFiles = ({ fileItems }) => {
    return (
      <Stack
        id="scroll-images"
        direction="row"
        justifyContent={'center'}
        sx={{
          width: 1,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {fileItems.map((image, index) => (
          <Element key={index} name={`image-${index}`}>
            <Stack
              sx={{
                width: 100,
                height: 90,
                border: currentImage?.src === image.src ? (theme) => `4px solid ${theme.palette.primary.main}` : '',
                padding: currentImage?.src === image.src ? 0 : 1,
              }}
              onClick={() => {
                setRotate(0);
                setCurrentImage(image);
                scroller.scrollTo(`image-${index}`, {
                  duration: 300,
                  smooth: true,
                  containerId: 'scroll-images',
                  isDynamic: true,
                  horizontal: true,
                });
              }}
            >
              {image.name.includes('pdf') ? (
                <Avatar
                  variant="square"
                  src={adPdf}
                  sx={{
                    width: '100px',
                    height: '100%',
                    '.MuiAvatar-img': {
                      objectFit: 'contain',
                    },
                  }}
                />
              ) : (
                <img src={image.src} height="100%" width="vw" alt={image.name} style={{ objectFit: 'cover' }} />
              )}
            </Stack>
          </Element>
        ))}
      </Stack>
    );
  };

  return (
    <AdThemeProvider>
      {fileItems.length > 0 && (
        <Stack
          sx={{
            height: '100dvh',
            background: (theme) => theme.palette.gray[20],
          }}
        >
          <Stack direction={'row'} sx={{ height: 50, px: 3 }} justifyContent="space-between" alignItems="center">
            <Typography>アップロード：{parseOwner(currentImage)}</Typography>
            <Stack alignItems={'center'}>
              <Stack direction={'row'} spacing={1} alignItems={'center'}>
                <Typography
                  variant="doc_preview_title"
                  sx={{
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    color: 'primary.main',
                    fontSize: 20,
                  }}
                >
                  {category}
                </Typography>
                <Typography
                  variant="doc_preview_title"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {currentImage?.title}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: 'Hiragino Sans',
                  fontSize: 13,
                  fontWeight: 300,
                }}
              >
                {currentImage?.subTitle}
              </Typography>
            </Stack>
            <Typography>{currentImage?.created_at}</Typography>
          </Stack>

          <Stack
            // direction={'row'}
            sx={{
              height: 'calc(85vh - 50px)',
              // px: 5,
              alignItems: 'center',
              // justifyContent: 'space-between',
              borderBottom: `4px solid #EAEAEA`,
            }}
          >
            <Stack
              sx={{
                position: 'absolute',
                top: '45%',
                left: 20,
                height: 32,
                width: 32,
                borderRadius: 16,
                backgroundColor: '#EAEAEA',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
              onClick={handlePrevImage}
            >
              <ArrowBackIosNewOutlined
                sx={{
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              />
            </Stack>
            {currentImage?.name?.includes('pdf') ? (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: '50%', height: '100%', ml: 8, overflowX: 'hidden' }}
              >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={currentImage?.src}
                    plugins={[scrollModePluginInstance, pageNavigationPluginInstance]}
                    scrollMode={ScrollMode.Page}
                  />
                </Worker>

                <Stack>
                  <IconButton onClick={jumpToPreviousPage}>
                    <KeyboardArrowUp />
                  </IconButton>
                  <IconButton onClick={jumpToNextPage}>
                    <KeyboardArrowDown />
                  </IconButton>
                  <IconButton onClick={handleDownload} disabled={isDownloading}>
                    <FileDownload />
                  </IconButton>
                </Stack>
              </Stack>
            ) : (
              <Box
                sx={{
                  alignSelf: 'center',
                  position: 'relative',
                  height: 'calc(85vh - 50px)',
                  width: 'calc(85vh - 50px)',
                }}
              >
                <Avatar
                  variant="square"
                  sx={{
                    height: '100%',
                    width: '100%',
                    transform: `rotate(${rotate * 90}deg)`,
                    img: {
                      objectFit: 'contain',
                    },
                  }}
                  src={currentImage?.src}
                  alt={currentImage?.name}
                />
                <Stack
                  direction="row"
                  justifyContent={'flex-end'}
                  className="tool"
                  spacing={2}
                  sx={{
                    p: 1,
                    bgcolor: 'rgba(0,6,155,0.2)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    bottom: 0,
                    '&:hover': {
                      bgcolor: 'rgba(0,6,155,0.3)',
                    },
                  }}
                >
                  <IconButton onClick={() => setRotate((prevState) => ++prevState)}>
                    <RotateRight sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton onClick={() => setRotate((prevState) => --prevState)}>
                    <RotateLeft sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDownload()} disabled={isDownloading}>
                    <FileDownload sx={{ color: 'white' }} />
                  </IconButton>
                </Stack>
              </Box>
            )}
            <Stack
              sx={{
                position: 'absolute',
                top: '45%',
                right: 20,
                height: 32,
                width: 32,
                borderRadius: 16,
                backgroundColor: '#EAEAEA',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
              onClick={handleNextImage}
            >
              <ArrowForwardIosOutlined
                sx={{
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              height: 'calc(15vh)',
              width: '100%',
              overflowX: 'scroll',
            }}
          >
            <AllFiles fileItems={fileItems} />
          </Stack>
        </Stack>
      )}
    </AdThemeProvider>
  );
};
