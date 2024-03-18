import { format } from 'kanjidate';
import { dayjs, yup } from '@/libs';
import { Stack } from '@mui/material';
import { FilterSelect } from './filter-select';
import { useMemo } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';
import { getClassDate } from '@/utils';

export const DateSelect = ({ yearOptions, label, endPrefix, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const years = yearOptions || defaultYearOptions;
  const initialValues = useMemo(() => {
    const [year = '', month = '', day = ''] = meta.value ? meta.value.split('/') : ['', ''];
    return { year, month, day };
  }, [meta.value]);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      year: yup.string(),
      month: yup.string(),
      day: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (!values.month && !values.year && !values.day) {
        return await setValue('');
      }
      setValue(`${values.year}/${values.month}/${values.day}`);
      actions.setSubmitting(false);
    },
  });

  const dayOptions = useMemo(() => {
    return [{ value: '', label: '日', className: undefined }, ...getClassDate(formik.values.year, formik.values.month)];
  }, [formik.values.year, formik.values.month]);

  return (
    <FormikProvider value={formik}>
      <input name={field.name} type="hidden" />
      <Stack px={'68px'} bgcolor={'gray.20'} py={'12px'}>
        <Stack direction={'row'} spacing={5}>
          <FilterSelect
            name="year"
            width={80}
            options={years}
            unit="年"
            hasError={(!!formik.values.month || !!formik.values.day) && !formik.values.year}
            onChange={() => {
              formik.handleSubmit();
            }}
            onClose={() => {
              formik.handleSubmit();
            }}
          />
          <FilterSelect
            name="month"
            width={52}
            options={monthOptions}
            unit="月"
            hasError={(!!formik.values.year || !!formik.values.day) && !formik.values.month}
            onChange={() => {
              formik.handleSubmit();
            }}
            onClose={() => {
              formik.handleSubmit();
            }}
          />
          <FilterSelect
            name="day"
            width={52}
            options={dayOptions}
            unit={`日${endPrefix || 'から'}`}
            hasError={(!!formik.values.year || !!formik.values.month) && !formik.values.day}
            onChange={() => {
              formik.handleSubmit();
            }}
            onClose={() => {
              formik.handleSubmit();
            }}
          />
        </Stack>
      </Stack>
    </FormikProvider>
  );
};

const monthOptions = [{ value: '', label: '月' }].concat(
  Array.from(Array(12), (_, index) => ({
    value: String(index + 1).padStart(2, '0'),
    label: (index + 1).toString(),
  }))
);

const defaultYearOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(51), (_, index) => {
    const year = String(dayjs().year() - index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: `${year}`,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);
