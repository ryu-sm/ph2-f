import { AdMainWrapper } from '@/containers';
import { useBoolean, useCurrSearchParams, useIsManager } from '@/hooks';

import { preliminaryIdAtom } from '@/store';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { AdReviewProgress } from './review-progress';
import { EditTabs } from './edit-tabs';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { PreliminaryProvider } from '@/contexts/preliminary';
import { AdPrimaryButton } from '@/components/administrator/button';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { adGetManagrPreliminariyAccess, adGetSalesPersonPreliminariyAccess } from '@/services';
import { UnAccessModal } from '../dashboard/common/un-access-modal';

const Content = () => {
  const isManager = useIsManager();
  const navigator = useNavigate();
  // 设定ID
  const p_application_header_id = useCurrSearchParams().get('id');
  const setPreliminaryId = useSetRecoilState(preliminaryIdAtom);

  useEffect(() => {
    setPreliminaryId(p_application_header_id);
  }, []);

  const { status, preliminaryInfo } = usePreliminaryContext();

  const fullNmae = useMemo(() => {
    if (
      !!preliminaryInfo?.p_applicant_persons__0?.last_name_kanji &&
      !!preliminaryInfo?.p_applicant_persons__0?.first_name_kanji
    ) {
      return `　［ ${preliminaryInfo?.p_applicant_persons__0?.last_name_kanji}${preliminaryInfo?.p_applicant_persons__0?.first_name_kanji} 様］`;
    } else {
      return '';
    }
  }, [preliminaryInfo]);

  const unAccessModal = useBoolean(false);
  const [access, setAccess] = useState(true);
  const checkAccess = async () => {
    try {
      if (isManager) {
        const res = await adGetManagrPreliminariyAccess(p_application_header_id);

        if (!res.data?.access) {
          setAccess(false);
          unAccessModal.onTrue();
          return;
        }
      } else {
        try {
          const res = await adGetSalesPersonPreliminariyAccess(p_application_header_id);

          if (!res.data?.access) {
            setAccess(false);
            unAccessModal.onTrue();
            return;
          }
        } catch (error) {
          toast.error(API_500_ERROR);
        }
      }
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };
  useEffect(() => {
    checkAccess();
  }, []);

  return (
    <AdMainWrapper
      leftContent={
        <Typography variant="main_page_title" fontWeight={600} color="text.normal">
          {`申込内容の修正・確認${access ? fullNmae : ''}`}
        </Typography>
      }
      rightAddItems={
        <Stack spacing={3} direction={'row'} alignContent={'center'}>
          {isManager && (
            <AdPrimaryButton
              width={65}
              onClick={() =>
                navigator(
                  `${routeNames.adManagerMemoPage.path}?id=${p_application_header_id}&&name=${preliminaryInfo?.p_applicant_persons__0?.last_name_kanji} ${preliminaryInfo?.p_applicant_persons__0?.first_name_kanji}`
                )
              }
            >
              メモ
            </AdPrimaryButton>
          )}
          <AdPrimaryButton
            width={115}
            onClick={() => navigator(`/manager/messages-detail?id=${p_application_header_id}&type=1`)}
          >
            メッセージ画面へ
          </AdPrimaryButton>
        </Stack>
      }
    >
      <Stack sx={{ height: 1 }}>
        {status === 'loading' && <LinearProgress />}
        {status === 'hasValue' && access && (
          <Stack>
            {isManager && <AdReviewProgress />}
            <EditTabs />
          </Stack>
        )}
      </Stack>
      <UnAccessModal
        isOpen={unAccessModal.value}
        onClose={async () => {
          unAccessModal.onFalse();
          if (isManager) {
            navigator(routeNames.adManagerDashboardPage.path);
          } else {
            navigator(routeNames.adSalesPersonDashboardPage.path);
          }
        }}
      />
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
