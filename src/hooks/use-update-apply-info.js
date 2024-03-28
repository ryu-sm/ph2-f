import { apApplication, apUpdateApplyInfo } from '@/services';
import { applicationAtom } from '@/store';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

export const useApUpdateApplyInfo = () => {
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const update = useCallback(async (applyNo, data) => {
    try {
      await apUpdateApplyInfo(applyNo, { ...data });
      const res = await apApplication(applyNo);
      setApplicationInfo((pre) => {
        return {
          p_uploaded_files: {
            ...pre.p_uploaded_files,
            ...res.data.p_uploaded_files,
          },
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
          p_application_banks: res.data?.p_application_banks ? res.data?.p_application_banks : pre.p_application_banks,
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
    } catch (error) {
      throw error;
    }
  }, []);
  return update;
};
