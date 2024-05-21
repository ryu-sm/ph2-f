import { yup } from '@/libs';
import { convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikProvider, useField, useFormik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';

export const AdPhoneInputField = ({ label, showError, onBlur, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);

  const initialValues = useMemo(() => {
    const [phoneOne = '', phoneTwo = '', phoneThree = ''] = meta.value ? meta.value?.split('-') : ['', '', ''];
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
        phoneInputs?.forEach((_, index) => {
          setValue(convertToHalfWidth(subPhoneNumber?.[index]));
        });

        if (!subPhoneNumber.every((sub) => !sub)) {
          await setValue(subPhoneNumber.map((sub) => convertToHalfWidth(sub)).join('-'));
        }
      }
      setTouched(true);
      onBlur && onBlur();
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
          <Stack spacing={'2px'}>
            <Stack spacing={'3px'} direction={'row'} alignItems={'center'}>
              {phoneInputs.map((input, index) => (
                <Stack key={index} spacing={1} direction={'row'} alignItems={'center'}>
                  <TextField
                    autoComplete="off"
                    type="tel"
                    inputMode="tel"
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
                      setTouched(false);
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
          </Stack>
        </Stack>
        {isError && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={350}>
            <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
              {meta.error}
            </Typography>
          </Stack>
        )}
      </Stack>
    </FormikProvider>
  );
};
