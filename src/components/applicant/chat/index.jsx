import { Icons, apSmileChat } from '@/assets';
import { useBoolean } from '@/hooks';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';

export const ApChat = () => {
  const modal = useBoolean(false);

  return (
    <Fragment>
      <Button
        sx={{
          px: 5,
          py: '10px',
          width: 272,
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 0)',
          background: 'linear-gradient(44.71deg, #3C48C4 18%, #6A75DE 56.8%, #AD92D0 94.79%, #AD92D0 94.79%)',
          borderTop: '6px solid #F1F6FD',
          borderLeft: '6px solid #F1F6FD',
          borderRight: '6px solid #F1F6FD',
          borderRadius: '20px 20px 0px 0px',
        }}
      >
        <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
          <Avatar
            variant="square"
            src={apSmileChat}
            sx={{
              width: 22,
              height: 22,
              '.MuiAvatar-img': {
                objectFit: 'contain',
              },
            }}
          />
          <Typography variant="label" sx={{ color: 'white' }}>
            みらいバンクとチャット連絡
          </Typography>
        </Stack>
      </Button>
    </Fragment>
  );
};
