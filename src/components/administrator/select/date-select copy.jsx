import { yearOptions } from '@/pages/applicant/step-01/options';
import { dayOptions, monthOptions } from '@/utils';
import { Stack } from '@mui/material';
import { FilterSelect } from './filter-select';
import { useEffect, useState } from 'react';

export const DateSelect = () => {
  const [dateRange, setDateRange] = useState({
    fromYear: '',
    fromMonth: '',
    fromDay: '',
    toYear: '',
    toMonth: '',
    toDay: '',
  });
  const handleDateChange = (name) => (event) => {
    setDateRange({
      ...dateRange,
      [name]: event.target.value,
    });
  };

  const [formData, setFormData] = useState({ from: '', to: '' });
  useEffect(() => {
    const { fromYear, fromMonth, fromDay, toYear, toMonth, toDay } = dateRange;
    const from = `${fromYear}/${fromMonth.padStart(2, '0')}/${fromDay.padStart(2, '0')}`;
    const to = `${toYear}/${toMonth.padStart(2, '0')}/${toDay.padStart(2, '0')}`;
    setFormData({ from, to });
  }, [dateRange]);

  return (
    <Stack px={'68px'} bgcolor={'gray.20'} py={'12px'}>
      <Stack direction={'row'} spacing={5}>
        <FilterSelect
          isDate
          options={yearOptions}
          label="年"
          value={dateRange.fromYear}
          handleChange={handleDateChange('fromYear')}
        />
        <FilterSelect
          isDate
          options={monthOptions}
          label="月"
          value={dateRange.fromMonth}
          handleChange={handleDateChange('fromMonth')}
        />
        <FilterSelect
          isDate
          options={dayOptions}
          label="日から"
          value={dateRange.fromDay}
          handleChange={handleDateChange('fromDay')}
        />
      </Stack>
      <Stack direction={'row'} spacing={5}>
        <FilterSelect
          isDate
          options={yearOptions}
          label="年"
          value={dateRange.toYear}
          handleChange={handleDateChange('toYear')}
        />
        <FilterSelect
          isDate
          options={monthOptions}
          label="月"
          value={dateRange.toMonth}
          handleChange={handleDateChange('toMonth')}
        />
        <FilterSelect
          isDate
          options={dayOptions}
          label="日まで"
          value={dateRange.toDay}
          handleChange={handleDateChange('toDay')}
        />
      </Stack>
    </Stack>
  );
};
