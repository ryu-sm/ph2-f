import { ApPageTitle } from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { routeNames } from '@/router/settings';
import { applyNoSelector } from '@/store';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const ApStep14Page = () => {
  const navigate = useNavigate();
  const applyNo = useRecoilValue(applyNoSelector);

  return (
    <ApLayout hasMenu hasStepBar pb={18}>
      <ApPageTitle>{`仮審査申込が完了しました。\n受付番号をお控えください。`}</ApPageTitle>

      <Stack alignItems={'center'}>
        <Stack
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            bgcolor: 'primary.main',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Stack
            alignItems={'center'}
            sx={{
              bgcolor: 'white',
              borderRadius: '7px',
            }}
          >
            <Stack
              alignItems={'center'}
              sx={{
                py: 1,
                width: 1,
                bgcolor: 'primary.40',
                borderTopRightRadius: '7px',
                borderTopLeftRadius: '7px',
              }}
            >
              <Typography variant="form_item_label" color={'text.main'}>
                受付番号
              </Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ p: 3 }}>
              <Typography variant="page_title" color={'text.main'}>
                {applyNo}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems={'center'} sx={{ pt: 6, px: 8 }}>
        <Typography variant="notify" color={'text.main'}>
          {`ご登録いただいたメールアドレスにお申込み完了のメールをお送りいたしました。\n\n受付番号はお問い合わせの際に必要ですので、スクリーンショットなどでお控えください。\n\n仮審査の結果につきましては、提携先企業からお知らせいたします。`}
        </Typography>
      </Stack>

      <ApStepFooter right={() => navigate(routeNames.apTopPage.path)} rightLabel={'TOPへ'} />
    </ApLayout>
  );
};
