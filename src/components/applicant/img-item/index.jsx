import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApImgItem = ({ files }) => {
  return (
    <Stack direction={'row'} alignItems={'start'} spacing={2} sx={{ pb: 1, width: 1, height: 1, overflowX: 'auto' }}>
      {files?.map((file, index) => {
        const isPdf = file.name.includes('pdf');
        return (
          <Stack key={`image-${file.name}`} spacing={1} sx={{ width: 136, minWidth: 136 }}>
            <Box
              sx={{
                height: 100,
                bgcolor: 'background.wrapper',
                border: 'none',
                boxShadow: 0,
                p: 0,
                borderRadius: 1,
              }}
              // onClick={(e) => handleViewImage(isPdf, index)}
            >
              {isPdf ? (
                <Avatar
                  variant="square"
                  alt={file.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    bgcolor: 'background.wrapper',
                    borderRadius: 1,
                  }}
                >
                  <Icons.ApPdfOutlineBlackIcon sx={{ height: 1, width: 80 }} />
                </Avatar>
              ) : (
                <Avatar
                  variant="square"
                  src={file.src}
                  alt={file.name}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 1 }}
                />
              )}
            </Box>
            {isPdf && (
              <Typography variant="notify" sx={{ lineHeight: '130%', color: 'text.main', textAlign: 'center' }}>
                {file.name}
              </Typography>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
