import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { ApWrapper } from '@/containers';
import { Icons, apBackground } from '@/assets';
import { ApPrimaryButton, ApSecondaryButton } from '@/components';
import { routeNames } from '@/router/settings';
import { useCurrSearchParams } from '@/hooks';
import { useEffect } from 'react';
import { setSalesCompanyOrgId } from '@/libs';
import { jwtDecode } from 'jwt-decode';

export const ApStartPage = () => {
  const navigate = useNavigate();
  const token = useCurrSearchParams().get('token');
  console.log(token);
  useEffect(() => {
    if (token) {
      console.log(token);
      const payload = jwtDecode(token);
      setSalesCompanyOrgId(payload?.s_sales_company_org_id);
    }
  }, [token]);
  return (
    <ApWrapper bgImage={`url(${apBackground})`}>
      <Stack height={'calc(100dvh - 158px)'} justifyContent={'center'} alignItems={'center'}>
        <Icons.ApStartLogo />
      </Stack>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={4}
        sx={{
          height: 158,
          bgcolor: 'white',
          boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <ApPrimaryButton
          endIcon={<Icons.ApForwardRightWhiteIcon />}
          onClick={() => navigate(routeNames.apRegisterVerifyEmailPage.path)}
        >
          新規登録
        </ApPrimaryButton>
        <ApSecondaryButton
          endIcon={<Icons.ApForwardRightMainIcon />}
          onClick={() => navigate(routeNames.apLoginPage.path)}
        >
          ログイン
        </ApSecondaryButton>
      </Stack>
    </ApWrapper>
  );
};
