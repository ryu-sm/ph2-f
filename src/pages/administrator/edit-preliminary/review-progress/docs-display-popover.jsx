import { Icons } from '@/assets';
import { useIsManager } from '@/hooks';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { routeNames } from '@/router/settings';
import { editMainTabStatusAtom } from '@/store';
import { useTheme } from '@emotion/react';
import { Popover, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export const AdDocsDisplayPopover = ({ open, onClose, anchorEl }) => {
  const theme = useTheme();
  const isManager = useIsManager();
  const {
    preliminaryInfo: { p_applicant_persons__0, p_applicant_persons__1, p_borrowings, p_application_headers },
  } = usePreliminaryContext();
  const mainTab = useRecoilValue(editMainTabStatusAtom);

  const fileItems = useMemo(() => {
    const files_0 = [
      {
        label: 'A',
        title: '本人確認書類',
        show:
          p_applicant_persons__0.A__01__a?.length +
            p_applicant_persons__0.A__01__b?.length +
            p_applicant_persons__0.A__02?.length +
            p_applicant_persons__0.A__03__a?.length +
            p_applicant_persons__0.A__03__b?.length >
          0,
      },
      {
        label: 'B',
        title: '健康保険証',
        show: p_applicant_persons__0.B__a?.length + p_applicant_persons__0.B__b?.length > 0,
      },
      {
        label: 'C',
        title: '収入に関する書類',
        show:
          p_applicant_persons__0.C__01?.length +
            p_applicant_persons__0.C__02?.length +
            p_applicant_persons__0.C__03?.length +
            p_applicant_persons__0.C__04?.length +
            p_applicant_persons__0.C__05?.length >
          0,
      },
      {
        label: 'D',
        title: '非上場企業の役員の方の書類',
        show:
          p_applicant_persons__0.D__01?.length +
            p_applicant_persons__0.D__02?.length +
            p_applicant_persons__0.D__03?.length >
          0,
      },
      { label: 'E', title: '雇用契約に関する書類', show: p_applicant_persons__0.E?.length > 0 },
      {
        label: 'F',
        title: '親族経営の会社等にご勤務の方に関する書類',
        show:
          p_applicant_persons__0.F__01?.length +
            p_applicant_persons__0.F__02?.length +
            p_applicant_persons__0.F__03?.length >
          0,
      },
      { label: 'G', title: '物件についての書類', show: p_application_headers.G?.length > 0 },
      {
        label: 'H',
        title: '在留カード',
        show: p_applicant_persons__0.H__a?.length + p_applicant_persons__0.H__b?.length > 0,
      },
      { label: 'I', title: '返済予定表・利用明細書', show: p_borrowings.some((item) => item?.I?.length > 0) },
      { label: 'J', title: '提携会社の担当者名刺', show: p_application_headers.J?.length > 0 },
      { label: 'K', title: 'その他', show: p_applicant_persons__0.K?.length > 0 },
      { label: 'S', title: 'サイン', show: p_applicant_persons__0.S?.length > 0 },
    ];
    const files_1 = [
      {
        label: 'A',
        title: '本人確認書類',
        show:
          p_applicant_persons__1.A__01__a?.length +
            p_applicant_persons__1.A__01__b?.length +
            p_applicant_persons__1.A__02?.length +
            p_applicant_persons__1.A__03__a?.length +
            p_applicant_persons__1.A__03__b?.length >
          0,
      },
      {
        label: 'B',
        title: '健康保険証',
        show: p_applicant_persons__1.B__a?.length + p_applicant_persons__1.B__b?.length > 0,
      },
      {
        label: 'C',
        title: '収入に関する書類',
        show:
          p_applicant_persons__1.C__01?.length +
            p_applicant_persons__1.C__02?.length +
            p_applicant_persons__1.C__03?.length +
            p_applicant_persons__1.C__04?.length +
            p_applicant_persons__1.C__05?.length >
          0,
      },
      {
        label: 'D',
        title: '非上場企業の役員の方の書類',
        show:
          p_applicant_persons__1.D__01?.length +
            p_applicant_persons__1.D__02?.length +
            p_applicant_persons__1.D__03?.length >
          0,
      },
      { label: 'E', title: '雇用契約に関する書類', show: p_applicant_persons__1.E?.length > 0 },
      {
        label: 'F',
        title: '親族経営の会社等にご勤務の方に関する書類',
        show:
          p_applicant_persons__1.F__01?.length +
            p_applicant_persons__1.F__02?.length +
            p_applicant_persons__1.F__03?.length >
          0,
      },
      {
        label: 'H',
        title: '在留カード',
        show: p_applicant_persons__1.H__a?.length + p_applicant_persons__1.H__b?.length > 0,
      },
      { label: 'K', title: 'その他', show: p_applicant_persons__1.K?.length > 0 },
    ];

    if (mainTab === 1) {
      return files_0.filter((item) => item.show);
    }
    if (mainTab === 2) {
      return files_1.filter((item) => item.show);
    }
  }, [p_applicant_persons__0, p_applicant_persons__1, p_borrowings, p_application_headers, mainTab, open]);

  const handleClick = (item) => {
    const path = `${
      isManager ? routeNames.adManagerFilesViewPage.path : routeNames.adSalesPersonFilesViewPage.path
    }?p_application_header_id=${p_application_headers?.id}&type=${mainTab - 1}&category=${item.label}`;
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
