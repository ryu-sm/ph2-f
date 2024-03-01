import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdExportExcelIcon } from '@/assets/icons/ad-export-excel';
import { AdProgressArrowRight } from '@/assets/icons/ad-progress-arrow-right';
import { useTheme } from '@emotion/react';
import { Button, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { DocsDisplayPopover } from '../docs-display-popover';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';

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

  const items = [
    {
      code: 'A',
      label: '本人確認書類',
    },
    {
      code: 'B',
      label: '健康保険証',
    },
    {
      code: 'G',
      label: '物件についての書類',
    },
  ];
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

      <DocsDisplayPopover open={open} onClose={handlePopoverClose} anchorEl={anchorEl} items={items} />
    </Stack>
  );
};
