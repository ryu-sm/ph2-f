import { Box, Text } from '@chakra-ui/react';

export default function SpBlock({ title, children }) {
  return (
    <Box bg={'white'} border={'1px solid'} borderColor={'sp.primary.100'} borderRadius={'10px'}>
      {title && (
        <Box
          px={'12px'}
          py={'4px'}
          bg={'sp.primary.100'}
          border={'1px solid'}
          borderColor={'sp.primary.100'}
          borderRadius={'8px 8px 0px 0px'}
        >
          <Text variant={'sp_16_130_bold'} color={'white'}>
            {title}
          </Text>
        </Box>
      )}
      <Box>{children}</Box>
    </Box>
  );
}
