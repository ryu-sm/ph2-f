import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSpContext } from '@/hooks';
import { SpLayout } from '@/layouts/sp-end';
import { spUnsubcribed } from '@/api/user-api';
import { userPaths } from '@/routers/users/paths';
import { SpRight, SpSmileIcon, SpWarningIcon } from '@/assets/svgs';
import { SpPageTitle, SpModalWrapper, SpNotifyTitle } from '@/components/sp-end';
import { Box, Button, Center, Stack, Text, useDisclosure, useTheme } from '@chakra-ui/react';

export default function SpUnsubcribed() {
  const navigate = useNavigate();
  const theme = useTheme();
  const modal = useDisclosure();
  const { setErrMsg } = useSpContext();
  const handleUnsubcribed = useCallback(async () => {
    try {
      await spUnsubcribed();
      localStorage.removeItem('spLocalState');
      sessionStorage.removeItem('accessToken');
      modal.onOpen();
    } catch (error) {
      switch (error?.response?.status) {
        default:
          setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
      }
    }
  }, []);
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasFooter={true}>
      <Center pt={'24px'} px={'48px'}>
        <Box
          py={'12px'}
          px={'16px'}
          bg={'white'}
          w={'280px'}
          border={'1px solid'}
          borderColor={'sp.secondary.100'}
          borderRadius={'8px'}
        >
          <Stack spacing={'12px'} alignItems={'center'}>
            <SpWarningIcon />
            <Text variant={'sp_16_130_bold'} color={'sp.secondary.100'} textAlign={'center'}>
              {`退会すると\nすべてのデータが削除され\n復元できません。`}
            </Text>
          </Stack>
        </Box>
      </Center>
      <SpPageTitle>本当に退会しますか？</SpPageTitle>

      <Center px={'24px'} pb={'24px'}>
        <Button
          variant={'sp_solid'}
          size={'lg'}
          rightIcon={
            <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
              <SpRight color={theme.colors.white} />
            </Box>
          }
          onClick={() => navigate(userPaths.top)}
        >
          アカウントを維持する
        </Button>
      </Center>
      <Center px={'24px'}>
        <Button
          variant={'sp_outline'}
          size={'lg'}
          rightIcon={
            <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
              <SpRight color={theme.colors.sp.primary[100]} />
            </Box>
          }
          onClick={handleUnsubcribed}
        >
          退会する
        </Button>
      </Center>
      <SpModalWrapper isOpen={modal.isOpen}>
        <SpNotifyTitle icon={<SpSmileIcon />} title={`退会が完了しました`} variant="sp_20_130_bold" />
        <Center>
          <Text variant={'sp_16_170'} textAlign={'center'}>
            {`ご利用ありがとうございました。\nまたのご利用をお待ちしております。`}
          </Text>
        </Center>
        <Center pt={'24px'} px={'10px'}>
          <Button
            variant={'sp_solid_secondary'}
            size={'md'}
            w={'160px'}
            rightIcon={
              <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                <SpRight color={theme.colors.sp.primary[100]} />
              </Box>
            }
            onClick={() => navigate(userPaths.root)}
          >
            とじる
          </Button>
        </Center>
      </SpModalWrapper>
    </SpLayout>
  );
}
