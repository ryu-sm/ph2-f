import { format } from 'kanjidate';
import { dayjs, yup } from '@/libs';
import { useMemo } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';
import { Stack, Typography } from '@mui/material';
import { ApSelectField } from './select-field';
import { usePublicHolidays } from '@/hooks';
import { defaultDate, getClassDate } from '@/utils';

export const ApSelectFieldYmd = ({ yearOptions, ...props }) => {
  const windowWidth = window.innerWidth;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
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

  const publicHolidays = usePublicHolidays(initialValues.year, initialValues.month, initialValues.day);

  const dayOptions = useMemo(() => {
    return [
      { value: '', label: '日', className: undefined },
      ...getClassDate(formik.values.year, formik.values.month),
    ].map((d) => {
      if (field.name.includes('desired_borrowing_date')) {
        if (publicHolidays.find((p) => p.date === `${formik.values.year}-${formik.values.month}-${d.value}`)) {
          return {
            ...d,
            className: field.name.includes('desired_borrowing_date')
              ? `${d.className ?? ''} is-public-holiday-desired`
              : `${d.className ?? ''} is-public-holiday`,
          };
        }
        return d;
      }

      return d;
    });
  }, [publicHolidays, formik.values.year, formik.values.month]);

  return (
    <FormikProvider value={formik}>
      <input name={field.name} type="hidden" />
      <Stack spacing={'2px'}>
        <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
          <ApSelectField
            name={'year'}
            unit={'年'}
            sx={{
              width: 163,
              '@media (max-width:385px)': {
                width: 117,
              },
            }}
            iconSx={{ right: 0 }}
            options={years}
            showError={false}
            error={isError}
            onChange={() => {
              formik.handleSubmit();
            }}
            onClose={async () => {
              if (!meta.error) {
                await setTouched(false);
              } else {
                await setTouched(!!formik.values.month);
              }
              formik.handleSubmit();
            }}
            renderValue={
              !!formik.values.year
                ? () => {
                    const selectedOption = years.find((e) => e.value === formik.values.year);
                    return (
                      <Typography variant="unit" color="text.main">
                        {windowWidth > 385 && !!selectedOption ? selectedOption.label : formik.values.year}
                      </Typography>
                    );
                  }
                : () => (
                    <Typography variant="unit" color="placeholder">
                      {'----'}
                    </Typography>
                  )
            }
          />
          <ApSelectField
            name={'month'}
            unit={'月'}
            width={52}
            iconSx={{ right: 0 }}
            options={monthOptions}
            showError={false}
            error={isError}
            onChange={() => formik.handleSubmit()}
            onClose={async () => {
              if (!meta.error) {
                await setTouched(false);
              } else {
                await setTouched(!!formik.values.day);
              }
              formik.handleSubmit();
            }}
            renderValue={
              !!formik.values.month
                ? () => {
                    const selectedOption = monthOptions.find((e) => e.value === formik.values.month);
                    return (
                      <Typography variant="unit" color="text.main">
                        {selectedOption.label}
                      </Typography>
                    );
                  }
                : () => (
                    <Typography variant="unit" color="placeholder">
                      {'--'}
                    </Typography>
                  )
            }
          />
          <ApSelectField
            name={'day'}
            unit={'日'}
            width={52}
            iconSx={{ right: 0 }}
            options={
              field.name.includes('desired_borrowing_date')
                ? dayOptions
                : [{ value: '', label: '日' }].concat(defaultDate(formik.values.year, formik.values.month))
            }
            showError={false}
            error={isError}
            onChange={() => formik.handleSubmit()}
            onClose={() => {
              setTouched(true);
              formik.handleSubmit();
            }}
            renderValue={
              !!formik.values.day
                ? () => {
                    const selectedOption = dayOptions.find((e) => e.value === formik.values.day);
                    return (
                      <Typography variant="unit" color="text.main">
                        {selectedOption.label}
                      </Typography>
                    );
                  }
                : () => (
                    <Typography variant="unit" color="placeholder">
                      {'--'}
                    </Typography>
                  )
            }
          />
        </Stack>
        {isError && (
          <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
            ※{meta.error}
          </Typography>
        )}
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
      value: year,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);
