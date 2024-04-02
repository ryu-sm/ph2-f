import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useStepId = () => {
  const { pathname } = useLocation();
  const stepId = useMemo(() => {
    return parseInt(pathname.split('/').slice(-1)[0].replace('step-id-', ''));
  }, [pathname]);
  return stepId;
};
