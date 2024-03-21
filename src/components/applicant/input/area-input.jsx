import { yup } from '@/libs';
import { convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';

import { FormikProvider, useField, useFormik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

export const ApAreaInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);

  const initialValues = useMemo(() => {
    const [firstCode = '', secondCode = ''] = meta.value ? meta.value.split('.') : ['', ''];
    return { firstCode, secondCode };
  }, [meta.value]);

  const refOne = useRef(null);
  const refTwo = useRef(null);
  const currentIndex = useRef(0);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      firstCode: yup.string(),
      secondCode: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit() {},
  });

  const areaInputs = useMemo(
    () => [
      {
        name: 'firstCode',
        ref: refOne,
        maxLength: 9,
        value: formik.values.firstCode,
      },
      {
        name: 'secondCode',
        ref: refTwo,
        maxLength: 2,
        value: formik.values.secondCode,
      },
    ],
    [formik.values.firstCode, formik.values.secondCode]
  );

  const handleBackInput = useCallback(() => {
    const prevIndex = currentIndex.current - 1;

    if (prevIndex !== -1) {
      const prevInput = areaInputs?.[prevIndex]?.ref.current;
      prevInput?.focus();

      currentIndex.current = prevIndex;
    }
  }, [areaInputs]);

  const handleNextInput = useCallback(() => {
    const nextIndex = currentIndex.current + 1;

    if (nextIndex === areaInputs.length) {
      return areaInputs?.[currentIndex.current]?.ref.current?.blur();
    }
    const nextInput = areaInputs?.[nextIndex]?.ref.current;
    nextInput?.focus();

    currentIndex.current = nextIndex;
  }, [areaInputs]);

  const handleKeyPress = useCallback(
    async (e) => {
      if ((e.target.value.length === 9 && e.target.name === 'firstCode') || e.target.value.length === 9)
        handleNextInput();
      if (e.target.value.length === 0) handleBackInput();

      if (refOne.current?.value || refTwo.current?.value) {
        return await setValue(`${refOne.current?.value}.${refTwo.current?.value}`);
      }

      return await setValue('');
    },
    [handleBackInput, handleNextInput, setValue]
  );

  const handleBlur = useCallback(async () => {
    if (!!refOne.current && !!refTwo.current) {
      if (!!refOne.current.value || !!refTwo.current.value)
        await setValue(
          `${convertToHalfWidth(refOne.current.value).replaceAll(',', '')}.${convertToHalfWidth(
            refTwo.current.value
          ).replaceAll(',', '')}`
        );
    }
    setTouched(true);
  }, [setTouched, setValue]);

  const handleFocusInput = useCallback(
    (e, name) => {
      if (e.key !== 'Backspace' && name === 'firstCode' && refOne.current?.value.length === 9) {
        handleNextInput();
      }
      if (e.key === 'Backspace' && refTwo.current?.value === '') handleBackInput();
      setTouched(false);
    },
    [handleBackInput, handleNextInput]
  );

  return (
    <FormikProvider value={formik}>
      <input name={field.name} type="hidden" />
      <Stack spacing={1}>
        {label && (
          <Typography variant="label" color={'text.main'} lineHeight={'100%'}>
            {label}
          </Typography>
        )}
        <Stack spacing={'2px'}>
          <Stack spacing={1} direction={'row'} alignItems={'center'}>
            {areaInputs.map((input, index) => (
              <Stack key={index} spacing={1} direction={'row'} alignItems={'center'}>
                <NumericFormat
                  customInput={TextField}
                  thousandSeparator
                  autoComplete="off"
                  type="tel"
                  placeholder={index ? '--' : '---'}
                  inputRef={input.ref}
                  name={input.name}
                  value={input.value}
                  sx={{
                    '& .MuiInputBase-input': { textAlign: 'center', width: index ? 22 : 93 },
                    '&&&& fieldset': { border: '1px solid', borderColor: 'primary.40' },

                    ...(isSuccess &&
                      !!input.ref.current?.value && {
                        '.MuiInputBase-input': {
                          backgroundColor: (theme) => theme.palette.gray[100],
                          boxShadow: 'none',
                        },
                        '&&&& fieldset': { border: 'none' },
                      }),
                  }}
                  onInput={(e) => {
                    e.target.value = convertToHalfWidth(e.target.value);
                    e.target.value = e.target.value.replace(/[^\d]+/g, '');
                    e.target.value = e.target.value.substring(0, input.maxLength);
                    return e;
                  }}
                  onChange={handleKeyPress}
                  onKeyDown={(e) => handleFocusInput(e, input.name)}
                  onFocus={() => {
                    setTouched(true);
                    currentIndex.current = index;
                  }}
                  onBlur={handleBlur}
                  error={isError}
                />
                {index !== areaInputs.length - 1 && (
                  <Typography variant="note" color={'text.main'}>
                    .
                  </Typography>
                )}
                {!!index && (
                  <Typography variant="unit" fontFamily={'Noto Sans JP'} color={'gray.200'}>
                    ㎡
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
          {isError && (
            <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
              ※{meta.error}
            </Typography>
          )}
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
