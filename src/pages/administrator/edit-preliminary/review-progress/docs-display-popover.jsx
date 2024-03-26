import { Icons } from '@/assets';
import { useIsManager } from '@/hooks';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { routeNames } from '@/router/settings';
import { editMainTabStatusAtom } from '@/store';
import { useTheme } from '@emotion/react';
import { Popover, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export const AdDocsDisplayPopover = ({ open, onClose, anchorEl, items }) => {
  const theme = useTheme();
  const isManager = useIsManager();
  const {
    preliminaryInfo: { p_uploaded_files, p_borrowings, p_application_headers },
  } = usePreliminaryContext();
  const mainTab = useRecoilValue(editMainTabStatusAtom);

  const fileItems = useMemo(() => {
    const basic0 = [
      { label: 'A', title: '本人確認書類' },
      { label: 'B', title: '健康保険証' },
      { label: 'C', title: '収入に関する書類' },
      { label: 'D', title: '非上場企業の役員の方の書類' },
      { label: 'E', title: '雇用契約に関する書類' },
      { label: 'F', title: '親族経営の会社等にご勤務の方に関する書類' },
      { label: 'G', title: '物件についての書類' },
      { label: 'H', title: '在留カード' },
      { label: 'I', title: '返済予定表・利用明細書' },
      { label: 'J', title: '提携会社の担当者名刺' },
      { label: 'K', title: 'その他' },
      { label: 'S', title: 'サイン' },
    ];
    const basic1 = [
      { label: 'A', title: '本人確認書類' },
      { label: 'B', title: '健康保険証' },
      { label: 'C', title: '収入に関する書類' },
      { label: 'D', title: '非上場企業の役員の方の書類' },
      { label: 'E', title: '雇用契約に関する書類' },
      { label: 'F', title: '親族経営の会社等にご勤務の方に関する書類' },
      // { label: 'G', title: '物件についての書類' },
      { label: 'H', title: '在留カード' },
      { label: 'K', title: 'その他' },
    ];
    const temp = [];
    const fileList = Object.keys(p_uploaded_files).map((key) => ({
      key: key,
      value: p_uploaded_files[key],
    }));
    const basic = mainTab === 1 ? basic0 : basic1;
    const prefix = mainTab === 1 ? '__0__' : '__1__';
    basic.forEach((item) => {
      if (item.label === 'G') {
        if (fileList.some(({ key, value }) => key.includes(`${item.label}`) && value.length > 0)) {
          temp.push(item);
        }
      }
      if (item.label === 'J') {
        if (fileList.some(({ key, value }) => key.includes(`${item.label}`) && value.length > 0)) {
          temp.push(item);
        }
      }
      if (item.label === 'S') {
        if (fileList.some(({ key, value }) => key.includes(`${item.label}`) && value.length > 0)) {
          temp.push(item);
        }
      }
      if (item.label === 'I') {
        if (p_borrowings.some((item) => item['p_borrowings__I'].length > 0)) {
          temp.push(item);
        }
      } else {
        if (fileList.some(({ key, value }) => key.includes(`${prefix}${item.label}`) && value.length > 0)) {
          temp.push(item);
        }
      }
    });
    console.log(temp);
    return temp;
  }, [p_uploaded_files, p_borrowings, mainTab]);
  console.log(mainTab);
  const handleClick = (item) => {
    const path = `${
      isManager ? routeNames.adManagerFilesViewPage.path : routeNames.adSalesPersonFilesViewPage.path
    }?p_application_header_id=${p_application_headers?.id}&type=${mainTab === 1 ? '0' : '1'}&category=${item.label}`;
    window.open(path);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{
        marginTop: 7,
        left: -17,
        '.MuiPopover-paper': {
          overflow: 'visible',
          boxShadow: 'none',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        },
      }}
    >
      <Stack
        overflow={'hidden'}
        sx={{
          border: `1px solid ${theme.palette.gray[80]}`,
          minWidth: 190,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      >
        {fileItems.map((item, index) => {
          return (
            <Stack
              key={item.label}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{
                cursor: 'pointer',
                p: '10px',
                borderBottom: index !== fileItems.length - 1 ? `1px solid ${theme.palette.gray[80]}` : 'none',
              }}
              onClick={() => handleClick(item)}
            >
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography variant="edit_header_tools" color={'primary.main'}>
                  {item.label}
                </Typography>
                <Typography variant="edit_header_tools" sx={{ whiteSpace: 'nowrap' }}>
                  {item.title}
                </Typography>
              </Stack>
              <Icons.AdExportDocsIcon />
            </Stack>
          );
        })}
      </Stack>
    </Popover>
  );
};
