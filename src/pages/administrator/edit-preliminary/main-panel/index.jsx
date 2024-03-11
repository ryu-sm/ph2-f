import { infoGroupTabAtom } from '@/store';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Item01 } from './item-01';
import { Item02 } from './item-02';
import { Item03 } from './item-03';
import { Item04 } from './item-04';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { AdSecondaryButton } from '@/components/administrator/button';
import { Item05 } from './item-05';
import { Item06 } from './item-06';
import { Item07 } from './item-07';
import { Item08 } from './item-08';

export const MainDetail = () => {
  const [infoGroupTab, setInfoGroupTab] = useRecoilState(infoGroupTabAtom);
  const {
    preliminaryInfo,
    preliminarySnap: { hasJoinGuarantor },
  } = usePreliminaryContext();
  // const { p_application_headers, hasJoinGuarantor } = premliminaryInfo;

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
      ...(hasJoinGuarantor
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
  }, [hasJoinGuarantor]);

  return (
    <Stack width={'100%'} bgcolor={'white'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 0px 5px'} padding={'14px 20px'}>
      <Stack direction={'row'} alignItems={'center'} bgcolor={'gray.60'} padding={'6px'}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {infoGroupItems.map((item) => (
            <Grid key={item.id} item>
              <AdSecondaryButton
                sx={{
                  height: 38,
                  color: item.id === infoGroupTab ? 'white' : 'primary.main',
                  bgcolor: item.id === infoGroupTab ? 'primary.main' : 'white',
                  fontWeight: item.id === infoGroupTab ? 600 : 300,
                  borderRadius: '2px',
                  '&:hover': {
                    bgcolor: item.id === infoGroupTab ? 'primary.main' : 'white',
                    boxShadow: 'none',
                  },
                }}
                onClick={() => setInfoGroupTab(item.id)}
              >
                {item.label}
              </AdSecondaryButton>
            </Grid>
          ))}
        </Grid>
      </Stack>
      {infoGroupTab === 1 && <Item01 />}
      {infoGroupTab === 2 && <Item02 />}
      {infoGroupTab === 3 && <Item03 />}
      {infoGroupTab === 4 && <Item04 />}
      {infoGroupTab === 5 && <Item05 />}
      {infoGroupTab === 6 && <Item06 />}
      {infoGroupTab === 7 && <Item07 />}
      {infoGroupTab === 8 && <Item08 />}
    </Stack>
  );
};
