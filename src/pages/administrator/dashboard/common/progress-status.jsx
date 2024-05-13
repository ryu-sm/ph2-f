import { Icons } from '@/assets';
import { Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProgressStatus = ({ status, id }) => {
  const currentStatusItem = useMemo(() => {
    const basicList = [
      {
        values: ['0'],
        label: '書類確認中',
        fillColor: '#D5D2FF',
        strokeColor: '#C5D5FF',
      },
      {
        values: ['1'],
        label: '書類不備対応中',
        fillColor: '#D5D2FF',
        strokeColor: '#C5D5FF',
      },
      {
        values: ['2'],
        label: '内容確認',
        fillColor: '#D5D2FF',
        strokeColor: '#C5D5FF',
      },
      {
        values: ['3'],
        label: '承認',
        fillColor: '#D5D2FF',
        strokeColor: '#C5D5FF',
      },
      {
        values: ['4'],
        label: '仮審査中',
        fillColor: '#FFC9A9',
        strokeColor: '#FFAD7C',
      },
      {
        values: ['5'],
        label: '提携会社へ審査結果公開',
        fillColor: '#D5F5D5',
        strokeColor: '#ACEAB1',
      },
      {
        values: ['6'],
        label: '申込人へ審査結果公開',
        fillColor: '#D5F5D5',
        strokeColor: '#ACEAB1',
      },
    ];

    const currentItem = basicList.find((item) => item.values.includes(status));

    return currentItem;
  }, [status]);

  const navigator = useNavigate();
  const handleCheckUnderPreliminary = () => {
    navigator(`/manager/under-preliminary-examination?id=${id}`);
  };
  return currentStatusItem ? (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'start'}
      spacing={'2px'}
      onClick={currentStatusItem?.values.includes('4') ? handleCheckUnderPreliminary : () => {}}
      sx={{ cursor: currentStatusItem?.values.includes('4') ? 'pointer' : 'default' }}
    >
      <Icons.AdStatusResultIcon fill={currentStatusItem?.fillColor} stroke={currentStatusItem?.strokeColor} />
      <Typography variant="case_content_text" color={'gray.100'}>
        {currentStatusItem?.label}
      </Typography>
    </Stack>
  ) : (
    'ー'
  );
};
