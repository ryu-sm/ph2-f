import { Box, Button, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { ApWrapper } from '../ap-wrapper';
import { ApFooter } from '../ap-footer';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { applyNoSelector, authAtom, displayPdfSelector, localApplication, preExaminationStatusSelector } from '@/store';
import { useBoolean } from '@/hooks';
import { useMemo } from 'react';
import { Icons } from '@/assets';
import { DISCLOSURE_RESULTS_TO_APPLICANTS } from '@/constant/pre-examination-status';
import { MCJ_CODE } from '@/configs';
import { routeNames } from '@/router/settings';
import { useNavigate } from 'react-router-dom';
import { ApModalWrapper, ApPrimaryButton, ApSecondaryButton } from '@/components';
import { clearStorage } from '@/libs';
import { apLogou } from '@/services';

export const ApMenu = ({ menu }) => {
  const navigate = useNavigate();
  const applyNo = useRecoilValue(applyNoSelector);
  const preExaminationStatus = useRecoilValue(preExaminationStatusSelector);
  const resetAuth = useResetRecoilState(authAtom);
  const resetLocalApplicationInfo = useResetRecoilState(localApplication);
  const { p_application_banks } = useRecoilValue(localApplication);
  const displayPdf = useRecoilValue(displayPdfSelector);
  const modal = useBoolean();

  const menuItems = useMemo(
    () => [
      {
        label: '審査結果',
        icon: <Icons.ApMenuItemResultIcon />,
        desc: '審査結果はこちらからご覧いただけます',
        show: displayPdf && preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS,
        onClick: () => {},
      },
      {
        label: '同意書・確認書等',
        icon: <Icons.ApMenuItemPdfIcon />,
        desc: 'ご同意いただいている確認書等',
        show: true,
        onClick: () => {
          if (window.location.pathname === routeNames.apConsentConfirmationPage.path) return menu.onFalse();
          navigate(routeNames.apConsentConfirmationPage.path);
        },
      },
      {
        label: '日本住宅ローン用PDF',
        icon: <Icons.ApMenuItemPdfIcon />,
        desc: '必要に応じてダウンロードしてください',
        show: !!applyNo && p_application_banks.includes(MCJ_CODE),
        onClick: () => {},
      },
      {
        label: 'お役立ちツール',
        icon: <Icons.ApMenuItemToolIcon />,
        desc: '住宅購入時に役立つツールが満載！',
        show: false,
        onClick: () => {},
      },
      {
        label: 'アカウント情報',
        icon: <Icons.ApMenuItemAccountIcon />,
        desc: 'メールアドレス等の変更や退会',
        show: true,
        onClick: () => {
          if (window.location.pathname === routeNames.apAccountInformationPage.path) return menu.onFalse();
          navigate(routeNames.apAccountInformationPage.path);
        },
      },
      {
        label: 'ログアウト',
        icon: <Icons.ApMenuItemLogoutIcon />,
        desc: null,
        show: true,
        onClick: () => modal.onTrue(),
      },
    ],
    [applyNo, p_application_banks, preExaminationStatus, MCJ_CODE]
  );

  const handelLogout = async () => {
    await apLogou();
    resetAuth();
    resetLocalApplicationInfo();
    clearStorage();
    navigate(routeNames.apStartPage.path, { replace: true });
  };

  return (
    <AnimatePresence>
      {menu.value && (
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ x: '100vw' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.28 }}
          style={{
            position: 'fixed',
            top: 0,
            zIndex: 9,
            width: '100%',
            maxWidth: 480,
            boxShadow:
              'rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px',
          }}
        >
          <ApWrapper>
            <Box sx={{ background: (theme) => theme.palette.background.gradation }}>
              <Stack
                sx={{
                  pt: 11,
                  height: '100dvh',
                  minHeight: '100dvh',
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                <Stack flex={1} sx={{ px: 4 }}>
                  <Button
                    sx={{
                      position: 'fixed',
                      top: 0,
                      right: 0,
                      p: 0,
                      height: 44,
                      minHeight: 44,
                      width: 44,
                      minWidth: 44,
                      bgcolor: 'transparent',
                      boxShadow: 'none',
                      borderRadius: '2px',
                      '&:hover': { bgcolor: 'transparent' },
                      zIndex: 3,
                    }}
                    onClick={menu.onFalse}
                  >
                    <Icons.ApHeaderMenuCloseIcon />
                  </Button>
                  <Box
                    sx={{
                      py: 6,
                      fontSize: 26,
                      fontWeight: 500,
                      lineHeight: '100%',
                      fontFamily: 'Barlow',
                      letterSpacing: 0.6,
                      textAlign: 'center',
                      color: (theme) => theme.palette.primary.main,
                    }}
                  >
                    MENU
                  </Box>
                  <Stack flex={1} spacing={4}>
                    {menuItems.map(
                      (item) =>
                        item.show && (
                          <Button
                            key={item.label}
                            fullWidth
                            sx={{
                              p: 0,
                              bgcolor: 'white',
                              boxShadow: 'none',
                              '&:hover': {
                                backgroundColor: 'white',
                                opacity: { mobile: 1, desktop: 0.8 },
                              },
                              color: (theme) => theme.palette.primary.main,
                            }}
                            onClick={item.onClick}
                          >
                            <Stack spacing={2} sx={{ px: 4, pt: 3, pb: 4, width: 1 }}>
                              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                                  {item.icon}
                                  <Typography
                                    variant="radio_checkbox_button"
                                    sx={{ fontSize: 20, color: (theme) => theme.palette.primary.main }}
                                  >
                                    {item.label}
                                  </Typography>
                                </Stack>
                                <Icons.ApForwardRightRadioIcon />
                              </Stack>

                              {!!item.desc && (
                                <Box
                                  sx={{
                                    pt: 2,
                                    borderTop: (theme) => `1.5px dashed ${theme.palette.primary[60]}`,
                                    fontWeight: 300,
                                    fontSize: 14,
                                    lineHeight: '170%',
                                    letterSpacing: 0.1,
                                    textAlign: 'left',
                                  }}
                                >
                                  {item.desc}
                                </Box>
                              )}
                            </Stack>
                          </Button>
                        )
                    )}
                  </Stack>
                </Stack>
                <ApFooter hasContact={true} />
              </Stack>
            </Box>
            <ApModalWrapper
              open={modal.value}
              icon={<Icons.ApSmileIcon />}
              label={`ログアウトします。\nよろしいですか？`}
            >
              <Stack justifyContent={'center'} alignItems={'center'} spacing={6}>
                <ApPrimaryButton
                  width={260}
                  height={40}
                  endIcon={<Icons.ApForwardRightWhiteIcon />}
                  onClick={handelLogout}
                >
                  ログアウト
                </ApPrimaryButton>
                <ApSecondaryButton
                  width={260}
                  height={40}
                  endIcon={<Icons.ApForwardRightMainIcon />}
                  onClick={() => modal.onFalse()}
                >
                  もどる
                </ApSecondaryButton>
              </Stack>
            </ApModalWrapper>
          </ApWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
