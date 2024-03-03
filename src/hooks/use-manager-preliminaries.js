import { adManagerPreliminaries } from '@/services';
import { preliminarieListAtom, showProgressAtom, tabStatusAtom } from '@/store';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const useManagerPreliminaries = () => {
  const tabStatus = useRecoilValue(tabStatusAtom);
  const [preliminariesData, setPreliminariesData] = useRecoilState(preliminarieListAtom);
  const setShowProgress = useSetRecoilState(showProgressAtom);

  const queryPreliminaries = useCallback(async () => {
    try {
      setShowProgress(true);
      const res = await adManagerPreliminaries(tabStatus);
      setPreliminariesData(res.data);
      setShowProgress(false);
    } catch (error) {
      setShowProgress(false);
      console.log(error);
    }
  }, [tabStatus]);

  useEffect(() => {
    queryPreliminaries();
  }, [tabStatus]);

  return {
    preliminariesData: preliminariesData,
    queryPreliminaries: queryPreliminaries,
  };
};
