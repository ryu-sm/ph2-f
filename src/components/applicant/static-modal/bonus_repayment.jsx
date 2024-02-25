import { Icons } from '@/assets';
import { Link, Stack, Typography } from '@mui/material';
import { ApModalWrapper } from '../modal-wrapper';
import { useBoolean } from '@/hooks';
import { ApLighterButton } from '../button';
import { FormikProvider, useFormik } from 'formik';
import { ApNumberInputField } from '../input';

export const ApBonusRepaymentModal = () => {
  const modal = useBoolean();

  const formik = useFormik({
    initialValues: {
      amount: '',
      time: '2',
      years: '',
    },
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={'2px'} direction={'row'} alignItems={'center'} onClick={modal.onTrue}>
        <Icons.ApCalculatorIcon sx={{ width: 16, height: 16 }} />
        <Typography component={Link} variant="help" color={'primary.main'} sx={{ cursor: 'pointer' }}>
          ボーナス返済分を試算する
        </Typography>
      </Stack>
      <ApModalWrapper open={modal.value} icon={<Icons.ApCalculatorIcon />} label={'ボーナス返済分を試算しましょう'}>
        <Stack justifyContent={'center'} sx={{ overflowY: 'auto', maxHeight: '40vh', width: 1 }}>
          <Stack spacing={6} flex={1} sx={{ width: 1, px: 3 }}>
            <Stack alignItems={'center'}>
              <Typography variant="notify" color={'text.main'}>
                {'※ボーナス返済分は融資金額の50%以内です。'}
              </Typography>
            </Stack>
            <Stack
              spacing={3}
              alignItems={'center'}
              sx={{
                bgcolor: 'primary.20',
                borderRadius: 2,
                py: 3,
                px: 1,
              }}
            >
              <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                <Stack spacing={'6px'}>
                  <Typography variant="notify" color={'text.main'} lineHeight={'100%'}>
                    {`1回あたりの\nボーナス返済額`}
                  </Typography>
                  <ApNumberInputField
                    name="amount"
                    width={48}
                    unit={
                      <Stack spacing={1} direction={'row'} alignItems={'center'}>
                        <Typography variant="unit" color={'text.main'}>
                          万円
                        </Typography>
                        <Icons.ApXIcon />
                      </Stack>
                    }
                    placeholder={'0'}
                  />
                </Stack>
                <Stack spacing={'6px'}>
                  <Typography variant="notify" color={'text.main'} lineHeight={'100%'}>
                    {`年間の\nボーナス回数`}
                  </Typography>
                  <Stack spacing={2} direction={'row'}>
                    <Stack
                      alignItems={'end'}
                      justifyContent={'center'}
                      sx={{
                        pr: 3,
                        py: 3,
                        height: 48,
                        width: 54,
                        borderRadius: 1,
                        bgcolor: 'gray.100',
                        boxShadow: '0px 4px 6px 0px rgba(44, 54, 156, 0.10) inset',
                      }}
                    >
                      <Typography variant="unit" color={'text.main'}>
                        {formik.values.time}
                      </Typography>
                    </Stack>
                    <Stack spacing={1} direction={'row'} alignItems={'center'}>
                      <Typography variant="unit" color={'text.main'}>
                        回
                      </Typography>
                      <Icons.ApXIcon />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack spacing={'6px'}>
                  <Typography variant="notify" color={'text.main'} lineHeight={'100%'}>
                    {`\n借入期間`}
                  </Typography>
                  <ApNumberInputField name="years" width={22} unit={'年'} placeholder={'0'} />
                </Stack>
              </Stack>

              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M0 0.839966V2.75997H11.44V0.839966H0ZM0 5.23997V7.15997H11.44V5.23997H0Z" fill="#6B70F0" />
                </svg>
                <Typography variant="label" color={'primary.main'}>
                  ボーナス返済分
                </Typography>
                <Stack spacing={2} direction={'row'}>
                  <Stack
                    alignItems={'end'}
                    justifyContent={'center'}
                    sx={{
                      pr: 3,
                      py: 3,
                      height: 48,
                      width: 105,
                      borderRadius: 1,
                      bgcolor: 'primary.60',
                    }}
                  >
                    <Typography variant="unit" color={'white'}>
                      {formik.values.time}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant="unit" color={'text.main'}>
                      万円
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} sx={{ pt: 6 }}>
            <Typography variant="note" color={'text.main'}>
              {
                '（例）1回あたりのボーナス返済額15万円（年2回）\n　　　借入期間30年の場合\n　　　15万円×2回×30年＝ボーナス返済900万円'
              }
            </Typography>
          </Stack>
        </Stack>

        <Stack alignItems={'center'} sx={{ pt: 4 }}>
          <ApLighterButton height={40} width={160} endIcon={<Icons.ApForwardRightMainIcon />} onClick={modal.onFalse}>
            とじる
          </ApLighterButton>
        </Stack>
      </ApModalWrapper>
    </FormikProvider>
  );
};
