import { Icons } from '@/assets';
import { useBoolean, useIsManager } from '@/hooks';
import { routeNames } from '@/router/settings';
import { adManagerPreliminariesFile, adSalesPersonPreliminariesFile } from '@/services';
import { authAtom, dashboardTabStatusAtom } from '@/store';
import { downloadExcelAsync } from '@/utils';
import { useTheme } from '@emotion/react';
import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AdLogModal } from './download-modal';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { LogoutModal } from './logout-modal';

export const AdSettingPopover = ({ open, onClose, openChangePassword, anchorEl }) => {
  const isManager = useIsManager();
  const dashboardTabStatus = useRecoilValue(dashboardTabStatusAtom);
  const { pathname } = useLocation();
  const logModal = useBoolean(false);
  const logoutModal = useBoolean(false);
  const { salesPerson } = useRecoilValue(authAtom);
  const menuItems = [
    ...(isManager
      ? [
          {
            id: 1,
            label: '監視ログダウンロード',
            onclick: () => {
              logModal.onTrue();
            },
          },
        ]
      : []),

    ...(salesPerson.type !== 2
      ? [
          {
            id: 2,
            label: 'パスワード変更',
            onclick: openChangePassword,
          },
        ]
      : []),
    ...(pathname === routeNames.adManagerDashboardPage.path || pathname === routeNames.adSalesPersonDashboardPage.path
      ? [
          {
            id: 3,
            label: '管理画面をエクスポート',
            onclick: async () => {
              try {
                if (isManager) {
                  const res = await adManagerPreliminariesFile(dashboardTabStatus);
                  await downloadExcelAsync(res.data.src, res.data.name);
                } else {
                  const res = await adSalesPersonPreliminariesFile(dashboardTabStatus);
                  await downloadExcelAsync(res.data.src, res.data.name);
                }
              } catch (erorrs) {
                console.debug(error);
              }
            },
          },
        ]
      : []),
    {
      id: 4,
      label: 'ログアウト',
      onclick: async () => {
        logoutModal.onTrue();
      },
    },
  ];

  const theme = useTheme();
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{ marginTop: 9, '.MuiPopover-paper': { overflow: 'visible', borderRadius: 2 } }}
    >
      <AdLogModal open={logModal.value} onClose={logModal.onFalse} />
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          right: 8,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: `10px solid ${theme.palette.primary.main}`,
        }}
      />
      <Stack
        overflow={'hidden'}
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
        }}
      >
        {menuItems.map((item, index) => {
          return (
            <Box key={index}>
              <Button
                sx={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  py: '10px',
                  backgroundColor: 'white',
                  color: 'gray.100',
                  borderRadius: 0,
                  borderBottom: index === menuItems.length - 1 ? 'none' : '1px solid',
                  borderColor: 'gray.80',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
                onClick={item.onclick}
              >
                <Typography variant="setting_popover" marginRight={2}>
                  {item.label}
                </Typography>
                {(item.id === 1 || item.id === 3) && <Icons.AdExportExcelIcon />}
              </Button>
            </Box>
          );
        })}
      </Stack>
      <LogoutModal isOpen={logoutModal.value} onClose={logoutModal.onFalse} />
    </Popover>
  );
};
