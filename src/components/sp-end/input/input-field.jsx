import { useMemo } from 'react';
import { useField } from 'formik';
import { Box, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { SP_STORE_INITIAL_STATE } from '@/constants';

export default function SpInputField({ placeholder, type, align, unit, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched, setError } = helpers;

  return (
    <Box>
      <Stack spacing={'6px'}>
        <HStack>
          <Input
            {...field}
            {...props}
            h={'48px'}
            w={props.width || '100%'}
            textAlign={align || 'start'}
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
              ...(!!meta.error && {
                color: 'sp.secondary.100',
                borderColor: 'sp.secondary.100',
              }),
              // コンプリート状態
              ...(!meta.error &&
                meta.value !== SP_STORE_INITIAL_STATE[props.name] && {
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
            type={type || 'text'}
            placeholder={placeholder}
            value={meta.value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
            }}
            onFocus={() => setTouched(false)}
          />
          {unit && (
            <HStack alignItems={'start'} spacing={'6px'}>
              <Text variant={'sp_16_100'}>万円</Text>
              <Text variant={'sp_12_150'}>※10万円単位</Text>
            </HStack>
          )}
        </HStack>

        {!!meta.error && (
          <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
            ※{meta.error}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
