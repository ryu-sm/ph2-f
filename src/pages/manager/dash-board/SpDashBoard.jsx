import { SpCaseList } from '@/components/admin/case-list/sp-case-list';
import { CaseListFilter } from '@/components/admin/case-list-filter';
import { AdMainWrapper } from '@/containers/ad-layout/ad-main-wrapper';
import { Stack } from '@mui/material';

export const SpDashBoardPage = () => {
  return (
    <AdMainWrapper>
      <Stack sx={{ height: '100%', marginX: 0, p: 0, flexGrow: 1 }} overflow={'auto'} mt={11} mb={8}>
        <CaseListFilter />
        <SpCaseList />
      </Stack>
    </AdMainWrapper>
  );
};
