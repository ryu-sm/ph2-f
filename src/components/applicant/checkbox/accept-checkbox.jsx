import { ApAcceptCheckboxCheckedIcon, ApAcceptCheckboxIcon } from '@/assets/icons';
import { Box, Checkbox } from '@mui/material';

export const ApAcceptCheckox = (props) => {
  return (
    <Box>
      <Checkbox icon={<ApAcceptCheckboxIcon />} checkedIcon={<ApAcceptCheckboxCheckedIcon />} {...props} />
    </Box>
  );
};
