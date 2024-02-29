import { AdLoginWrapper } from '@/containers/ad-layout/ad-login-wrapper';
import background from '@/assets/images/ad-background.png';
import logoCompany from '@/assets/images/logo-company.png';
import { Avatar, Box, Stack, Typography } from '@mui/material';
export const AdOrSpSendEmailPage = () => {
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
            メールを送信しました
          </Typography>
          <Typography variant="annotation_01">メールに記載されているURLにアクセスし</Typography>
          <Typography variant="annotation_01">パスワード再設定を完了してください。</Typography>
        </Stack>
      </Box>
    </AdLoginWrapper>
  );
};
