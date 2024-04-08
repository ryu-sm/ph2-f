import { Icons } from '@/assets';
import { useBoolean, useIsManager } from '@/hooks';
import { clearStorage } from '@/libs';
import { routeNames } from '@/router/settings';
import { adManagerLogou, adSalesPersonLogou } from '@/services';
import { authAtom, preliminarieListAtom } from '@/store';
import { downloadExcelAsync } from '@/utils';
import { useTheme } from '@emotion/react';
import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { AdLogModal } from './download-modal';

export const AdSettingPopover = ({ open, onClose, openChangePassword, anchorEl }) => {
  const navigate = useNavigate();
  const isManager = useIsManager();
  const resetAuth = useResetRecoilState(authAtom);
  const resetPreliminarieList = useResetRecoilState(preliminarieListAtom);
  const { manager, salesPerson } = useRecoilValue(authAtom);
  const logModal = useBoolean(false);
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
    {
      id: 2,
      label: 'パスワード変更',
      onclick: openChangePassword,
    },
    {
      id: 3,
      label: '管理画面をエクスポート',
      onclick: () => {},
    },
    {
      id: 4,
      label: 'ログアウト',
      onclick: async () => {
        if (isManager) {
          await adManagerLogou(manager?.email);
          resetAuth();
          resetPreliminarieList();
          clearStorage();
          navigate(routeNames.adManagerLoginPage.path);
        } else {
          await adSalesPersonLogou(salesPerson?.email);
          resetAuth();
          resetPreliminarieList();
          clearStorage();
          navigate(routeNames.adSalesPersonLoginPage.path);
        }
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
    </Popover>
  );
};
