import { AdMainWrapper } from '@/containers';
import { useCurrSearchParams, useIsManager } from '@/hooks';

import { preliminaryId } from '@/store';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';
import { AdReviewProgress } from './review-progress';
import { EditTabs } from './edit-tabs';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { PreliminaryProvider } from '@/contexts/preliminary';
import { AdPrimaryButton } from '@/components/administrator/button';

const Content = () => {
  const isManager = useIsManager();
  // 设定ID
  const p_application_header_id = useCurrSearchParams().get('id');
  const setPreliminaryId = useSetRecoilState(preliminaryId);

  useEffect(() => {
    setPreliminaryId(p_application_header_id);
  }, []);

  const { status, preliminaryInfo, refreshPreliminary } = usePreliminaryContext();

  useEffect(() => {
    console.log(preliminaryInfo);
  }, [preliminaryInfo]);

  return (
    <AdMainWrapper
      leftContent={
        <Typography variant="main_page_title" fontWeight={600} color="text.normal">
          {`申込内容の修正・確認　［ ${11}${22} 様］`}
        </Typography>
      }
      rightAddItems={
        <Stack spacing={3} direction={'row'} alignContent={'center'}>
          <AdPrimaryButton width={65}>メモ</AdPrimaryButton>
          <AdPrimaryButton width={115}>メッセージ画面へ</AdPrimaryButton>
        </Stack>
      }
    >
      <Stack sx={{ height: 1 }}>
        {status === 'loading' && <LinearProgress />}
        {status === 'hasValue' && (
          <Stack>
            <AdReviewProgress />
            <EditTabs premliminaryInfo={preliminaryInfo} />
          </Stack>
        )}
      </Stack>
    </AdMainWrapper>
  );
};

export const EditPreliminary = () => {
  return (
    <PreliminaryProvider>
      <Content />
    </PreliminaryProvider>
  );
};
