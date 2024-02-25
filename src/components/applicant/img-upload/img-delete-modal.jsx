import { useBoolean } from '@/hooks';
import { Box, Modal, Stack } from '@mui/material';
import { ApPrimaryButton, ApSecondaryButton } from '../button';
import { Icons } from '@/assets';
import { ApModalWrapper } from '../modal-wrapper';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

export const ApImageDeleteModal = ({ isOpen, onClose, clickedImage, handleRemoveImage }) => {
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const getPageWidth = () => {
    return containerRef.current ? containerRef.current.offsetWidth : 0;
  };
  const { value: isConfirmOpen, onTrue: setConfirmOpen, onFalse: setConfirmClose } = useBoolean(false);
  const handleConfirmRemove = () => {
    setConfirmClose();
    handleRemoveImage(clickedImage.index);
    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        disableAutoFocus
      >
        <Stack alignItems={'center'} sx={{ width: 1 }}>
          <Stack sx={{ p: 6, bgcolor: 'white', height: '35dvh', width: 1, maxWidth: 480 }}>
            {clickedImage?.isPdf ? (
              <Box
                display={'flex'}
                flexDirection={'column'}
                ref={containerRef}
                sx={{
                  maxHeight: 'calc(35dvh - 48px)',
                  border: '1px solid',
                  borderRadius: 1,
                  borderColor: (theme) => theme.palette.primary[20],
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                <Document file={clickedImage?.src} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} width={getPageWidth()} />
                  ))}
                </Document>
              </Box>
            ) : (
              <Box component={'img'} src={clickedImage?.src} sx={{ height: 1, width: 1, objectFit: 'contain' }} />
            )}
          </Stack>
          <Stack spacing={6} alignItems={'center'} sx={{ p: 6 }}>
            <ApSecondaryButton
              height={40}
              width={240}
              startIcon={<Icons.ApArrowLeftIcon />}
              onClick={() => {
                onClose();
                setNumPages(null);
              }}
            >
              もどる
            </ApSecondaryButton>
            <ApSecondaryButton
              height={40}
              width={240}
              startIcon={<Icons.ApImageDeleteIcon />}
              onClick={() => {
                setConfirmOpen();
                setNumPages(null);
              }}
            >
              この画像を削除する
            </ApSecondaryButton>
          </Stack>
        </Stack>
      </Modal>
      <ApModalWrapper
        open={isConfirmOpen}
        icon={<Icons.ApWarningMainIcon sx={{ width: 32, height: 32 }} />}
        label={`この画像を\n本当に削除しますか？`}
      >
        <ApPrimaryButton height={40} onClick={handleConfirmRemove}>
          削除する
        </ApPrimaryButton>
        <ApSecondaryButton height={40} onClick={setConfirmClose}>
          キャンセル
        </ApSecondaryButton>
      </ApModalWrapper>
    </>
  );
};
