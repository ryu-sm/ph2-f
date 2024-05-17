import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { useCurrSearchParams } from '@/hooks';
import { Icons, adBackground, adLogoCompany } from '@/assets';
import { AdEmailInput } from '@/components/administrator';
import { AdAuthWrapper } from '@/containers';
import { useEffect, useState } from 'react';
import { apSalesPersonRegisterVerifyEmail } from '@/services';
import { toast } from 'react-toastify';

import { jwtDecode } from 'jwt-decode';
import { TERM_OF_SERVICE } from '@/configs';
import { routeNames } from '@/router/settings';
import { API_500_ERROR } from '@/constant';

export const AdRegisterVerifyEmailPage = () => {
  const [sended, setSended] = useState(false);
  const [warningText, setWarningText] = useState('');
  const token = useCurrSearchParams().get('token');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = jwtDecode(token);
        await apSalesPersonRegisterVerifyEmail({
          email: values.email,
          s_sales_company_org_id: payload?.s_sales_company_org_id,
        });
        setSended(true);
      } catch (error) {
        switch (error?.status) {
          case 400:
            setWarningText('このメールアドレスは既に存在しています。別のメールアドレスで登録してください。');
            break;
          default:
            toast.error(API_500_ERROR);
        }
      }
    },
  });

  const [isValidToken, setIsValidToken] = useState(true);
  useEffect(() => {
    try {
      const { exp } = jwtDecode(token);
      setIsValidToken(exp * 1000 - Date.now() > 0);
    } catch (error) {
      setIsValidToken(false);
    }
  }, [token]);

  return (
    <AdAuthWrapper bgImage={`url(${adBackground})`}>
      {!isValidToken && (
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
              QRコードが正しくありません
            </Typography>
            <Typography
              variant="annotation_02"
              color={'secondary.main'}
            >{`QRコードが間違っているため登録が完了できません。`}</Typography>
          </Stack>
        </Box>
      )}
      {!sended && isValidToken ? (
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
              新規登録
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
              <Stack alignItems={'flex-start'} width={'100%'} mb={10}>
                <Typography variant="login_input">メールアドレス</Typography>
                <AdEmailInput placeholder="入力してください" name="email" />
                <Typography variant="annotation_01" textAlign={'left'} mt={10}>
                  {`※入力したメールアドレス宛に仮登録メールが届きます。\nメール受信制限をされている方は info@milibank.co.jp\nからのメール受信を許可してください。`}
                </Typography>
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
            <Stack sx={{ mt: 6 }} direction={'row'} alignItems={'center'}>
              <Typography
                component={Link}
                variant="login_footer_link"
                color="primary.main"
                fontWeight={700}
                href={routeNames.adSalesPersonLoginPage.path}
                sx={{ textDecorationLine: 'none' }}
              >
                既にアカウントをお持ちの方
              </Typography>
              <Icons.AdArrowRight sx={{ width: 17 }} />
            </Stack>
            <Stack sx={{ mt: 6 }}>
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
              メールを送信しました
            </Typography>
            <Typography variant="annotation_01">メールに記載されている</Typography>
            <Typography variant="annotation_01">URLにアクセスし</Typography>
            <Typography variant="annotation_01">新規登録を完了してください。</Typography>
          </Stack>
        </Box>
      )}
    </AdAuthWrapper>
  );
};
