import { API_500_ERROR } from '@/constant';
import { useBoolean, useStepId } from '@/hooks';
import { apGetPreExaminationStatus, apGetSendedApplication, apUpdateSendedInfo } from '@/services';
import { applicationInitialValues, authAtom, localApplication } from '@/store';
import { createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { Icons } from '@/assets';

import { Stack, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { ApModalWrapper, ApPrimaryButton } from '@/components';
import { ApThemeProvider } from '@/styles';

export const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const {
    p_application_headers: { apply_no },
  } = localApplicationInfo;
  const { user } = useRecoilValue(authAtom);
  const setAuthInfo = useSetRecoilState(authAtom);
  const stepId = useStepId();
  const modal = useBoolean(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const refreshsendedApllication = async () => {
    const res = await apGetSendedApplication(user?.id);
    console.log(res.data.p_application_headers?.created_at);

    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...applicationInitialValues.p_application_headers,
          ...res.data?.p_application_headers,
        },
        p_borrowing_details__1: {
          ...applicationInitialValues.p_borrowing_details__1,
          ...res.data?.p_borrowing_details__1,
        },
        p_borrowing_details__2: {
          ...applicationInitialValues.p_borrowing_details__2,
          ...res.data?.p_borrowing_details__2,
        },
        p_application_banks: res.data?.p_application_banks ? res.data?.p_application_banks : [],
        p_applicant_persons__0: {
          ...applicationInitialValues.p_applicant_persons__0,
          ...res.data?.p_applicant_persons__0,
        },
        p_applicant_persons__1: {
          ...applicationInitialValues.p_applicant_persons__1,
          ...res.data?.p_applicant_persons__1,
        },
        p_join_guarantors: res.data?.p_join_guarantors ? res.data?.p_join_guarantors : [],
        p_residents: res.data?.p_residents ? res.data?.p_residents : [],
        p_borrowings: res.data?.p_borrowings ? res.data?.p_borrowings : [],
        apCurrStepId: 14,
        isMCJ: res.data?.p_application_banks?.length > 1,
        hasIncomeTotalizer:
          res.data?.p_application_headers.loan_type === '3' || res.data?.p_application_headers.loan_type === '4',
        hasJoinGuarantor: res.data?.p_application_headers.join_guarantor_umu === '1',
        changeJoinGuarantor: false,
        changeToIncomeTotalizer: false,
        p_applicant_persons_a_agreement: true,
        p_applicant_persons_b_agreement:
          res.data?.p_application_headers.loan_type === '3' || res.data?.p_application_headers.loan_type === '4'
            ? true
            : false,
      };
    });
  };

  const updateSendedInfo = async (data) => {
    try {
      const res = await apGetPreExaminationStatus(apply_no);
      console.log(res);
      if (Number(res.data?.pre_examination_status) >= 3) {
        modal.onTrue();
        navigate(routeNames.apTopPage.path);
      } else {
        await apUpdateSendedInfo(user.id, { ...data, step_id: stepId });
        await refreshsendedApllication();
      }
    } catch (error) {
      console.log(error);
      toast.error(API_500_ERROR);
    }
  };

  const getPreExaminationStatus = async () => {
    if (apply_no) {
      try {
        const res = await apGetPreExaminationStatus(apply_no);
        console.log(res.data);
        if (
          Number(res.data?.pre_examination_status) >= 3 &&
          [
            routeNames.apStep01Page.path,
            routeNames.apStep02Page.path,
            routeNames.apStep03Page.path,
            routeNames.apStep04Page.path,
            routeNames.apStep05Page.path,
            routeNames.apStep06Page.path,
            routeNames.apStep07Page.path,
            routeNames.apStep08Page.path,
            routeNames.apStep09Page.path,
            routeNames.apStep10Page.path,
            routeNames.apStep11Page.path,
            routeNames.apStep12Page.path,
          ].includes(pathname)
        ) {
          modal.onTrue();
          navigate(routeNames.apTopPage.path);
        }
        setAuthInfo((pre) => {
          return {
            ...pre,
            user: {
              ...pre.user,
              preExaminationStatus: res.data?.pre_examination_status,
            },
          };
        });
        // refreshsendedApllication();
      } catch (error) {
        console.log(error);
        toast.error(API_500_ERROR);
      }
    }
  };

  useEffect(() => {
    getPreExaminationStatus();
  }, [apply_no, pathname]);

  return (
    <ApplicationContext.Provider
      value={{
        localApplicationInfo: localApplicationInfo,
        updateSendedInfo: updateSendedInfo,
        refreshsendedApllication: refreshsendedApllication,
        // dbData: result.state === 'hasValue' ? result.contents : null,
      }}
    >
      {children}
      <ApThemeProvider>
        <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={`お知らせ`}>
          <Stack spacing={4} alignItems={'center'} sx={{ px: 3 }}>
            <Typography textAlign={'center'}>
              住信SBIネット銀行での審査フェーズ（「仮審査中」以降）に入りますと申込内容の修正はできません。
            </Typography>
            <ApPrimaryButton width={240} height={40} onClick={modal.onFalse}>
              閉じる
            </ApPrimaryButton>
          </Stack>
        </ApModalWrapper>
      </ApThemeProvider>
    </ApplicationContext.Provider>
  );
};
