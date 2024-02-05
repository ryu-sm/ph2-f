import { Flex } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

export default function SpFileViewer({ url, onScrollBottom }) {
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
    <Flex
      direction={'column'}
      maxH={'272px'}
      border={'1px solid'}
      borderRadius={'4px'}
      borderColor={'sp.primary.20'}
      width={'100%'}
      ref={containerRef}
      overflowY={'auto'}
      overflowX={'hidden'}
      onScroll={handleScroll}
    >
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={getPageWidth()} />
        ))}
      </Document>
    </Flex>
  );
}
