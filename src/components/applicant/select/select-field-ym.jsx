import { format } from 'kanjidate';
import { dayjs, yup } from '@/libs';
import { useMemo } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';
import { Stack, Typography } from '@mui/material';
import { ApSelectField } from './select-field';

export const ApSelectFieldYm = ({ yearOptions, unit, ...props }) => {
  const windowWidth = window.innerWidth;
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const initialValues = useMemo(() => {
    const [year = '', month = ''] = meta.value ? meta.value.split('/') : ['', ''];
    return { year, month };
  }, [meta.value]);
  const years = yearOptions || defaultYearOptions;
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      year: yup.string(),
      month: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      console.log(11);
      if (!values.month && !values.year) {
        return await setValue('');
      }
      await setValue(`${values.year}/${values.month}`);
      actions.setSubmitting(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <input name={field.name} type="hidden" />
      <Stack spacing={'2px'}>
        <Stack spacing={'5px'} direction={'row'} alignItems={'center'}>
          <ApSelectField
            name={'year'}
            unit={'年'}
            sx={{
              width: 160,
              '@media (max-width:385px)': {
                width: 117,
              },
            }}
            iconSx={{ right: 0 }}
            options={years}
            showError={false}
            error={isError}
            onChange={() => formik.handleSubmit()}
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
            unit={unit || '月'}
            width={52}
            iconSx={{ right: 0 }}
            options={monthOptions}
            showError={false}
            error={isError}
            onChange={() => formik.handleSubmit()}
            onClose={() => {
              setTouched(true);
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
