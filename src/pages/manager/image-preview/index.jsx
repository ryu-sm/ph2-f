import pdf from '@/assets/images/pdf.png';
import { DOCS_CATEGORY, DOCS_SUBTITLE_MAP } from '@/constant/docs-category';
import { applicationAtom, authAtom } from '@/store';
import { AdThemeProvider } from '@/styles/ad-theme';
import { downloadImageAsync } from '@/utils/download';
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
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Element, Events, scroller } from 'react-scroll';
import { useRecoilValue } from 'recoil';

export const ImagePreviewPage = () => {
  const { user } = useRecoilValue(authAtom);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { docs_list } = useRecoilValue(applicationAtom);
  const currentItem = docs_list.find((item) => item.label === id);

  let images = [];
  currentItem.fields.forEach((field) => {
    Object.keys(field).forEach((key) => {
      const fieldImages = field[key].map((image) => ({
        ...image,
        fieldKey: key,
      }));
      images = [...images, ...fieldImages];
    });
  });

  const [currentImage, setCurrentImage] = useState(images[0]);

  const createdAt = '2024/02/19 19:11:26';
  const [rotate, setRotate] = useState(0);

  const subTitle = useMemo(() => DOCS_SUBTITLE_MAP[currentImage.fieldKey], [currentImage]);

  const handleNextImage = () => {
    const index = images.findIndex((e) => e.src === currentImage.src);
    const nextIndex = index < images.length - 1 ? index + 1 : 0;
    scroller.scrollTo(`image-${nextIndex}`, {
      duration: 300,
      smooth: true,
      containerId: 'scroll-images',
      isDynamic: true,
      horizontal: true,
    });
    setCurrentImage(images[nextIndex]);
  };

  const handlePrevImage = () => {
    const index = images.findIndex((e) => e.src === currentImage.src);
    const prevIndex = index > 0 ? index - 1 : images.length - 1;
    scroller.scrollTo(`image-${prevIndex}`, {
      duration: 300,
      smooth: true,
      containerId: 'scroll-images',
      isDynamic: true,
      horizontal: true,
    });
    setCurrentImage(images[prevIndex]);
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

  Events.scrollEvent.register('end', function (to, element) {
    console.log('end', to, element);
  });
  const AllFiles = ({ images }) => {
    return (
      <Stack
        id="scroll-images"
        direction="row"
        sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {images.map((image, index) => (
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
                  src={pdf}
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
  AllFiles.propTypes = {
    images: PropTypes.array,
  };
  return (
    <AdThemeProvider>
      <Stack
        sx={{
          height: '100dvh',
          minHeight: '100dvh',
          background: (theme) => theme.palette.gray[20],
        }}
      >
        <Stack direction={'row'} px={3} justifyContent="space-between" alignItems="center">
          <Typography>アップロード：{user.name}</Typography>
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
                {id}
              </Typography>
              <Typography
                variant="doc_preview_title"
                sx={{
                  fontWeight: 500,
                }}
              >
                {DOCS_CATEGORY[id]}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: 'Hiragino Sans',
                fontSize: 13,
                fontWeight: 300,
              }}
            >
              {subTitle}
            </Typography>
          </Stack>
          <Typography>{createdAt}</Typography>
        </Stack>

        <Stack
          direction={'row'}
          sx={{
            height: 'calc(85vh - 50px)',
            px: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `4px solid #EAEAEA`,
          }}
        >
          <Box
            sx={{
              height: 32,
              width: 32,
              borderRadius: 16,
              backgroundColor: '#EAEAEA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handlePrevImage}
          >
            <ArrowBackIosNewOutlined
              sx={{
                cursor: 'pointer',
                fontSize: 16,
              }}
            />
          </Box>
          {currentImage.name.includes('pdf') ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '50%', height: '100%', ml: 8 }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={currentImage.src}
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
                src={currentImage.src}
                alt={currentImage.name}
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
          <Box
            sx={{
              height: 32,
              width: 32,
              borderRadius: 16,
              backgroundColor: '#EAEAEA',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handleNextImage}
          >
            <ArrowForwardIosOutlined
              sx={{
                cursor: 'pointer',
                fontSize: 16,
              }}
            />
          </Box>
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
          <AllFiles images={images} />
        </Stack>
      </Stack>
    </AdThemeProvider>
  );
};
