import { Icons } from '@/assets';
import { ApLighterButton, ApModalWrapper, ApPageTitle, ApPrimaryButton, ApSecondaryButton } from '@/components';
import { ApLayout } from '@/containers';
import { useBoolean } from '@/hooks';
import { clearStorage } from '@/libs';
import { routeNames } from '@/router/settings';
import { apUnsubcribed } from '@/services';
import { authAtom, localApplication } from '@/store';
import { Box, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';

export const ApUnsubcribedPage = () => {
  const navigate = useNavigate();
  const resetAuth = useResetRecoilState(authAtom);
  const resetLocalApplicationInfo = useResetRecoilState(localApplication);
  const modal = useBoolean(false);
  const [warningText, setWarningText] = useState('');

  const handleUnsubcribed = useCallback(async () => {
    try {
      await apUnsubcribed();
      resetAuth();
      resetLocalApplicationInfo();
      clearStorage();
      modal.onTrue();
    } catch (error) {
      switch (error?.status) {
        default:
          setWarningText(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
      }
    }
  }, []);
  return (
    <ApLayout hasFooter hasMenu>
      <Stack alignItems={'center'} sx={{ pt: 6 }}>
        <Box
          sx={{
            px: 4,
            py: 3,
            width: 280,
            border: '1px solid',
            borderColor: (theme) => theme.palette.secondary.main,
            borderRadius: 2,
          }}
        >
          <Stack spacing={3} alignItems={'center'}>
            <Icons.ApWarningIcon />
            <Typography
              variant="radio_checkbox_button"
              sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'center', whiteSpace: 'break-spaces' }}
            >{`退会すると\nすべてのデータが削除され\n復元できません。`}</Typography>
          </Stack>
        </Box>
      </Stack>
      <ApPageTitle error={warningText}>{'本当に退会しますか？'}</ApPageTitle>
      <Stack justifyContent={'center'} alignItems={'center'} spacing={6}>
        <ApPrimaryButton
          endIcon={<Icons.ApForwardRightWhiteIcon />}
          onClick={() => navigate(routeNames.apTopPage.path)}
        >
          アカウントを維持する
        </ApPrimaryButton>
        <ApSecondaryButton endIcon={<Icons.ApForwardRightMainIcon />} onClick={handleUnsubcribed}>
          退会する
        </ApSecondaryButton>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'退会が完了しました'}>
        <Stack>
          <Stack spacing={6} alignItems={'center'}>
            <Typography variant="modal_label" sx={{ color: (theme) => theme.palette.text.main }}>
              {`ご利用ありがとうございました。\nまたのご利用をお待ちしております。`}
            </Typography>
            <ApLighterButton
              height={40}
              width={160}
              endIcon={<Icons.ApForwardRightMainIcon />}
              onClick={() => navigate(routeNames.apStartPage.path)}
            >
              とじる
            </ApLighterButton>
          </Stack>
        </Stack>
      </ApModalWrapper>
    </ApLayout>
  );
};
