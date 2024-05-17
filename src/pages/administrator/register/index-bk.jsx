import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { AdAuthWrapper } from '@/containers';
import { Icons, adBackground, adLogoCompany } from '@/assets';
import { AdFieldInput, AdPwdInput } from '@/components/administrator';
import { useCurrSearchParams } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { apSalesPersonRegister } from '@/services';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { setToken } from '@/libs';
import { authAtom } from '@/store';
import { useSetRecoilState } from 'recoil';

export const AdRegisterPage = () => {
  const navigate = useNavigate();
  const token = useCurrSearchParams().get('token');
  const [isValidToken, setIsValidToken] = useState(true);
  const setAuthInfo = useSetRecoilState(authAtom);
  const [warningText, setWarningText] = useState('');
  console.log(jwtDecode(token));
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirm: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = {
          password: values.password,
          token: token,
        };
        const res = await apSalesPersonRegister(data);
        if (res.status == 202) {
          navigate(`${routeNames.adSalesPersonUpdateOrg.path}?sales_person_id=${res.data?.sales_person_id}`);
        }
        return;
      } catch (error) {
        console.log(error);
        switch (error?.status) {
          case 400:
            setWarningText('このメールアドレスは既に存在しています。別のメールアドレスで登録してください。');
            break;
          case 408:
            setWarningText('QRコードの連携会社情報が正しくありません。');
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
    </AdAuthWrapper>
  );
};
