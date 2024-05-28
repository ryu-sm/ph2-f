import { Icons } from '@/assets';
import { useIsManager } from '@/hooks';
import { clearStorage } from '@/libs';
import { ComModalWapper } from '@/pages/administrator/com-modal-wapper';
import { routeNames } from '@/router/settings';
import { adManagerLogout, adSalesPersonLogout } from '@/services';
import { authAtom } from '@/store';
import { Button, Modal, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export const LogoutModal = ({ isOpen, onClose }) => {
  const isManager = useIsManager();
  const navigate = useNavigate();
  const resetAuth = useResetRecoilState(authAtom);
  const { salesPerson } = useRecoilValue(authAtom);
  return (
    <ComModalWapper open={isOpen} onClose={onClose}>
      <Stack spacing={6} sx={{ pt: 2, pb: 8 }} alignItems={'center'}>
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography variant="dailog_warring" fontWeight={500}>
            ログアウトします。よろしいですか？
          </Typography>
        </Stack>
        <Button
          sx={{
            bgcolor: 'white',
            boxShadow: 'none',
            width: '200px',
            height: '36px',
            marginBottom: 5,
            borderRadius: '2px',
            minHeight: '36px',
            border: '1px solid',
            borderColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              bgcolor: 'white',
              border: '1px solid',
              borderColor: (theme) => theme.palette.primary.main,
              opacity: 0.8,
            },
          }}
          onClick={async () => {
            if (isManager) {
              await adManagerLogout();
              resetAuth();
              clearStorage();
              navigate(routeNames.adManagerLoginPage.path, { replace: true });
            } else {
              await adSalesPersonLogout();

              if (salesPerson?.type === 2) {
                clearStorage();
                localStorage.setItem('salesPersonType', 2);
                navigate(routeNames.adSalesPersonAzureLogout.path, { replace: true });
              } else {
                resetAuth();
                clearStorage();
                navigate(routeNames.adSalesPersonLoginPage.path, { replace: true });
              }
            }
          }}
        >
          <Typography variant="login_button" color="primary.main">
            ログアウト
          </Typography>
        </Button>
      </Stack>
    </ComModalWapper>
  );
};
