import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import {
  ApEmailInputField,
  ApItemGroup,
  ApModalWrapper,
  ApPageTitle,
  ApPrimaryButton,
  ApPwdInputField,
  ApSecondaryButton,
} from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validatior';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

import { routeNames } from '@/router/settings';
import { apApplication, apGetDraft, apLogin } from '@/services';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apCurrStepIdSelector, applicationAtom, authAtom } from '@/store';
import { useBoolean } from '@/hooks';
import { setToken } from '@/libs';
import { jwtDecode } from 'jwt-decode';

export const ApLoginPage = () => {
  const navigate = useNavigate();
  const setAuthInfo = useSetRecoilState(authAtom);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const apCurrStepId = useRecoilValue(apCurrStepIdSelector);
  const modal = useBoolean(false);
  const [warningText, setWarningText] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await apLogin({ email: values.email, password: values.password });
        console.log(res);
        const { access_token } = res.data;
        setToken(access_token);
        const payload = jwtDecode(access_token);
        console.log(payload);
        setAuthInfo((pre) => {
          return {
            ...pre,
            isLogined: true,
            roleType: payload?.role_type,
            applayType: 1,
            user: {
              ...pre.user,
              id: payload?.id,
              email: payload?.email,
              isFirstLogin: Boolean(payload?.first_login),
              salesCompanyOrgId: payload?.s_sales_company_org_id,
              preExaminationStatus: payload?.pre_examination_status,
              displayPdf: Boolean(payload?.display_pdf),
              hasDraftData: Boolean(payload.draft),
            },
            applyNo: payload?.apply_no,
            agentSended: Boolean(payload?.agent_sended),
          };
        });
        if (payload.has_draft) {
          const res = await apGetDraft();
          setApplicationInfo((pre) => {
            return {
              ...pre,
              ...res.data,
            };
          });

          modal.onTrue();
        }
        if (payload?.agent_sended) {
          const res = await apApplication(payload.apply_no);
          setApplicationInfo((pre) => {
            return {
              ...pre,
              ...res.data,
              apCurrStepId: 14,
            };
          });
          navigate(routeNames.apTopPage.path);
        }

        if (!payload.has_draft && !payload?.agent_sended) navigate(routeNames.apAgreementPage.path);
        // TODO:
      } catch (error) {
        console.log(error);
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

  return (
    <FormikProvider value={formik}>
      <ApLayout hasFooter>
        <ApPageTitle error={warningText}>{`ログイン`}</ApPageTitle>
        <ApItemGroup label={'メールアドレス'}>
          <ApEmailInputField
            name={'email'}
            placeholder={'例：sample@sample.co.jp'}
            onFocus={() => setWarningText('')}
          />
        </ApItemGroup>
        <ApItemGroup label={'パスワード'}>
          <ApPwdInputField name={'password'} onFocus={() => setWarningText('')} />
        </ApItemGroup>
        <Stack spacing={6}>
          <Stack alignItems={'center'}>
            <ApPrimaryButton
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            >
              ログイン
            </ApPrimaryButton>
          </Stack>
          <Stack
            spacing={2}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(routeNames.apResetPasswordVerifyEmailPage.path)}
          >
            <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
              パスワードをお忘れの方
            </Typography>
            <Icons.ApForwardRightRadioOutlineIcon />
          </Stack>

          <Stack alignItems={'center'}>
            <ApSecondaryButton onClick={() => navigate(routeNames.apRegisterVerifyEmailPage.path)}>
              初めての方は会員登録
            </ApSecondaryButton>
          </Stack>
        </Stack>
        <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'おかえりなさい'}>
          <Stack justifyContent={'center'} alignItems={'center'} spacing={6}>
            <ApPrimaryButton
              width={260}
              height={40}
              endIcon={<Icons.ApForwardRightWhiteIcon />}
              onClick={() => navigate(`/step-id-${apCurrStepId}`)}
            >
              前回の続きから入力する
            </ApPrimaryButton>
            <ApSecondaryButton
              width={260}
              height={40}
              endIcon={<Icons.ApForwardRightMainIcon />}
              onClick={() => navigate(routeNames.apTopPage.path)}
            >
              TOPへ
            </ApSecondaryButton>
          </Stack>
        </ApModalWrapper>
      </ApLayout>
    </FormikProvider>
  );
};
