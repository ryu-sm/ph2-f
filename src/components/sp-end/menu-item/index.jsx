import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { SpExpandMoreIcon } from '@/assets/svgs';

export default function SpMenuItem({ item }) {
  return (
    <Box
      p={'12px 16px 16px 16px'}
      borderRadius="14px"
      bg={'white'}
      _hover={{
        opacity: 0.85,
        boxShadow: '0 3px 4px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
      }}
      onClick={item.onClick}
    >
      <Box>
        <Flex pb={item.desc ? '8px' : '0px'} justifyContent={'space-between'}>
          <HStack spacing={'8px'}>
            <Box>{item.icon}</Box>
            <Text variant={'sp_20_130_bold'} color={'sp.primary.100'}>
              {item.label}
            </Text>
          </HStack>
          <SpExpandMoreIcon />
        </Flex>
        {item.desc && (
          <Box borderTop={'2px dashed'} borderColor={'sp.primary.40'} pt={'8px'}>
            <Text variant={'sp_14_100'} color={'sp.primary.100'}>
              {item.desc}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
