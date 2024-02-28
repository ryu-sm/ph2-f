import { apApplication, apUpdateApplyInfo } from '@/services';
import { applicationAtom } from '@/store';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

export const useApUpdateApplyInfo = () => {
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const update = useCallback(async (applyNo, data) => {
    try {
      console.log(data);
      await apUpdateApplyInfo(applyNo, { ...data });
      const res = await apApplication(applyNo);
      setApplicationInfo((pre) => {
        return {
          ...pre,
          ...res.data,
          apCurrStepId: 14,
          isMCJ: res.data.p_application_banks?.lengt > 1,
          hasIncomeTotalizer: Boolean(res.data.p_applicant_persons__1),
          hasJoinGuarantor: Boolean(res.data.p_join_guarantors),
          changeJoinGuarantor: false,
          changeToIncomeTotalizer: false,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return update;
};
