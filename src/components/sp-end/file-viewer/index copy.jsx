import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { ScrollMode, SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import { Box, Stack } from '@chakra-ui/react';

import '@react-pdf-viewer/core/lib/styles/index.css';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

export default function SpFileViewer({ url, onScrollBottom }) {
  const zoomPluginInstance = zoomPlugin();
  const handleScroll = (e) => {
    const isBottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 30;
    if (isBottom) {
      onScrollBottom(true);
    }
  };
  return (
    <Box
      h={'272px'}
      border={'1px solid'}
      borderRadius={'4px'}
      borderColor={'sp.primary.20'}
      overflow={'auto'}
      onScroll={handleScroll}
    >
      <Stack
        bgColor={'white'}
        sx={{
          '.rpv-core__page-layer, .rpv-core__inner-container, .rpv-core__viewer, .rpv-core__inner-pages': {
            overflow: 'hidden',
          },
          '.rpv-core__page-layer::after': {
            display: 'none',
          },
          '.rpv-core__canvas-layer': {
            left: '50%',
            transform: 'translateX(-50%)',
          },
        }}
      >
        <Worker workerUrl="/pdf.worker.bundle.js">
          <Viewer
            fileUrl={url}
            plugins={[zoomPluginInstance]}
            defaultScale={SpecialZoomLevel.PageWidth}
            scrollMode={ScrollMode.Vertical}
          />
        </Worker>
      </Stack>
    </Box>
  );
}
