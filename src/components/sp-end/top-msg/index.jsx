import { SpSmileIcon } from '@/assets/svgs';
import { Box, Center, Stack, Text } from '@chakra-ui/react';

export default function SpTopMsg({ children }) {
  return (
    <Center pb={'24px'}>
      <Box w={'280px'} px={'16px'} py={'12px'} bg={'white'} borderRadius={'8px'}>
        <Stack spacing={'12px'} alignItems={'center'}>
          <SpSmileIcon />
          <Text variant={'sp_16_130_bold'} textAlign={'center'} color={'sp.primary.100'}>
            {children}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
