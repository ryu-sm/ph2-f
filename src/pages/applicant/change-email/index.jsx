import { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApNotifyTitle, ApPrimaryButton } from '@/components';
import { ApLayout } from '@/containers';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { routeNames } from '@/router/settings';
import { useCurrSearchParams } from '@/hooks';
import { jwtDecode } from 'jwt-decode';
import { apChangeEmail } from '@/services';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '@/store';

export const ApChangeEmailPage = () => {
  const navigate = useNavigate();
  const setAuthInfo = useSetRecoilState(authAtom);
  const token = useCurrSearchParams().get('token');

  const [isValidToken, setIsValidToken] = useState(true);

  const comfirmChangeEmail = useCallback(async (new_email) => {
    try {
      await apChangeEmail({ token });
      setAuthInfo((pre) => {
        return {
          ...pre,
          user: {
            ...pre.user,
            email: new_email,
          },
        };
      });
    } catch (error) {
      setIsValidToken(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
    }
    if (!!token) {
      const { exp, new_email } = jwtDecode(token);
      if (exp * 1000 - Date.now() < 0) return setIsValidToken(false);
      comfirmChangeEmail(new_email);
    }
  }, [token]);
  return (
    <Fragment>
      {isValidToken ? (
        <ApLayout hasFooter>
          <ApNotifyTitle icon={<Icons.ApSmileIcon />} label={`メールアドレス変更完了`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メールアドレスの変更が完了しました。\n変更後のメールアドレスで再度ログインして\n引き続きご利用ください。`}
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems={'center'} sx={{ pt: 6 }}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={() => navigate(routeNames.apLoginPage.path)}
            >
              ログイン
            </ApPrimaryButton>
          </Stack>
        </ApLayout>
      ) : (
        <ApLayout hasFooter>
          <ApNotifyTitle icon={<Icons.ApNotifyWaringIcon />} label={`メールの有効期限が\n切れています`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メール受信後、一定時間内での\n操作が確認できなかったため\nメールアドレス変更が完了しておりません。`}
              </Typography>
              <br />
              <br />
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`恐れ入りますが、\n再度、メールアドレス変更の手続きを\nお願いいたします。`}
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems={'center'} sx={{ pt: 6 }}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={() => navigate(routeNames.apChangeEmailVerifyEmailPage.path)}
            >
              メールアドレス変更はこちら
            </ApPrimaryButton>
          </Stack>
        </ApLayout>
      )}
    </Fragment>
  );
};
