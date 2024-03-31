import { useContext } from 'react';
import { ApplicationContext } from '@/contexts/application';

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);

  if (!context) throw new Error('ApplicationContext context must be use inside AuthProvider');
  return context;
};
