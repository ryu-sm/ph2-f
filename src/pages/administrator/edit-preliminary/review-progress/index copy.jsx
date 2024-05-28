import { useTheme } from '@emotion/react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Icons } from '@/assets';

import { AdDocsDisplayPopover } from './docs-display-popover';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { AdSecondaryButton } from '@/components/administrator/button';
import { UpdateModal } from './update-modal';
import { useBoolean } from '@/hooks';
import { adGetRowData } from '@/services';
import { downloadExcelAsync } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';

export const AdReviewProgress = () => {
  const {
    preliminaryInfo: {
      p_application_headers: { pre_examination_status, id, apply_no },
      p_applicant_persons__0: { last_name_kanji, first_name_kanji },
    },
  } = usePreliminaryContext();

  const downloadRowData = async () => {
    try {
      const res = await adGetRowData(id);
      await downloadExcelAsync(
        res.data.src,
        `${apply_no}_${last_name_kanji}${first_name_kanji}様__申込内容のローデータ.xlsx`
      );
    } catch (error) {
      console.debug(error);
    }
  };

  const activeValue = useMemo(() => {
    return pre_examination_status ? Number(pre_examination_status) : -1;
  }, [pre_examination_status]);

  const [clickValue, setClickValue] = useState(null);

  const reviewProgressLabel = [
    { label: '書類確認', value: 0 },
    { label: '書類不備対応中', value: 1 },
    { label: '内容確認', value: 2 },
    { label: '承認', value: 3 },
    { label: '銀行へデータ連携', value: 4 },
    { label: '提携会社へ審査結果公開', value: 5 },
    { label: '申込人へ審査結果公開', value: 6 },
  ];

  const theme = useTheme();
  const checkBgColor = (value) => {
    if (value < activeValue) {
      return 'gray.80';
    } else if (value === activeValue && activeValue !== 4) {
      return 'primary.main';
    } else if (value === activeValue && activeValue === 4) {
      return 'secondary.main';
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

  const checkIsDisabled = useCallback(
    (value) => {
      if (value === 5 || value === 6) {
        return true;
      }
      if ((value === 3 || value === 4) && activeValue === 3) {
        return false;
      }
      if (value < activeValue) {
        return true;
      }
      if (value === activeValue + 1) {
        return false;
      }

      return true;
    },
    [activeValue]
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const updateModal = useBoolean(false);
  return (
    <Grid
      container
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderBottom={'1px solid'}
      borderColor={'gray.80'}
      rowSpacing={4}
      pt={'10px'}
      pb={'5px'}
      px={10}
    >
      <Grid item>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
          {reviewProgressLabel.map((item, index) => (
            <Fragment key={item.value}>
              <Button
                sx={{
                  backgroundColor: checkBgColor(item.value, index),
                  color: checkTextColor(item.value, index),
                  border: checkBorder(item.value, index),
                  boxShadow: 'none',
                  height: 32,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: activeValue === 3 && item.value === 3 ? 'primary.main' : 'white',
                    opacity: 0.8,
                  },
                  '&:disabled': {
                    backgroundColor: checkBgColor(item.value),
                    color: checkTextColor(item.value, index),
                  },
                }}
                disabled={checkIsDisabled(item.value)}
                onClick={() => {
                  setClickValue(item.value);
                  updateModal.onTrue();
                }}
              >
                {item.label}
              </Button>
              {index === 4 ? (
                <Stack direction={'row'} alignItems={'center'}>
                  <Icons.AdProgressArrowRight />
                  <Icons.AdProgressArrowRight sx={{ marginLeft: -5 }} />
                  <Icons.AdProgressArrowRight sx={{ marginLeft: -5 }} />
                </Stack>
              ) : index === reviewProgressLabel.length - 1 ? null : (
                <Icons.AdProgressArrowRight />
              )}
            </Fragment>
          ))}
          <UpdateModal
            value={clickValue}
            activeValue={activeValue}
            open={updateModal.value}
            onClose={updateModal.onFalse}
          />
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} spacing={5}>
          <AdSecondaryButton
            endIcon={<Icons.AdExportExcelIcon />}
            sx={{
              width: 140,
              height: 36,
              color: theme.palette.gray[100],
              border: `1px solid ${theme.palette.gray[80]}`,
            }}
            onClick={downloadRowData}
          >
            ダウンロード
          </AdSecondaryButton>

          <Button
            sx={{
              width: 190,
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
                <Icons.AdArrowUp sx={{ width: 16, height: 16, color: 'gray.100' }} />
              ) : (
                <Icons.AdArrowDown sx={{ width: 14, height: 14, color: 'gray.100' }} />
              )}
            </Stack>
          </Button>

          <AdDocsDisplayPopover open={open} onClose={handlePopoverClose} anchorEl={anchorEl} />
        </Stack>
      </Grid>
    </Grid>
  );
};
