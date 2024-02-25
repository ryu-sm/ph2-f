import { Stack, Typography } from '@mui/material';

export const ApConfirmGroup = ({ children, stepIndex, label, ...props }) => {
  return (
    <Stack>
      <Stack
        sx={{
          pt: '5px',
          pb: '6px',
          px: 4,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Stack direction={'row'} alignItems={'end'}>
          {stepIndex && (
            <Stack direction={'row'} alignItems={'end'} spacing={'2px'}>
              <Typography
                sx={{
                  fontFamily: 'Barlow',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '100%',
                }}
              >
                STEP
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Barlow',
                  fontSize: 18,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '100%',
                }}
              >
                {stepIndex}
              </Typography>
            </Stack>
          )}
          {label && (
            <Typography variant="form_item_label" lineHeight={'100%'}>
              {label}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack sx={{ pb: 8 }}>{children}</Stack>
    </Stack>
  );
};
