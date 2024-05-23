import { useEffect, useState } from 'react';
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
import { Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

import { routeNames } from '@/router/settings';
import { apGetDraft, apGetSendedApplication, apLogin } from '@/services';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationInitialValues, authAtom, localApplication } from '@/store';
import { useBoolean } from '@/hooks';
import { setToken } from '@/libs';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { TOKEN_INVALID } from '@/constant';

export const ApLoginPage = () => {
  const navigate = useNavigate();
  const setAuthInfo = useSetRecoilState(authAtom);
  const authInfo = useRecoilValue(authAtom);
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { apCurrStepId } = localApplicationInfo;
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
        // const token = localStorage.getItem('accessToken') || null;
        // if (token) {
        //   const { exp } = jwtDecode(token);
        //   if (exp * 1000 - Date.now() > 0) {
        //     window.location.reload();
        //     return;
        //   }
        // }

        const res = await apLogin({ email: values.email, password: values.password });

        const { access_token } = res.data;
        setToken(access_token);
        const payload = jwtDecode(access_token);

        setAuthInfo((pre) => {
          return {
            // ...pre,
            isLogined: true,
            roleType: payload?.role_type,
            user: {
              ...pre.user,
              id: payload?.id,
              email: payload?.email,
              salesCompanyOrgId: payload?.s_sales_company_org_id,
              displayPdf: Boolean(payload?.display_pdf),
              hasDraftData: Boolean(payload.has_draft),
            },
            salesPerson: {
              id: null,
              email: null,
              name: null,
            },
            manager: {
              id: null,
              email: null,
              name: null,
            },
            agentSended: Boolean(payload?.agent_sended),
          };
        });
        if (payload.has_draft) {
          const res = await apGetDraft();
          setLocalApplicationInfo((pre) => {
            return {
              ...pre,
              p_application_headers: {
                ...pre.p_application_headers,
                ...res.data.p_application_headers,
              },
              p_borrowing_details__1: {
                ...pre.p_borrowing_details__1,
                ...res.data.p_borrowing_details__1,
              },
              p_borrowing_details__2: {
                ...pre.p_borrowing_details__2,
                ...res.data.p_borrowing_details__2,
              },
              p_application_banks: res.data?.p_application_banks
                ? res.data?.p_application_banks
                : pre.p_application_banks,
              p_applicant_persons__0: {
                ...pre.p_applicant_persons__0,
                ...res.data.p_applicant_persons__0,
              },
              p_applicant_persons__1: {
                ...pre.p_applicant_persons__1,
                ...res.data.p_applicant_persons__1,
              },
              p_join_guarantors: res.data?.p_join_guarantors ? res.data.p_join_guarantors : pre.p_join_guarantors,
              p_residents: res.data?.p_residents ? res.data?.p_residents : pre.p_residents,
              p_borrowings: res.data?.p_borrowings ? res.data?.p_borrowings : pre.p_borrowings,
              apCurrStepId: res.data.apCurrStepId,
              isMCJ: res.data.p_application_banks?.length > 1,
              hasIncomeTotalizer:
                res.data.p_application_headers.loan_type === '3' || res.data.p_application_headers.loan_type === '4',
              hasJoinGuarantor: res.data.p_application_headers.join_guarantor_umu === '1',
              changeJoinGuarantor: false,
              changeToIncomeTotalizer: false,
              p_applicant_persons_a_agreement: true,
              p_applicant_persons_b_agreement: res.data.p_applicant_persons_b_agreement,
            };
          });

          modal.onTrue();
        }
        if (payload?.agent_sended) {
          const res = await apGetSendedApplication(payload?.id);
          setLocalApplicationInfo((pre) => {
            return {
              ...pre,
              p_application_headers: {
                ...applicationInitialValues.p_application_headers,
                ...res.data.p_application_headers,
              },
              p_borrowing_details__1: {
                ...applicationInitialValues.p_borrowing_details__1,
                ...res.data.p_borrowing_details__1,
              },
              p_borrowing_details__2: {
                ...applicationInitialValues.p_borrowing_details__2,
                ...res.data.p_borrowing_details__2,
              },
              p_application_banks: res.data.p_application_banks ? res.data.p_application_banks : [],
              p_applicant_persons__0: {
                ...applicationInitialValues.p_applicant_persons__0,
                ...res.data.p_applicant_persons__0,
              },
              p_applicant_persons__1: {
                ...applicationInitialValues.p_applicant_persons__1,
                ...res.data.p_applicant_persons__1,
              },
              p_join_guarantors: res.data.p_join_guarantors ? res.data.p_join_guarantors : [],
              p_residents: res.data.p_residents ? res.data.p_residents : [],
              p_borrowings: res.data.p_borrowings ? res.data.p_borrowings : [],
              apCurrStepId: 14,
              isMCJ: res.data.p_application_banks?.length > 1,
              hasIncomeTotalizer:
                res.data.p_application_headers.loan_type === '3' || res.data.p_application_headers.loan_type === '4',
              hasJoinGuarantor: res.data.p_application_headers.join_guarantor_umu === '1',
              changeJoinGuarantor: false,
              changeToIncomeTotalizer: false,
              p_applicant_persons_a_agreement: true,
              p_applicant_persons_b_agreement:
                res.data.p_application_headers.loan_type === '3' || res.data.p_application_headers.loan_type === '4'
                  ? true
                  : false,
            };
          });
          navigate(routeNames.apTopPage.path);
        }

        if (!payload.has_draft && !payload?.agent_sended) {
          navigate(routeNames.apAgreementPage.path);
        }
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

  useEffect(() => {
    const TOKEN_INVALID_LOCAL = localStorage.getItem('TOKEN_INVALID');
    if (TOKEN_INVALID_LOCAL) {
      toast.error(TOKEN_INVALID);
      localStorage.clear();
    }
  }, []);

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
