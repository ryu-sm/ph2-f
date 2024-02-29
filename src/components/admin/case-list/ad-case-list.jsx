import { Stack } from '@mui/material';
import { AdCaseItem } from '../case-item/ad-case-item';

export const AdCaseList = () => {
  return (
    <Stack p={3} width={'100%'}>
      <AdCaseItem />
    </Stack>
  );
};
