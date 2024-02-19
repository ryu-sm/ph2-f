import { Icons, apRepaymentMethod01, apRepaymentMethod02 } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';
import { ApItemGroup } from '../item-group';

export const ApRepaymentMethodModal = () => {
  const modal = useBoolean();
  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApHelpIcon />
        <Typography component={Link} variant="help" color={'primary.main'}>
          元利均等と元金均等の違い
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'元利均等と元金均等の違い'}>
        <Stack sx={{ overflowY: 'scroll', maxHeight: '40vh', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <ApItemGroup label={'元利均等返済'}>
              <Typography variant="notify" color={'text.main'}>
                毎月の返済額が変わらないため返済計画が立てやすい返済方法です。
              </Typography>
              <Box sx={{ p: 6 }}>
                <Box component={'img'} width={1} src={apRepaymentMethod01} />
              </Box>
            </ApItemGroup>
            <ApItemGroup label={'元金均等返済'}>
              <Typography variant="notify" color={'text.main'}>
                注文住宅を建てるお客さまが、「土地を購入するとき」「建物が完成したとき」の2回に分けてご融資を実行できる住宅ローンです。
              </Typography>
              <Box sx={{ p: 6 }}>
                <Box component={'img'} width={1} src={apRepaymentMethod02} />
              </Box>
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