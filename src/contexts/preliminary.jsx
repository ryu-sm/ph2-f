import { Icons } from '@/assets';
import { AdPrimaryButton } from '@/components/administrator/button';
import { API_500_ERROR } from '@/constant';
import { useBoolean } from '@/hooks';
import { ComModalWapper } from '@/pages/administrator/com-modal-wapper';
import {
  adDeleteProvisionalResult,
  adGetManagerRole,
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
  incomeTotalizerInfoGroupTabAtom,
  pairLoanInfoGroupTabAtom,
} from '@/store';
import { AdThemeProvider } from '@/styles/ad-theme';
import { Modal, Stack, Typography } from '@mui/material';
import deepDiff from 'deep-diff';

import { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const PreliminaryContext = createContext({});

export const PreliminaryProvider = ({ children }) => {
  const result = useRecoilValueLoadable(preliminarySelect);
  const refreshPreliminary = useRecoilRefresher_UNSTABLE(preliminarySelect);
  const [preliminarySnap, setPreliminarySnap] = useRecoilState(preliminarySnapAtom);
  const preliminaryId = useRecoilValue(preliminaryIdAtom);
  const checkDbModal = useBoolean(false);
  const modal = useBoolean(false);
  const [pairLoanData, setPairLoanData] = useState({});

  const infoGroupTab = useRecoilValue(infoGroupTabAtom);
  const incomeTotalizerInfoGroupTab = useRecoilValue(incomeTotalizerInfoGroupTabAtom);
  const pairLoanInfoGroupTab = useRecoilValue(pairLoanInfoGroupTabAtom);
  const mainTabStatus = useRecoilValue(editMainTabStatusAtom);
  useEffect(() => {
    if (result.state === 'hasError') {
      console.debug(error);
    }
    if (result.state === 'hasValue') {
      setPreliminarySnap(result.contents);
      if (
        result.contents.p_application_headers.loan_type === '2' &&
        result.contents.p_application_headers.pair_loan_id
      ) {
        fetchPairLoanData(result.contents.p_application_headers.pair_loan_id);
      }
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

  const fetchPairLoanData = async (pair_loan_id) => {
    try {
      const res = await adGetPreliminary(pair_loan_id);
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

      if (p_residents.length < 6 && plannedResidentNum > p_residents.length) {
        const basicLength = plannedResidentNum >= 6 ? 6 : plannedResidentNum;
        Array.from({ length: basicLength - p_residents.length }, () => {
          tempArray.push(residentsInitialValues);
        });
      }

      const tempPairLoanData = {
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
        p_residents: tempArray,
        p_activities: res.data?.p_activities ? res.data?.p_activities : [],
        p_borrowings: res.data?.p_borrowings ? res.data?.p_borrowings : [],
        p_result: {
          ...preliminaryInitialValues.p_result,
          ...res.data.p_result,
        },
        apply_type: res.data?.apply_type,
        isMCJ: res.data.p_application_banks?.length > 1,
        hasIncomeTotalizer: ['3', '4'].includes(res.data.p_application_headers.loan_type),
        hasJoinGuarantor: res.data.p_application_headers.join_guarantor_umu === '1',
        changeJoinGuarantor: false,
        changeToIncomeTotalizer: false,
      };

      setPairLoanData(tempPairLoanData);
    } catch (error) {
      console.debug(error);
    }
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

      if (p_residents.length < 6 && plannedResidentNum > p_residents.length) {
        const basicLength = plannedResidentNum >= 6 ? 6 : plannedResidentNum;
        Array.from({ length: basicLength - p_residents.length }, () => {
          tempArray.push(residentsInitialValues);
        });
      }

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
        p_residents: tempArray,
        p_activities: res.data?.p_activities ? res.data?.p_activities : [],
        p_borrowings: res.data?.p_borrowings ? res.data?.p_borrowings : [],
        p_result: {
          ...preliminaryInitialValues.p_result,
          ...res.data.p_result,
        },
        apply_type: res.data?.apply_type,
        isMCJ: res.data.p_application_banks?.length > 1,
        hasIncomeTotalizer: ['3', '4'].includes(res.data.p_application_headers.loan_type),
        hasJoinGuarantor: res.data.p_application_headers.join_guarantor_umu === '1',
        changeJoinGuarantor: false,
        changeToIncomeTotalizer: false,
      };

      const upDbData = deepDiff(result.contents, dbData);
      console.log('upData', upDbData);
      if (upDbData === undefined) {
        return false;
      } else {
        const upList = upDbData.filter((item) => !item.path.includes('src'));
        return upList.length > 0;
      }
    } catch (error) {
      console.debug(error);
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
        subTab:
          mainTabStatus === 1 ? infoGroupTab : mainTabStatus === 2 ? incomeTotalizerInfoGroupTab : pairLoanInfoGroupTab,
        ...data,
      });
      toast.success('申込内容を更新しました。');
      refreshPreliminary();
    } catch (error) {
      console.debug(error);
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
        R: preliminarySnap?.p_application_headers?.R,
      });
      refreshPreliminary();
    } catch (error) {
      console.debug(error);
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
      console.debug(error);
    }
  };

  const handleChangePreExaminationStatus = async (pre_examination_status, onClose) => {
    try {
      await adUpdatePreExaminationStatus({
        p_application_header_id: result.contents?.p_application_headers?.id,
        pre_examination_status: pre_examination_status,
        preliminary: pre_examination_status === 3 ? result.contents : null,
      });
      if (pre_examination_status === 4) {
        onClose();
        modal.onTrue();
        return;
      }
      refreshPreliminary();
    } catch (error) {
      if (error.status === 400 || error.status === 403 || error.status === 406) {
        return error;
      }
      console.debug(error);
    }
  };

  const handleDeleteProvisionalResult = async (p_upload_file_id) => {
    try {
      await adDeleteProvisionalResult({
        p_application_header_id: result.contents?.p_application_headers?.id,
        s_bank_id: result.contents?.p_result?.s_bank_id,
        p_upload_file_id: p_upload_file_id,
      });

      refreshPreliminary();
    } catch (error) {
      console.debug(error);
    }
  };
  const [managerRole, setManagerRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await adGetManagerRole();
        setManagerRole(res.data?.role);
      } catch (error) {
        setManagerRole(null);
        console.debug(error);
      }
    };
    fetchData();
  }, [preliminarySnap]);

  return (
    <PreliminaryContext.Provider
      value={{
        status: result.state,
        preliminaryInfo: result.state === 'hasValue' ? result.contents : null,
        pairLoanDataInfo: pairLoanData,
        preliminarySnap: preliminarySnap,
        isEditable: isEditable,
        managerRole: managerRole,
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
        <ComModalWapper open={checkDbModal.value} onClose={handleCloseModal}>
          <Stack sx={{ py: 2 }}>
            <Typography
              variant="dailog_warring"
              fontWeight={500}
            >{`データ更新がありました。\n最新データを確認した上で修正してください。`}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6 }}>
            <AdPrimaryButton height={38} width={150} onClick={handleCloseModal}>
              とじる
            </AdPrimaryButton>
          </Stack>
        </ComModalWapper>
        {/* <Modal
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
        </Modal> */}
        <ComModalWapper open={modal.value} onClose={modal.onFalse}>
          <Stack sx={{ py: 2 }}>
            <Typography variant="dailog_warring" fontWeight={500}>
              銀行へデータを連携しました。
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6 }} spacing={3}>
            <AdPrimaryButton
              height={38}
              width={100}
              onClick={() => {
                modal.onFalse();
                refreshPreliminary();
              }}
            >
              OK
            </AdPrimaryButton>
          </Stack>
        </ComModalWapper>
        {/* <Modal
          open={modal.value}
          onClose={modal.onFalse}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          disableAutoFocus
        >
          <Stack
            sx={{
              width: 480,
              bgcolor: 'white',
              minWidth: 'auto',
              maxHeight: '75vh',
              borderRadius: 1,
              p: 3,
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3 }}>
              <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={modal.onFalse} />
            </Stack>
            <Stack sx={{ py: 3 }}>
              <Typography variant="dailog_content" fontWeight={600}>
                銀行へデータを連携しました。
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6 }} spacing={3}>
              <AdPrimaryButton
                height={38}
                width={100}
                onClick={() => {
                  modal.onFalse();
                  refreshPreliminary();
                }}
              >
                OK
              </AdPrimaryButton>
            </Stack>
          </Stack>
        </Modal> */}
      </AdThemeProvider>
    </PreliminaryContext.Provider>
  );
};
