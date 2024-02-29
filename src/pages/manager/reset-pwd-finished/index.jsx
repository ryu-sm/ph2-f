import { AdLoginWrapper } from '@/containers/ad-layout/ad-login-wrapper';
import background from '@/assets/images/ad-background.png';
import logoCompany from '@/assets/images/logo-company.png';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsManager } from '@/hooks/use-is-manager';
import { Button } from '@mui/material';
export const ResetPwdFinishedPage = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const isManager = useIsManager(pathName);
  const handleReLogin = () => {
    if (isManager) {
      navigate('/manager/login');
    } else {
      navigate('agent/login');
    }
  };
  return (
    <AdLoginWrapper bgImage={`url(${background})`}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
        <Stack
          boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
          bgcolor={'white'}
          borderRadius={'5px'}
          width={'430px'}
          justifyContent={'center'}
          alignItems={'center'}
          p={10}
          spacing={5}
        >
          <Avatar src={logoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
          <Typography variant="login_title">パスワード再設定完了</Typography>
          <Stack>
            <Typography variant="annotation_01">パスワード再設定が完了しました。</Typography>
            <Typography variant="annotation_01">ログイン画面に戻りログインをしてください。</Typography>
          </Stack>
          <Button
            sx={{
              bgcolor: 'white',
              boxShadow: 'none',
              width: '200px',
              height: '36px',
              marginBottom: 5,
              borderRadius: '2px',
              minHeight: '36px',
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'white',
                border: '1px solid',
                borderColor: (theme) => theme.palette.primary.main,
                opacity: 0.8,
              },
            }}
            onClick={handleReLogin}
          >
            <Typography variant="login_button" color="primary.main">
              ログイン
            </Typography>
          </Button>
        </Stack>
      </Box>
    </AdLoginWrapper>
  );
};
