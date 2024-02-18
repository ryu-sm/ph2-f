import { useCallback, useEffect, useState } from 'react';
import { apGetPublicHolidays } from '@/services';

export const usePublicHolidays = (year, month, day) => {
  const [publicHolidays, setPublicHolidays] = useState([]);

  const getPublicHolidays = useCallback(async () => {
    try {
      if (!!year) {
        const res = await apGetPublicHolidays(year);

        const temp = localStorage.getItem('publicHolidays');
        if (!!temp) {
          localStorage.setItem('publicHolidays', JSON.stringify({ ...JSON.parse(temp), [year]: res.data }));
        } else {
          localStorage.setItem('publicHolidays', JSON.stringify({ [year]: res.data }));
        }

        setPublicHolidays(res.data);
      }
    } catch (error) {
      setPublicHolidays([]);
    }
  }, [year]);

  useEffect(() => {
    getPublicHolidays();
  }, [year, month, day]);

  return publicHolidays;
};
