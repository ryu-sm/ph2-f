import { Box, Divider, Stack, Typography } from '@mui/material';
import { SortListButton } from './sort-list-button';
import { Icons } from '@/assets';
import { useBoolean, useDashboardContext, useIsManager } from '@/hooks';
import { widthConfig } from './width-config';
import { useRecoilValue } from 'recoil';
import { dashboardTabStatusAtom } from '@/store';
import { AdFilterModal } from './filter-modal';

export const HeaderFilter = () => {
  const isManager = useIsManager();
  const dashboardTabStatus = useRecoilValue(dashboardTabStatusAtom);
  const filetrModal = useBoolean(false);
  const { sortBy, sortOrder, handleSort } = useDashboardContext();
  const filterArray = [
    { name: 'apply_no', label: '受付番号', limitWidth: widthConfig[1] },
    { name: 'bank_name', label: '申込銀行', limitWidth: widthConfig[2] },
    { name: 'name_kanji', label: '申込人', limitWidth: widthConfig[3] },
    { name: 'created_at', label: '申込日時', limitWidth: widthConfig[4] },
    { name: 'desired_borrowing_date', label: '実行予定日', limitWidth: widthConfig[5] },
    { name: 'desired_loan_amount', label: '申込金額', limitWidth: widthConfig[6] },
    ...(isManager ? [{ name: 'provisional_status', label: '進捗状況', limitWidth: widthConfig[7] }] : []),
    { name: 'provisional_result', label: '仮審査結果', limitWidth: widthConfig[8] },
    { name: 'sales_area_id', label: 'エリア', limitWidth: widthConfig[9] },
    { name: 'sales_exhibition_hall_id', label: '展示場', limitWidth: widthConfig[10] },
    { name: 's_sales_person_id', label: '営業担当', limitWidth: widthConfig[11] },
    { name: 's_manager_id', label: '銀代担当', limitWidth: widthConfig[12] },
  ];
  return (
    <Stack
      position={'sticky'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      bgcolor={'white'}
      boxShadow={'rgba(59, 118, 129, 0.15) 0px 2px 8px'}
      minWidth={Object.values(widthConfig).reduce((acc, curr) => acc + curr, 0) + 40}
      sx={{ px: 5, width: 1, top: 0 }}
      zIndex={3}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bgcolor={'white'}
        height={40}
        width={1}
        sx={{ py: 3 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {filterArray.map((filterItem, index) => (
          <Stack
            key={index}
            spacing={1}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            width={1}
            maxWidth={filterItem.limitWidth}
            minWidth={filterItem.limitWidth}
            height={40}
          >
            <Typography variant="filter_label">{filterItem.label}</Typography>
            <SortListButton name={filterItem.name} sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />
          </Stack>
        ))}
      </Stack>
      <Box sx={{ width: 16, height: 16, position: 'relative', left: -8 }}>
        {dashboardTabStatus !== 2 && (
          <Icons.AdListFilterIcon sx={{ cursor: 'pointer', width: 16, height: 16 }} onClick={filetrModal.onTrue} />
        )}
      </Box>
    </Stack>
  );
};
