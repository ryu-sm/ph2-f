import { SpTopChatIcon } from '@/assets/svgs';
import { Center, HStack, Text } from '@chakra-ui/react';

export default function TopChat() {
  return (
    <Center pos={'fixed'} bottom={'0px'} w={'inherit'} maxW={'480px'} px={'24px'}>
      <HStack
        h={'46px'}
        w={'260px'}
        bg={'linear-gradient(45deg, #3C48C4 18%, #6A75DE 56.8%, #AD92D0 94.79%, #AD92D0 94.79%)'}
        border={'6px solid #F1F6FD'}
        borderBottom={'none'}
        borderRadius={'20px 20px 0px 0px'}
        spacing={'6px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <SpTopChatIcon />
        <Text variant={'sp_14_100_bold'} color={'white'}>
          {'みらいバンクとチャット連絡'}
        </Text>
      </HStack>
    </Center>
  );
}
