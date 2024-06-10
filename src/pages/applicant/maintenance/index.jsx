import { maintenanceInfo } from '@/configs';
import { Stack, Typography } from '@mui/material';

export const MaintenancePage = () => {
  return (
    <Stack minHeight={'90dvh'} alignItems={'center'} justifyContent={'center'}>
      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'Hiragino Sans',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 30,
          lineHeight: '130%',
          letterSpacing: 1,
          whiteSpace: 'break-spaces',
          // color: unaccess ? '#E54E75' : null,
        }}
      >
        {maintenanceInfo}
      </Typography>
    </Stack>
  );
};
