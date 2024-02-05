import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Stack, useTheme } from '@chakra-ui/react';
import { SpWrapper } from '@/layouts/sp-end';
import { spBackground } from '@/assets/images';
import { userPaths } from '@/routers/users/paths';
import { SpRight, SpStartLogo } from '@/assets/svgs';

export default function SpWlcmPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <SpWrapper bgImage={`url(${spBackground})`}>
      <Center h={'calc(100dvh - 156px)'}>
        <SpStartLogo />
      </Center>
      <Box
        py={'16px'}
        px={'24px'}
        w={'inherit'}
        bottom={'0px'}
        maxW={'inherit'}
        pos={'absolute'}
        bgColor={theme.colors.white}
        boxShadow={'0px -4px 10px rgba(0, 0, 0, 0.05)'}
      >
        <Stack spacing={'16px'}>
          <Button
            variant={'sp_solid'}
            size={'lg'}
            rightIcon={
              <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
                <SpRight color={theme.colors.white} />
              </Box>
            }
            onClick={() => navigate(userPaths.registerVerifyEmail)}
          >
            新規登録
          </Button>
          <Button
            variant={'sp_outline'}
            size={'lg'}
            rightIcon={
              <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
                <SpRight color={theme.colors.sp.primary[100]} />
              </Box>
            }
            onClick={() => navigate(userPaths.login)}
          >
            ログイン
          </Button>
        </Stack>
      </Box>
    </SpWrapper>
  );
}
