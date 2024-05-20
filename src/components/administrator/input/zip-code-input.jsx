import { yup } from '@/libs';
import { convertToHalfWidth, convertToFullWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { FormikProvider, useField, useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';

export const AdZipCodeInput = ({
  setPrefectureKanji,
  setCityKanji,
  setDistrictKanji,
  setOtherAddressKanji,
  setPrefectureKana,
  setCityKana,
  setDistrictKana,
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const [oldValue, setOldValue] = useState(meta.value);
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.error]);
  const isSuccess = useMemo(() => !isError && !!meta.value && meta.value !== '', [isError, meta.value]);
  const [addrError, setAddrError] = useState(false);

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
      onChange && onChange();
      if ((e.target.value.length === 3 && e.target.name === 'firstCode') || e.target.value.length === 4)
        handleNextInput();
      if (e.target.value.length === 0) handleBackInput();

      if (refOne.current?.value || refTwo.current?.value) {
        await setValue(`${refOne.current?.value}-${refTwo.current?.value}`);
        return;
      }

      return await setValue('');
    },
    [handleBackInput, handleNextInput, setValue]
  );

  const handleBlur = useCallback(
    async (e) => {
      if (!!refOne.current && !!refTwo.current) {
        if (!!refOne.current.value || !!refTwo.current.value) {
          await setValue(`${refOne.current.value}-${refTwo.current.value}`);
        }

        if (e.target.name === 'firstCode') {
          setTouched(false);
        } else {
          setTouched(true);
        }
        if (e.target.name === 'firstCode' && currentIndex.current === 0) {
          setTouched(true);
        }
      }
      const newValue = `${refOne.current.value}-${refTwo.current.value}`;

      if (/^\d{3}[-]\d{4}$/.test(newValue)) {
        console.log(newValue);
        if (newValue === oldValue) {
          return;
        }
        try {
          const res = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${newValue}`);
          if (res.data.results.length > 0) {
            setPrefectureKanji && setPrefectureKanji(res.data.results[0].address1, false);
            setCityKanji && setCityKanji(res.data.results[0].address2, false);
            setDistrictKanji && setDistrictKanji(res.data.results[0].address3, false);
            setOtherAddressKanji && setOtherAddressKanji('', false);
            setPrefectureKana && setPrefectureKana(convertToFullWidth(res.data.results[0].kana1), false);
            setCityKana && setCityKana(convertToFullWidth(res.data.results[0].kana2), false);
            setDistrictKana && setDistrictKana(convertToFullWidth(res.data.results[0].kana3), false);
          } else {
            setAddrError(true);
            setPrefectureKanji && setPrefectureKanji('', false);
            setCityKanji && setCityKanji('', false);
            setDistrictKanji && setDistrictKanji('', false);
            setOtherAddressKanji && setOtherAddressKanji('', false);
            setPrefectureKana && setPrefectureKana('', false);
            setCityKana && setCityKana('', false);
            setDistrictKana && setDistrictKana('', false);
          }
        } catch (error) {
          setAddrError(true);
          setPrefectureKanji && setPrefectureKanji('', false);
          setCityKanji && setCityKanji('', false);
          setDistrictKanji && setDistrictKanji('', false);
          setOtherAddressKanji && setOtherAddressKanji('', false);
          setPrefectureKana && setPrefectureKana('', false);
          setCityKana && setCityKana('', false);
          setDistrictKana && setDistrictKana('', false);
        }
      } else {
        setPrefectureKanji && setPrefectureKanji('', false);
        setCityKanji && setCityKanji('', false);
        setDistrictKanji && setDistrictKanji('', false);
        setOtherAddressKanji && setOtherAddressKanji('', false);
        setPrefectureKana && setPrefectureKana('', false);
        setCityKana && setCityKana('', false);
        setDistrictKana && setDistrictKana('', false);
      }

      setOldValue(newValue);
    },
    [setValue, setTouched, meta.value]
  );

  const handleFocusInput = useCallback(
    async (e, name) => {
      if (e.key === 'tab') {
        handleNextInput();
      }
      if (e.key === 'Backspace' && refTwo.current?.value === '') handleBackInput();
    },
    [handleBackInput, handleNextInput, setTouched]
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
        <Stack spacing={'2px'}>
          <Stack spacing={1} direction={'row'} alignItems={'center'}>
            {zipCodeInputs.map((input, index) => (
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
                    e.target.value = e.target.value.replace(/[^\d]+/g, '');
                    e.target.value = e.target.value.substring(0, input.maxLength);
                    return e;
                  }}
                  onCompositionUpdate={async (e) => {
                    e.target.value = convertToHalfWidth(e.target.value) + convertToHalfWidth(e.nativeEvent.data);
                    return e;
                  }}
                  onChange={handleKeyPress}
                  onKeyDown={(e) => handleFocusInput(e, input.name)}
                  onFocus={() => {
                    setTouched(false);
                    setAddrError(false);
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
        </Stack>
        {isError && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={350}>
            <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
              ※{meta.error}
            </Typography>
          </Stack>
        )}
        {addrError && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={350}>
            <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
              ※住所が取得できませんでした。再度入力してください。
            </Typography>
          </Stack>
        )}
      </Stack>
    </FormikProvider>
  );
};
