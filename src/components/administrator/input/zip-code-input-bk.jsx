import { convertToFullWidth } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useState } from 'react';
import AutosizeInput from 'react-input-autosize';
import './autosize-style.css';
import { useRef } from 'react';
import axios from 'axios';

export const AdZipCodeInput = ({
  setPrefectureKanji,
  setCityKanji,
  setDistrictKanji,
  setOtherAddressKanji,
  setPrefectureKana,
  setCityKana,
  setDistrictKana,
  ml,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const [oldValue, setOldValue] = useState(meta.value);
  const [addrError, setAddrError] = useState(false);
  const inputRef = useRef(null);

  const handleAutoFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handelBlue = useCallback(
    async (e) => {
      field.onBlur(e);
      props.onBlur && props.onBlur(e);
      let value = e.target.value?.toString().trim();
      await setValue(value);

      if (/^\d{3}[-]\d{4}$/.test(value)) {
        if (value === oldValue) {
          return;
        }
        try {
          const res = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`);
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

      setOldValue(value);
    },
    [field, props]
  );

  const handleChange = useCallback(
    async (e) => {
      props.onChange && props.onChange(e);
      setValue(e.target.value);
    },
    [field, props, setValue]
  );

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flex={1}
      spacing={2}
      sx={{ ml: ml || -10 }}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: 1, py: 1, pl: '36px' }} onClick={handleAutoFocus}>
        <AutosizeInput
          ref={inputRef}
          inputClassName="custom-input-style"
          name={field.name}
          value={meta.value}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^\d-]+/g, '');
            e.target.value = e.target.value.substring(0, 8);
            return e;
          }}
          onChange={handleChange}
          onBlur={handelBlue}
          onFocus={() => {
            setTouched(false);
            setAddrError(false);
          }}
        />
      </Stack>
      {meta.touched && meta.error && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={320}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            {meta.error}
          </Typography>
        </Stack>
      )}
      {addrError && (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} minWidth={320}>
          <Typography variant="edit_content" textAlign={'start'} color={'secondary.main'}>
            住所が取得できませんでした。再度入力してください。
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
