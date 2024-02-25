import { SBI_CODE } from '@/configs';
import { apGetBanks } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export const useBankMaster = () => {
  const [bankOptions, setBankOptions] = useState([]);
  const getSpBanks = useCallback(async () => {
    try {
      const res = await apGetBanks();
      const temp = res.data.map((bank) => ({ ...bank, default: bank.code === SBI_CODE }));
      setBankOptions(temp);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    getSpBanks();
  }, [getSpBanks]);

  return bankOptions;
};
