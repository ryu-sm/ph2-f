import { Icons } from '@/assets';

import { IconButton } from '@mui/material';

export const AdSortListButton = ({ name, sortBy, sortOrder, handleSort }) => {
  return (
    <IconButton sx={{ p: '2px' }} onClick={() => handleSort(name)}>
      <Icons.AdListSortAscIcon
        sx={{
          width: 9,
          height: 13,
        }}
        stroke={sortOrder === 'asc' && sortBy === name ? '#6B70F0' : '#CCCCCC'}
      />
      <Icons.AdListSortDescIcon
        sx={{
          width: 9,
          height: 13,
        }}
        stroke={sortOrder === 'desc' && sortBy === name ? '#6B70F0' : '#CCCCCC'}
      />
    </IconButton>
  );
};
