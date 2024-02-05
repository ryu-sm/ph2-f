import { useField } from 'formik';
import { useMemo, useState } from 'react';
import { Box, Input, InputGroup, InputRightElement, Stack, Text, useTheme } from '@chakra-ui/react';
import { SpViewOn, SpViewOff, SpcheckPwdIcon, SpcheckPwdCheckedIcon } from '@/assets/svgs';

export default function SpInputPwd({ showPwdPower, sx = {}, ...props }) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.value]);
  const isCompleted = useMemo(() => !isError && meta.value !== '', [meta.value, isError]);
  const isLengthValid = useMemo(() => meta.value?.length >= 8 && meta.value?.length <= 20, [meta.value]);
  const isContentValid = useMemo(() => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(meta.value), [meta.value]);

  return (
    <Box sx={sx}>
      <Stack spacing={'6px'}>
        <InputGroup>
          <Input
            {...field}
            {...props}
            h={'48px'}
            w={'100%'}
            sx={{
              color: 'sp.text.main',
              border: '1px solid',
              borderColor: 'sp.primary.40',
              borderRadius: '4px',
              textAlign: 'left',
              boxShadow: '0px 4px 6px 0px rgba(44, 54, 156, 0.10) inset',
              backgroundColor: 'white',
              _focus: {
                backgroundColor: 'sp.focus',
                border: '1px solid',
                borderColor: 'sp.primary.100',
              },
              _focusVisible: {
                outline: 'none',
              },
              _placeholder: {
                color: 'sp.placeholder',
                fontWeight: '300',
              },
              ...(isError && {
                color: 'sp.secondary.100',
                borderColor: 'sp.secondary.100',
              }),
              ...(isCompleted && {
                border: '1px solid',
                backgroundColor: 'sp.gray.100',
                boxShadow: 'none',
              }),
              letterSpacing: '0.6px',
              fontFamily: 'Hiragino Sans',
              fontStyle: 'normal',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: '100%',
            }}
            type={showPassword ? 'text' : 'password'}
            value={meta.value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setTouched(false)}
          />
          <InputRightElement mt={'4px'} mr={'6px'} cursor={'pointer'} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <SpViewOff
                color={meta.touched && !!meta.error ? theme.colors.sp.secondary[100] : theme.colors.sp.primary[100]}
              />
            ) : (
              <SpViewOn
                color={meta.touched && !!meta.error ? theme.colors.sp.secondary[100] : theme.colors.sp.primary[100]}
              />
            )}
          </InputRightElement>
        </InputGroup>

        {meta.touched && !!meta.error && (
          <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
            ※{meta.error}
          </Text>
        )}
        {showPwdPower && (
          <Box py={'6px'}>
            <Stack>
              <Text variant={'sp_12_100'}>パスワードの条件</Text>
              <Text
                variant={'sp_12_100'}
                display={'flex'}
                alignItems={'center'}
                color={!!meta.value && !isLengthValid ? 'sp.secondary.100' : 'sp.text.main'}
              >
                {isLengthValid ? <SpcheckPwdCheckedIcon /> : <SpcheckPwdIcon />} 8文字以上20文字以下
              </Text>
              <Text
                variant={'sp_12_100'}
                display={'flex'}
                alignItems={'center'}
                color={!!meta.value && !isContentValid ? 'sp.secondary.100' : 'sp.text.main'}
              >
                {isContentValid ? <SpcheckPwdCheckedIcon /> : <SpcheckPwdIcon />} 大文字英字・小文字英字・数字の3種混在
              </Text>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
