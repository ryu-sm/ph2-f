import { Icons, apLandAdvancePlan } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';
import { ApItemGroup } from '../item-group';

export const ApLandAdvancePlanModal = () => {
  const modal = useBoolean();
  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApHelpIcon />
        <Typography component={Link} variant="help" color={'primary.main'} sx={{ cursor: 'pointer' }}>
          土地先行プランとは？
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'土地先行プランとは'}>
        <Stack sx={{ overflowY: 'auto', maxHeight: '40vh', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <Box sx={{ px: 6 }}>
              <Typography variant="notify" color={'text.main'}>
                注文住宅を建てるお客さまが、「土地を購入するとき」「建物が完成したとき」の2回に分けてご融資を実行できる住宅ローンです。
              </Typography>
            </Box>
            <Box sx={{ p: 6 }}>
              <Box component={'img'} width={1} src={apLandAdvancePlan} />
            </Box>
            <ApItemGroup label={'特徴1：魅力的な金利をご提供！'} pb={3}>
              <Typography variant="notify" color={'text.main'}>
                土地の購入代金も、ネット銀行ならではの魅力的な金利でお借入れいただけます。
              </Typography>
            </ApItemGroup>
            <ApItemGroup label={'特徴2：正式審査は1回だけ！'} pb={3}>
              <Typography variant="notify" color={'text.main'}>
                ご融資は土地購入時、建物完成時の2回ですが、正式審査は土地購入時の1回だけ。
              </Typography>
            </ApItemGroup>
            <ApItemGroup label={'特徴3：初期の費用負担を軽減！'} pb={3}>
              <Typography variant="notify" color={'text.main'}>
                1回目のご融資開始から2回目のご融資開始までは、お利息のみ毎月返済となります。
              </Typography>
            </ApItemGroup>
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
