import { AdTrashIcon } from '@/assets/icons/ad-trash-icon';
import { ApChatOtherIcon } from '@/assets/icons/ap-chat-other';
import { ApChatUserIcon } from '@/assets/icons/ap-chat-user';

import { ROLE } from '@/constant';
import { formatTimeMessage } from '@/utils';
import styled from '@emotion/styled';
import { Avatar, Stack, Tooltip, Typography, tooltipClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useBoolean } from '@/hooks';
import { useLocation } from 'react-router-dom';
import { useIsManager } from '@/hooks/use-is-manager';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store';
import { apAgent, apMilize, userAvatar } from '@/assets';
import { MessageDeleteModal } from './modal/message-delete-modal';
export const MessageItem = ({ messageInfo, id }) => {
  const { value: open, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);
  const pathName = useLocation().pathname;
  const isManager = useIsManager(pathName);
  const isSelfMessage =
    (isManager && messageInfo.senderType === ROLE.ADMIN) || (!isManager && messageInfo.senderType === ROLE.AGENT);

  const { user } = useRecoilValue(authAtom);

  if (isSelfMessage) {
    return (
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
                <AdTrashIcon sx={{ width: 17.5, height: 20 }} />
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
              maxWidth: 271,
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
              <ApChatUserIcon />
            </Stack>
          </Stack>
        </CustomTooltip>
        <MessageDeleteModal open={open} onClose={handleCloseModal} />
      </Stack>
    );
  }

  return (
    <Stack>
      {!messageInfo.viewed.includes(id) && (
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
        <Typography variant="chat_message_time">{formatTimeMessage(messageInfo.createdAt)}</Typography>
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
          src={
            messageInfo.senderType === ROLE.ADMIN
              ? apMilize
              : messageInfo.senderType === ROLE.AGENT
              ? apAgent
              : userAvatar
          }
          sx={{
            width: 20,
            height: 20,
            '.MuiAvatar-img': {
              objectFit: 'contain',
            },
          }}
        />
        <Typography variant="chat_message_person_name">
          {messageInfo.senderType === ROLE.ADMIN
            ? 'みらいバンク'
            : messageInfo.senderType === ROLE.AGENT
            ? 'セキスイハイム'
            : user.name}
        </Typography>
      </Stack>

      {messageInfo.content && messageInfo.content !== '<span></span>' && (
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
            variant="chat_message_content"
            dangerouslySetInnerHTML={{
              __html: messageInfo.content,
            }}
          />
          <Stack sx={{ position: 'absolute', bottom: '-6px', left: '-13px' }}>
            <ApChatOtherIcon />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

MessageItem.propTypes = {
  messageInfo: PropTypes.object,
  id: PropTypes.string,
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
