import { LinearProgress, Stack } from '@mui/material';
import { HeaderFilter } from '../common/header-filter';
import { AdCaseItem } from './list-item';
import { widthConfig } from '../common/width-config';
import { useRecoilValue } from 'recoil';
import { preliminarieListAtom, showProgressAtom } from '@/store';

export const ManagerList = () => {
  const showProgress = useRecoilValue(showProgressAtom);
  const preliminariesData = useRecoilValue(preliminarieListAtom);

  return (
    <Stack sx={{ height: '100%', flexGrow: 1 }} overflow={'auto'} mt={11} mb={8}>
      <HeaderFilter />
      <Stack>{showProgress && <LinearProgress />}</Stack>
      <Stack
        p={3}
        width={1}
        spacing={3}
        minWidth={Object.values(widthConfig).reduce((acc, curr) => acc + curr, 0) + 40}
        overflow={'auto'}
      >
        {preliminariesData.map((item) => (
          <AdCaseItem
            key={`${item.id}${item.provisional_after_result}${item.pair_loan_data?.provisional_after_result}`}
            item={item}
          />
        ))}
      </Stack>
    </Stack>
  );
};
