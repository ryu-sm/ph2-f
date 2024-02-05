import { SpPdfOutlineIcon } from '@/assets/svgs';
import { Button, Center } from '@chakra-ui/react';
import { SpPageTitle } from '@/components/sp-end';
import { SpGroup, SpLayout } from '@/layouts/sp-end';

export default function SpConsentConfirmationForm() {
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasFooter={true}>
      <SpPageTitle>{'同意書・確認書等'}</SpPageTitle>
      <SpGroup title={'個人情報の取扱いに関する同意書 兼 表明および確約書'}>
        <Center>
          <Button variant={'sp_solid'} size={'md'} w={'180px'} leftIcon={<SpPdfOutlineIcon />}>
            全文を見る
          </Button>
        </Center>
      </SpGroup>
      <SpGroup title={'銀行代理業にかかる確認書　兼　個人情報の取扱い等に関する同意書'}>
        <Center>
          <Button variant={'sp_solid'} size={'md'} w={'180px'} leftIcon={<SpPdfOutlineIcon />}>
            全文を見る
          </Button>
        </Center>
      </SpGroup>
    </SpLayout>
  );
}
