import { adGetSalesExhibitionHallOptions, adGetSalesPersonOptions } from '@/services';
import { useCallback, useEffect, useState } from 'react';

export const useSalesExhibitionHallOptions = (sales_area_id) => {
  const [salesExhibitionHallOptions, setSalesExhibitionHallOptions] = useState([]);
  const queryPersonOptions = useCallback(async () => {
    if (!sales_area_id) return;
    try {
      const res = await adGetSalesExhibitionHallOptions(sales_area_id);
      setSalesExhibitionHallOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [sales_area_id]);
  useEffect(() => {
    queryPersonOptions();
  }, [sales_area_id]);
  return salesExhibitionHallOptions;
};
