import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const usePublicHolidays = (year, month, day) => {
  const [publicHolidays, setPublicHolidays] = useState([]);

  const getPublicHolidays = useCallback(async () => {
    try {
      if (!!year) {
        const res = await axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/jp`);

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
