import { API_500_ERROR } from '@/constant';
import {
  adDeleteProvisionalResult,
  adUpdateApproverConfirmation,
  adUpdatePreExaminationStatus,
  adUpdatePreliminary,
  adUpdateProvisionalResult,
} from '@/services';
import {
  preliminarySnapAtom,
  preliminarySelect,
  preliminaryIdAtom,
  editMainTabStatusAtom,
  infoGroupTabAtom,
} from '@/store';
import deepDiff from 'deep-diff';

import { createContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const PreliminaryContext = createContext({});

export const PreliminaryProvider = ({ children }) => {
  const result = useRecoilValueLoadable(preliminarySelect);
  const refreshPreliminary = useRecoilRefresher_UNSTABLE(preliminarySelect);
  const [preliminarySnap, setPreliminarySnap] = useRecoilState(preliminarySnapAtom);
  const preliminaryId = useRecoilValue(preliminaryIdAtom);
  const { pathname } = useLocation();

  useEffect(() => {
    refreshPreliminary();
  }, [pathname]);
  const infoGroup = useRecoilValue(infoGroupTabAtom);
  const mainTabStatus = useRecoilValue(editMainTabStatusAtom);
  useEffect(() => {
    if (result.state === 'hasError') {
      toast.error(API_500_ERROR);
    }
    if (result.state === 'hasValue') {
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
      await adUpdatePreliminary(result.contents?.p_application_headers?.id, {
        mainTab: mainTabStatus,
        subTab: infoGroup,
        ...data,
      });
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

  const handleChangeProvisionalResult = async (s_bank_id, provisional_result) => {
    try {
      await adUpdateProvisionalResult({
        p_application_header_id: result.contents?.p_application_headers?.id,
        provisional_result: provisional_result,
        s_bank_id: s_bank_id,
        R: preliminarySnap?.p_uploaded_files?.R,
      });
      refreshPreliminary();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const handleChangeApproverConfirmation = async (approver_confirmation) => {
    try {
      await adUpdateApproverConfirmation({
        p_application_header_id: result.contents?.p_application_headers?.id,
        approver_confirmation: approver_confirmation,
      });
      refreshPreliminary();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const handleChangePreExaminationStatus = async (pre_examination_status) => {
    try {
      await adUpdatePreExaminationStatus({
        p_application_header_id: result.contents?.p_application_headers?.id,
        pre_examination_status: pre_examination_status,
        preliminary: result.contents,
      });
      refreshPreliminary();
    } catch (error) {
      if (error.status === 400) {
        return error;
      }
      toast.error(API_500_ERROR);
    }
  };

  const handleDeleteProvisionalResult = async (p_uploaded_file_id) => {
    try {
      await adDeleteProvisionalResult({
        p_application_header_id: result.contents?.p_application_headers?.id,
        s_bank_id: result.contents?.p_result?.s_bank_id,
        p_uploaded_file_id: p_uploaded_file_id,
      });
      refreshPreliminary();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  // console.log(JSON.stringify(result.contents));

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
        handleChangeProvisionalResult: handleChangeProvisionalResult,
        handleChangeApproverConfirmation: handleChangeApproverConfirmation,
        handleChangePreExaminationStatus: handleChangePreExaminationStatus,
        handleDeleteProvisionalResult: handleDeleteProvisionalResult,
      }}
    >
      {children}
    </PreliminaryContext.Provider>
  );
};
