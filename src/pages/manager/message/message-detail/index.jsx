import { AdHomeIcon } from '@/assets/icons/ad-home-icon';
import { AdMainSettingIcon } from '@/assets/icons/ad-main-setting';
import { SettingPopover } from '@/components/admin/setting-popover';
import { MainFooter } from '@/containers/ad-layout/ad-main-wrapper/MainFooter';
import { useIsManager } from '@/hooks/use-is-manager';
import { authAtom } from '@/store';
import { AdThemeProvider } from '@/styles/ad-theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { MessageRenderListPage } from './message-render-list';
import { MessageSendPage } from './message-send';

export const MessageDetailPage = () => {
  const theme = useTheme();
  const mockUser = '田中太郎';

  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  const navigator = useNavigate();

  const authInfo = useRecoilValue(authAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <AdThemeProvider>
      <Stack
        sx={{
          height: '100dvh',
          minHeight: '100dvh',
          background: (theme) => theme.palette.gray[20],
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            zIndex: theme.zIndex.drawer + 1,
            borderTop: '1px solid',
            borderTopColor: (theme) => theme.palette.gray[80],
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
            padding: '8px 20px',
          }}
        >
          <Stack direction={'row'} alignItems={'center'} sx={{ cursor: 'pointer' }} spacing={3}>
            <Typography
              variant="main_page_title"
              color={'primary.main'}
              fontSize={'14px'}
              letterSpacing={'0.1px'}
              onClick={() => navigator(`/${isManager ? 'manager/messages' : 'agent/messages'}`)}
            >
              お客様とのメッセージ一覧
            </Typography>
            <KeyboardArrowRightIcon
              sx={{
                width: '20px',
                height: '20px',
                color: 'rgb(102, 102, 102)',
              }}
            />
            <Typography variant="main_page_title">
              {mockUser}
              {' 様'}
            </Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={6}>
            <AdHomeIcon
              sx={{ cursor: 'pointer', width: 16, height: 18 }}
              onClick={() => navigator(`/${isManager ? 'manager/cases-review' : 'sale-person/cases-review'}`)}
            />
            <Button
              sx={{
                px: 1,
                py: '2px',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: 'primary.main',
                bgcolor: 'white',
                '&:hover': { opacity: 0.9, bgcolor: 'white' },
              }}
              onClick={() =>
                navigator(
                  isManager
                    ? `/manager/case-edit/preliminary_id=${authInfo.preliminaryId}`
                    : `/sale-person/case-edit/preliminary_id=${authInfo.preliminaryId}`
                )
              }
            >
              <Typography variant="message_icon_button">申し込み内容確認</Typography>
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="main_page_auth_info">
              {isManager ? authInfo.manager.name : authInfo.salesPerson.name}
            </Typography>
            <AdMainSettingIcon sx={{ cursor: 'pointer', width: 20, height: 20 }} onClick={handleOpenPopover} />
          </Stack>
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          spacing={6}
          py={4}
          px={5}
          mt={'45px'}
          mb={'40px'}
        >
          <MessageRenderListPage />
          <MessageSendPage />
        </Stack>
      </Stack>
      <SettingPopover open={open} anchorEl={anchorEl} onClose={handleClosePopover} />
      <MainFooter />
    </AdThemeProvider>
  );
};
