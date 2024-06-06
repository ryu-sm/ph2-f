import { ApPageTitle, ApSecondaryButton } from '@/components';
import { ApLayout } from '@/containers';
import { localApplication } from '@/store';
import { Box, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

export const ApExaminationResultPage = () => {
  const navigate = useNavigate();
  const { p_application_headers } = useRecoilValue(localApplication);
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const getPageWidth = () => {
    return containerRef.current ? containerRef.current.offsetWidth : 0;
  };
  return (
    <ApLayout hasMenu pb={13}>
      <ApPageTitle py={8}>{`審査結果`}</ApPageTitle>
      <Stack flex={1} sx={{ px: 4, pt: 7, width: 1 }} alignItems="center">
        <Box
          width={1}
          display={'flex'}
          flexDirection={'column'}
          ref={containerRef}
          sx={{
            width: '100%',
            border: '1px solid',
            borderRadius: 1,
            borderColor: (theme) => theme.palette.primary[20],
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <Document file={p_application_headers.R[0]?.src} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={getPageWidth()} />
            ))}
          </Document>
        </Box>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={4}
        zIndex={3}
        sx={{
          position: 'fixed',
          py: 4,
          px: 6,
          bottom: 0,
          width: 1,
          maxWidth: 480,
          bgcolor: 'white',
          boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <ApSecondaryButton
          endIcon={<Icons.ApForwardRightWhiteIcon />}
          width={1}
          height={40}
          onClick={() => {
            navigate(routeNames.apTopPage.path, { replace: true });
          }}
        >
          Top
        </ApSecondaryButton>
      </Stack>
    </ApLayout>
  );
};
