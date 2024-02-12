import { ApItemGroup, ApPageTitle, ApPrimaryButton } from '@/components';
import { ApLayout } from '@/containers';

import { CONFIRMATION_URL, CONSENT_URL } from '@/configs';
import { Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';

export const ApConsentConfirmationPage = () => {
  return (
    <ApLayout hasFooter hasMenu>
      <ApPageTitle>{`同意書・確認書等`}</ApPageTitle>
      <ApItemGroup label={'個人情報の取扱いに関する同意書 兼 表明および確約書'}>
        <Stack alignItems={'center'}>
          <ApPrimaryButton width={180} height={40} href={CONSENT_URL} target="_blank">
            <Stack spacing={1} direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Icons.ApPdfOutlineWhiteIcon />
              <Typography variant="label">全文を見る</Typography>
            </Stack>
          </ApPrimaryButton>
        </Stack>
      </ApItemGroup>
      <ApItemGroup label={'銀行代理業にかかる確認書　兼　個人情報の取扱い等に関する同意書'}>
        <Stack alignItems={'center'}>
          <ApPrimaryButton width={180} height={40} href={CONFIRMATION_URL} target="_blank">
            <Stack spacing={1} direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Icons.ApPdfOutlineWhiteIcon />
              <Typography variant="label">全文を見る</Typography>
            </Stack>
          </ApPrimaryButton>
        </Stack>
      </ApItemGroup>
    </ApLayout>
  );
};
