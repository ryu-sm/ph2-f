import { AdAuthWrapper } from '@/containers';
import { Box, Typography } from '@mui/material';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { TOKEN_INVALID } from '@/constant';

export const AdAzureLogout = () => {
  useEffect(() => {
    const TOKEN_INVALID_LOCAL = localStorage.getItem('TOKEN_INVALID');
    if (TOKEN_INVALID_LOCAL) {
      toast.error(TOKEN_INVALID);
      localStorage.clear();
    }
  }, []);
  console.log(77878);
  return (
    <AdAuthWrapper>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
        <Typography
          sx={{
            fontFamily: 'Hiragino Sans',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 36,
            lineHeight: '24px',
            letterSpacing: 1,
          }}
        >
          ログアウトしました。
        </Typography>
      </Box>
    </AdAuthWrapper>
  );
};
