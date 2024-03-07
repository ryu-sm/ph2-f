import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { dayjs, yup } from '@/libs';
import { formatJapanDate } from '@/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import { FormikProvider, useField, useFormik } from 'formik';
import { useMemo } from 'react';

import { useState } from 'react';

export const MonthPicker = ({ yearOptions, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const [toggleExpand, setToggleExpand] = useState(false);

  const initialValues = useMemo(() => {
    const [year = '', month = ''] = meta.value ? meta.value.split('/') : ['', ''];
    return { year, month };
  }, [meta.value]);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      year: yup.string(),
      month: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (!values.month && !values.year) {
        return await setValue('');
      }
      await setValue(`${values.year}/${values.month}`);
      actions.setSubmitting(false);
    },
  });

  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => {
    formik.handleSubmit();
    setAnchorEl(null);
  };

  const monthOptions = Array.from(Array(12), (_, index) => ({
    value: String(index + 1).padStart(2, '0'),
    label: `${(index + 1).toString()}月`,
  }));

  return (
    <FormikProvider value={formik}>
      <Stack direction={'row'} alignItems={'center'} spacing={3}>
        <Button
          sx={{
            width: 20,
            height: 20,
            minWidth: 0,
            padding: 0,
            boxShadow: 'none',
            border: (theme) => `1px solid ${theme.palette.gray[80]}`,
            bgcolor: 'white',
            color: 'gray.80',
            '&:hover': {
              backgroundColor: 'white',
            },
          }}
          onClick={handlePopoverOpen}
        >
          <AdArrowDown sx={{ width: 8, height: 8, color: 'gray.80' }} />
        </Button>
        <Typography variant="edit_content">{!!meta.value && formatJapanDate(meta.value)}</Typography>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          sx={{
            top: '0',
            left: -130,
            '.MuiPopover-paper': {
              overflow: 'visible',
              boxShadow: 'none',
              borderRadius: '2px',
            },
          }}
        >
          <Stack
            width={'150px'}
            overflow={'hidden'}
            sx={{
              border: '1px solid',
              borderColor: 'gray.80',
              width: 150,
              borderRadius: '2px',
            }}
          >
            <Stack
              width={'100%'}
              height={20}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              borderBottom={'1px solid'}
              borderColor={'gray.80'}
              bgcolor={'white'}
              px={2}
              onClick={handlePopoverClose}
            >
              <AdArrowUp sx={{ width: 8, height: 8, color: 'gray.80', cursor: 'pointer' }} />
            </Stack>

            <Stack pt={2} pb={4} width={'100%'}>
              <Stack bgcolor={'white'} direction={'row'} spacing={5} mx={2}>
                <Stack>
                  <Typography variant="edit_month">
                    {monthOptions.find((item) => item.value === formik.values.month)?.label}
                  </Typography>
                  <Typography variant="edit_month">{formik.values.year}</Typography>
                </Stack>
                <IconButton onClick={() => setToggleExpand(!toggleExpand)}>
                  {toggleExpand ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </IconButton>
              </Stack>

              <Stack
                width={'100%'}
                direction={'row'}
                alignItems={'center'}
                flexWrap={'wrap'}
                justifyContent={'flex-start'}
                px={1}
                mt={3}
              >
                {toggleExpand
                  ? monthOptions.map((item) => {
                      return (
                        <IconButton
                          key={item.value}
                          sx={{
                            flex: '1 1 30%',
                            px: '2px',
                            mt: 2,
                            fontSize: 16,
                            bgcolor: item.value === formik.values.month ? 'primary.main' : 'white',
                            color: item.value === formik.values.month ? 'white' : 'gray.100',
                            borderRadius: '18px',
                            '&:hover': { bgcolor: item.value === formik.values.month ? 'primary.main' : 'gray.40' },
                          }}
                          onClick={() => {
                            formik.setFieldValue('month', item.value);
                            handlePopoverClose();
                          }}
                        >
                          {item.label}
                        </IconButton>
                      );
                    })
                  : yearOptions.map((item) => {
                      return (
                        <IconButton
                          key={item.value}
                          sx={{
                            width: '46px',
                            py: '10px',
                            fontSize: 14,
                            bgcolor: item.value === formik.values.year ? 'primary.main' : 'white',
                            color: item.value === formik.values.year ? 'white' : 'gray.100',
                            borderRadius: '18px',
                            '&:hover': { bgcolor: item.value === formik.values.year ? 'primary.main' : 'gray.40' },
                          }}
                          onClick={() => {
                            formik.setFieldValue('year', item.value);
                            handlePopoverClose();
                          }}
                        >
                          {item.label}
                        </IconButton>
                      );
                    })}
              </Stack>
            </Stack>
          </Stack>
        </Popover>
      </Stack>
    </FormikProvider>
  );
};
