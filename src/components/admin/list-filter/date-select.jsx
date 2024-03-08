import { Stack, Typography } from '@mui/material';
import { FilterSelect } from './filter-select';
import { yearOptions } from '@/pages/applicant/step-01/options';
import { dayOptions, monthOptions } from '@/utils';

export const DateSelect = () => {
  return (
    <Stack px={'68px'} bgcolor={'gray.20'} py={'12px'}>
      <Stack direction={'row'}>
        <FilterSelect isDate options={yearOptions} />
        <Typography variant="fliter_select">年</Typography>
        <FilterSelect isDate options={monthOptions} />
        <Typography variant="fliter_select">月</Typography>
        <FilterSelect isDate options={dayOptions} />
        <Typography variant="fliter_select">日から</Typography>
      </Stack>
      <Stack direction={'row'}>
        <FilterSelect isDate options={yearOptions} />
        <Typography variant="fliter_select">年</Typography>
        <FilterSelect isDate options={monthOptions} />
        <Typography variant="fliter_select">月</Typography>
        <FilterSelect isDate options={dayOptions} />
        <Typography variant="fliter_select">日まで</Typography>
      </Stack>
    </Stack>
  );
};
