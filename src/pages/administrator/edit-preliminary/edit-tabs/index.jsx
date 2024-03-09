import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editMainTabStatusAtom } from '@/store';
import { MainDetail } from '../main-panel';

export const EditTabs = ({ premliminaryInfo }) => {
  const { p_application_headers } = premliminaryInfo;
  const [mainTabStatus, setMainTabStatus] = useRecoilState(editMainTabStatusAtom);

  const byIncomeTotalizer = useMemo(
    () => p_application_headers.loan_type === '3' || p_application_headers.loan_type === '4',
    [p_application_headers]
  );

  const byPairLoan = useMemo(() => p_application_headers.loan_type === '2', [p_application_headers]);

  const tabItems = useMemo(() => {
    return [
      {
        value: 1,
        label: byPairLoan ? '申込人A' : '申込人',
      },
      ...(byIncomeTotalizer
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
  }, [byIncomeTotalizer, byPairLoan]);

  const handleSwap = () => {};

  return (
    <Stack sx={{ width: '100%', height: '100%', pt: '10px', pb: 10, px: 10, position: 'relative' }}>
      <Tabs
        value={mainTabStatus}
        onChange={(_, value) => setMainTabStatus(value)}
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
                color={item.value === mainTabStatus ? 'gray.100' : 'primary.main'}
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
      {mainTabStatus === 1 && <MainDetail premliminaryInfo={premliminaryInfo} />}
    </Stack>
  );
};
