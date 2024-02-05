import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { SpSelect } from '@/components/sp-end';
import { zeroPad, classDate, defaultDate } from '@/utils';
import { Yup } from '@/libs';
import { spGetPublicHolidays } from '@/api/user-api';

export default function SpSelectYMD({ yearOptions, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const [publicHolidays, setPublicHolidays] = useState([]);
  const initialValues = useMemo(() => {
    const [year = '', month = '', day = ''] = meta.value ? meta.value.split('/') : ['', ''];
    return { year, month, day };
  }, [meta.value]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      year: Yup.string(),
      month: Yup.string(),
      day: Yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (!values.month && !values.year && !values.day) {
        return setValue('');
      }
      setValue(`${values.year}/${values.month}/${values.day}`);
      actions.setSubmitting(false);
    },
  });

  const getPublicHolidays = useCallback(async () => {
    try {
      if (formik.values.year) {
        const res = await spGetPublicHolidays(formik.values.year);
        setPublicHolidays(res.data);
      }
    } catch (error) {
      setPublicHolidays([]);
    }
  }, [formik.values.year]);

  useEffect(() => {
    getPublicHolidays();
  }, [formik.values.year]);

  const dayOptions = useMemo(() => {
    return [
      { value: '', label: '日', className: undefined },
      ...classDate(formik.values.year, formik.values.month),
    ].map((d) => {
      if (publicHolidays.find((p) => p.date === `${formik.values.year}-${formik.values.month}-${d.value}`)) {
        return {
          ...d,
          className: field.name.includes('desired_borrowing_date')
            ? `${d.className ?? ''} is-public-holiday-desired`
            : `${d.className ?? ''} is-public-holiday`,
        };
      }
      return d;
    });
  }, [publicHolidays, formik.values.year, formik.values.month]);

  return (
    <Stack spacing={'6px'}>
      <HStack spacing={'5px'}>
        <FormikProvider value={formik}>
          <input name={field.name} type="hidden" />
          <SpSelect
            name="year"
            unit={'年'}
            placeholder={'----'}
            width={'163px'}
            menuWidth={'234px'}
            error={!!meta.error}
            options={yearOptions}
            onChange={() => {
              formik.handleSubmit();
            }}
            onClose={async (e) => {
              if (!meta.error) {
                await helpers.setTouched(false);
              } else {
                helpers.setTouched(!!formik.values.month);
              }
              formik.handleSubmit();
            }}
          />
          <SpSelect
            name="month"
            unit={'月'}
            placeholder={'--'}
            width={'56px'}
            menuWidth={'66px'}
            error={!!meta.error}
            options={monthOpts}
            onChange={() => formik.handleSubmit()}
            onClose={async () => {
              await helpers.setTouched(true);
              formik.handleSubmit();
            }}
          />
          <SpSelect
            name="day"
            unit={'日'}
            placeholder={'--'}
            width={'56px'}
            menuWidth={'66px'}
            error={!!meta.error}
            options={
              field.name.includes('desired_borrowing_date')
                ? dayOptions
                : [{ value: '', label: '日' }].concat(defaultDate(formik.values.year, formik.values.month))
            }
            onChange={() => formik.handleSubmit()}
            onClose={async () => {
              await helpers.setTouched(true);
              formik.handleSubmit();
            }}
          />
        </FormikProvider>
      </HStack>
      {!!meta.error && (
        <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
          ※{meta.error}
        </Text>
      )}
    </Stack>
  );
}

const monthOpts = [{ value: '', label: '月' }].concat(
  Array.from(Array(12), (_, index) => ({
    value: zeroPad(index + 1),
    label: (index + 1).toString(),
  }))
);
