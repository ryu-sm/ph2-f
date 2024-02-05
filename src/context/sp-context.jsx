import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { recoilWithLocalStorage } from './sp-store';
import { spLogin, spRegister } from '@/api/user-api';
import { parseStepId, parseTokenPayload } from '@/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  SpStep10or11Icon,
  SpStep12Icon,
  SpStep13Icon,
  SpStep14Icon,
  SpStep1Icon,
  SpStep2or4or6Icon,
  SpStep3or5Icon,
  SpStep7Icon,
  SpStep8Icon,
  SpStep9Icon,
  SpStepColor10or11Icon,
  SpStepColor12Icon,
  SpStepColor13Icon,
  SpStepColor14Icon,
  SpStepColor1Icon,
  SpStepColor2or4or6Icon,
  SpStepColor3or5Icon,
  SpStepColor7Icon,
  SpStepColor8Icon,
  SpStepColor9Icon,
} from '@/assets/svgs';
import { useLocation } from 'react-router-dom';

export const SpContext = createContext({});
export default function SpContextProvider({ children }) {
  const { pathname } = useLocation();
  const [errMsg, setErrMsg] = useState(null);
  useEffect(() => setErrMsg(null), [pathname]);
  const [currStepHeaderIndex, setCurrStepHeaderIndex] = useState(0);

  const spLocalState = useRecoilValue(recoilWithLocalStorage);
  const setSpLocalState = useSetRecoilState(recoilWithLocalStorage);
  const updateSpLocalState = (data) => {
    setSpLocalState((pre) => {
      return { ...pre, ...data };
    });
  };

  useEffect(() => {
    updateSpLocalState({
      has_application_b:
        spLocalState.p_application_headers__loan_type === 3 || spLocalState.p_application_headers__loan_type === 4,
      has_join_guarantor: spLocalState.p_application_headers__join_guarantor_type === 1,
    });
  }, [
    spLocalState.p_application_headers__join_guarantor_type,
    spLocalState.p_application_headers__loan_type,
    spLocalState.currStepHeaderId,
  ]);

  const spSteps = useMemo(
    () => [
      {
        id: 1,
        label: 'お借入の\nご希望',
        colorIcon: SpStepColor1Icon,
        gradientIcon: SpStep1Icon,
      },
      {
        id: 2,
        label: 'あなたの\n情報',
        colorIcon: SpStepColor2or4or6Icon,
        gradientIcon: SpStep2or4or6Icon,
      },
      {
        id: 3,
        label: 'あなたの\nご職業',
        colorIcon: SpStepColor3or5Icon,
        gradientIcon: SpStep3or5Icon,
      },
      ...(spLocalState.has_application_b
        ? [
            {
              id: 4,
              label: '収入\n合算者',
              colorIcon: SpStepColor2or4or6Icon,
              gradientIcon: SpStep2or4or6Icon,
            },
            {
              id: 5,
              label: '収入合算\n者の職業',
              colorIcon: SpStepColor3or5Icon,
              gradientIcon: SpStep3or5Icon,
            },
          ]
        : []),
      ...(spLocalState.has_join_guarantor === 1
        ? [
            {
              id: 6,
              label: '担保\n提供者',
              colorIcon: SpStepColor2or4or6Icon,
              gradientIcon: SpStep2or4or6Icon,
            },
          ]
        : []),
      {
        id: 7,
        label: 'お住まい',
        colorIcon: SpStepColor7Icon,
        gradientIcon: SpStep7Icon,
      },
      {
        id: 8,
        label: '現在の\n借入状況',
        colorIcon: SpStepColor8Icon,
        gradientIcon: SpStep8Icon,
      },
      {
        id: 9,
        label: '資金計画',
        colorIcon: SpStepColor9Icon,
        gradientIcon: SpStep9Icon,
      },
      {
        id: 10,
        label: '書類添付',
        colorIcon: SpStepColor10or11Icon,
        gradientIcon: SpStep10or11Icon,
      },
      ...(spLocalState.has_application_b
        ? [
            {
              id: 11,
              label: '収入合算\n者の書類',
              colorIcon: SpStepColor10or11Icon,
              gradientIcon: SpStep10or11Icon,
            },
          ]
        : []),
      {
        id: 12,
        label: '担当者\n情報',
        colorIcon: SpStepColor12Icon,
        gradientIcon: SpStep12Icon,
      },
      {
        id: 13,
        label: '入力内容\nご確認',
        colorIcon: SpStepColor13Icon,
        gradientIcon: SpStep13Icon,
      },
      {
        id: 14,
        label: '仮審査\n申込完了',
        colorIcon: SpStepColor14Icon,
        gradientIcon: SpStep14Icon,
      },
    ],
    [
      spLocalState.p_application_headers__join_guarantor_type,
      spLocalState.p_application_headers__loan_type,
      spLocalState.currStepHeaderId,
      spLocalState.has_application_b,
      spLocalState.has_join_guarantor,
    ]
  );

  useEffect(() => {
    const stepId = parseStepId(pathname);
    const tempIndex = spSteps.findIndex((item) => item.id === stepId);
    if (tempIndex < 0) return;
    setCurrStepHeaderIndex(tempIndex);
    updateSpLocalState({ currStepHeaderId: stepId });
  }, [pathname]);

  const register = useCallback(async (data) => {
    try {
      const res = await spRegister(data);
      const token = res.data?.access_token;
      sessionStorage.setItem('accessToken', token);
      const tokenPayload = parseTokenPayload(token);
      const tempLocalState = {
        ...spLocalState,
        user: {
          email: tokenPayload?.email,
          agent_sended: tokenPayload?.agent_sended,
          first_login: tokenPayload?.first_login,
        },
      };
      setSpLocalState(tempLocalState);
    } catch (error) {
      return Promise.reject(error);
    }
  }, []);

  const getPreStepUrl = (stepId) => {
    const tempIndex = spSteps.findIndex((item) => item.id === stepId);
    return `/step-${spSteps[tempIndex - 1]?.id}`;
  };
  const getNextStepUrl = (stepId) => {
    const tempIndex = spSteps.findIndex((item) => item.id === stepId);
    return `/step-${spSteps[tempIndex + 1]?.id}`;
  };

  const updateCurrCompletedStepID = (completedStepId) => {
    if (spLocalState.curr_completed_step_id >= completedStepId) return;
    updateSpLocalState({ curr_completed_step_id: completedStepId });
  };
  const memoizedValue = useMemo(
    () => ({
      ...spLocalState,
      spSteps,
      currStepHeaderIndex,
      errMsg,
      setErrMsg,
      getPreStepUrl,
      getNextStepUrl,
      updateSpLocalState,
      updateCurrCompletedStepID,
      register,
    }),
    [
      spLocalState,
      spSteps,
      currStepHeaderIndex,
      errMsg,
      setErrMsg,
      getPreStepUrl,
      getNextStepUrl,
      updateSpLocalState,
      updateCurrCompletedStepID,

      register,
    ]
  );

  return <SpContext.Provider value={memoizedValue}>{children}</SpContext.Provider>;
}
