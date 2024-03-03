import { Divider, Stack, Typography } from '@mui/material';

export const AdMemoItem = ({ item, handleEdit }) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      bgcolor={'white'}
      borderBottom={'1px solid'}
      borderColor={'gray.80'}
      height={60}
      width={1}
      sx={{ py: 5, cursor: 'pointer', ':hover': { bgcolor: 'secondary.40' } }}
      divider={<Divider orientation="vertical" flexItem />}
      onClick={() => handleEdit(item.id, item.content.replace(/<br\s*\/?>/gi, '\n'))}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} width={180}>
        <Typography variant={'memo_list_content'} color={'gray.100'}>
          {item.created_at}
        </Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} width={180}>
        <Typography variant={'memo_list_content'} color={'gray.100'}>
          {item.name_kanji}
        </Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} width={1} sx={{ px: 3 }}>
        <Typography variant={'memo_list_content'} color={'gray.100'}>
          {item.content.replace(/<br\s*\/?>/gi, '\n')}
        </Typography>
      </Stack>
    </Stack>
  );
};
