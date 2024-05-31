import { AdAuthWrapper } from '@/containers';
import { Box, Typography } from '@mui/material';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { TOKEN_INVALID } from '@/constant';
import { useCurrSearchParams } from '@/hooks';
import { authAtom } from '@/store';
import { useResetRecoilState } from 'recoil';

export const AdAzureLogout = () => {
  const resetAuth = useResetRecoilState(authAtom);
  const unaccess = useCurrSearchParams().get('unaccess');
  useEffect(() => {
    const TOKEN_INVALID_LOCAL = localStorage.getItem('TOKEN_INVALID');
    if (TOKEN_INVALID_LOCAL) {
      toast.error(TOKEN_INVALID);
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const TOKEN_CHANGE = localStorage.getItem('TOKEN_CHANGE');
    if (TOKEN_CHANGE) {
      toast.error(TOKEN_INVALID);
      localStorage.removeItem('TOKEN_CHANGE');
    }
  }, []);

  useEffect(() => {
    resetAuth();
    if (unaccess) {
      localStorage.setItem('salesPersonUnaccess', 1);
    } else {
      localStorage.removeItem('salesPersonUnaccess');
    }
    localStorage.setItem('salesPersonType', 2);
  }, []);

  return (
    <AdAuthWrapper>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
        <Typography
          sx={{
            fontFamily: 'Hiragino Sans',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 30,
            lineHeight: '24px',
            letterSpacing: 1,
            color: unaccess ? '#E54E75' : null,
          }}
        >
          {unaccess ? 'AzureID認証のアクセス許可がありません。' : 'ログアウトしました。'}
        </Typography>
      </Box>
    </AdAuthWrapper>
  );
};
