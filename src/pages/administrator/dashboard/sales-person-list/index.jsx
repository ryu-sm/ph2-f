import { LinearProgress, Stack } from '@mui/material';
import { HeaderFilter } from '../common/header-filter';
import { SpCaseItem } from './list-item';
import { useRecoilValue } from 'recoil';
import { preliminarieListAtom, showProgressAtom } from '@/store';

export const SalesPersonList = () => {
  const showProgress = useRecoilValue(showProgressAtom);
  const preliminariesData = useRecoilValue(preliminarieListAtom);
  return (
    <Stack sx={{ height: '100%', marginX: 0, p: 0, flexGrow: 1 }} overflow={'auto'} mt={11} mb={8}>
      <HeaderFilter />
      <Stack pt={10}>{showProgress && <LinearProgress />}</Stack>
      <Stack p={3} pt={13} width={'100%'} spacing={3}>
        {preliminariesData.map((item) => (
          <SpCaseItem
            key={`${item.id}${item.provisional_after_result}${item.pair_loan_data?.provisional_after_result}`}
            item={item}
          />
        ))}
      </Stack>
    </Stack>
  );
};
