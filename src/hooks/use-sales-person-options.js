import { adGetSalesPersonOptions } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export const useSalesPersonOptions = (sales_exhibition_hall_id) => {
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);
  const queryPersonOptions = useCallback(async () => {
    if (!sales_exhibition_hall_id) return;
    try {
      const res = await adGetSalesPersonOptions(sales_exhibition_hall_id);
      setSalesPersonOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [sales_exhibition_hall_id]);
  useEffect(() => {
    queryPersonOptions();
  }, [sales_exhibition_hall_id]);
  return salesPersonOptions;
};
