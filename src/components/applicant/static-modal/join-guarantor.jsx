import { Icons } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';

export const ApJoinGuarantorModal = () => {
  const modal = useBoolean();
  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApHelpIcon />
        <Typography component={Link} variant="help" color={'primary.main'}>
          担保提供者とは？
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={'担保提供者とは？'}>
        <Stack sx={{ overflowY: 'scroll', maxHeight: '40vh', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <Box sx={{ px: 6 }}>
              <Typography variant="notify" color={'text.main'}>
                {`購入物件を共有される場合、共有者のかたには担保提供者となっていただき、共有物件を担保として提供していただく必要があります。\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`また土地所有者と建物所有者が違う場合なども、担保提供者が必要な場合があります。\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`たとえば、親族の土地に住宅を新築する場合、住宅ローンのお申込みにあたっては建物だけでなく土地にも第一順位の抵当権を設定させていただきますので、土地所有者である親族のかたに担保提供者になっていただく必要があります。\n\n`}
              </Typography>
              <Typography variant="notify" color={'text.main'}>
                {`担保提供者は親族（除く未成年）の方である必要がありますが、婚約者が担保提供者となる場合は原則借入実行前に入籍が必要です。外国人の場合は、上記条件に加えて、日本で永住許可を取得している必要があります。`}
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
