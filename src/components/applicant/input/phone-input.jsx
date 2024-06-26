import { yup } from '@/libs';
import { convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikProvider, useField, useFormik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';

export const ApPhoneInputField = ({ label, showError, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const initialValues = useMemo(() => {
    const [phoneOne = '', phoneTwo = '', phoneThree = ''] = meta.value ? meta.value.split('-') : ['', '', ''];
    return { phoneOne, phoneTwo, phoneThree };
  }, [meta.value]);

  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);
  const currentIndex = useRef(0);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      phoneOne: yup.string(),
      phoneTwo: yup.string(),
      phoneThree: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit() {},
  });

  const phoneInputs = useMemo(
    () => [
      {
        name: 'phoneOne',
        ref: refOne,
        maxLength: 4,
        value: formik.values.phoneOne,
      },
      {
        name: 'phoneTwo',
        ref: refTwo,
        maxLength: 4,
        value: formik.values.phoneTwo,
      },
      {
        name: 'phoneThree',
        ref: refThree,
        maxLength: 4,
        value: formik.values.phoneThree,
      },
    ],
    [formik.values.phoneOne, formik.values.phoneTwo, formik.values.phoneThree]
  );

  const handleBackInput = useCallback(() => {
    const prevIndex = currentIndex.current - 1;

    if (prevIndex !== -1) {
      const prevInput = phoneInputs?.[prevIndex]?.ref.current;
      prevInput?.focus();

      currentIndex.current = prevIndex;
    }
  }, [phoneInputs]);

  const handleNextInput = useCallback(() => {
    const nextIndex = currentIndex.current + 1;

    if (nextIndex === phoneInputs.length) {
      return phoneInputs?.[currentIndex.current]?.ref.current?.blur();
    }
    const nextInput = phoneInputs?.[nextIndex]?.ref.current;
    nextInput?.focus();

    currentIndex.current = nextIndex;
  }, [phoneInputs]);

  const handleKeyPress = useCallback(
    async (e) => {
      if (e.target.value.length === 4) handleNextInput();

      // if (e.target.value.length === 0) handleBackInput();

      if (refOne.current?.value || refTwo.current?.value || refThree.current?.value) {
        return await setValue(`${refOne.current?.value}-${refTwo.current?.value}-${refThree.current?.value}`);
      }
      return await setValue('');
    },
    [handleBackInput, handleNextInput, setValue]
  );

  const handleBlur = useCallback(async () => {
    if (refOne.current && refTwo.current && refThree.current) {
      let subPhoneNumber = [refOne.current.value, refTwo.current.value, refThree.current.value];

      if (subPhoneNumber.length) {
        phoneInputs?.forEach((_, index) => setValue(convertToHalfWidth(subPhoneNumber?.[index])));

        if (!subPhoneNumber.every((sub) => !sub))
          await setValue(subPhoneNumber.map((sub) => convertToHalfWidth(sub)).join('-'));
      }
    }
  }, [setTouched, setValue, formik, phoneInputs]);

  const handleFocusInput = useCallback(
    (e, name) => {
      if (e.key === 'tab') {
        handleNextInput();
      }
      if (
        e.key === 'Backspace' &&
        ((refTwo.current?.value === '' && currentIndex.current === 1) ||
          (refThree.current?.value === '' && currentIndex.current === 2))
      )
        handleBackInput();
    },
    [handleBackInput, handleNextInput]
  );

  return (
    <FormikProvider value={formik}>
      <Stack spacing={'2px'}>
        <input name={field.name} type="hidden" />
        <Stack spacing={2} direction={'row'} alignItems={'flex-start'}>
          {label && (
            <Typography variant="unit" color={'text.main'} lineHeight={'48px'}>
              {label}
            </Typography>
          )}
          <Stack spacing={'2px'}>
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              {phoneInputs.map((input, index) => (
                <Stack key={index} spacing={1} direction={'row'} alignItems={'center'}>
                  <TextField
                    autoComplete="off"
                    type="tel"
                    placeholder={'0'.repeat(input.maxLength).toString()}
                    inputRef={input.ref}
                    name={input.name}
                    value={input.value}
                    sx={{
                      '& .MuiInputBase-input': { textAlign: 'center', width: 50 },
                      '&&&& fieldset': { border: '1px solid', borderColor: 'primary.40' },

                      ...(!!input.ref.current?.value && {
                        '.MuiInputBase-input': {
                          backgroundColor: (theme) => theme.palette.gray[100],
                          boxShadow: 'none',
                        },
                        '&&&& fieldset': { border: 'none' },
                      }),
                    }}
                    onInput={(e) => {
                      // e.target.value = convertToHalfWidth(e.target.value);
                      e.target.value = e.target.value.replace(/[^\d]+/g, '');
                      e.target.value = e.target.value.substring(0, input.maxLength);
                      return e;
                    }}
                    onCompositionUpdate={async (e) => {
                      e.target.value =
                        convertToHalfWidth(e.target.value) +
                        convertToHalfWidth(e.nativeEvent.data).replace(/[^\d]+/g, '');
                      return e;
                    }}
                    onChange={handleKeyPress}
                    onKeyDown={(e) => handleFocusInput(e, input.name)}
                    onFocus={() => {
                      currentIndex.current = index;
                    }}
                    onBlur={handleBlur}
                    error={isError}
                  />
                  {index !== phoneInputs.length - 1 && (
                    <Typography variant="note" color={'text.main'}>
                      -
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
      </Stack>
    </FormikProvider>
  );
};
