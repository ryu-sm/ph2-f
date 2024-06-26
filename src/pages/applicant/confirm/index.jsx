import { ApConfirmGroup, ApConfirmItemGroup, ApPageTitle } from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { authAtom, localApplication } from '@/store';
import { formatJapanDate } from '@/utils';
import { useRecoilValue } from 'recoil';
import { ApStep01Info } from '../step-01/step-01-info';
import { ApStep02Info } from '../step-02/step-02-info';
import { ApStep03Info } from '../step-03/step-03-info';
import { ApStep04Info } from '../step-04/step-04-info';
import { ApStep05Info } from '../step-05/step-05-info';
import { ApStep06Info } from '../step-06/step-06-info';
import { ApStep07Info } from '../step-07/step-07-info';
import { ApStep08Info } from '../step-08/step-08-info';
import { ApStep09Info } from '../step-09/step-09-info';
import { ApStep10Info } from '../step-10/step-10-info';
import { ApStep11Info } from '../step-11/step-11-info';
import { ApStep12Info } from '../step-12/step-12-info';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useCallback, useEffect, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useApplicationContext } from '@/hooks';

export const ApConfirmPage = () => {
  const navigate = useNavigate();

  const { p_application_headers, hasJoinGuarantor, hasIncomeTotalizer } = useRecoilValue(localApplication);

  const apSteps = useMemo(
    () => [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 4,
            },
            {
              id: 5,
            },
          ]
        : []),
      ...(hasJoinGuarantor
        ? [
            {
              id: 6,
            },
          ]
        : []),
      {
        id: 7,
      },
      {
        id: 8,
      },
      {
        id: 9,
      },
      {
        id: 10,
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 11,
            },
          ]
        : []),
      {
        id: 12,
      },
      {
        id: 13,
      },
      {
        id: 14,
      },
    ],
    [hasIncomeTotalizer, hasJoinGuarantor]
  );

  const { agentSended } = useRecoilValue(authAtom);

  const { refreshsendedApllication } = useApplicationContext();

  useEffect(() => {
    if (agentSended) {
      refreshsendedApllication();
    }
  }, [agentSended]);

  const getIndex = useCallback(
    (id) => {
      return apSteps.findIndex((item) => item.id === id);
    },
    [apSteps]
  );

  return (
    <ApLayout hasMenu pb={13}>
      <Box sx={{ background: (theme) => theme.palette.background.gradation, pb: 14 }}>
        <ApPageTitle py={8}>{`住宅ローン仮審査\n申込内容`}</ApPageTitle>
        <Stack alignItems={'center'} sx={{ pb: 8 }}>
          <Stack
            sx={{
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: 'primary.main',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Stack
              alignItems={'center'}
              sx={{
                bgcolor: 'white',
                borderRadius: '7px',
              }}
            >
              <Stack
                alignItems={'center'}
                sx={{
                  py: 1,
                  width: 1,
                  bgcolor: 'primary.40',
                  borderTopRightRadius: '7px',
                  borderTopLeftRadius: '7px',
                }}
              >
                <Typography variant="form_item_label" color={'text.main'}>
                  受付番号
                </Typography>
              </Stack>
              <Stack alignItems={'center'} sx={{ p: 3 }}>
                <Typography variant="page_title" color={'text.main'}>
                  {p_application_headers.apply_no}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <ApConfirmGroup label={'はじめに'}>
          <ApConfirmItemGroup label={'同意日'}>
            {p_application_headers.apply_date ? formatJapanDate(p_application_headers.apply_date, true) : 'ー'}
          </ApConfirmItemGroup>
        </ApConfirmGroup>
        {getIndex(1) >= 0 && <ApStep01Info stepIndex={String(getIndex(1) + 1).padStart(2, '0')} />}
        {getIndex(2) >= 0 && <ApStep02Info stepIndex={String(getIndex(2) + 1).padStart(2, '0')} />}
        {getIndex(3) >= 0 && <ApStep03Info stepIndex={String(getIndex(3) + 1).padStart(2, '0')} />}
        {getIndex(4) >= 0 && <ApStep04Info stepIndex={String(getIndex(4) + 1).padStart(2, '0')} />}
        {getIndex(5) >= 0 && <ApStep05Info stepIndex={String(getIndex(5) + 1).padStart(2, '0')} />}
        {getIndex(6) >= 0 && <ApStep06Info stepIndex={String(getIndex(6) + 1).padStart(2, '0')} />}
        {getIndex(7) >= 0 && <ApStep07Info stepIndex={String(getIndex(7) + 1).padStart(2, '0')} />}
        {getIndex(8) >= 0 && <ApStep08Info stepIndex={String(getIndex(8) + 1).padStart(2, '0')} />}
        {getIndex(9) >= 0 && <ApStep09Info stepIndex={String(getIndex(9) + 1).padStart(2, '0')} />}
        {getIndex(10) >= 0 && <ApStep10Info stepIndex={String(getIndex(10) + 1).padStart(2, '0')} />}
        {getIndex(11) >= 0 && <ApStep11Info stepIndex={String(getIndex(11) + 1).padStart(2, '0')} />}
        {getIndex(12) >= 0 && <ApStep12Info stepIndex={String(getIndex(12) + 1).padStart(2, '0')} />}

        <ApStepFooter left={() => navigate(routeNames.apTopPage.path)} />
      </Box>
    </ApLayout>
  );
};
