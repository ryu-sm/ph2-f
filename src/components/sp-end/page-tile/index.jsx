import { Box, Center, HStack, Stack, Text } from '@chakra-ui/react';
import { useSpContext } from '@/hooks';
import { SpErrMsgIcon } from '@/assets/svgs';

export default function SpPageTitle({ children }) {
  const { errMsg } = useSpContext();
  return (
    <Box pb={errMsg ? '32px' : '0px'}>
      <Center py={'32px'}>
        <Text variant={'sp_24_130_bold'} color={'sp.primary.100'}>
          {children}
        </Text>
      </Center>
      {errMsg && (
        <Center px={'16px'}>
          <Box
            py={'8px'}
            px={'16px'}
            bgColor={'sp.secondary.20'}
            border={'1px solid'}
            borderColor={'sp.secondary.100'}
            borderRadius={'8px'}
          >
            <HStack spacing={'12px'}>
              <Box>
                <SpErrMsgIcon />
              </Box>
              <Box>
                <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
                  {errMsg}
                </Text>
              </Box>
            </HStack>
          </Box>
        </Center>
      )}
    </Box>
  );
}
