import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { DateSelect } from '@/components/administrator/select/date-select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { dayjs } from '@/libs';
import { format } from 'kanjidate';
import { FormikProvider, useFormik } from 'formik';
import { apGetCaccessLogs } from '@/services';
import { downloadExcelAsync } from '@/utils';

export const AdLogModal = ({ open, onClose }) => {
  const formik = useFormik({
    initialValues: {
      start: '',
      end: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await apGetCaccessLogs(values.start, values.end);
        if (res.data.src) {
          await downloadExcelAsync(res.data.src, res.data.name);
        }
        onClose();
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [open]);
  return (
    <FormikProvider value={formik}>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disableAutoFocus
      >
        <Stack
          sx={{
            width: 485,
            backgroundColor: 'gray.20',
            boxShadow:
              'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
            height={50}
            bgcolor={'white'}
            borderBottom={'1px solid'}
            borderColor={'gray.70'}
            px={2}
          >
            <Typography variant="filter_clear_button"></Typography>
            <Typography variant="ad_modal_title">監視ログダウンロード</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack px={'20px'} pt={'20px'} flexGrow={1} overflow={'auto'} spacing={'2px'}>
            <DateSelect name="start" yearOptions={yearOptions} endPrefix={'から'} />
            <DateSelect name="end" yearOptions={yearOptions} endPrefix={'まで'} />
          </Stack>

          <Stack minHeight={100} justifyContent={'center'} alignItems={'center'}>
            <Button
              sx={{
                width: 200,
                bgcolor: 'white',
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '2px',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'white',
                  color: 'primary.main',
                },
              }}
              onClick={formik.handleSubmit}
            >
              <Typography variant="filter_search_button">ダウンロード</Typography>
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </FormikProvider>
  );
};

const yearOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(5), (_, index) => {
    const year = String(dayjs().year() - index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: `${year}`,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);
