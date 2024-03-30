import { Icons } from '@/assets';
import { AdPrimaryButton } from '@/components/administrator/button';
import { API_500_ERROR } from '@/constant';
import { useBoolean } from '@/hooks';
import {
  adDeleteProvisionalResult,
  adGetPreliminary,
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
  preliminaryInitialValues,
  residentsInitialValues,
} from '@/store';
import { AdThemeProvider } from '@/styles/ad-theme';
import { Modal, Stack, Typography } from '@mui/material';
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
  const checkDbModal = useBoolean(false);

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

  const checkeDbUpdate = async () => {
    try {
      const res = await adGetPreliminary(preliminaryId);
      const temp = res.data?.p_application_headers?.new_house_planned_resident_overview;

      const p_residents = res.data?.p_residents || [];
      const tempArray = [...p_residents];
      const plannedResidentNum =
        Number(temp.spouse) +
        Number(temp.children) +
        Number(temp.father) +
        Number(temp.mother) +
        Number(temp.brothers_sisters) +
        Number(temp.fiance) +
        Number(temp.others);

      if (p_residents.length < 6 && plannedResidentNum >= 6) {
        Array.from({ length: 6 - p_residents.length }, () => {
          tempArray.push(residentsInitialValues);
        });
      }

      const temp00 = tempArray.filter((item) => item?.rel_to_applicant_a_name !== '');
      const temp01 = tempArray.filter((item) => item?.rel_to_applicant_a === '1');
      const temp02 = tempArray.filter((item) => item?.rel_to_applicant_a === '2');
      const temp03 = tempArray.filter((item) => item?.rel_to_applicant_a === '3');
      const temp04 = tempArray.filter((item) => item?.rel_to_applicant_a === '4');
      const temp05 = tempArray.filter((item) => item?.rel_to_applicant_a === '5');
      const temp06 = tempArray.filter((item) => item?.rel_to_applicant_a === '6');
      const temp99 = tempArray.filter((item) => item?.rel_to_applicant_a === '99');
      const temp__ = tempArray.filter((item) => item?.rel_to_applicant_a === '');
      const tempArraySorted = [
        ...temp00,
        ...temp01,
        ...temp02,
        ...temp03,
        ...temp04,
        ...temp05,
        ...temp06,
        ...temp99,
        ...temp__,
      ];

      const dbData = {
        ...preliminaryInitialValues,
        p_uploaded_files: {
          ...preliminaryInitialValues.p_uploaded_files,
          ...res.data.p_uploaded_files,
        },
        p_application_headers: {
          ...preliminaryInitialValues.p_application_headers,
          ...res.data.p_application_headers,
        },
        p_borrowing_details__1: {
          ...preliminaryInitialValues.p_borrowing_details__1,
          ...res.data.p_borrowing_details__1,
        },
        p_borrowing_details__2: {
          ...preliminaryInitialValues.p_borrowing_details__2,
          ...res.data.p_borrowing_details__2,
        },
        p_application_banks: res.data?.p_application_banks
          ? res.data?.p_application_banks
          : preliminaryInitialValues.p_application_banks,
        p_applicant_persons__0: {
          ...preliminaryInitialValues.p_applicant_persons__0,
          ...res.data.p_applicant_persons__0,
        },
        p_applicant_persons__1: {
          ...preliminaryInitialValues.p_applicant_persons__1,
          ...res.data.p_applicant_persons__1,
        },
        p_join_guarantors: res.data?.p_join_guarantors
          ? res.data.p_join_guarantors
          : preliminaryInitialValues.p_join_guarantors,
        p_residents: tempArraySorted,
        p_activities: res.data?.p_activities ? res.data?.p_activities : [],
        files_p_activities: res.data?.files_p_activities ? res.data?.files_p_activities : [],
        p_borrowings: res.data?.p_borrowings ? res.data?.p_borrowings : preliminaryInitialValues.p_borrowings,
        p_result: {
          ...preliminaryInitialValues.p_result,
          ...res.data.p_result,
        },
        isMCJ: res.data.p_application_banks?.length > 1,
        hasIncomeTotalizer: ['3', '4'].includes(res.data.p_application_headers.loan_type),
        hasJoinGuarantor: res.data.p_application_headers.join_guarantor_umu === '1',
        changeJoinGuarantor: false,
        changeToIncomeTotalizer: false,
      };

      const upDbData = deepDiff(result.contents, dbData);
      console.log('upData', upDbData);
      return Boolean(upDbData);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const handleSave = async (data) => {
    try {
      const isUp = await checkeDbUpdate();
      if (isUp) {
        checkDbModal.onTrue();
        return;
      }
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

  const handleCloseModal = () => {
    checkDbModal.onFalse();
    refreshPreliminary();
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
        checkeDbUpdate: checkeDbUpdate,
      }}
    >
      {children}
      <AdThemeProvider>
        <Modal
          open={checkDbModal.value}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          disableAutoFocus
        >
          <Stack
            sx={{
              width: 470,
              bgcolor: 'white',
              minWidth: 'auto',
              maxHeight: '75vh',
              borderRadius: 1,
              p: 3,
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3 }}>
              <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={handleCloseModal} />
            </Stack>
            <Stack sx={{ py: 2 }}>
              <Typography
                variant="dailog_warring"
                fontWeight={300}
              >{`データ更新がありました。\n最新データを確認した上で修正してください。`}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6 }}>
              <AdPrimaryButton height={38} width={150} onClick={handleCloseModal}>
                とじる
              </AdPrimaryButton>
            </Stack>
          </Stack>
        </Modal>
      </AdThemeProvider>
    </PreliminaryContext.Provider>
  );
};
