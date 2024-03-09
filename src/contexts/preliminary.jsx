import { API_500_ERROR } from '@/constant';
import { preliminarySnapAtom, preliminarySelect } from '@/store';
import { createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil';

export const PreliminaryContext = createContext({});

export const PreliminaryProvider = ({ children }) => {
  const result = useRecoilValueLoadable(preliminarySelect);
  const refreshPreliminary = useRecoilRefresher_UNSTABLE(preliminarySelect);
  const [preliminarySnap, setPreliminarySnap] = useRecoilState(preliminarySnapAtom);
  useEffect(() => {
    if (result.state === 'hasError') {
      toast.error(API_500_ERROR);
    }
    if (result.state === 'hasValue') {
      setPreliminarySnap((pre) => ({
        ...pre,
        isMCJ: result.contents.p_application_banks?.length > 1,
        hasIncomeTotalizer: ['3', '4'].includes(result.contents.p_application_headers.loan_type),
        hasJoinGuarantor: result.contents.p_application_headers.join_guarantor_umu === '1',
        changeJoinGuarantor: false,
        changeToIncomeTotalizer: false,
      }));
    }
  }, [result.state]);
  return (
    <PreliminaryContext.Provider
      value={{
        status: result.state,
        preliminaryInfo: result.state === 'hasValue' ? result.contents : null,
        preliminarySnap: preliminarySnap,
        setPreliminarySnap: setPreliminarySnap,
        refreshPreliminary: refreshPreliminary,
      }}
    >
      {children}
    </PreliminaryContext.Provider>
  );
};
