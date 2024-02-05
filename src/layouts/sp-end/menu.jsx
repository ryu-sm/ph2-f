import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Center, Flex, IconButton, Stack, Text, useDisclosure, useTheme } from '@chakra-ui/react';
import {
  SpHeaderCloseIcon,
  SpMenuAccountIcon,
  SpMenuLogoutIcon,
  SpMenuPdfIcon,
  SpMenuResultIcon,
  SpMenuToolIcon,
  SpRight,
  SpSmileIcon,
} from '@/assets/svgs';
import { SpMenuItem, SpModalWrapper, SpNotifyTitle } from '@/components/sp-end';
import { userPaths } from '@/routers/users/paths';
import { spLogout } from '@/api/user-api';
import SpPaper from './containers/paper';

export default function MenuDrawer({ menu }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const modal = useDisclosure();
  const menuItems = useMemo(() => [
    {
      label: '審査結果',
      icon: <SpMenuResultIcon />,
      desc: '審査結果はこちらからご覧いただけます',
      show: false,
      onClick: () => {},
    },
    {
      label: '同意書・確認書等',
      icon: <SpMenuPdfIcon />,
      desc: 'ご同意いただいている確認書等',
      show: true,
      onClick: () => {
        if (pathname === userPaths.consentConfirmationForm) {
          menu.onClose();
        } else {
          navigate(userPaths.consentConfirmationForm);
        }
      },
    },
    {
      label: '日本住宅ローン用PDF',
      icon: <SpMenuPdfIcon />,
      desc: '必要に応じてダウンロードしてください',
      show: false,
      onClick: () => {},
    },
    {
      label: 'お役立ちツール',
      icon: <SpMenuToolIcon />,
      desc: '住宅購入時に役立つツールが満載！',
      show: false,
      onClick: () => {},
    },
    {
      label: 'アカウント情報',
      icon: <SpMenuAccountIcon />,
      desc: 'メールアドレス等の変更や退会',
      show: true,
      onClick: () => navigate(userPaths.account),
    },
    {
      label: 'ログアウト',
      icon: <SpMenuLogoutIcon />,
      desc: null,
      show: true,
      onClick: () => modal.onOpen(),
    },
  ]);

  const handleLogout = useCallback(async () => {
    try {
      await spLogout();
      localStorage.removeItem('LOCAL_STORAGE_FOR_SP');
      sessionStorage.removeItem('accessToken');
      navigate(userPaths.root);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <AnimatePresence>
      {menu.isOpen && (
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.28 }}
          style={{
            position: 'fixed',
            top: '0px',
            minHeight: '100dvh',
            width: 'inherit',
            maxWidth: 'inherit',
            zIndex: 999,
          }}
        >
          <SpPaper pageBg={theme.background.sp.gradation} hasFooter={true} hasFooterContact={true} isMenu={true}>
            <Flex justifyContent={'end'} pr={'8px'} h={'40px'}>
              <IconButton
                h={'40px'}
                w={'40px'}
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
                onClick={menu.onToggle}
              >
                <SpHeaderCloseIcon />
              </IconButton>
            </Flex>
            <Center py={'24px'}>
              <Text
                fontFamily={'Barlow'}
                fontStyle={'normal'}
                fontSize={'26px'}
                fontWeight={500}
                lineHeight={'100%'}
                letterSpacing={'0.6px'}
                color={'sp.primary.100'}
                textAlign={'center'}
              >
                {'MENU'}
              </Text>
            </Center>
            <Stack px={'16px'} spacing={'17px'}>
              {menuItems.map((item) => item.show && <SpMenuItem key={item.label} item={item} />)}
            </Stack>
            <SpModalWrapper isOpen={modal.isOpen}>
              <SpNotifyTitle
                icon={<SpSmileIcon />}
                title={`ログアウトします。\nよろしいですか？`}
                variant="sp_20_130_bold"
              />
              <Center px={'10px'}>
                <Button
                  variant={'sp_solid'}
                  size={'md'}
                  rightIcon={
                    <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                      <SpRight color={theme.colors.white} />
                    </Box>
                  }
                  onClick={handleLogout}
                >
                  ログアウト
                </Button>
              </Center>
              <Center pt={'24px'} px={'10px'}>
                <Button
                  variant={'sp_outline'}
                  size={'md'}
                  rightIcon={
                    <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                      <SpRight color={theme.colors.sp.primary[100]} />
                    </Box>
                  }
                  onClick={() => modal.onClose()}
                >
                  もどる
                </Button>
              </Center>
            </SpModalWrapper>
          </SpPaper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
