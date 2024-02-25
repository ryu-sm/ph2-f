import { Icons } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';

export const ApIncomeTotalizerModal = () => {
  const modal = useBoolean();
  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApHelpIcon />
        <Typography component={Link} variant="help" color={'primary.main'} sx={{ cursor: 'pointer' }}>
          収入合算とは？
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'収入合算とは？'}>
        <Stack sx={{ overflowY: 'auto', maxHeight: '40vh', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <Box sx={{ px: 6 }}>
              <Typography variant="notify" color={'text.main'}>
                {`申込者本人の収入だけでは希望条件を満たせない場合等に、原則として同居している家族（収入合算者）の収入を合算するお申込方法です。収入合算者を連帯保証人とさせていただきます。\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`●収入合算者に指定できるかたは、次の条件を全て満たす個人のお客さまです。\n・借入時の年齢が満18歳以上満65歳以下のかた\n・安定継続した収入があること\n・申込者の親（配偶者の親を含む）・子・配偶者（婚約者も含む）・兄弟（配偶者の親を含む）などの親族で、申込者と同居（予定も含む）のかた\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`●収入合算できる金額は、収入合算者の収入の50%を限度とします。\n※ ペアローンの相手を収入合算者にはできません。\n※ 婚約者と収入合算する場合は、原則としてお借入日より前に入籍いただく必要があります。\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`●具体例：夫婦で3000万円のお借入れのお申込みをする場合\n・主債務者：夫\n・連帯保証人（収入合算者）：妻\n・借入金額：3000万円\n・団体信用生命保険：夫のみ加入\n・住宅ローン控除の対象：夫のみ\n・住宅ローン契約は一つ。\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`※団体信用生命保険への加入は主債務者のかたのみとなるので（この場合は夫）、連帯保証人のかたが死亡したり保険対象の高度障害などになった場合でも保険金が支払われません。\n※連帯保証人のかたは、住宅ローン控除を受けることができません。`}
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
