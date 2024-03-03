import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useIsManager = () => {
  const { pathname } = useLocation();
  const isManager = useMemo(() => {
    const pathSegments = pathname?.split('/').filter(Boolean);
    return pathSegments.includes('manager');
  }, [pathname]);
  return isManager;
};
