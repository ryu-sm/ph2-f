import { AdListFilterIcon } from '@/assets/icons/ad-list-filter';
import { Box, Stack, Typography } from '@mui/material';
import { SortListButton } from './sort-list-button';
import { SectionDivider } from '@/components/admin/common/Divider';

export const CaseListFilter = () => {
  const filterArray = [
    { name: '受付番号', label: '受付番号', style: { width: 180 } },
    { name: '申込銀行', label: '申込銀行', style: { width: 180 } },
    { name: '申込人', label: '申込人', style: { width: 180 } },
    { name: '申込日時', label: '申込日時', style: { width: 130 } },
    { name: '実行予定日', label: '実行予定日', style: { width: 130 } },
    { name: '申込金額', label: '申込金額', style: { width: 130 } },
    { name: '進捗状況', label: '進捗状況', style: { width: 200 } },
    { name: '仮審査結果', label: '仮審査結果', style: { width: 140 } },
    { name: 'エリア', label: 'エリア', style: { width: 160 } },
    { name: '営業担当', label: '営業担当', style: { width: 160 } },
    { name: '銀代担当', label: '銀代担当', style: { width: 160 } },
  ];
  return (
    <Box
      display={'inline-flex'}
      alignItems={'center'}
      bgcolor={'white'}
      minWidth={'max-content'}
      boxShadow={'rgba(59, 118, 129, 0.15) 0px 2px 8px'}
    >
      {filterArray.map((filterItem, index) => (
        <Stack
          key={filterItem.name}
          flexShrink={0}
          spacing={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          style={filterItem.style}
          position={'relative'}
          height={40}
        >
          <Typography variant="filter_label">{filterItem.label}</Typography>
          <SortListButton />
          {index !== filterArray.length - 1 && <SectionDivider orientation="vertical" />}
        </Stack>
      ))}
      <AdListFilterIcon sx={{ cursor: 'pointer', width: 16, height: 16, marginRight: 3 }} />
    </Box>
  );
};
