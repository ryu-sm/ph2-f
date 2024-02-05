import { useField } from 'formik';
import { Box, Button, ButtonGroup, Flex, Stack, Text } from '@chakra-ui/react';

export default function SpGroupButton({ options, errMsg, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  return (
    <Box w={'100%'}>
      <Stack spacing={'6px'}>
        <Flex justifyContent={'space-between'} gap={'15px'}>
          <ButtonGroup {...field} w={'100%'}>
            {options.map((item) => (
              <Button
                {...props}
                sx={{
                  h: '48px',
                  bg: 'white',
                  color: 'sp.primary.100',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '100%',
                  letterSpacing: '0.6px',
                  fontFamily: 'Hiragino Sans',
                  fontStyle: 'normal',
                  border: '1px solid',
                  borderColor: 'sp.primary.40',
                  borderRadius: '14px',
                  boxShadow: '0px 0px 15px 0px rgba(60, 72, 196, 0.10)',
                  _active: {
                    bg: 'sp.primary.40',
                    border: '1px solid',
                    borderColor: 'sp.primary.100',
                  },
                  _hover: {
                    opacity: 0.95,
                  },
                  _disabled: {
                    opacity: 0.6,
                    bg: 'rgba(0,0,0,.1)',
                    border: 'none',
                    boxShadow: 'none',
                    pointerEvents: 'none',
                  },
                }}
                key={item.value}
                onClick={() => {
                  setTouched(true);
                  setValue(item.value);
                }}
                isActive={meta.value === item.value}
                flex={1}
                size="lg"
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
        {errMsg && (
          <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
            ※{errMsg}
          </Text>
        )}
      </Stack>
    </Box>
  );
}
