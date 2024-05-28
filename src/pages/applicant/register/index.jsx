import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import {
  ApItemGroup,
  ApModalWrapper,
  ApNotifyTitle,
  ApPageTitle,
  ApPrimaryButton,
  ApPwdInputField,
} from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validationSchema';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { routeNames } from '@/router/settings';
import { useBoolean, useCurrSearchParams } from '@/hooks';
import { apRegister } from '@/services';
import { setToken } from '@/libs';
import { jwtDecode } from 'jwt-decode';
import { authAtom } from '@/store';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';

export const ApRegisterPage = () => {
  const navigate = useNavigate();
  const setAuthInfo = useSetRecoilState(authAtom);
  const token = useCurrSearchParams().get('token');

  const modal = useBoolean(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await apRegister({ password: values.password, token: token });
        const { access_token } = res.data;
        setToken(access_token);
        const payload = jwtDecode(access_token);
        setAuthInfo((pre) => {
          return {
            ...pre,
            isLogined: true,
            user: {
              ...pre.user,
              id: payload?.id,
              email: payload?.email,
              salesCompanyOrgId: payload?.s_sales_company_org_id,
              displayPdf: Boolean(payload?.display_pdf),
            },
            agentSended: Boolean(payload?.agent_sended),
          };
        });
        modal.onTrue();
      } catch (error) {
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
            console.log(error);
          // toast.error(API_500_ERROR);
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
    <FormikProvider value={formik}>
      {isValidToken ? (
        <ApLayout hasFooter>
          <ApPageTitle error={warningText}>{`パスワード登録`}</ApPageTitle>
          <ApItemGroup label={'パスワード'}>
            <ApPwdInputField name={'password'} onFocus={() => setWarningText('')} showPwdPower />
          </ApItemGroup>
          <ApItemGroup label={'パスワード（確認用）'}>
            <ApPwdInputField name={'password_confirm'} onFocus={() => setWarningText('')} />
          </ApItemGroup>
          <Stack alignItems={'center'}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              登録する
            </ApPrimaryButton>
          </Stack>
          <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={`新規登録完了`}>
            <Typography variant="modal_label">{`新規登録が完了しました。\n早速サービスをご利用ください。`}</Typography>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              width={260}
              height={40}
              onClick={() => navigate(routeNames.apAgreementPage.path)}
            >
              次へ
            </ApPrimaryButton>
          </ApModalWrapper>
        </ApLayout>
      ) : (
        <ApLayout hasFooter>
          <ApNotifyTitle icon={<Icons.ApNotifyWaringIcon />} label={`メールの有効期限が\n切れています`} />
          <Stack alignItems={'center'} sx={{ px: 8 }}>
            <Box sx={{ p: 6, width: 1, textAlign: 'center', bgcolor: 'white', borderRadius: '14px' }}>
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`メール受信後、一定時間内での\n操作が確認できなかったため\n新規登録が完了しておりません。`}
              </Typography>
              <br />
              <br />
              <Typography variant="notify" sx={{ color: (theme) => theme.palette.text.main }}>
                {`恐れ入りますが、\n再度、新規登録の手続きを\nお願いいたします。`}
              </Typography>
            </Box>
          </Stack>
          <Stack alignItems={'center'} sx={{ pt: 6 }}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={() => navigate(routeNames.apRegisterVerifyEmailPage.path)}
            >
              新規登録はこちら
            </ApPrimaryButton>
          </Stack>
        </ApLayout>
      )}
    </FormikProvider>
  );
};
