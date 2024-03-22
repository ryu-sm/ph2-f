import { formatTimeMessage } from '@/utils';
import { Avatar, Stack, Typography } from '@mui/material';
import { Icons, apAgent, apMilize } from '@/assets';

export const ChatMessage = ({ messageInfo, unViewed }) => {
  if (messageInfo.sender_type === '1') {
    return (
      <Stack direction={'row-reverse'}>
        <Stack
          sx={{
            position: 'relative',
            bgcolor: 'primary.main',
            px: 3,
            py: 2,
            maxWidth: 271,
            borderRadius: 2,
            mx: 5,
          }}
        >
          <Typography
            variant="chat_message"
            color={'white'}
            dangerouslySetInnerHTML={{
              __html: messageInfo.content,
            }}
          />
          <Stack sx={{ position: 'absolute', bottom: '-6px', right: '-12px' }}>
            <Icons.ApChatUserIcon />
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack>
      {unViewed && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pt: '14px' }}>
          <Stack
            sx={{
              width: '100%',
              height: 0,
              border: '1px dashed',
              borderColor: 'secondary.main',
            }}
          />
          <Stack
            sx={{
              width: '100%',
              px: 3,
            }}
          >
            <Typography variant="chat_new_message" color="secondary.main" sx={{ whiteSpace: 'nowrap' }}>
              ここから未読メッセージ
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: '100%',
              height: 0,
              border: '1px dashed',
              borderColor: 'secondary.main',
            }}
          />
        </Stack>
      )}

      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          pt: 4,
        }}
      >
        <Typography variant="chat_title" color={'gray.250'}>
          {formatTimeMessage(messageInfo.createdAt)}
        </Typography>
      </Stack>

      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{
          px: 2,
          mb: '6px',
        }}
        spacing={1}
      >
        <Stack
          sx={{
            width: 20,
            height: 20,
            border: '0.75px solid #DDDDDD',
            borderRadius: '50%',
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            variant="square"
            src={messageInfo.sender_type === '3' ? apMilize : apAgent}
            sx={{
              width: 14,
              height: 14,
              '.MuiAvatar-img': {
                objectFit: 'contain',
              },
            }}
          />
        </Stack>
        <Typography
          variant="chat_title"
          sx={{
            lineHeight: '100%',
            letterSpacing: 0.6,
          }}
        >
          {messageInfo.sender_type === '3' ? 'みらいバンク' : 'セキスイハイム'}
        </Typography>
      </Stack>

      {messageInfo.content && (
        <Stack
          direction={'row'}
          sx={{
            position: 'relative',
            bgcolor: 'primary.20',
            px: 3,
            py: 2,
            maxWidth: 271,
            borderRadius: 2,
            mx: 5,
          }}
        >
          <Typography
            variant="chat_message"
            dangerouslySetInnerHTML={{
              __html: messageInfo.content,
            }}
          />
          <Stack sx={{ position: 'absolute', bottom: '-6px', left: '-13px' }}>
            <Icons.ApChatOtherIcon />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
