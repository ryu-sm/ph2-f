import { yup } from '@/libs';
import { convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikProvider, useField, useFormik } from 'formik';
import { Fragment, useCallback, useMemo, useRef } from 'react';

export const ApZipCodeInputField = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);

  const initialValues = useMemo(() => {
    const [firstCode = '', secondCode = ''] = meta.value ? meta.value.split('-') : ['', ''];
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

  const zipCodeInputs = useMemo(
    () => [
      {
        name: 'firstCode',
        ref: refOne,
        maxLength: 3,
        value: formik.values.firstCode,
      },
      {
        name: 'secondCode',
        ref: refTwo,
        maxLength: 4,
        value: formik.values.secondCode,
      },
    ],
    [formik.values.firstCode, formik.values.secondCode]
  );

  const handleBackInput = useCallback(() => {
    const prevIndex = currentIndex.current - 1;

    if (prevIndex !== -1) {
      const prevInput = zipCodeInputs?.[prevIndex]?.ref.current;
      prevInput?.focus();

      currentIndex.current = prevIndex;
    }
  }, [zipCodeInputs]);

  const handleNextInput = useCallback(() => {
    const nextIndex = currentIndex.current + 1;

    if (nextIndex === zipCodeInputs.length) {
      return zipCodeInputs?.[currentIndex.current]?.ref.current?.blur();
    }
    const nextInput = zipCodeInputs?.[nextIndex]?.ref.current;
    nextInput?.focus();

    currentIndex.current = nextIndex;
  }, [zipCodeInputs]);

  const handleKeyPress = useCallback(
    async (e) => {
      if ((e.target.value.length === 3 && e.target.name === 'firstCode') || e.target.value.length === 4)
        handleNextInput();
      if (e.target.value.length === 0) handleBackInput();

      if (refOne.current?.value || refTwo.current?.value) {
        return await setValue(`${refOne.current?.value}-${refTwo.current?.value}`);
      }

      return await setValue('');
    },
    [handleBackInput, handleNextInput, setValue]
  );

  const handleBlur = useCallback(async () => {
    if (!!refOne.current && !!refTwo.current) {
      if (!!refOne.current.value || !!refTwo.current.value)
        await setValue(`${convertToHalfWidth(refOne.current.value)}-${convertToHalfWidth(refTwo.current.value)}`);
    }
    setTouched(true);
  }, [setTouched, setValue]);

  const handleFocusInput = useCallback(
    (e, name) => {
      if (e.key !== 'Backspace' && name === 'firstCode' && refOne.current?.value.length === 3) {
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
        <Typography variant="label" color={'text.main'} lineHeight={'100%'}>
          郵便番号
        </Typography>
        <Stack spacing={'2px'}>
          <Stack spacing={1} direction={'row'} alignItems={'center'}>
            {zipCodeInputs.map((input, index) => (
              <Stack key={index} spacing={1} direction={'row'} alignItems={'center'}>
                <TextField
                  autoComplete="off"
                  placeholder={'0'.repeat(input.maxLength).toString()}
                  inputRef={input.ref}
                  name={input.name}
                  value={input.value}
                  sx={{
                    '& .MuiInputBase-input': { textAlign: 'center', width: 50 },
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
                    if (e.target.value.length > input.maxLength)
                      e.target.value = e.target.value.substring(0, e.target.value.length);
                    return (e.target.value = e.target.value.replace(/[^\d]+/g, ''));
                  }}
                  onChange={handleKeyPress}
                  onKeyDown={(e) => handleFocusInput(e, input.name)}
                  onFocus={() => {
                    setTouched(false);
                    currentIndex.current = index;
                  }}
                  onBlur={handleBlur}
                  error={isError}
                />
                {index !== zipCodeInputs.length - 1 && (
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
        <Stack direction="row" spacing={1}>
          <Typography variant="note" color={'text.main'}>
            ※
          </Typography>
          <Typography variant="note" color={'text.main'}>
            入力すると自動的に住所が表示されます。
          </Typography>
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
