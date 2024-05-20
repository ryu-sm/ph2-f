import { authAtom, editMainTabStatusAtom, infoGroupTabAtom, preliminaryIdAtom } from '@/store';
import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Icons } from '@/assets';
import { Item01 } from './item-01';
import { Item02 } from './item-02';
import { Item03 } from './item-03';
import { Item04 } from './item-04';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { AdPrimaryButton, AdSecondaryButton } from '@/components/administrator/button';
import { Item05 } from './item-05';
import { Item06 } from './item-06';
import { Item07 } from './item-07';
import { Item08 } from './item-08';
import { useBoolean, useIsManager } from '@/hooks';
import { Item09 } from './item-09';
import { Item10 } from './item-10';
import { adGetUploadFile } from '@/services';

export const MainDetail = () => {
  const [infoGroupTab, setInfoGroupTab] = useRecoilState(infoGroupTabAtom);
  const [mainTabStatus, setMainTabStatus] = useRecoilState(editMainTabStatusAtom);
  const {
    preliminarySnap: { hasJoinGuarantor },
    checkUpdate,
    resetPreliminarySnap,
  } = usePreliminaryContext();

  const preliminaryId = useRecoilValue(preliminaryIdAtom);

  const isManager = useIsManager();

  const [uploadfile, setUploadFile] = useState(1);
  const fetchUploadFile = async () => {
    try {
      const res = await adGetUploadFile(preliminaryId);

      setUploadFile(res.data.upload_file);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isManager) {
      fetchUploadFile();
    }
  }, [isManager, preliminaryId]);

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
      ...(uploadfile === 1
        ? [
            {
              id: 9,
              label: '書類アップロード',
            },
          ]
        : []),

      {
        id: 10,
        label: '審査結果',
      },
    ];
  }, [hasJoinGuarantor, uploadfile]);

  const changeTab = useBoolean(false);
  const [tempTab, setTempTab] = useState(null);
  const handleChangeGroupTab = (id) => {
    if (checkUpdate() && mainTabStatus !== 3) {
      setTempTab(id);
      changeTab.onTrue();
    } else {
      setInfoGroupTab(id);
    }
  };

  const handleOk = () => {
    resetPreliminarySnap();

    changeTab.onFalse();

    setInfoGroupTab(tempTab);
  };

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
                onClick={() => handleChangeGroupTab(item.id)}
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
      {infoGroupTab === 9 && <Item09 />}
      {infoGroupTab === 10 && <Item10 />}

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
