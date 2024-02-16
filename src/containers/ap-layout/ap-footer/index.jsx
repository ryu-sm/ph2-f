import { useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApFooter = ({ hasContact, mb }) => {
  const footerHeight = useMemo(() => {
    if (hasContact) return 190;
    return 120;
  }, [hasContact]);
  return (
    <Box sx={{ height: footerHeight, width: 1, p: 6, mb: mb || 0 }}>
      <Stack spacing={3} justifyContent={'center'}>
        <Icons.ApMilizeLogo />
        {hasContact && (
          <Typography variant="note" sx={{ color: (theme) => theme.palette.text.main }}>
            お電話でのお問合せは
            <Typography
              component={'a'}
              href="tel:0120-609-861"
              variant="note"
              sx={{ fontWeight: 500, color: (theme) => theme.palette.primary.main, px: 1 }}
            >
              0120-609-861
            </Typography>
            まで
          </Typography>
        )}
        {hasContact && (
          <Typography variant="note" sx={{ color: (theme) => theme.palette.text.main }}>
            {`営業時間：10:00~19:00\n休業日　：火曜・水曜日及び年末年始`}
          </Typography>
        )}
        <Typography variant="note" color={'#0B1F65'} sx={{ opacity: 0.6 }}>
          © 2023 みらいバンク Inc.
        </Typography>
      </Stack>
    </Box>
  );
};
