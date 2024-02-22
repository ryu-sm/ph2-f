import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

export const ApFileViewer = ({ url, onScrollBottom }) => {
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const getPageWidth = () => {
    return containerRef.current ? containerRef.current.offsetWidth : 0;
  };
  const handleScroll = (e) => {
    const isBottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 30;
    if (isBottom) {
      onScrollBottom(true);
    }
  };
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        height: 272,
        maxHeight: 272,
        border: '1px solid',
        borderRadius: 1,
        borderColor: (theme) => theme.palette.primary[20],
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={getPageWidth()} />
        ))}
      </Document>
    </Box>
  );
};
