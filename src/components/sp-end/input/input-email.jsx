import { useMemo } from 'react';
import { useField } from 'formik';
import { Box, Input, Stack, Text } from '@chakra-ui/react';

export default function SpInputEmail({ placeholder, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const isError = useMemo(() => meta.touched && !!meta.error, [meta.touched, meta.value]);
  const isCompleted = useMemo(() => !isError && meta.value !== '', [meta.value, isError]);

  return (
    <Box>
      <Stack spacing={'6px'}>
        <Input
          {...field}
          {...props}
          h={'48px'}
          w={'100%'}
          textAlign={'start'}
          sx={{
            color: 'sp.text.main',
            border: '1px solid',
            borderColor: 'sp.primary.40',
            borderRadius: '4px',
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
            // エラー状態
            ...(isError && {
              color: 'sp.secondary.100',
              borderColor: 'sp.secondary.100',
            }),
            // コンプリート状態
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
          type={'text'}
          placeholder={placeholder}
          value={meta.value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setTouched(false)}
        />

        {isError && (
          <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
            ※{meta.error}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
