import { AdHomeIcon } from '@/assets/icons/ad-home-icon';
import { AdMainSettingIcon } from '@/assets/icons/ad-main-setting';
import { AdMessageIcon } from '@/assets/icons/ad-message';
import { SettingPopover } from '@/components/admin/setting-popover';
import { authAtom } from '@/store';
import { useTheme } from '@emotion/react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
export const EditHeader = ({ isAdmin }) => {
  const theme = useTheme();
  const authInfo = useRecoilValue(authAtom);
  const name = isAdmin ? authInfo.manager.name : authInfo.salesPerson.name;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const spItemLabels = ['監視ログダウンロード', 'パスワード変更', 'ログアウト'];
  const adItemLabels = ['パスワード変更', 'ログアウト'];

  const navigator = useNavigate();
  return (
    <>
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
          borderTopColor: theme.palette.gray[20],
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
          paddingX: 6,
        }}
      >
        <Stack direction={'row'} spacing={4} alignItems={'center'} py={2}>
          <Typography variant="main_page_title" color="text.normal">
            申込内容の修正・確認
          </Typography>
          <Typography variant="main_page_title" color="text.normal">
            {`[ ${name} ]`}
          </Typography>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} spacing={6}>
          <AdHomeIcon
            sx={{ cursor: 'pointer', width: 16, height: 18 }}
            onClick={() => navigator(`/${isAdmin ? 'manager/cases-review' : 'agent/cases-review'}`)}
          />
          <AdMessageIcon sx={{ cursor: 'pointer', width: 18, height: 14 }} />
          {!isAdmin && (
            <Button
              sx={{
                width: 65,
                minHeight: 22,
                height: 22,
                border: '1px solid',
                marginRight: '10px',
                borderColor: 'primary.main',
                bgcolor: 'white',
                boxShadow: 'none',
              }}
            >
              <Typography variant="annotation_01" color="primary.main">
                メモ
              </Typography>
            </Button>
          )}
          <Button
            sx={{
              width: 115,
              minWidth: 115,
              px: 4,
              minHeight: 22,
              height: 22,
              border: '1px solid',
              marginRight: '10px',
              borderColor: 'primary.main',
              bgcolor: 'white',
              boxShadow: 'none',
            }}
          >
            <Typography variant="annotation_01" color="primary.main" sx={{ whiteSpace: 'nowrap' }}>
              メッセージ画面へ
            </Typography>
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="main_page_auth_info">
            {isAdmin ? authInfo.manager.name : authInfo.salesPerson.name}
          </Typography>
          <AdMainSettingIcon sx={{ cursor: 'pointer', width: 20, height: 20 }} onClick={handleOpenPopover} />
        </Stack>
      </Stack>

      <SettingPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        itemLabels={isAdmin ? adItemLabels : spItemLabels}
      />
    </>
  );
};

EditHeader.propTypes = {
  isAdmin: PropTypes.bool,
};
