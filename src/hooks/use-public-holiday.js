import { useCallback, useEffect, useState } from 'react';
import { apGetPublicHolidays } from '@/services';

export const usePublicHolidays = (year) => {
  const [publicHolidays, setPublicHolidays] = useState([]);

  const getPublicHolidays = useCallback(async () => {
    try {
      if (!!year) {
        const res = await apGetPublicHolidays(year);

        setPublicHolidays(res.data);
      }
    } catch (error) {
      setPublicHolidays([]);
    }
  }, [year]);

  useEffect(() => {
    getPublicHolidays();
  }, [year]);

  return publicHolidays;
};
