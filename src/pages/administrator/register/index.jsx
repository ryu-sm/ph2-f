import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { AdAuthWrapper } from '@/containers';
import { Icons, adBackground, adLogoCompany } from '@/assets';
import { AdPwdInput } from '@/components/administrator';
import { useCurrSearchParams } from '@/hooks';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { apSalesPersonRegister, getRegisterOrgsWithCategory } from '@/services';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { setToken } from '@/libs';
import { authAtom } from '@/store';
import { useSetRecoilState } from 'recoil';
import { OrgsSelect } from './orgs-select';
import { API_500_ERROR } from '@/constant';

export const AdRegisterPage = () => {
  const navigate = useNavigate();
  const token = useCurrSearchParams().get('token');
  const [isValidToken, setIsValidToken] = useState(true);
  const setAuthInfo = useSetRecoilState(authAtom);
  const [warningText, setWarningText] = useState('');
  const [orgs, setOrgs] = useState([]);

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirm: '',
      s_sales_company_org_id: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { email } = jwtDecode(token);
        const data = {
          email: email,
          password: values.password,
          s_sales_company_org_id: values.s_sales_company_org_id,
        };
        const res = await apSalesPersonRegister(data);
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

          const timer = setTimeout(() => {
            navigate(routeNames.adSalesPersonDashboardPage.path, { replace: true });
          }, 500);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.log(error);
        switch (error?.status) {
          case 400:
            setWarningText('このメールアドレスは既に存在しています。別のメールアドレスで登録してください。');
            break;
          case 408:
            setWarningText('QRコードの提携会社情報が正しくありません。');
            break;
          case 407:
            setIsValidToken(false);
            break;
          default:
            toast.error('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });

  const pwdComplete = useMemo(() => {
    if (
      formik.values.password &&
      formik.values.password_confirm &&
      !formik.errors?.password &&
      !formik.errors?.password_confirm
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    formik.values.password,
    formik.values.password_confirm,
    formik.errors?.password,
    formik.errors?.password_confirm,
  ]);

  const fetchData = async (s_sales_company_org_id) => {
    try {
      const res = await getRegisterOrgsWithCategory(s_sales_company_org_id, 'C');

      setOrgs(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    try {
      const { exp, s_sales_company_org_id } = jwtDecode(token);
      if (exp * 1000 - Date.now() > 0) {
        fetchData(s_sales_company_org_id);
      }
      setIsValidToken(exp * 1000 - Date.now() > 0);
    } catch (error) {
      setIsValidToken(false);
    }
  }, [token]);

  return (
    <AdAuthWrapper bgImage={`url(${adBackground})`}>
      {pwdComplete && (
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

            <FormikProvider value={formik}>
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
                  disabled={formik.isSubmitting || !formik.values.s_sales_company_org_id}
                  onClick={() => formik.handleSubmit()}
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
      {!pwdComplete && (
        <Fragment>
          {isValidToken ? (
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
                  パスワード登録
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
                    <Typography variant="login_input">パスワード</Typography>
                    <AdPwdInput placeholder="入力してください" name="password" showPwdVerify={true} />
                  </Stack>
                  <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
                    <Typography variant="login_input">パスワード（確認用）</Typography>
                    <AdPwdInput placeholder="入力してください" name="password_confirm" />
                  </Stack>
                </FormikProvider>
                <Button
                  disabled={formik.isSubmitting}
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
                  onClick={() => formik.handleSubmit()}
                >
                  <Typography variant="login_button" color="primary.main">
                    登録する
                  </Typography>
                </Button>
              </Stack>
            </Box>
          ) : (
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
                  メールの有効期限が切れています
                </Typography>
                <Typography variant="annotation_02">
                  {`メール受信後、一定時間内での\n操作が確認できなかったため\n新規登録が完了しておりません。`}
                </Typography>
                <Typography variant="annotation_02" my={5}>
                  {`恐れ入りますが、\n再度、QRコードから新規登録の手続きを\nお願いいたします。`}
                </Typography>
              </Stack>
            </Box>
          )}
        </Fragment>
      )}
    </AdAuthWrapper>
  );
};
