import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useIsSalesPerson = () => {
  const { pathname } = useLocation();
  const isSalesPerson = useMemo(() => {
    const pathSegments = pathname?.split('/').filter(Boolean);
    return pathSegments.includes('sales-person');
  }, [pathname]);
  return isSalesPerson;
};
