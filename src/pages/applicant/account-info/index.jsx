import { Icons } from '@/assets';
import { ApItemGroup, ApPageTitle } from '@/components';
import { ApLayout } from '@/containers';
import { routeNames } from '@/router/settings';
import { userEmailSelector } from '@/store';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const ApAccountInformationPage = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailSelector);
  return (
    <ApLayout hasFooter hasMenu>
      <ApPageTitle>アカウント情報</ApPageTitle>
      <ApItemGroup label={'メールアドレス'}>
        <Stack spacing={3}>
          <Stack
            justifyContent={'center'}
            sx={{
              p: 4,
              height: 48,
              fontFamily: 'Hiragino Sans',
              fontSize: 14,
              fontWeight: 300,
              lineHeight: '150%',
              fontStyle: 'normal',
              letterSpacing: 0.4,
              borderRadius: 1,
              color: (theme) => theme.palette.text.main,
              backgroundColor: (theme) => theme.palette.gray[100],
            }}
          >
            {userEmail}
          </Stack>
          <Stack
            spacing={2}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'end'}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(routeNames.apChangeEmailVerifyEmailPage.path)}
          >
            <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
              変更する
            </Typography>
            <Icons.ApForwardRightRadioOutlineIcon />
          </Stack>
        </Stack>
      </ApItemGroup>
      <ApItemGroup label={'パスワード'}>
        <Stack spacing={3}>
          <Stack
            justifyContent={'center'}
            sx={{
              p: 4,
              height: 48,
              fontFamily: 'Hiragino Sans',
              fontSize: 14,
              fontWeight: 300,
              lineHeight: '150%',
              fontStyle: 'normal',
              letterSpacing: 0.4,
              borderRadius: 1,
              color: (theme) => theme.palette.text.main,
              backgroundColor: (theme) => theme.palette.gray[100],
            }}
          >
            {'＊＊＊＊＊＊＊＊＊＊＊'}
          </Stack>
          <Stack
            spacing={2}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'end'}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(routeNames.apUpdatePasswordPage.path)}
          >
            <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
              変更する
            </Typography>
            <Icons.ApForwardRightRadioOutlineIcon />
          </Stack>
        </Stack>
      </ApItemGroup>
      <ApItemGroup label={'退会をご希望の方へ'}>
        <Stack spacing={3}>
          <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
            {
              '退会すると、ご登録いただいた全てのデータを閲覧できなくなります。一度退会するとデータを復元することはできませんのでご注意ください。'
            }
          </Typography>
          <Stack
            spacing={2}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'end'}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(routeNames.apUnsubcribedPage.path)}
          >
            <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
              退会する
            </Typography>
            <Icons.ApForwardRightRadioOutlineIcon />
          </Stack>
        </Stack>
      </ApItemGroup>
    </ApLayout>
  );
};
