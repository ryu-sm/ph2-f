import { editMainTabStatusAtom, incomeTotalizerInfoGroupTabAtom, infoGroupTabAtom } from '@/store';
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Item02 } from './item-02';
import { Item03 } from './item-03';
import { Item09 } from './item-09';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { AdPrimaryButton, AdSecondaryButton } from '@/components/administrator/button';

import { Icons } from '@/assets';
import { useBoolean } from '@/hooks';

export const IncomeTotalizerDetail = () => {
  const [infoGroupTab, setInfoGroupTab] = useRecoilState(infoGroupTabAtom);
  const [incomeTotalizerInfoGroupTab, setIncomeTotalizerInfoGroupTab] = useRecoilState(incomeTotalizerInfoGroupTabAtom);
  const [mainTabStatus, setMainTabStatus] = useRecoilState(editMainTabStatusAtom);
  const {
    preliminaryInfo,
    preliminarySnap: { changeToIncomeTotalizer },
    checkUpdate,
    resetPreliminarySnap,
  } = usePreliminaryContext();

  const infoGroupItems = useMemo(() => {
    return [
      {
        id: 2,
        label: '収入合算者の情報',
      },
      {
        id: 3,
        label: '収入合算者のご職業',
      },
      {
        id: 9,
        label: '書類アップロード',
      },
    ];
  }, []);

  const changeTab = useBoolean(false);
  const [tempTab, setTempTab] = useState(null);
  const handleChangeGroupTab = (id) => {
    if (checkUpdate() && mainTabStatus !== 3) {
      setTempTab(id);
      changeTab.onTrue();
    } else {
      setIncomeTotalizerInfoGroupTab(id);
    }
  };

  const handleOk = () => {
    resetPreliminarySnap();

    changeTab.onFalse();

    setIncomeTotalizerInfoGroupTab(tempTab);
  };

  return (
    <Stack width={'100%'} bgcolor={'white'} boxShadow={'rgba(0, 0, 0, 0.25) 0px 0px 5px'} padding={'14px 20px'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        bgcolor={'gray.60'}
        padding={'6px'}
        sx={{ ...(changeToIncomeTotalizer && { pointerEvents: 'none', opacity: 0.6, cursor: 'not-allowed' }) }}
      >
        <Grid container columnSpacing={2} rowSpacing={2}>
          {infoGroupItems.map((item) => (
            <Grid key={item.id} item>
              <AdSecondaryButton
                sx={{
                  height: 38,
                  color: item.id === incomeTotalizerInfoGroupTab ? 'white' : 'primary.main',
                  bgcolor: item.id === incomeTotalizerInfoGroupTab ? 'primary.main' : 'white',
                  fontWeight: item.id === incomeTotalizerInfoGroupTab ? 600 : 300,
                  borderRadius: '2px',
                  '&:hover': {
                    bgcolor: item.id === incomeTotalizerInfoGroupTab ? 'primary.main' : 'white',
                    boxShadow: 'none',
                  },
                }}
                onClick={() => handleChangeGroupTab(item.id)}
              >
                {item.label}
              </AdSecondaryButton>
            </Grid>
          ))}
        </Grid>
      </Stack>
      {incomeTotalizerInfoGroupTab === 2 && <Item02 />}
      {incomeTotalizerInfoGroupTab === 3 && <Item03 />}
      {incomeTotalizerInfoGroupTab === 9 && <Item09 />}

      <Modal
        open={changeTab.value}
        onClose={changeTab.onFalse}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disableAutoFocus
      >
        <Stack
          sx={{
            width: 430,
            bgcolor: 'white',
            minWidth: 'auto',
            maxHeight: '75vh',
            borderRadius: 1,
            p: 3,
          }}
        >
          <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3 }}>
            <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={changeTab.onFalse} />
          </Stack>
          <Stack sx={{ py: 3 }}>
            <Typography variant="dailog_warring">{`このタブを離れてもよろしいですか?\n行った変更が保存されない可能性があります。`}</Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ p: 3, pb: 6 }}>
            <AdPrimaryButton height={38} width={150} onClick={handleOk}>
              OK
            </AdPrimaryButton>
            <AdPrimaryButton height={38} width={150} onClick={changeTab.onFalse}>
              キャンセル
            </AdPrimaryButton>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};
