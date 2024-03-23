import { formatTimeMessage } from '@/utils';
import styled from '@emotion/styled';
import { Avatar, Stack, Tooltip, Typography, tooltipClasses } from '@mui/material';
import { useBoolean, useIsManager } from '@/hooks';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store';
import { Icons, apAgent, apMilize, userAvatar } from '@/assets';
import { MessageDeleteModal } from './message-delete-modal';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adDeleteMessage } from '@/services';

export const MessageItem = ({ messageInfo, unViewed, applicant, fetchData }) => {
  const { value: open, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);

  const isManager = useIsManager();
  const isSelfMessage =
    (isManager && messageInfo.sender_type === '3') || (!isManager && messageInfo.sender_type === '2');

  const { manager, salesPerson } = useRecoilValue(authAtom);

  const handleDelete = async () => {
    try {
      await adDeleteMessage(messageInfo?.id);
      await fetchData();
      handleCloseModal();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  if (isSelfMessage) {
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
                px: 3,
              }}
            >
              <Typography
                variant="chat_new_message"
                color="secondary.main"
                textAlign={'center'}
                sx={{ whiteSpace: 'nowrap' }}
              >
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
            py: 4,
          }}
        >
          <Typography variant="chat_message_time">{formatTimeMessage(messageInfo.created_at)}</Typography>
        </Stack>
        <Stack direction={'row-reverse'}>
          <CustomTooltip
            title={
              isManager ? (
                <Stack
                  direction="row"
                  sx={{
                    p: '8px 14px',
                    cursor: 'pointer',
                  }}
                  spacing="9.5px"
                  onClick={handleOpenModal}
                >
                  <Icons.AdTrashIcon sx={{ width: 17.5, height: 20 }} />
                  <Typography variant="delete_tooltip_text" color="primary.main" lineHeight="20px">
                    削除
                  </Typography>
                </Stack>
              ) : (
                ''
              )
            }
            placement="top-end"
          >
            <Stack
              sx={{
                position: 'relative',
                bgcolor: 'primary.main',
                px: 3,
                py: 2,
                maxWidth: 360,
                borderRadius: 2,
                mx: 5,
              }}
            >
              <Typography
                variant="chat_message_content"
                color={'white'}
                dangerouslySetInnerHTML={{
                  __html: messageInfo.content,
                }}
              />
              <Stack sx={{ position: 'absolute', bottom: '-6px', right: '-12px' }}>
                <Icons.ApChatUserIcon />
              </Stack>
            </Stack>
          </CustomTooltip>
          <MessageDeleteModal open={open} onClose={handleCloseModal} onDelete={handleDelete} />
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
              px: 3,
            }}
          >
            <Typography
              variant="chat_new_message"
              color="secondary.main"
              textAlign={'center'}
              sx={{ whiteSpace: 'nowrap' }}
            >
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
          py: 4,
        }}
      >
        <Typography variant="chat_message_time">{formatTimeMessage(messageInfo.created_at)}</Typography>
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
        <Avatar
          variant="square"
          src={messageInfo.sender_type === '3' ? apMilize : messageInfo.sender_type === '2' ? apAgent : userAvatar}
          sx={{
            width: 20,
            height: 20,
            '.MuiAvatar-img': {
              objectFit: 'contain',
            },
          }}
        />
        <Typography variant="chat_message_person_name">
          {messageInfo.sender_type === '3'
            ? 'みらいバンク'
            : messageInfo.sender_type === '2'
            ? 'セキスイハイム'
            : applicant?.name}
        </Typography>
      </Stack>

      {messageInfo.content && (
        <Stack direction={'row'}>
          <Stack
            sx={{
              position: 'relative',
              bgcolor: '#EEF0FF',
              px: 3,
              py: 2,
              maxWidth: 360,
              borderRadius: 2,
              mx: 5,
            }}
          >
            <Typography
              variant="chat_message_content"
              dangerouslySetInnerHTML={{
                __html: messageInfo.content,
              }}
            />
            <Stack sx={{ position: 'absolute', bottom: '-6px', left: '-13px' }}>
              <Icons.ApChatOtherIcon />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

const CustomTooltip = styled(({ className, placement, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    PopperProps={{
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [10, -20],
          },
        },
      ],
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '2px',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
    padding: 0,
  },
  [`& .${tooltipClasses.tooltip}:hover`]: {
    backgroundColor: '#DEE1FF',
  },
  [`&.${tooltipClasses.popper}`]: {
    zIndex: 2,
    backgroundColor: 'transparent',
  },
}));
