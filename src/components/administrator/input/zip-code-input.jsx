import { convertToFullWidth, convertToHalfWidth } from '@/utils';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useEffect } from 'react';
import AutosizeInput from 'react-input-autosize';
import './autosize-style.css';
import { useRef } from 'react';
import axios from 'axios';

export const AdZipCodeInput = ({ callback, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setError } = helpers;

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
        try {
          const res = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`);
          console.log(res.data.results);
          if (res.data.results.length > 0) {
            callback({
              prefecture_kanji: res.data.results[0].address1,
              city_kanji: res.data.results[0].address2,
              district_kanji: res.data.results[0].address3,
              prefecture_kana: convertToFullWidth(res.data.results[0].kana1),
              city_kana: convertToFullWidth(res.data.results[0].kana2),
              district_kana: convertToFullWidth(res.data.results[0].kana3),
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [field, props]
  );

  const handleChange = useCallback(
    async (e) => {
      field.onChange(e);
      props.onChange && props.onChange(e);
    },
    [field, props, setValue]
  );
  // useEffect(() => {
  //   if (/^\d{3}[-]\d{4}$/.test(meta.value)) {
  //     console.log('ok');
  //   }
  // }, [meta.value]);
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{ width: 1, py: 1, pl: '36px', ml: -10 }}
      onClick={handleAutoFocus}
    >
      <AutosizeInput
        ref={inputRef}
        inputClassName="custom-input-style"
        name={field.name}
        value={meta.value}
        onInput={(e) => {
          e.target.value = convertToHalfWidth(e.target.value);
          e.target.value = e.target.value.replace(/[^\d-]+/g, '');
          e.target.value = e.target.value.substring(0, 8);
          return e;
        }}
        onChange={handleChange}
        onBlur={handelBlue}
        onFocus={() => setError('')}
      />
    </Stack>
  );
};
