import { AdLoginWrapper } from '@/containers/ad-layout/ad-login-wrapper';
import background from '@/assets/images/ad-background.png';
import logoCompany from '@/assets/images/logo-company.png';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsManager } from '@/hooks/use-is-manager';
export const AdOrSpEmailExpiredPage = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  const handleResetPwd = () => {
    if (isManager) {
      navigate('/manager/reset-password');
    } else {
      navigate('/agent/reset-password');
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
        >
          <Avatar src={logoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
          <Typography variant="login_title" my={5}>
            メールの有効期限が切れています
          </Typography>
          <Typography variant="annotation_02">
            メール受信後、一定時間内での
            <br />
            操作が確認できなかったため
            <br />
            パスワードの再設定に失敗しました
            <br />
          </Typography>
          <Typography variant="annotation_02" my={5}>
            恐れ入りますが、
            <br />
            再度パスワード再設定の手続きを
            <br />
            お願いいたします。
            <br />
          </Typography>
          <Button
            sx={{
              bgcolor: 'white',
              boxShadow: 'none',
              width: '200px',
              height: '36px',
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
            onClick={handleResetPwd}
          >
            <Typography variant="login_button" color="primary.main">
              パスワードの再設定はこちら
            </Typography>
          </Button>
        </Stack>
      </Box>
    </AdLoginWrapper>
  );
};
