import { Icons, apLandAdvancePlan } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';

export const ApPairLoanModal = () => {
  const modal = useBoolean();
  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApHelpIcon />
        <Typography component={Link} variant="help" color={'primary.main'}>
          ペアローンとは？
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'ペアローンとは？'}>
        <Stack sx={{ overflowY: 'scroll', maxHeight: '40vh', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <Box sx={{ px: 6 }}>
              <Typography variant="notify" color={'text.main'}>
                {`ペアローンとは、一定の収入のある、原則として同居している親族のかたと一緒に、それぞれが主たる債務者として住宅ローンを組むことです。（ご夫婦や親子で一緒に住宅ローンをお申込みできます）。お互いが相手の債務に対する担保提供者となります。\n物件の持分がある場合、それぞれが住宅ローン控除（住宅借入金等特別控除）の対象となります。尚、フラット３５はペアローンのお取扱いはございません。\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`●具体例：夫婦で3000万円のお借入れのお申込みをする場合\n・お借入額：夫1500万円・妻1500万円\n・持分：夫1/2・妻1/2\n・団体信用生命保険：夫も妻も加入\n・住宅ローン控除：夫も妻も対象\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`●ご注意点\n・「借入金額の割合」と「物件の持分割合」が等しくない場合、贈与税が課税される可能性があります\n・住宅ローンの借入金額は、1契約あたり500万円以上ですが、ペアローンをご利用になる場合は1,000万円以上となります。（契約者それぞれに対して500万円以上となるため）\n・婚約者とのペアローンは、原則借入実行前に入籍が必要です。\n・お二人が別々に仮審査をお申込みいただきます。「お借入希望額」の項目には、それぞれのお借入希望額をご入力ください（お二人の借入希望額の合計ではありません）。`}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack alignItems={'center'} sx={{ pt: 4 }}>
          <ApLighterButton height={40} width={160} endIcon={<Icons.ApForwardRightMainIcon />} onClick={modal.onFalse}>
            とじる
          </ApLighterButton>
        </Stack>
      </ApModalWrapper>
    </Fragment>
  );
};
