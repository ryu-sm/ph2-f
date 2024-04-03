import { API_500_ERROR } from '@/constant';
import { useStepId } from '@/hooks';
import { apGetPapplicationHeadersFiles, apUpdateSendedInfo } from '@/services';
import { applicationInitialValues, authAtom, localApplication, sendedApllicationSelect } from '@/store';
import { createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
} from 'recoil';

export const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
  const result = useRecoilValueLoadable(sendedApllicationSelect);
  const refreshsendedApllication = useRecoilRefresher_UNSTABLE(sendedApllicationSelect);
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { user, agentSended } = useRecoilValue(authAtom);
  const stepId = useStepId();

  useEffect(() => {
    if (agentSended) {
      console.log('debug');
      if (result.state === 'hasError') {
        toast.error(API_500_ERROR);
      }
      if (result.state === 'hasValue') {
        setLocalApplicationInfo((pre) => {
          return {
            ...pre,
            p_application_headers: {
              ...applicationInitialValues.p_application_headers,
              ...result.contents.p_application_headers,
            },
            p_borrowing_details__1: {
              ...applicationInitialValues.p_borrowing_details__1,
              ...result.contents.p_borrowing_details__1,
            },
            p_borrowing_details__2: {
              ...applicationInitialValues.p_borrowing_details__2,
              ...result.contents.p_borrowing_details__2,
            },
            p_application_banks: result.contents?.p_application_banks ? result.contents?.p_application_banks : [],
            p_applicant_persons__0: {
              ...applicationInitialValues.p_applicant_persons__0,
              ...result.contents.p_applicant_persons__0,
            },
            p_applicant_persons__1: {
              ...applicationInitialValues.p_applicant_persons__1,
              ...result.contents.p_applicant_persons__1,
            },
            p_join_guarantors: result.contents?.p_join_guarantors ? result.contents.p_join_guarantors : [],
            p_residents: result.contents?.p_residents ? result.contents?.p_residents : [],
            p_borrowings: result.contents?.p_borrowings ? result.contents?.p_borrowings : [],
            apCurrStepId: 14,
            isMCJ: result.contents.p_application_banks?.length > 1,
            hasIncomeTotalizer:
              result.contents.p_application_headers.loan_type === '3' ||
              result.contents.p_application_headers.loan_type === '4',
            hasJoinGuarantor: result.contents.p_application_headers.join_guarantor_umu === '1',
            changeJoinGuarantor: false,
            changeToIncomeTotalizer: false,
            p_applicant_persons_a_agreement: true,
            p_applicant_persons_b_agreement:
              result.contents.p_application_headers.loan_type === '3' ||
              result.contents.p_application_headers.loan_type === '4'
                ? true
                : false,
          };
        });
      }
    }
  }, [result.state, user, agentSended]);

  const updateSendedInfo = async (data) => {
    try {
      await apUpdateSendedInfo(user.id, { ...data, step_id: stepId });
      refreshsendedApllication();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        localApplicationInfo: localApplicationInfo,
        updateSendedInfo: updateSendedInfo,
        refreshsendedApllication: refreshsendedApllication,
        dbData: result.state === 'hasValue' ? result.contents : null,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
