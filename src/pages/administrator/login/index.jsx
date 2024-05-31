import { AdAuthWrapper } from '@/containers';

import { useCurrSearchParams, useIsManager } from '@/hooks';

import { authAtom } from '@/store';
import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { validationSchema } from './validationSchema';
import { Icons, adBackground, adLogoCompany } from '@/assets';
import { AdEmailInput, AdPwdInput } from '@/components/administrator';
import {
  adManagerLogin,
  adSalesPersonAzureLogin,
  adSalesPersonLogin,
  apSalesPersonAzureRegister,
  getRegisterOrgsWithCategory,
} from '@/services';
import { setToken } from '@/libs';
import { jwtDecode } from 'jwt-decode';
import { routeNames } from '@/router/settings';
import { TERM_OF_SERVICE } from '@/configs';
import { toast } from 'react-toastify';
import { TOKEN_INVALID } from '@/constant';
import { OrgsSelect } from './orgs-select';

export const AdOrSpLoginPage = () => {
  const navigate = useNavigate();
  const isManager = useIsManager();
  const [warningText, setWarningText] = useState('');
  const [azureErrText, setAzureErrText] = useState('');
  const setAuthInfo = useSetRecoilState(authAtom);
  const authInfo = useRecoilValue(authAtom);
  const code = useCurrSearchParams().get('code');
  const [orgs, setOrgs] = useState([]);
  const [uploadOrg, setUploadOrg] = useState(false);

  const azureFormik = useFormik({
    initialValues: { s_sales_company_org_id: '', email: '', name: '' },
    onSubmit: async (values) => {
      const res = await apSalesPersonAzureRegister(values);
      if (res.status == 200) {
        const { access_token } = res.data;
        setToken(access_token);
        const payload = jwtDecode(access_token);
        setAuthInfo((pre) => {
          return {
            // ...pre,
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
              type: payload?.type,
            },
            manager: {
              id: null,
              email: null,
              name: null,
            },
            agentSended: false,
          };
        });
        localStorage.setItem('salesPersonType', payload?.type);
        localStorage.removeItem('salesPersonUnaccess');
        const timer = setTimeout(() => {
          navigate(routeNames.adSalesPersonDashboardPage.path, { replace: true });
        }, 500);
        return () => clearTimeout(timer);
      }
    },
  });

  const fetchData = async (s_sales_company_org_id) => {
    try {
      const res = await getRegisterOrgsWithCategory(s_sales_company_org_id, 'C');

      setOrgs(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    const azureID = async () => {
      if (code && !isManager) {
        try {
          const res = await adSalesPersonAzureLogin(code);
          if (res.status == 200) {
            const { access_token } = res.data;
            setToken(access_token);
            const payload = jwtDecode(access_token);
            setAuthInfo((pre) => {
              return {
                // ...pre,
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
                  type: payload?.type,
                },
                manager: {
                  id: null,
                  email: null,
                  name: null,
                },
                agentSended: false,
              };
            });
            localStorage.setItem('salesPersonType', payload?.type);
            localStorage.removeItem('salesPersonUnaccess');
            const timer = setTimeout(() => {
              navigate(routeNames.adSalesPersonDashboardPage.path, { replace: true });
            }, 500);
            return () => clearTimeout(timer);
          }
          if (res.status == 202) {
            azureFormik.setFieldValue('email', res.data.email);
            azureFormik.setFieldValue('name', res.data.name);
            fetchData(res.data.s_sales_company_org_id);
            setUploadOrg(true);
          }
        } catch (error) {
          console.log(error);
          switch (error?.status) {
            case 409:
              setAzureErrText(`AzureID認証のアクセス許可がありません。`);
              break;
            case 408:
              setAzureErrText(`エラーが発生しました。\nAzureADに登録されているメールアドレスを取得できません。`);
              break;
            default:
              setAzureErrText(
                `エラーが発生しました。\nAzureADからコードの有効期限が切れています。認証に失敗しました。`
              );
              break;
          }
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
              // ...pre,
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
          const timer = setTimeout(() => {
            navigate(routeNames.adManagerDashboardPage.path, { replace: true });
          }, 500);
          return () => clearTimeout(timer);
        } else {
          const res = await adSalesPersonLogin(values);
          const { access_token } = res.data;
          setToken(access_token);
          const payload = jwtDecode(access_token);
          setAuthInfo((pre) => {
            return {
              // ...pre,
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
                type: payload?.type,
              },
              manager: {
                id: null,
                email: null,
                name: null,
              },
              agentSended: false,
            };
          });
          localStorage.setItem('salesPersonType', payload?.type);
          localStorage.removeItem('salesPersonUnaccess');
          const timer = setTimeout(() => {
            navigate(routeNames.adSalesPersonDashboardPage.path, { replace: true });
          }, 500);
          return () => clearTimeout(timer);
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
      localStorage.removeItem('TOKEN_INVALID');
      localStorage.removeItem('auth');
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
    <AdAuthWrapper bgImage={!code || uploadOrg ? `url(${adBackground})` : 'none'}>
      {uploadOrg && !azureErrText && (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
          <Stack
            boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
            bgcolor={'white'}
            borderRadius={'5px'}
            width={'430px'}
            justifyContent={'center'}
            alignItems={'center'}
            py={10}
          >
            <Avatar src={adLogoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
            <Typography variant="login_title" my={5}>
              提携会社登録
            </Typography>

            <FormikProvider value={azureFormik}>
              <Stack alignItems={'center'} spacing={6}>
                <OrgsSelect name="s_sales_company_org_id" options={orgs} />
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
                  disabled={azureFormik.isSubmitting || !azureFormik.values.s_sales_company_org_id}
                  onClick={() => azureFormik.handleSubmit()}
                >
                  <Typography variant="login_button" color="primary.main">
                    登録する
                  </Typography>
                </Button>
              </Stack>
            </FormikProvider>
          </Stack>
        </Box>
      )}
      {!uploadOrg && (
        <Fragment>
          {!azureErrText ? (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
              {!code && (
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
              )}
            </Box>
          ) : (
            <Stack flex={1} alignItems={'center'} justifyContent={'center'} pt={'45dvh'}>
              <Typography variant="login_error" textAlign={'center'} lineHeight={'120%'} fontSize={30} fontWeight={500}>
                {azureErrText}
              </Typography>
              {azureErrText && azureErrText !== 'AzureID認証のアクセス許可がありません。' && (
                <Stack sx={{ mt: 12 }} direction={'row'} alignItems={'center'}>
                  <Typography
                    component={Link}
                    variant="login_footer_link"
                    color="primary.main"
                    fontWeight={600}
                    fontSize={18}
                    href={
                      'https://login.microsoftonline.com/1ddbf0d7-ff8d-4f3e-9f06-f00b74abd713/oauth2/v2.0/authorize?client_id=0f912bc0-78b0-4ef3-b6aa-8b8f268417c7&response_type=code&redirect_uri=https://mortgageloan-dev-ph2.milibank.co.jp/sales-person/login&scope=openid%20profile%20email%20User.read&response_mode=query'
                    }
                    sx={{ textDecorationLine: 'none' }}
                  >
                    再度AzureAD認証の手続きをお願いいたします。
                  </Typography>
                  <Icons.AdArrowRight sx={{ width: 22 }} />
                </Stack>
              )}
            </Stack>
          )}
        </Fragment>
      )}
    </AdAuthWrapper>
  );
};
