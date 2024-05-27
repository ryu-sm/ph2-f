import { AdAuthWrapper } from '@/containers';

import { useCurrSearchParams, useIsManager } from '@/hooks';

import { authAtom } from '@/store';
import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { validationSchema } from './validationSchema';
import { Icons, adBackground, adLogoCompany } from '@/assets';
import { AdEmailInput, AdPwdInput } from '@/components/administrator';
import { adManagerLogin, adSalesPersonAzureLogin, adSalesPersonLogin } from '@/services';
import { setToken } from '@/libs';
import { jwtDecode } from 'jwt-decode';
import { routeNames } from '@/router/settings';
import { TERM_OF_SERVICE } from '@/configs';
import { toast } from 'react-toastify';
import { TOKEN_INVALID } from '@/constant';

export const AdOrSpLoginPage = () => {
  const navigate = useNavigate();
  const isManager = useIsManager();
  const [warningText, setWarningText] = useState('');
  const [azureErrText, setAzureErrText] = useState('');
  const setAuthInfo = useSetRecoilState(authAtom);
  const code = useCurrSearchParams().get('code');

  useEffect(() => {
    const azureID = async () => {
      if (code && !isManager) {
        const res = await adSalesPersonAzureLogin(code);
        if (res.status == 200) {
          const { access_token } = res.data;
          setToken(access_token);
          const payload = jwtDecode(access_token);
          setAuthInfo((pre) => {
            return {
              ...pre,
              isLogined: true,
              roleType: payload?.role_type,
              user: {
                id: null,
                email: null,
                salesCompanyOrgId: null,
                displayPdf: true,
                hasDraftData: false,
                provisionalResult: null,
              },
              salesPerson: {
                id: payload?.id,
                email: payload?.email,
                name: payload?.name_kanji,
              },
              manager: {
                id: null,
                email: null,
                name: null,
              },
              agentSended: false,
            };
          });

          navigate(routeNames.adSalesPersonDashboardPage.path);
        }
        if (res.status == 202) {
          navigate(`${routeNames.adSalesPersonUpdateOrg.path}?sales_person_id=${res.data?.sales_person_id}`);
        }
      }
    };

    azureID();
  }, [code, isManager]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        if (isManager) {
          const res = await adManagerLogin(values);
          const { access_token } = res.data;
          setToken(access_token);
          const payload = jwtDecode(access_token);
          setAuthInfo((pre) => {
            return {
              ...pre,
              isLogined: true,
              roleType: payload?.role_type,
              user: {
                id: null,
                email: null,
                salesCompanyOrgId: null,
                displayPdf: true,
                hasDraftData: false,
                provisionalResult: null,
              },
              salesPerson: {
                id: null,
                email: null,
                name: null,
              },
              manager: {
                id: payload?.id,
                email: payload?.email,
                name: payload?.name_kanji,
              },
              agentSended: false,
            };
          });
        } else {
          const res = await adSalesPersonLogin(values);
          const { access_token } = res.data;
          setToken(access_token);
          const payload = jwtDecode(access_token);
          setAuthInfo((pre) => {
            return {
              ...pre,
              isLogined: true,
              roleType: payload?.role_type,
              user: {
                id: null,
                email: null,
                salesCompanyOrgId: null,
                displayPdf: true,
                hasDraftData: false,
                provisionalResult: null,
              },
              salesPerson: {
                id: payload?.id,
                email: payload?.email,
                name: payload?.name_kanji,
              },
              manager: {
                id: null,
                email: null,
                name: null,
              },
              agentSended: false,
            };
          });
          navigate(routeNames.adSalesPersonDashboardPage.path);
        }
      } catch (error) {
        switch (error?.status) {
          case 400:
            setWarningText('メールアドレスまたはパスワードが正しくありません。');
            break;
          case 423:
            setWarningText(
              `ログイン失敗でアカウントがロックされました。\nアカウントロックの解除は、ログイン画面の「パスワードを忘れた方はこちらから設定をお願いします」からお進みください。`
            );
            break;
          case 407:
            setAzureErrText(`エラーが発生しました。\nAzureADに登録されているメールアドレスを取得できません。`);
            break;
          default:
            setWarningText('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });

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

  return (
    <AdAuthWrapper bgImage={`url(${adBackground})`}>
      {!azureErrText ? (
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
            <Avatar src={adLogoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
            <Typography variant="login_title" my={5}>
              ログイン
            </Typography>
            {warningText && (
              <Stack my={5} direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <Box minWidth={16}>
                  <Icons.AdCircleNotice />
                </Box>
                <Typography variant="login_error">{warningText}</Typography>
              </Stack>
            )}

            <FormikProvider value={formik}>
              <Stack alignItems={'flex-start'} width={'100%'} mb={4}>
                <Typography variant="login_input">メールアドレス</Typography>
                <AdEmailInput placeholder="入力してください" name="email" />
              </Stack>
              <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
                <Typography variant="login_input">パスワード</Typography>
                <AdPwdInput placeholder="入力してください" name="password" />
              </Stack>
            </FormikProvider>
            <Button
              disabled={formik.isSubmitting}
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
              onClick={() => formik.handleSubmit()}
            >
              <Typography variant="login_button" color="primary.main">
                ログイン
              </Typography>
            </Button>

            <Typography variant="login_footer">
              パスワードを忘れた方はこ
              <Typography
                variant="login_footer_link"
                color="primary.main"
                onClick={() => {
                  isManager
                    ? navigate(routeNames.adManagerResetPasswordVerifyEmailPage.path)
                    : navigate(routeNames.adSalesPersonResetPasswordVerifyEmailPage.path);
                }}
              >
                ちらから再設定
              </Typography>
              をお願いします
            </Typography>

            {!isManager && (
              <Stack sx={{ mt: 2 }}>
                <Typography
                  component={Link}
                  variant="login_footer_link"
                  color="primary.main"
                  fontWeight={700}
                  target="_blank"
                  href={TERM_OF_SERVICE}
                  sx={{ textDecorationLine: 'none' }}
                >
                  利用規約
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      ) : (
        <Stack flex={1} alignItems={'center'} justifyContent={'center'} pt={'45dvh'}>
          <Typography variant="login_error" textAlign={'center'} lineHeight={'120%'} fontSize={30} fontWeight={500}>
            {azureErrText}
          </Typography>
        </Stack>
      )}
    </AdAuthWrapper>
  );
};
