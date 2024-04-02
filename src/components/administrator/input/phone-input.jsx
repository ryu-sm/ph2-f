import { yup } from '@/libs';
import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import AutosizeInput from 'react-input-autosize';
import { FormikProvider, useField, useFormik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';

// export const AdEditOutLineInput = ({ width, convertFullWidth, convertHalfWidth, ...props }) => {
//   const [field, meta, helpers] = useField(props);
//   const { setValue, setError } = helpers;

//   const handelBlue = useCallback(
//     async (e) => {
//       field.onBlur(e);
//       props.onBlur && props.onBlur(e);
//       let value = e.target.value?.toString().trim();

//       if (convertHalfWidth) {
//         value = convertToHalfWidth(value);
//       }
//       if (convertFullWidth) {
//         value = convertToFullWidth(value);
//       }

//       await setValue(value);
//     },
//     [field, props]
//   );

//   const handleChange = useCallback(
//     async (e) => {
//       field.onChange(e);
//       props.onChange && props.onChange(e);
//       await setValue(e.target.value);
//     },
//     [field, props, setValue]
//   );

//   return (
//     <Stack direction={'row'} sx={{ width: width, pl: 3 }}>
//       <AutosizeInput
//         inputClassName={'custom-input-border-style'}
//         name={field.name}
//         value={meta.value}
//         onChange={handleChange}
//         onBlur={handelBlue}
//         onFocus={() => setError('')}
//       />
//     </Stack>
//   );
// };

export const AdPhoneInputField = ({ label, showError, ...props }) => {
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
    async (value) => {
      if (value.length === 4) handleNextInput();

      if (value.length === 0) handleBackInput();

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
      if (e.key !== 'Backspace') {
        if (
          (name === 'phoneOne' && refOne.current?.value.length === 4) ||
          (name === 'phoneTwo' && refTwo.current?.value.length === 4)
        )
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
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flex={1}
        spacing={2}
        sx={{ ml: '-10px' }}
      >
        <input name={field.name} type="hidden" />
        <Stack spacing={2} direction={'row'} alignItems={'flex-start'}>
          {label && (
            <Typography variant="unit" color={'text.main'} lineHeight={'48px'}>
              {label}
            </Typography>
          )}
          <Stack spacing={'2px'}>
            <Stack spacing={'3px'} direction={'row'} alignItems={'center'}>
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
                      '.MuiInputBase-input': {
                        minHeight: 16,
                        height: 26,
                        width: 46,
                        p: 0,
                        px: '1px',
                        fontFamily: 'Hiragino Sans',
                        fontSize: 12,
                        fontWeight: 300,
                        lineHeight: '26px',
                        fontStyle: 'normal',
                        letterSpacing: 0.4,
                        color: '#333333',
                        textAlign: 'center',
                      },
                      '.MuiFormHelperText-root': {
                        display: 'none',
                      },
                      '&&&& .Mui-focused': {
                        fieldset: { border: '2px solid #0160CC' },
                      },
                      '&&&& fieldset': {
                        border: `1px solid rgb(200, 205, 207);`,
                      },
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
                      currentIndex.current = index;
                    }}
                    onBlur={handleBlur}
                    error={isError}
                  />
                  {index !== phoneInputs.length - 1 && (
                    <Typography variant="note" textAlign={'center'} color={'text.main'}>
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
