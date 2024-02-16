import { apGetBanks } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export const useBankMaster = () => {
  const [bankOptions, setBankOptions] = useState([]);
  const getSpBanks = useCallback(async () => {
    try {
      const res = await apGetBanks();
      setBankOptions(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getSpBanks();
  }, [getSpBanks]);

  return bankOptions;
};
