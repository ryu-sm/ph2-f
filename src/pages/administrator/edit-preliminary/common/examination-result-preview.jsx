import { Button, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useIsManager } from '@/hooks';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';

export const ResultPreviewPDF = ({ file }) => {
  const { handleDeleteProvisionalResult } = usePreliminaryContext();
  const isManager = useIsManager();
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut } = zoomPluginInstance;

  return (
    <Stack direction="row" width={1}>
      {!isManager && file?.length === 0 && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 613,
            height: 550,
            m: 'auto',
          }}
        >
          <Typography
            variant="leafletOption"
            color="gray.100"
            sx={{
              whiteSpace: 'break-spaces',
              textAlign: 'center',
            }}
          >
            {`現在仮審査中です。\n仮審査結果が出るまでお待ちください。`}
          </Typography>
        </Stack>
      )}
      {file?.length > 0 && (
        <Stack flex={1} direction="row" justifyContent="center" sx={{ width: 1, height: 550, px: 4 }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={file[0]?.src} plugins={[zoomPluginInstance]} />
          </Worker>
        </Stack>
      )}
      <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ marginLeft: 1, p: 2 }}>
        <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={`10px`}>
          <ZoomIn>
            {(props) => (
              <Button
                sx={{
                  width: 36,
                  minWidth: 36,
                  height: 36,
                  bgcolor: 'white',
                  color: 'gray.100',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'gray.100',
                  },
                }}
                {...props}
              >
                <Icons.AdPlus />
              </Button>
            )}
          </ZoomIn>
          <ZoomOut>
            {(props) => (
              <Button
                sx={{
                  width: 36,
                  minWidth: 36,
                  height: 36,
                  bgcolor: 'white',
                  color: 'gray.100',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'gray.100',
                  },
                }}
                {...props}
              >
                <Icons.AdMinus />
              </Button>
            )}
          </ZoomOut>
        </Stack>
        {!isManager && (
          <Button
            sx={{
              width: 36,
              minWidth: 36,
              height: 36,
              bgcolor: 'white',
              color: 'gray.100',
              '&:hover': {
                bgcolor: 'white',
                color: 'gray.100',
              },
            }}
          >
            <Icons.AdPDFDownload />
          </Button>
        )}
        {isManager && (
          <Button
            sx={{
              width: 36,
              minWidth: 36,
              height: 36,
              bgcolor: 'white',
              color: 'gray.100',
              '&:hover': {
                bgcolor: 'white',
                color: 'gray.100',
              },
            }}
            onClick={async () => handleDeleteProvisionalResult(file[0]?.id)}
          >
            <Icons.AdTrash sx={{ width: 18, height: 18 }} />
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
