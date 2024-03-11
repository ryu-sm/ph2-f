import { API_500_ERROR } from '@/constant';
import { apUpdateApplyInfo } from '@/services';
import { preliminarySnapAtom, preliminarySelect, preliminaryIdAtom } from '@/store';
import deepDiff from 'deep-diff';

import { createContext, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const PreliminaryContext = createContext({});

export const PreliminaryProvider = ({ children }) => {
  const result = useRecoilValueLoadable(preliminarySelect);
  const refreshPreliminary = useRecoilRefresher_UNSTABLE(preliminarySelect);
  const [preliminarySnap, setPreliminarySnap] = useRecoilState(preliminarySnapAtom);
  const preliminaryId = useRecoilValue(preliminaryIdAtom);
  useEffect(() => {
    if (result.state === 'hasError') {
      toast.error(API_500_ERROR);
    }
    if (result.state === 'hasValue') {
      console.log('result.contents', result.contents);
      setPreliminarySnap(result.contents);
    }
  }, [result.state, preliminaryId]);

  const resetPreliminarySnap = () => {
    setPreliminarySnap(result.contents);
  };

  const checkUpdate = () => {
    const upData = deepDiff(result.contents, preliminarySnap);
    console.log('upData', upData);
    return Boolean(upData);
  };

  const handleSave = async (data) => {
    try {
      await apUpdateApplyInfo(result.contents?.p_application_headers?.apply_no, { ...data });
      toast.success('申込内容を更新しました。');
      refreshPreliminary();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const isEditable = useMemo(() => {
    const p_application_headers = result.contents.p_application_headers;
    if (
      ['', '0', '1', '2'].includes(p_application_headers?.pre_examination_status) &&
      p_application_headers?.unsubcribed !== '1' &&
      p_application_headers?.provisional_after_result === ''
    ) {
      return true;
    } else {
      return false;
    }
  }, [result.contents]);

  return (
    <PreliminaryContext.Provider
      value={{
        status: result.state,
        preliminaryInfo: result.state === 'hasValue' ? result.contents : null,
        preliminarySnap: preliminarySnap,
        isEditable: isEditable,
        setPreliminarySnap: setPreliminarySnap,
        refreshPreliminary: refreshPreliminary,
        resetPreliminarySnap: resetPreliminarySnap,
        checkUpdate: checkUpdate,
        handleSave: handleSave,
      }}
    >
      {children}
    </PreliminaryContext.Provider>
  );
};
