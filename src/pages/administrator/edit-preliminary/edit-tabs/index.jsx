import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { IconButton, Modal, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editMainTabStatusAtom, infoGroupTabAtom, preliminaryIdAtom } from '@/store';
import { MainDetail } from '../main-panel';
import { Icons } from '@/assets';
import { AdPrimaryButton } from '@/components/administrator/button';
import { useBoolean } from '@/hooks';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { PairDetail } from '../pair-panel';
import { IncomeTotalizerDetail } from '../income-totalizer-panel';
import { ExaminationResultButtons } from '../common/examination-result-buttons';

export const EditTabs = ({}) => {
  const {
    // preliminaryInfo: { p_application_headers },
    preliminarySnap: { hasIncomeTotalizer, p_application_headers },
    checkUpdate,
    resetPreliminarySnap,
    refreshPreliminary,
  } = usePreliminaryContext();
  const [mainTabStatus, setMainTabStatus] = useRecoilState(editMainTabStatusAtom);
  const [infoGroupTab, setInfoGroupTab] = useRecoilState(infoGroupTabAtom);
  const setPreliminaryId = useSetRecoilState(preliminaryIdAtom);

  const byPairLoan = useMemo(
    () => p_application_headers?.loan_type === '2' && !!p_application_headers?.pair_loan_id,
    [p_application_headers]
  );

  const tabItems = useMemo(() => {
    return [
      {
        value: 1,
        label: byPairLoan ? '申込人A' : '申込人A',
      },
      ...(hasIncomeTotalizer
        ? [
            {
              value: 2,
              label: '収入合算者',
            },
          ]
        : []),
      ...(byPairLoan
        ? [
            {
              value: 3,
              label: '申込人B',
            },
          ]
        : []),
    ];
  }, [hasIncomeTotalizer, byPairLoan]);

  const changeTab = useBoolean(false);

  const [tempTab, setTempTab] = useState(null);
  const handleChangeMainTab = (id) => {
    if (checkUpdate()) {
      setTempTab(id);
      changeTab.onTrue();
      return;
    } else {
      if ((id === 3 || id === 1) && byPairLoan) {
        setPreliminaryId(p_application_headers.pair_loan_id);
      }

      setMainTabStatus(id);
    }
    if (id === 2) {
      setInfoGroupTab(2);
    } else {
      setInfoGroupTab(1);
    }
  };

  const handleOk = () => {
    resetPreliminarySnap();

    changeTab.onFalse();

    setMainTabStatus(tempTab);

    if (tempTab === 2) {
      setInfoGroupTab(2);
    } else {
      setInfoGroupTab(1);
    }
  };

  const handleSwap = () => {
    setPreliminaryId(p_application_headers.pair_loan_id);
    refreshPreliminary();
    setMainTabStatus(1);
    setInfoGroupTab(1);
  };

  return (
    <Stack sx={{ width: '100%', height: '100%', pt: '10px', pb: 10, px: 10, position: 'relative' }}>
      <Tabs
        value={mainTabStatus}
        onChange={(_, value) => handleChangeMainTab(value)}
        sx={{ height: 38 }}
        TabIndicatorProps={{ sx: { height: '3px' } }}
      >
        {tabItems.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            label={
              <Typography
                variant="applicant_name"
                fontWeight={item.value === mainTabStatus ? 600 : 300}
                color={'gray.100'}
              >
                {item.label}
              </Typography>
            }
            sx={{
              width: 160,
              color: 'gray.100',
              '&.Mui-selected': {
                color: 'gray.100',
              },
            }}
          />
        ))}
      </Tabs>
      {byPairLoan && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 33,
            left: 180,
            transform: 'translateY(-50%)',
            color: 'primary.main',
          }}
          onClick={handleSwap}
        >
          <SwapHorizIcon />
        </IconButton>
      )}
      {mainTabStatus === 1 && <MainDetail />}
      {mainTabStatus === 2 && <IncomeTotalizerDetail />}
      {mainTabStatus === 3 && <PairDetail />}

      {(mainTabStatus === 1 || mainTabStatus === 3) && infoGroupTab === 10 && <ExaminationResultButtons />}

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
