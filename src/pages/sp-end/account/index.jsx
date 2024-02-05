import { useNavigate } from 'react-router-dom';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useSpContext } from '@/hooks';
import { SpRightRadioIcon } from '@/assets/svgs';
import { userPaths } from '@/routers/users/paths';
import { SpPageTitle } from '@/components/sp-end';
import { SpGroup, SpLayout } from '@/layouts/sp-end';

export default function SpAccount() {
  const { user } = useSpContext();
  const navigate = useNavigate();
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasFooter={true}>
      <SpPageTitle>ログイン</SpPageTitle>
      <SpGroup title={'メールアドレス'}>
        <Stack spacing={'12px'}>
          <Box p={'16px'} bgColor={'sp.gray.100'} borderRadius={'4px'}>
            <Text variant={'sp_16_100'}>{user?.email}</Text>
          </Box>
          <Flex justifyContent={'end'}>
            <Text
              variant={'sp_16_100_link'}
              display={'flex'}
              alignItems={'center'}
              onClick={() => navigate(userPaths.changeEmailVerifyEmail)}
            >
              変更する <SpRightRadioIcon />
            </Text>
          </Flex>
        </Stack>
      </SpGroup>
      <SpGroup title={'パスワード'}>
        <Stack spacing={'12px'}>
          <Box p={'16px'} bgColor={'sp.gray.100'} borderRadius={'4px'}>
            <Text variant={'sp_16_100'}>{'＊＊＊＊＊＊＊＊＊＊＊'}</Text>
          </Box>
          <Flex justifyContent={'end'}>
            <Text
              variant={'sp_16_100_link'}
              display={'flex'}
              alignItems={'center'}
              onClick={() => navigate(userPaths.updatePassword)}
            >
              変更する <SpRightRadioIcon />
            </Text>
          </Flex>
        </Stack>
      </SpGroup>
      <SpGroup title={'退会をご希望の方へ'}>
        <Stack spacing={'12px'}>
          <Box px={'8px'}>
            <Text variant={'sp_14_170'}>
              {
                '退会すると、ご登録いただいた全てのデータを閲覧できなくなります。一度退会するとデータを復元することはできませんのでご注意ください。'
              }
            </Text>
          </Box>
          <Flex justifyContent={'end'}>
            <Text
              variant={'sp_16_100_link'}
              display={'flex'}
              alignItems={'center'}
              onClick={() => navigate(userPaths.unsubcribed)}
            >
              退会する <SpRightRadioIcon />
            </Text>
          </Flex>
        </Stack>
      </SpGroup>
    </SpLayout>
  );
}
