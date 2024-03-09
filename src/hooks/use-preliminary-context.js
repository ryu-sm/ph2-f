import { useContext } from 'react';
import { PreliminaryContext } from '@/contexts/preliminary';

export const usePreliminaryContext = () => {
  const context = useContext(PreliminaryContext);

  if (!context) throw new Error('usePreliminaryContext context must be use inside AuthProvider');

  return context;
};
