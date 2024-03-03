import { Icons } from '@/assets';
import { Divider, IconButton, Stack, Typography } from '@mui/material';

export const AdMemoHeader = ({ sortBy, sortOrder, handleSort }) => {
  const items = [
    { name: 'created_at', label: '日付', width: 180 },
    { name: 'name_kanji', label: 'メモ作成者', width: 180 },
    { name: 'content', label: 'メモ内容', width: 1 },
  ];
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} bgcolor={'primary.20'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bgcolor={'primary.20'}
        height={40}
        width={1}
        sx={{ py: 3 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {items.map((item, index) => (
          <Stack
            key={index}
            spacing={1}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            width={item.width}
            height={40}
          >
            <Typography variant="filter_label">{item.label}</Typography>
            {index !== items.length - 1 && (
              <IconButton sx={{ p: '2px' }} onClick={() => handleSort(item.name)}>
                <Icons.AdListSortAscIcon
                  sx={{
                    width: 9,
                    height: 13,
                  }}
                  stroke={sortOrder === 'asc' && sortBy === item.name ? '#6B70F0' : '#CCCCCC'}
                />
                <Icons.AdListSortDescIcon
                  sx={{
                    width: 9,
                    height: 13,
                  }}
                  stroke={sortOrder === 'desc' && sortBy === item.name ? '#6B70F0' : '#CCCCCC'}
                />
              </IconButton>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
