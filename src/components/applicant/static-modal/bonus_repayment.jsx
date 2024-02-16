import { Icons } from '@/assets';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';
import { ApNumberInputField } from '../input';

export const ApBonusRepaymentModal = () => {
  const modal = useBoolean();

  return (
    <Fragment>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApCalculatorIcon sx={{ width: 16, height: 16 }} />
        <Typography component={Link} variant="help" color={'primary.main'}>
          ボーナス返済分を試算しましょう
        </Typography>
      </Stack>
      <ApModalWrapper open={false} icon={<Icons.ApCalculatorIcon />} label={'ボーナス返済分を試算しましょう'}>
        <Stack sx={{ overflowY: 'scroll', width: 1 }}>
          <Stack flex={1} sx={{ width: 1 }}>
            <Stack alignItems={'center'}>
              <Typography variant="note" color={'text.main'}>
                {'※ボーナス返済分は融資金額の50%以内です。'}
              </Typography>
            </Stack>
            <Stack
              spacing={3}
              sx={{
                bgcolor: 'primary.20',
                borderRadius: 2,
                p: 3,
              }}
            >
              <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                <Stack>
                  <Typography variant="" color={'text.main'}></Typography>
                  {/* <ApNumberInputField name="" /> */}
                </Stack>
              </Stack>
            </Stack>
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
