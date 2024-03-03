import { adGetSalesPersonOptions } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export const useSalesPersonOptions = (sales_area_id) => {
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);
  const queryPersonOptions = useCallback(async () => {
    if (!sales_area_id) return;
    try {
      const res = await adGetSalesPersonOptions(sales_area_id);
      setSalesPersonOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [sales_area_id]);
  useEffect(() => {
    queryPersonOptions();
  }, [sales_area_id]);
  return salesPersonOptions;
};
