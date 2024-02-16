import { Icons, apLandAdvancePlan } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';
import { ApItemGroup } from '../item-group';

export const ApLoanPlusModal = () => {
  const modal = useBoolean();
  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApHelpIcon />
        <Typography component={Link} variant="help" color={'primary.main'}>
          住宅ローンプラスとは？
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'住宅ローンプラスとは'}>
        <Stack sx={{ overflowY: 'scroll', maxHeight: '40vh', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <Box sx={{ px: 6, pb: 6 }}>
              <Typography variant="notify" color={'text.main'}>
                「住宅ローンプラス」は住宅建築・購入資金にプラスして、個人の消費性資金をお借入れいただける住宅ローン商品です。
              </Typography>
            </Box>
            <ApItemGroup label={'1. 個人の消費性資金とは'} pb={3}>
              <Stack spacing={3}>
                <Typography variant="notify" color={'text.main'}>
                  {`①すでにお借入れいただいている無担保ローンのおまとめ（借換）資金（例：マイカーローン、教育ローン、フリーローン、カードローンなど）\n\n②住宅ローン借入と同時に新規借入するフリー資金（例：家電購入費用）`}
                </Typography>
                <Box sx={{ p: 1, bgcolor: 'gray.100' }}>
                  <Stack spacing={1} direction={'row'}>
                    <Typography variant="note" color={'text.main'}>
                      ※
                    </Typography>
                    <Typography variant="note" color={'text.main'}>
                      {`投機性資金や生活資金、事業性資金にはご利用いただけません。`}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'2. 借入限度額'} pb={3}>
              <Stack spacing={3}>
                <Typography variant="notify" color={'text.main'}>
                  {`つぎの①、②のいずれか低い金額が借入限度額となります。\n\n①1500万円\n②住宅建築・購入にかかる諸費用を除いた住宅ローン借入金額の50％以内`}
                </Typography>
                <Box sx={{ p: 1, bgcolor: 'gray.100' }}>
                  <Stack spacing={1} direction={'row'}>
                    <Typography variant="note" color={'text.main'}>
                      ※
                    </Typography>
                    <Typography variant="note" color={'text.main'}>
                      {`ペアローンをご利用の場合は、お二人合わせて上記金額の範囲内となります。`}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'3. ご提出いただく資料'} pb={3}>
              <Stack spacing={3}>
                <Typography variant="notify" color={'text.main'}>
                  {`住宅ローンの正式審査申込時に、申込書に記載したお借入希望の個人消費性資金について、内容および金額がわかる資料をご提出いただきます。\n（例：借換対象となるお借入れの返済予定表、カードローン利用明細、見積書　など）`}
                </Typography>
                <Box sx={{ p: 1, bgcolor: 'gray.100' }}>
                  <Stack spacing={1} direction={'row'}>
                    <Typography variant="note" color={'text.main'}>
                      ※
                    </Typography>
                    <Typography variant="note" color={'text.main'}>
                      {`仮審査申込時は書類の提出は不要です。`}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'4. ローンお借入日およびお借入れ後の手\n　 続きについて'} pb={3}>
              <Stack spacing={3}>
                <Typography variant="notify" color={'text.main'}>
                  {`住宅ローンお借入日に住宅ローン資金と合わせてお客さまの普通預金口座に入金後、お支払先（返済先）に振込されます。\n住宅ローン借入日から一週間以内に、領収書や完済、残高０円がわかる証明書などを銀行あてにご提出ください。`}
                </Typography>
                <Box sx={{ p: 1, bgcolor: 'gray.100' }}>
                  <Stack spacing={1} direction={'row'}>
                    <Typography variant="note" color={'text.main'}>
                      ※
                    </Typography>
                    <Typography variant="note" color={'text.main'}>
                      {`カードローンをおまとめされた場合は、カードローン枠をご解約いただく必要がございます。`}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={'5. その他'} pb={3}>
              <Typography variant="notify" color={'text.main'}>
                {`「住宅ローンプラス」はMG保証株式会社が保証する住宅ローンです。\n・住宅ローンの適用金利が上乗せとなります。なお、上乗せ利率は審査の結果決定致します。\n・ペアローンをご利用の場合は、おふたりとも「住宅ローンプラス」をご利用いただきます。\n・個人消費性資金は住宅ローン減税の対象となりません。`}
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
