import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { AdExportExcelIcon } from '@/assets/icons/ad-export-excel';
import { AdProgressArrowRight } from '@/assets/icons/ad-progress-arrow-right';
import { useTheme } from '@emotion/react';
import { Button, Stack, Typography } from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { DocsDisplayPopover } from '../docs-display-popover';
import { DOCS_CATEGORY } from '@/constant/docs-category';
import { useSetRecoilState } from 'recoil';
import { applicationAtom } from '@/store';

export const ReviewProgress = () => {
  const reviewProgressLabel = [
    { label: '書類確認', value: 0 },
    { label: '書類不備対応中', value: 1 },
    { label: '内容確認', value: 2 },
    { label: '承認', value: 3 },
    { label: '銀行へデータ連携', value: 4 },
    { label: '提携会社へ審査結果公開', value: 5 },
    { label: '申込人へ審査結果公開', value: 6 },
  ];

  const activeValue = 2;
  const theme = useTheme();
  const checkBgColor = (value) => {
    if (value < activeValue) {
      return 'gray.80';
    } else if (value === activeValue) {
      return 'primary.main';
    } else {
      return 'white';
    }
  };

  const checkBorder = (value, index) => {
    if (value <= activeValue) {
      return 'none';
    } else if (index === 4) {
      return `1px solid ${theme.palette.secondary[80]}`;
    } else if (index < 4 && value > activeValue) {
      return `1px solid ${theme.palette.primary.main}`;
    }
    return `1px solid ${theme.palette.gray[100]}`;
  };

  const checkTextColor = (value, index) => {
    if (value <= activeValue) {
      return 'white';
    } else if (index < 4 && value > activeValue) {
      return 'primary.main';
    } else if (index === 4) {
      return 'secondary.80';
    }
    return 'gray.100';
  };

  const checkIsDisabled = (value, index) => {
    if (value < activeValue) {
      return true;
    } else if (index === activeValue + 1) {
      return false;
    }
    return true;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const docsData = {
    p_applicant_persons__0__H__a: [],
    p_applicant_persons__0__H__b: [],
    G: [],
    p_applicant_persons__0__A__01__a: [],
    p_applicant_persons__0__A__01__b: [],
    p_applicant_persons__0__A__02: [],
    p_applicant_persons__0__A__03__a: [],
    p_applicant_persons__0__A__03__b: [],
    p_applicant_persons__0__B__a: [],
    p_applicant_persons__0__B__b: [],
    p_applicant_persons__0__C__01: [],
    p_applicant_persons__0__C__02: [],
    p_applicant_persons__0__C__03: [],
    p_applicant_persons__0__C__04: [],
    p_applicant_persons__0__C__05: [],
    p_applicant_persons__0__D__01: [],
    p_applicant_persons__0__D__02: [],
    p_applicant_persons__0__D__03: [],
    p_applicant_persons__0__E: [],
    p_applicant_persons__0__F__01: [],
    p_applicant_persons__0__F__02: [],
    p_applicant_persons__0__F__03: [],
    p_applicant_persons__0__K: [],
    p_applicant_persons__0__I__01: [
      { src: 'https://via.placeholder.com/150', name: 'Placeholder Image 1' },
      { src: 'https://via.placeholder.com/130', name: 'Placeholder Image 2' },
      { src: 'https://via.placeholder.com/140', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/160', name: 'Placeholder Image 4' },
      { src: 'https://via.placeholder.com/170', name: 'Placeholder Image 5' },
    ],
    p_applicant_persons__0__I__02: [
      { src: 'https://via.placeholder.com/110', name: 'Placeholder Image 1' },
      { src: 'https://via.placeholder.com/60', name: 'Placeholder Image 2' },
      { src: 'https://via.placeholder.com/90', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/66', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/65', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/54', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/43', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/52', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/32', name: 'Placeholder Image 3' },
      { src: 'https://via.placeholder.com/55', name: 'Placeholder Image 3' },
    ],
    p_applicant_persons__0__I__03: [
      { src: 'https://via.placeholder.com/100', name: 'Placeholder Image 1' },
      { src: 'https://via.placeholder.com/99', name: 'Placeholder Image 2' },
      { src: 'https://via.placeholder.com/88', name: 'Placeholder Image 3' },
    ],
    p_applicant_persons__0__I__04: [
      {
        src: '/pdfs/個人情報の取扱いに関する同意書兼表明および確約書.pdf',
        name: '個人情報の取扱いに関する同意書兼表明および確約書.pdf',
      },
    ],
    p_applicant_persons__0__I__05: [],
    p_applicant_persons__0__I__06: [],
    p_applicant_persons__0__I__07: [],
    p_applicant_persons__0__I__08: [],
    p_applicant_persons__0__J: [],
    p_applicant_persons__0__S: [],

    p_applicant_persons__1__H__a: [],
    p_applicant_persons__1__H__b: [],
    p_applicant_persons__1__A__01__a: [],
    p_applicant_persons__1__A__01__b: [],
    p_applicant_persons__1__A__02: [],
    p_applicant_persons__1__A__03__a: [],
    p_applicant_persons__1__A__03__b: [],
    p_applicant_persons__1__B__a: [],
    p_applicant_persons__1__B__b: [],
    p_applicant_persons__1__C__01: [],
    p_applicant_persons__1__C__02: [],
    p_applicant_persons__1__C__03: [],
    p_applicant_persons__1__C__04: [],
    p_applicant_persons__1__C__05: [],
    p_applicant_persons__1__D__01: [],
    p_applicant_persons__1__D__02: [],
    p_applicant_persons__1__D__03: [],
    p_applicant_persons__1__E: [],
    p_applicant_persons__1__F__01: [],
    p_applicant_persons__1__F__02: [],
    p_applicant_persons__1__F__03: [],
    p_applicant_persons__1__K: [],
    p_applicant_persons__1__J: [],

    p_applicant_persons__1__I__01: [],
    p_applicant_persons__1__I__02: [],
    p_applicant_persons__1__I__03: [],
    p_applicant_persons__1__I__04: [],
    p_applicant_persons__1__I__05: [],
    p_applicant_persons__1__I__06: [],
    p_applicant_persons__1__I__07: [],
    p_applicant_persons__1__I__08: [],
  };

  const groupedFields = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (key === 'G' && obj[key].length > 0) {
        acc.push({ label: 'G', fields: [{ [key]: obj[key] }], title: DOCS_CATEGORY['G'] });
        return acc;
      }
      const match = key.match(/^p_applicant_persons__(0|1)__([A-Z])/);
      if (match && obj[key].length > 0) {
        const label = match[2];
        let item = acc.find((item) => item.label === label);
        if (!item) {
          item = { label, fields: [], title: DOCS_CATEGORY[label] };
          acc.push(item);
        }
        item.fields.push({ [key]: obj[key] });
      }
      return acc;
    }, []);
  };

  const isIncomeTotalizer = false;
  const keysStartingWith0 = Object.keys(docsData).filter((key) => key.startsWith('p_applicant_persons__0'));
  const keysStartingWith1 = Object.keys(docsData).filter((key) => key.startsWith('p_applicant_persons__1'));

  const applicantDocItems = keysStartingWith0.reduce((obj, key) => {
    obj[key] = docsData[key];
    return obj;
  }, {});

  const incomeTotalizerDocItems = keysStartingWith1.reduce((obj, key) => {
    obj[key] = docsData[key];
    return obj;
  }, {});

  const docItems = useMemo(() => {
    const items = isIncomeTotalizer ? incomeTotalizerDocItems : applicantDocItems;
    const res = groupedFields(items);
    return res;
  }, [applicantDocItems, incomeTotalizerDocItems, isIncomeTotalizer]);

  const setAppInfo = useSetRecoilState(applicationAtom);

  useEffect(() => {
    setAppInfo((prev) => {
      return {
        ...prev,
        docs_list: docItems,
      };
    });
  }, [docItems, setAppInfo]);

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      borderBottom={'1px solid'}
      borderColor={'gray.80'}
      pt={'10px'}
      pb={'5px'}
      px={10}
    >
      {reviewProgressLabel.map((item, index) => (
        <Fragment key={item.value}>
          <Button
            sx={{
              backgroundColor: checkBgColor(item.value),
              color: checkTextColor(item.value, index),
              border: checkBorder(item.value, index),
              boxShadow: 'none',
              height: 32,
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: 'white',
                opacity: 0.8,
              },
              '&:disabled': {
                backgroundColor: checkBgColor(item.value),
                color: checkTextColor(item.value, index),
              },
            }}
            disabled={checkIsDisabled(item.value, index)}
          >
            {item.label}
          </Button>
          {index === 4 ? (
            <Stack direction={'row'} alignItems={'center'}>
              <AdProgressArrowRight />
              <AdProgressArrowRight sx={{ marginLeft: -5 }} />
              <AdProgressArrowRight sx={{ marginLeft: -5 }} />
            </Stack>
          ) : index === reviewProgressLabel.length - 1 ? null : (
            <AdProgressArrowRight />
          )}
        </Fragment>
      ))}

      <Button
        sx={{
          ml: 3,
          height: '36px',
          bgcolor: 'white',
          border: `1px solid ${theme.palette.gray[80]}`,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
          <Typography variant="edit_header_tools" color={'gray.100'} whiteSpace={'nowrap'}>
            ダウンロード
          </Typography>
          <AdExportExcelIcon />
        </Stack>
      </Button>

      <Button
        sx={{
          width: 200,
          ml: 5,
          height: '36px',
          bgcolor: 'white',
          border: `1px solid ${theme.palette.gray[80]}`,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        <Stack
          width={'100%'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={2}
          onClick={handlePopoverOpen}
        >
          <Typography variant="edit_header_tools" color={'gray.100'} whiteSpace={'nowrap'}>
            提出書類の表示
          </Typography>
          {open ? (
            <AdArrowUp sx={{ width: 16, height: 16, color: 'gray.100' }} />
          ) : (
            <AdArrowDown sx={{ width: 14, height: 14, color: 'gray.100' }} />
          )}
        </Stack>
      </Button>

      <DocsDisplayPopover
        open={open}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        isIncomeTotalizer={isIncomeTotalizer}
      />
    </Stack>
  );
};
