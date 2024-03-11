import { Stack, Typography } from '@mui/material';
import { FilterInput } from './filter-input';
import { useState } from 'react';

export const Applicant = () => {
  const [value, setValue] = useState('');
  return (
    <Stack
      px={'68px'}
      bgcolor={'white'}
      spacing={3}
      sx={{
        justifyContent: 'space-around',
        py: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
      }}
    >
      <Typography variant="filter_item_label">申込人</Typography>
      <FilterInput placeholder="入力してください" value={value} setValue={setValue} />
    </Stack>
  );
};
