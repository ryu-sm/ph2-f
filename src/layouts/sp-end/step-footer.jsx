import { SpLeftRadioIcon, SpRight } from '@/assets/svgs';
import { Box, Button, HStack, Text, useTheme } from '@chakra-ui/react';

export default function SpStepFooter({ isDisabled, onLeft, onRight }) {
  const theme = useTheme();
  return (
    <Box
      pos={'fixed'}
      bottom={'0px'}
      w={'inherit'}
      maxW={'480px'}
      boxShadow={'0px -4px 10px 0px rgba(0, 0, 0, 0.05)'}
      bgColor={theme.colors.white}
      py={'16px'}
      px={'24px'}
    >
      <HStack spacing={'16px'} justifyContent={'space-between'}>
        {onLeft && (
          <Text
            variant={'sp_16_100_link'}
            display={'flex'}
            alignItems={'center'}
            minW={'74px'}
            cursor={'pointer'}
            onClick={onLeft}
          >
            <SpLeftRadioIcon /> もどる
          </Text>
        )}
        <Button
          variant={'sp_solid'}
          size={'md'}
          rightIcon={
            <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
              <SpRight color={theme.colors.white} />
            </Box>
          }
          isDisabled={isDisabled}
          onClick={onRight}
        >
          次へ
        </Button>
      </HStack>
    </Box>
  );
}
