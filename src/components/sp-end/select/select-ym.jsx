import { useMemo } from 'react';
import { FormikProvider, useField, useFormik } from 'formik';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { SpSelect } from '@/components/sp-end';
import { zeroPad } from '@/utils';
import { Yup } from '@/libs';

export default function SpSelectYM({ yearOptions, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const initialValues = useMemo(() => {
    const [year = '', month = ''] = meta.value ? meta.value.split('/') : ['', ''];
    return { year, month };
  }, [meta.value]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      year: Yup.string(),
      month: Yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      if (!values.month && !values.year) {
        return setValue('');
      }
      setValue(`${values.year}/${values.month}`);
      actions.setSubmitting(false);
    },
  });
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
            onChange={() => formik.handleSubmit()}
            onClose={async () => {
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
