import { LinearProgress, Stack } from '@mui/material';
import { HeaderFilter } from '../common/header-filter';
import { SpCaseItem } from './list-item';
import { widthConfig } from '../common/width-config';
import { useDashboardContext } from '@/hooks';
import { useEffect } from 'react';

export const SalesPersonList = () => {
  const { status, preliminarieList, refreshPreliminarieList } = useDashboardContext();

  useEffect(() => {
    refreshPreliminarieList();
  }, []);
  return (
    <Stack sx={{ height: '100%', marginX: 0, p: 0, flexGrow: 1 }} overflow={'auto'} mb={8}>
      <HeaderFilter />
      {status === 'loading' && <LinearProgress />}
      {status === 'hasValue' && (
        <Stack
          p={3}
          width={1}
          spacing={3}
          minWidth={Object.values(widthConfig).reduce((acc, curr) => acc + curr, 0) + 40}
          overflow={'auto'}
        >
          {preliminarieList.map((item) => (
            <SpCaseItem
              key={`${item.id}${item.provisional_after_result}${item.pair_loan_data?.provisional_after_result}`}
              item={item}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
