import { ApConfirmGroup, ApConfirmItemGroup, ApPageTitle, ApSignatureBoard } from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import {
  apNextStepIdSelector,
  apPreStepIdSelector,
  applicationAtom,
  applicationInitialValues,
  authAtom,
  hasIncomeTotalizerSelector,
  hasJoinGuarantorSelector,
  roleTypeSelector,
} from '@/store';
import { formatJapanDate } from '@/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ApStep01Info } from '../step-01/step-01-info';
import { ApStep02Info } from '../step-02/step-02-info';
import { ApStep03Info } from '../step-03/step-03-info';
import { ApStep04Info } from '../step-04/step-04-info';
import { ApStep05Info } from '../step-05/step-05-info';
import { ApStep06Info } from '../step-06/step-06-info';
import { ApStep07Info } from '../step-07/step-07-info';
import { ApStep08Info } from '../step-08/step-08-info';
import { ApStep09Info } from '../step-09/step-09-info';
import { ApStep10Info } from '../step-10/step-10-info';
import { ApStep11Info } from '../step-11/step-11-info';
import { ApStep12Info } from '../step-12/step-12-info';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Box, Stack, Typography } from '@mui/material';
import { apAgentSend, apApplication } from '@/services';
import { Icons } from '@/assets';
import { useBoolean, useIsSalesPerson } from '@/hooks';
import { routeNames } from '@/router/settings';

export const ApStep13Page = () => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const hasJoinGuarantor = useRecoilValue(hasJoinGuarantorSelector);
  const hasIncomeTotalizer = useRecoilValue(hasIncomeTotalizerSelector);
  const application = useRecoilValue(applicationAtom);
  const setAuthInfo = useSetRecoilState(authAtom);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const roleType = useRecoilValue(roleTypeSelector);
  const showError = useBoolean(false);
  const apSteps = useMemo(
    () => [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 4,
            },
            {
              id: 5,
            },
          ]
        : []),
      ...(hasJoinGuarantor
        ? [
            {
              id: 6,
            },
          ]
        : []),
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 10,
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 11,
            },
          ]
        : []),
      {
        id: 12,
      },
      {
        id: 13,
      },
      {
        id: 14,
      },
    ],
    [hasIncomeTotalizer, hasJoinGuarantor]
  );

  const getIndex = useCallback(
    (id) => {
      return apSteps.findIndex((item) => item.id === id);
    },
    [apSteps]
  );

  const errorMsgRef = useRef(null);

  useEffect(() => {
    if (errorMsgRef.current) {
      errorMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errorMsgRef.current]);

  const initialValues = {
    p_uploaded_files: {
      S: application.p_uploaded_files.S,
    },
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        if (errorMsg.length > 0) {
          showError.onTrue();
          return;
        }
        const sendRes = await apAgentSend({
          ...applicationInitialValues,

          p_uploaded_files: {
            ...applicationInitialValues.p_uploaded_files,
            ...application.p_uploaded_files,
            S: values.p_uploaded_files.S,
          },
          p_application_headers: {
            ...applicationInitialValues.p_application_headers,
            ...application.p_application_headers,
          },
          p_borrowing_details__1: {
            ...applicationInitialValues.p_borrowing_details__1,
            ...application.p_borrowing_details__1,
          },
          p_borrowing_details__2: {
            ...applicationInitialValues.p_borrowing_details__2,
            ...application.p_borrowing_details__2,
          },
          p_application_banks: application.p_application_banks,
          p_applicant_persons__0: {
            ...applicationInitialValues.p_applicant_persons__0,
            ...application.p_applicant_persons__0,
          },
          p_applicant_persons__1: {
            ...applicationInitialValues.p_applicant_persons__1,
            ...application.p_applicant_persons__1,
          },
          p_join_guarantors: application.p_join_guarantors,
          p_residents: application.p_residents,
          p_borrowings: application.p_borrowings,
        });
        if (isSalesPerson) {
          return navigate(routeNames.adSalesPersonDashboardPage.path);
        }
        setAuthInfo((pre) => {
          return {
            ...pre,
            applyNo: sendRes.data?.apply_no,
            agentSended: true,
          };
        });
        const infoRes = await apApplication(sendRes.data?.apply_no);
        setApplicationInfo((pre) => {
          return {
            ...pre,
            ...infoRes.data,
          };
        });
        navigate(`/step-id-${apNextStepId}`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handelLeft = () => {
    navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apPreStepId}`);
  };

  const errorMsg = useMemo(() => {
    const tempMsg = [];
    if (application.p_applicant_persons__0.identity_verification_type === '1') {
      if (
        application.p_uploaded_files.p_applicant_persons__0__A__01__a.length === 0 ||
        application.p_uploaded_files.p_applicant_persons__0__A__01__b.length === 0
      ) {
        tempMsg.push('本人確認書類');
      }
    }
    if (application.p_applicant_persons__0.identity_verification_type === '2') {
      if (application.p_uploaded_files.p_applicant_persons__0__A__02.length === 0) {
        tempMsg.push('本人確認書類');
      }
    }
    if (application.p_applicant_persons__0.identity_verification_type === '3') {
      if (
        application.p_uploaded_files.p_applicant_persons__0__A__03__a.length === 0 ||
        application.p_uploaded_files.p_applicant_persons__0__A__03__b.length === 0
      ) {
        tempMsg.push('本人確認書類');
      }
    }

    if (application.hasIncomeTotalizer) {
      if (application.p_applicant_persons__1.identity_verification_type === '1') {
        if (
          application.p_uploaded_files.p_applicant_persons__1__A__01__a.length === 0 ||
          application.p_uploaded_files.p_applicant_persons__1__A__01__b.length === 0
        ) {
          tempMsg.push('収入合算者の本人確認書類');
        }
      }
      if (application.p_applicant_persons__1.identity_verification_type === '2') {
        if (application.p_uploaded_files.p_applicant_persons__1__A__02.length === 0) {
          tempMsg.push('収入合算者の本人確認書類');
        }
      }
      if (application.p_applicant_persons__1.identity_verification_type === '3') {
        if (
          application.p_uploaded_files.p_applicant_persons__1__A__03__a.length === 0 ||
          application.p_uploaded_files.p_applicant_persons__1__A__03__b.length === 0
        ) {
          tempMsg.push('収入合算者の本人確認書類');
        }
      }
    }

    if (application.p_applicant_persons__0.nationality === '2') {
      if (
        application.p_uploaded_files.p_applicant_persons__0__H__a.length === 0 ||
        application.p_uploaded_files.p_applicant_persons__0__H__b.length === 0
      ) {
        tempMsg.push('〈現在の国籍〉在留カードまたは特別永住者証明書を添付してください');
      }
    }
    if (application.p_applicant_persons__1.nationality === '2') {
      if (application.hasIncomeTotalizer) {
        if (
          application.p_uploaded_files.p_applicant_persons__1__H__a.length === 0 ||
          application.p_uploaded_files.p_applicant_persons__1__H__b.length === 0
        ) {
          tempMsg.push('収入合算者の〈現在の国籍〉在留カードまたは特別永住者証明書を添付してください');
        }
      }
    }

    if (roleType === 2) {
      if (formik.values.p_uploaded_files.S.length === 0) {
        tempMsg.push('サインをしてください');
      }
    }

    return tempMsg;
  }, [application]);

  return (
    <FormikProvider value={formik}>
      <ApLayout
        hasMenu
        hasStepBar
        bottomContent={<ApStepFooter left={handelLeft} right={formik.handleSubmit} rightLabel={'仮審査を申し込む'} />}
      >
        <ApPageTitle py={8}>{`最後に内容を確認し\nお申込を完了させましょう。`}</ApPageTitle>
        <ApConfirmGroup label={'はじめに'}>
          <ApConfirmItemGroup label={'同意日'}>
            {application.p_application_headers.apply_date
              ? formatJapanDate(application.p_application_headers.apply_date, true)
              : 'ー'}
          </ApConfirmItemGroup>
        </ApConfirmGroup>
        {getIndex(1) >= 0 && <ApStep01Info stepIndex={String(getIndex(1) + 1).padStart(2, '0')} />}
        {getIndex(2) >= 0 && <ApStep02Info stepIndex={String(getIndex(2) + 1).padStart(2, '0')} />}
        {getIndex(3) >= 0 && <ApStep03Info stepIndex={String(getIndex(3) + 1).padStart(2, '0')} />}
        {getIndex(4) >= 0 && <ApStep04Info stepIndex={String(getIndex(4) + 1).padStart(2, '0')} />}
        {getIndex(5) >= 0 && <ApStep05Info stepIndex={String(getIndex(5) + 1).padStart(2, '0')} />}
        {getIndex(6) >= 0 && <ApStep06Info stepIndex={String(getIndex(6) + 1).padStart(2, '0')} />}
        {getIndex(7) >= 0 && <ApStep07Info stepIndex={String(getIndex(7) + 1).padStart(2, '0')} />}
        {getIndex(8) >= 0 && <ApStep08Info stepIndex={String(getIndex(8) + 1).padStart(2, '0')} />}
        {getIndex(9) >= 0 && <ApStep09Info stepIndex={String(getIndex(9) + 1).padStart(2, '0')} />}
        {getIndex(10) >= 0 && <ApStep10Info stepIndex={String(getIndex(10) + 1).padStart(2, '0')} />}
        {getIndex(11) >= 0 && <ApStep11Info stepIndex={String(getIndex(11) + 1).padStart(2, '0')} />}
        {getIndex(11) >= 0 && <ApStep12Info stepIndex={String(getIndex(12) + 1).padStart(2, '0')} />}

        {roleType === 2 && (
          <ApConfirmGroup label={'最後'}>
            <ApConfirmItemGroup label={'本人サイン'}>
              <ApSignatureBoard
                name="p_uploaded_files.S"
                showError={showError.value}
                onChange={() => {
                  showError.onFalse();
                }}
              />
            </ApConfirmItemGroup>
          </ApConfirmGroup>
        )}

        {showError.value && errorMsg.length > 0 && (
          <Stack ref={errorMsgRef} spacing={6} sx={{ width: 1, px: 4, py: 6 }}>
            <Box
              sx={{
                py: 2,
                px: 4,
                bgcolor: (theme) => theme.palette.secondary[20],
                border: (theme) => `1px solid ${theme.palette.secondary.main}`,
                borderRadius: 2,
              }}
            >
              <Stack spacing={3} direction={'row'} alignItems={'center'}>
                <Icons.ApWarningIcon />
                <Stack>
                  <Typography
                    variant="waring"
                    sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'left' }}
                  >
                    以下の項目は必須項目です。
                  </Typography>
                  <Typography
                    variant="waring"
                    sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'left' }}
                  >
                    {errorMsg.join(', ')}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        )}
      </ApLayout>
    </FormikProvider>
  );
};
