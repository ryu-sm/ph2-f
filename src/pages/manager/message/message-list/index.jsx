import { AdHomeIcon } from '@/assets/icons/ad-home-icon';
import { AdMainSettingIcon } from '@/assets/icons/ad-main-setting';
import { SettingPopover } from '@/components/admin/setting-popover';
import { useIsManager } from '@/hooks/use-is-manager';
import { authAtom } from '@/store';
import { AdThemeProvider } from '@/styles/ad-theme';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import { MainFooter } from '@/containers/ad-layout/ad-main-wrapper/MainFooter';
import { SortListButton } from '@/components/admin/case-list-filter/sort-list-button';
import { SectionDivider } from '@/components/admin/common/Divider';
import { MessageListItem } from './message-list-item';
import { NewMessageModal } from './new-message-modal';
import { useBoolean } from '@/hooks';

export const MessageListPage = () => {
  const theme = useTheme();
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);

  const authInfo = useRecoilValue(authAtom);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const { value: modalOpen, onTrue: handleOpen, onFalse: handleClose } = useBoolean(false);

  const mockListData = [
    {
      id: '1',
      created_at: '2024-01-23T17:50:14.000Z',
      message: 'メッセージ',
      appliant_name: '申込者名',
      viewed: true,
    },
    {
      id: '2',
      created_at: '2024-05-04T17:50:14.000Z',
      message:
        'Lorem ipsum dolor sit amet, consectetuim, ut efficitur urna lobortis sed. Cras ullamcorper, felis a sagittis posuere, leo mi egestas dolor, sit amet sodales libero dolor in mi. Cras ac dolor nisl. Pellentesque bibendum bibendum est, vitae dictum elit vestibulum non. Pellentesque ornare, sem nec commodo lacinia, sem ipsum fermentum diam, eu d',
      appliant_name: 'xxxx',
    },
    {
      id: '3',
      created_at: '2024-11-20T17:50:14.000Z',
      message:
        ' ipsum ultrices laoreet. In elementum viverra lectus, a consequat est. Nullam dignissim neque at convallis efficitur. Morbi tempus dignissim diam, id vestibulum est. Aenean faucibus lig ',
      appliant_name: '田中角栄',
    },
    {
      id: '4',
      created_at: '2024-03-23T17:50:14.000Z',
      message: 'メッセージ',
      appliant_name: '申込者名',
    },
  ];
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
          <Stack direction={'row'} alignItems={'center'} sx={{ cursor: 'pointer' }} spacing={5}>
            <Typography variant="main_page_title" color={'#333333'}>
              お客様とのメッセージ一覧
            </Typography>
            {isManager && (
              <Button
                sx={{
                  width: '93px',
                  height: '25px',
                  bgcolor: 'white',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  color: 'primary.main',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'white',
                    opacity: 0.9,
                  },
                }}
                onClick={handleOpen}
              >
                <AddIcon sx={{ width: 16, height: 16 }} />
                <Typography variant="new_message_button" whiteSpace={'nowrap'}>
                  新規作成
                </Typography>
              </Button>
            )}
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={6}>
            <AdHomeIcon
              sx={{ cursor: 'pointer', width: 16, height: 18 }}
              onClick={() => navigator(`/${isManager ? 'manager/cases-review' : 'agent/cases-review'}`)}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="main_page_auth_info">
              {isManager ? authInfo.manager.name : authInfo.salesPerson.name}
            </Typography>
            <AdMainSettingIcon sx={{ cursor: 'pointer', width: 20, height: 20 }} onClick={handleOpenPopover} />
          </Stack>
        </Stack>

        <Stack flex={1} mt={'45px'} mb={'32px'}>
          <Stack direction={'row'} alignItems={'center'}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'318px'}
              height={'40px'}
              position={'relative'}
            >
              <Typography variant="message_filter">申込人</Typography>
              <SortListButton />
              <SectionDivider orientation="vertical" height="50%" top="25%" />
            </Stack>

            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'190px'}
              height={'40px'}
              position={'relative'}
            >
              <Typography variant="message_filter">日付</Typography>
              <SortListButton />
              <SectionDivider orientation="vertical" height="50%" top="25%" />
            </Stack>

            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'calc(100% - 508px)'}
              height={'40px'}
              position={'relative'}
            >
              <Typography variant="message_filter">連絡内容</Typography>
            </Stack>
          </Stack>
          {mockListData.map((item) => (
            <MessageListItem key={item.id} item={item} isManager={isManager} />
          ))}
        </Stack>
        <MainFooter />
      </Stack>

      <SettingPopover open={open} anchorEl={anchorEl} onClose={handleClosePopover} />
      <NewMessageModal open={modalOpen} onClose={handleClose} isManager={isManager} />
    </AdThemeProvider>
  );
};
