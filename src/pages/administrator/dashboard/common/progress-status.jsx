import { Icons } from '@/assets';
import { Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';

export const ProgressStatus = ({ status }) => {
  const currentStatusItem = useMemo(() => {
    const basicList = [
      {
        values: ['0'],
        label: '書類確認中',
        fillColor: '#D5D2FF',
        strokeColor: '#C5D5FF',
      },
      {
        values: ['1', '2', '3'],
        label: '書類不備対応中',
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

  return currentStatusItem ? (
    <Stack direction={'row'} alignItems={'center'} spacing={'2px'}>
      <Icons.AdStatusResultIcon fill={currentStatusItem?.fillColor} stroke={currentStatusItem?.strokeColor} />
      <Typography variant="case_content_text" color={'gray.100'}>
        {currentStatusItem?.label}
      </Typography>
    </Stack>
  ) : (
    'ー'
  );
};
