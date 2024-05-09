import { ApConfirmGroup, ApConfirmItemGroup, ApErrorScroll, ApPageTitle, ApSignatureBoard } from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { authAtom, localApplication } from '@/store';
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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Box, Stack, Typography } from '@mui/material';
import { apAgentSend } from '@/services';
import { Icons } from '@/assets';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { routeNames } from '@/router/settings';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { validationSchema } from './validationSchema';

export const ApStep13Page = () => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { refreshsendedApllication } = useApplicationContext();

  const setAuthInfo = useSetRecoilState(authAtom);

  const localApplicationInfo = useRecoilValue(localApplication);
  const {
    apNextStepId,
    apPreStepId,
    hasJoinGuarantor,
    hasIncomeTotalizer,
    p_applicant_persons__0,
    p_applicant_persons__1,
    p_application_headers,
  } = localApplicationInfo;
  const errorMsgRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const showError = useBoolean(false);
  const bottomRef = useRef(null);
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

  useEffect(() => {
    if (errorMsgRef.current) {
      errorMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errorMsgRef.current]);

  const initialValues = {
    isSalesPerson: isSalesPerson,
    p_application_headers: {
      loan_type: p_application_headers.loan_type,
    },
    p_applicant_persons__0: {
      S: p_applicant_persons__0.S,
    },
    p_applicant_persons__1: {
      S: p_applicant_persons__1.S,
    },
  };
  validationSchema;
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await apAgentSend({
          ...localApplicationInfo,
          p_applicant_persons__0: {
            ...localApplicationInfo.p_applicant_persons__0,
            S: values.p_applicant_persons__0.S,
          },
          p_applicant_persons__1: {
            ...localApplicationInfo.p_applicant_persons__1,
            S: values.p_applicant_persons__1.S,
          },
        });
        if (isSalesPerson) {
          return navigate(routeNames.adSalesPersonDashboardPage.path);
        }
        await refreshsendedApllication();
        setAuthInfo((pre) => {
          return {
            ...pre,
            agentSended: true,
          };
        });

        navigate(`/step-id-${apNextStepId}`);
      } catch (error) {
        if (error?.status === 400) {
          setErrorMsg(error.data);
          showError.onTrue();
          bottomRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
          return;
        }
        toast.error(API_500_ERROR);
      }
    },
  });

  const handelLeft = () => {
    navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apPreStepId}`);
  };

  console.log(formik.errors);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout
        hasMenu
        hasStepBar
        bottomContent={
          <ApStepFooter
            left={handelLeft}
            right={formik.handleSubmit}
            rightDisable={formik.isSubmitting}
            rightLabel={'仮審査を申し込む'}
          />
        }
      >
        <ApPageTitle py={8}>{`最後に内容を確認し\nお申込を完了させましょう。`}</ApPageTitle>
        <ApConfirmGroup label={'はじめに'}>
          <ApConfirmItemGroup label={'同意日'}>
            {p_application_headers.apply_date ? formatJapanDate(p_application_headers.apply_date, true) : 'ー'}
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
        {getIndex(12) >= 0 && <ApStep12Info stepIndex={String(getIndex(12) + 1).padStart(2, '0')} />}

        {isSalesPerson && (
          <ApConfirmGroup label={'サイン'}>
            <ApConfirmItemGroup label={'申込人 サイン'}>
              <ApSignatureBoard
                name="p_applicant_persons__0.S"
                // showError={showError.value}
                // onChange={() => {
                //   showError.onFalse();
                // }}
              />
            </ApConfirmItemGroup>
            {hasIncomeTotalizer && (
              <ApConfirmItemGroup label={'収入合算者 サイン'}>
                <ApSignatureBoard
                  name="p_applicant_persons__1.S"
                  // showError={showError.value}
                  // onChange={() => {
                  //   showError.onFalse();
                  // }}
                />
              </ApConfirmItemGroup>
            )}
          </ApConfirmGroup>
        )}
        <Box ref={bottomRef}>
          {!!errorMsg && (
            <Stack ref={errorMsgRef} spacing={6} sx={{ width: 1, px: 4, pt: 4, pb: 8 }}>
              <Box
                sx={{
                  py: 2,
                  px: 4,
                  bgcolor: (theme) => theme.palette.secondary[20],
                  border: (theme) => `1px solid ${theme.palette.secondary.main}`,
                  borderRadius: 2,
                }}
              >
                <Stack spacing={3} direction={'row'} alignItems={'flex-start'}>
                  <Icons.ApWarningIcon />
                  <Stack>
                    <Typography
                      variant="waring"
                      sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'left' }}
                    >
                      以下の項目は必須項目です。
                    </Typography>
                    {Object.keys(errorMsg).map((key, index) => (
                      <Stack key={index}>
                        <Stack>
                          <Typography
                            variant="waring"
                            sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'left' }}
                            lineHeight={'29px'}
                            textAlign={'start'}
                          >
                            {key}
                          </Typography>
                        </Stack>
                        <Stack>
                          {errorMsg[key].map((sub, index) => (
                            <Stack sx={{ pl: 4 }} key={index}>
                              <Typography
                                variant="waring"
                                sx={{ color: (theme) => theme.palette.secondary.main, textAlign: 'left' }}
                                lineHeight={'29px'}
                                textAlign={'start'}
                              >
                                {sub}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          )}
        </Box>
      </ApLayout>
    </FormikProvider>
  );
};
