import { preliminaryAotm } from '@/store';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Item01 } from './item-01';
import { Item02 } from './item-02';
import { Item03 } from './item-03';

export const MainDetail = () => {
  const [infoGroupTab, setInfoGroupTab] = useState(1);
  const { p_application_headers } = useRecoilValue(preliminaryAotm);

  const infoGroupItems = useMemo(() => {
    return [
      { id: 1, label: 'お借入のご希望' },
      {
        id: 2,
        label: 'あなたの情報',
      },
      {
        id: 3,
        label: 'ご職業',
      },
      ...(p_application_headers.join_guarantor_umu === '1'
        ? [
            {
              id: 4,
              label: '担保提供者',
            },
          ]
        : []),
      {
        id: 5,
        label: 'お住まい',
      },
      {
        id: 6,
        label: '現在の借入状況',
      },
      {
        id: 7,
        label: '資金計画',
      },
      {
        id: 8,
        label: '担当者情報',
      },
      {
        id: 9,
        label: '書類アップロード',
      },
      {
        id: 10,
        label: '審査結果',
      },
    ];
  }, []);
  return (
    <Stack width={'100%'} bgcolor={'white'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 0px 5px'} padding={'14px 20px'}>
      <Stack direction={'row'} alignItems={'center'} bgcolor={'gray.60'} padding={'6px'} spacing={'6px'}>
        {infoGroupItems.map((item) => (
          <Button
            key={item.id}
            sx={{
              height: 38,
              color: item.id === infoGroupTab ? 'white' : 'primary.main',
              bgcolor: item.id === infoGroupTab ? 'primary.main' : 'white',
              fontFamily: 'Hiragino Sans',
              fontWeight: item.id === infoGroupTab ? 600 : 300,
              fontSize: 12,
              boxShadow: 'none',
              py: '10px',
              px: '12px',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: item.id === infoGroupTab ? 'primary.main' : 'white',
                boxShadow: 'none',
              },
            }}
            onClick={() => setInfoGroupTab(item.id)}
            id={item.id}
          >
            <Typography variant="edit_content_title">{item.label}</Typography>
          </Button>
        ))}
      </Stack>
      {infoGroupTab === 1 && <Item01 />}
      {infoGroupTab === 2 && <Item02 />}
      {/* {infoGroupTab === 3 && <Item03 />} */}
    </Stack>
  );
};
