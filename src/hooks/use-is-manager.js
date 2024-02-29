import { useMemo } from 'react';

export const useIsManager = (pathName) => {
  const isManager = useMemo(() => {
    const pathSegments = pathName?.split('/').filter(Boolean);
    return pathSegments.includes('manager');
  }, [pathName]);
  return isManager;
};
