import { SpContext } from '@/context/sp-context';
import { useContext } from 'react';

export default function useSpContext() {
  const context = useContext(SpContext);
  if (!context) {
    throw new Error('useSpContext must be use inside SpContextProvider');
  }
  return context;
}
