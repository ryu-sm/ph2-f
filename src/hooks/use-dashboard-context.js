import { useContext } from 'react';
import { DashboardContext } from '@/contexts/dashboard';

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) throw new Error('useDashboardContext context must be use inside AuthProvider');

  return context;
};
