import { API_500_ERROR } from '@/constant';
import { AdMainWrapper } from '@/containers';
import { useCurrSearchParams, useIsManager } from '@/hooks';
import { adGetPreliminary } from '@/services';
import { editMainTabStatusAtom, preliminaryAotm, showProgressAtom } from '@/store';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AdReviewProgress } from './review-progress';
import { EditTabs } from './edit-tabs';

export const EditPreliminary = () => {
  const isManager = useIsManager();
  const p_application_header_id = useCurrSearchParams().get('id');
  const [preliminaryInfo, setPreliminaryInfo] = useRecoilState(preliminaryAotm);
  const [showProgress, setShowProgress] = useRecoilState(showProgressAtom);

  const queryPreliminary = useCallback(async () => {
    try {
      setShowProgress(true);
      const res = await adGetPreliminary(p_application_header_id);
      console.log(res.data);
      setPreliminaryInfo((pre) => ({ ...pre, ...res.data }));
      setShowProgress(false);
    } catch (error) {
      setShowProgress(false);
      console.log(error);
      toast.error(API_500_ERROR);
    }
  }, [p_application_header_id]);

  useEffect(() => {
    queryPreliminary();
  }, [p_application_header_id]);

  return (
    <AdMainWrapper
      leftContent={
        <Typography variant="main_page_title" fontWeight={600} color="text.normal">
          {`申込内容の修正・確認　［ ${preliminaryInfo.p_applicant_persons__0.last_name_kanji}${preliminaryInfo.p_applicant_persons__0.first_name_kanji} 様］`}
        </Typography>
      }
      rightAddItems={
        <Stack spacing={3} direction={'row'} alignContent={'center'}>
          <Button
            sx={{
              p: 0,
              bgcolor: 'white',
              boxShadow: 'none',
              width: 65,
              minHeight: 25,
              height: 25,
              borderRadius: 1,
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'white',
                border: '1px solid',
                borderColor: (theme) => theme.palette.primary.main,
                opacity: 0.8,
              },
            }}
          >
            <Typography variant="login_button" fontWeight={400} color="primary.main">
              メモ
            </Typography>
          </Button>
          <Button
            sx={{
              p: 0,
              bgcolor: 'white',
              boxShadow: 'none',
              width: 115,
              minHeight: 25,
              height: 25,
              borderRadius: 1,
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'white',
                border: '1px solid',
                borderColor: (theme) => theme.palette.primary.main,
                opacity: 0.8,
              },
            }}
          >
            <Typography variant="login_button" fontWeight={400} color="primary.main">
              メッセージ画面へ
            </Typography>
          </Button>
        </Stack>
      }
    >
      <Stack sx={{ height: 1, mt: 10, mb: 8 }}>
        {showProgress ? (
          <LinearProgress />
        ) : (
          <Stack>
            <AdReviewProgress />
            <EditTabs />
          </Stack>
        )}
      </Stack>
    </AdMainWrapper>
  );
};
