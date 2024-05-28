import { Icons } from '@/assets';
import { AdPrimaryButton } from '@/components/administrator/button';
import { API_500_ERROR } from '@/constant';
import { AdMainWrapper } from '@/containers';
import { useCurrSearchParams, useIsManager } from '@/hooks';
import { routeNames } from '@/router/settings';
import { adGetMessage } from '@/services';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MessageList } from './message-list';
import { MessageSend } from './message-send';

export const AdMessagesDetailPage = () => {
  const isManager = useIsManager();
  const navigate = useNavigate();
  const id = useCurrSearchParams().get('id');
  const type = useCurrSearchParams().get('type');

  const [applicant, setApplicant] = useState('');
  const [messages, setMessages] = useState([]);
  const fetchData = async () => {
    try {
      const res = await adGetMessage(id, type);
      setApplicant(res.data.applicant);
      setMessages(res.data.messages);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (!!id && !!type) {
      fetchData();
    }
  }, [id, type]);

  return (
    <AdMainWrapper
      leftContent={
        <Stack direction={'row'} alignItems={'center'} sx={{ cursor: 'pointer' }} spacing={3}>
          <Typography
            variant="main_page_title"
            color={'primary.main'}
            fontSize={'14px'}
            letterSpacing={'0.1px'}
            onClick={() =>
              navigate(isManager ? routeNames.adManagerMessagesPage.path : routeNames.adSalesPersonMessagesPage.path)
            }
          >
            お客様とのメッセージ一覧
          </Typography>
          <Icons.AdProgressArrowRight
            sx={{
              width: '20px',
              height: '20px',
              color: 'rgb(102, 102, 102)',
            }}
          />
          <Typography variant="main_page_title">{`${applicant?.name} 様`}</Typography>
        </Stack>
      }
      rightAddItems={
        applicant?.type === '1' && (
          <AdPrimaryButton
            sx={{
              px: 1,
              height: 26,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              bgcolor: 'white',
              '&:hover': { opacity: 0.9, bgcolor: 'white' },
            }}
            onClick={() =>
              navigate(
                isManager
                  ? `${routeNames.adManagerEditPreliminaryPage.path}?id=${applicant?.id}`
                  : `${routeNames.adSalesPersonEditPreliminaryPage.path}?id=${applicant?.id}`
              )
            }
          >
            <Typography variant="message_icon_button">申し込み内容確認</Typography>
          </AdPrimaryButton>
        )
      }
    >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'} spacing={6} py={4} px={5}>
        <MessageList messages={messages} fetchData={fetchData} applicant={applicant} />
        <MessageSend fetchData={fetchData} applicant={applicant} />
      </Stack>
    </AdMainWrapper>
  );
};
