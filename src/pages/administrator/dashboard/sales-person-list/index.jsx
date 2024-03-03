import { LinearProgress, Stack } from '@mui/material';
import { HeaderFilter } from '../common/header-filter';
import { SpCaseItem } from './list-item';
import { useSalesPersonPreliminaries } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { showProgressAtom } from '@/store';

export const SalesPersonList = () => {
  const { preliminariesData } = useSalesPersonPreliminaries();
  const showProgress = useRecoilValue(showProgressAtom);

  return (
    <Stack sx={{ height: '100%', marginX: 0, p: 0, flexGrow: 1 }} overflow={'auto'} mt={11} mb={8}>
      <HeaderFilter />
      {showProgress && <LinearProgress />}
      <Stack p={3} width={'100%'} spacing={3}>
        {preliminariesData.map((item) => (
          <SpCaseItem key={item.id} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};
