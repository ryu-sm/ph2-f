import { amountOptions } from '@/pages/applicant/step-01/options';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { FilterSelect } from './filter-select';

export const MoneySelect = () => {
  const [moneyRange, setMoneyRange] = useState({
    from: '',
    to: '',
  });
  const handleMoneyChange = (name) => (event) => {
    setMoneyRange({
      ...moneyRange,
      [name]: event.target.value,
    });
  };

  return (
    <Stack px={'68px'} bgcolor={'gray.20'} py={'12px'}>
      <Stack direction={'row'} spacing={1}>
        <FilterSelect
          options={amountOptions}
          label="万円から"
          value={moneyRange.from}
          handleChange={handleMoneyChange('from')}
        />
        <FilterSelect
          options={amountOptions}
          label="万円まで"
          value={moneyRange.to}
          handleChange={handleMoneyChange('to')}
        />
      </Stack>
    </Stack>
  );
};
