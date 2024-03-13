import { FILES_CATEGORY } from '@/constant';
import { Stack, Typography } from '@mui/material';

export const ContentEditFileGroup = ({ category, children }) => {
  return (
    <Stack px={5} py={1} border={'1px solid'} borderColor={'gray.60'}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography variant="files_category">{category}</Typography>
        <Typography variant="files_category_label">{FILES_CATEGORY[category]}</Typography>
      </Stack>
      {category === 'A' ? (
        children
      ) : (
        <Stack spacing={3} pb={2}>
          {children}
        </Stack>
      )}
    </Stack>
  );
};
