import { ReviewDetail } from '@/components/admin/reivew-detail';
import { ReviewProgress } from '@/components/admin/review-progress';
import { AdEditWrapper } from '@/containers/ad-layout/ad-edit-wrapper';
import { Stack } from '@mui/material';

export const SpEditCasePage = () => {
  return (
    <AdEditWrapper>
      <Stack sx={{ height: '100%', marginX: 0, p: 0 }} mt={11} mb={8}>
        <ReviewProgress />
        <ReviewDetail />
      </Stack>
    </AdEditWrapper>
  );
};
