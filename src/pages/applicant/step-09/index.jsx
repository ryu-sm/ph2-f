import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom, userEmailSelector } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApErrorScroll,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApStarHelp,
  ApTextInputField,
} from '@/components';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ApStep09Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const {
    p_application_headers__required_funds_land_amount,
    p_application_headers__required_funds_house_amount,
    p_application_headers__required_funds_accessory_amount,
    p_application_headers__required_funds_additional_amount,
    p_application_headers__required_funds_refinance_loan_balance,
    p_application_headers__required_funds_upgrade_amount,
    p_application_headers__required_funds_loan_plus_amount,
    p_application_headers__required_funds_total_amount,
    p_application_headers__funding_saving_amount,
    p_application_headers__funding_estate_sale_amount,
    p_application_headers__funding_other_saving_amount,
    p_application_headers__funding_relative_donation_amount,
    p_application_headers__funding_loan_amount,
    p_application_headers__funding_pair_loan_amount,
    p_application_headers__funding_other_amount,
    p_application_headers__funding_other_amount_detail,
    p_application_headers__funding_total_amount,
    // STEP01
    p_application_headers__loan_target,
    p_application_headers__loan_type,
    p_application_headers__loan_plus,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      p_application_headers__required_funds_land_amount,
      p_application_headers__required_funds_house_amount,
      p_application_headers__required_funds_accessory_amount,
      p_application_headers__required_funds_additional_amount,
      p_application_headers__required_funds_refinance_loan_balance,
      p_application_headers__required_funds_upgrade_amount,
      p_application_headers__required_funds_loan_plus_amount,
      p_application_headers__required_funds_total_amount,
      p_application_headers__funding_saving_amount,
      p_application_headers__funding_estate_sale_amount,
      p_application_headers__funding_other_saving_amount,
      p_application_headers__funding_relative_donation_amount,
      p_application_headers__funding_loan_amount,
      p_application_headers__funding_pair_loan_amount,
      p_application_headers__funding_other_amount,
      p_application_headers__funding_other_amount_detail,
      p_application_headers__funding_total_amount,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setApplicationInfo((pre) => {
        return { ...pre, ...values };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };

  useEffect(() => {
    const required_funds_total_amount =
      Number(formik.values.p_application_headers__required_funds_land_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__required_funds_house_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__required_funds_accessory_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__required_funds_upgrade_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__required_funds_refinance_loan_balance.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__required_funds_additional_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__required_funds_loan_plus_amount.replaceAll(',', ''));

    const funding_total_amount =
      Number(formik.values.p_application_headers__funding_saving_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__funding_estate_sale_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__funding_other_saving_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__funding_relative_donation_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__funding_loan_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__funding_pair_loan_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers__funding_other_amount.replaceAll(',', ''));

    formik.setFieldValue('p_application_headers__required_funds_total_amount', String(required_funds_total_amount));
    formik.setFieldValue('p_application_headers__funding_total_amount', String(funding_total_amount));
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={38}>
        <ApPageTitle py={8}>{`資金計画について\n教えてください。`}</ApPageTitle>
        <Stack sx={{ px: 4, pb: 4 }}>
          <ApStarHelp
            label={
              <Stack direction={'row'} alignItems={'center'}>
                <Typography variant="note" color={'text.main'}>
                  必要資金の項目は
                  <Box
                    component={'span'}
                    sx={{
                      color: 'white',
                      bgcolor: (theme) => theme.palette.gray[250],
                      p: '2px 3px',
                      mx: 1,
                      borderRadius: 1,
                      minWidth: 28,
                      width: 28,
                      height: 16,

                      fontFamily: 'Hiragino Sans',
                      fontSize: 10,
                      fontWeight: 500,
                      lineHeight: '100%',
                      fontStyle: 'normal',
                      letterSpacing: 0.6,
                    }}
                  >
                    任意
                  </Box>
                  です。未入力の場合は、みらいバンクにて補記いたしますのでご安心ください。
                </Typography>
              </Stack>
            }
          />
        </Stack>

        <Stack spacing={'1px'} direction={'row'} justifyContent={'space-between'} sx={{ bgcolor: 'primary.60' }}>
          <Stack sx={{ width: '50%' }}>
            <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
              <Typography variant="form_item_label" color="white" textAlign={'center'}>
                必要資金
              </Typography>
            </Stack>
            <Stack flex={1} sx={{ bgcolor: 'white' }}>
              {p_application_headers__loan_target === '6' && (
                <ApItemGroup
                  optional
                  label={
                    <Typography
                      variant="form_item_label"
                      sx={{ fontWeight: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      {'住宅ローンプラス利用'}
                    </Typography>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers__required_funds_land_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}
              {['1', '2', '3', '4', '5', '6'].includes(p_application_headers__loan_target) && (
                <ApItemGroup
                  optional
                  label={
                    ['1', '2'].includes(p_application_headers__loan_target)
                      ? '物件価格'
                      : ['3', '4'].includes(p_application_headers__loan_target)
                      ? 'マンション価格'
                      : '建物'
                  }
                  labelFontSize={13}
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers__required_funds_house_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}

              {['5', '6'].includes(p_application_headers__loan_target) && (
                <ApItemGroup optional label={'付帯設備'} labelFontSize={13} pb={3} px={2}>
                  <ApNumberInputField
                    name="p_application_headers__required_funds_accessory_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}

              {p_application_headers__loan_target === '8' && (
                <ApItemGroup optional label={'増改築費'} labelFontSize={13} pb={3} px={2}>
                  <ApNumberInputField
                    name="p_application_headers__required_funds_upgrade_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}

              {['7', '8'].includes(p_application_headers__loan_target) && (
                <ApItemGroup optional label={'借換対象ローン残債'} labelFontSize={13} pb={3} px={2}>
                  <ApNumberInputField
                    name="p_application_headers__required_funds_refinance_loan_balance"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}

              <ApItemGroup optional label={'諸費用等'} labelFontSize={13} pb={3} px={2}>
                <ApNumberInputField
                  name="p_application_headers__required_funds_additional_amount"
                  placeholder={'0'}
                  unit={'万円'}
                  maxLength={6}
                  width={1}
                />
              </ApItemGroup>
              {p_application_headers__loan_plus === '1' && (
                <ApItemGroup
                  optional
                  label={
                    <Typography
                      variant="form_item_label"
                      sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      {'住宅ローンプラス利用'}
                    </Typography>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers__required_funds_loan_plus_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}
            </Stack>
          </Stack>
          <Stack sx={{ width: '50%' }}>
            <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
              <Typography variant="form_item_label" color="white" textAlign={'center'}>
                調達資金
              </Typography>
            </Stack>
            <Stack flex={1} sx={{ bgcolor: 'white' }}>
              <ApItemGroup
                label={
                  <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                    <Typography
                      variant="form_item_label"
                      sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      預貯金
                    </Typography>
                    {p_application_headers__loan_type === '2' && (
                      <Typography variant="note" color={'text.main'}>
                        ※お二人分
                      </Typography>
                    )}
                  </Stack>
                }
                pb={3}
                px={2}
              >
                <ApNumberInputField
                  name="p_application_headers__funding_saving_amount"
                  placeholder={'0'}
                  unit={'万円'}
                  maxLength={6}
                  width={1}
                />
              </ApItemGroup>

              <ApItemGroup
                label={
                  <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                    <Typography
                      variant="form_item_label"
                      sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      不動産売却代金
                    </Typography>
                    {p_application_headers__loan_type === '2' && (
                      <Typography variant="note" color={'text.main'}>
                        ※お二人分
                      </Typography>
                    )}
                  </Stack>
                }
                pb={3}
                px={2}
              >
                <ApNumberInputField
                  name="p_application_headers__funding_estate_sale_amount"
                  placeholder={'0'}
                  unit={'万円'}
                  maxLength={6}
                  width={1}
                />
              </ApItemGroup>

              <ApItemGroup
                label={
                  <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                    <Typography
                      variant="form_item_label"
                      sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      {['7', '8'].includes(p_application_headers__loan_target)
                        ? 'その他（有価証券等）'
                        : '有価証券売却など'}
                    </Typography>
                    {p_application_headers__loan_type === '2' && (
                      <Typography variant="note" color={'text.main'}>
                        ※お二人分
                      </Typography>
                    )}
                  </Stack>
                }
                pb={3}
                px={2}
              >
                <ApNumberInputField
                  name="p_application_headers__funding_other_saving_amount"
                  placeholder={'0'}
                  unit={'万円'}
                  maxLength={6}
                  width={1}
                />
              </ApItemGroup>

              <ApItemGroup
                label={
                  <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                    <Typography
                      variant="form_item_label"
                      sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      親族からの贈与
                    </Typography>
                    {p_application_headers__loan_type === '2' && (
                      <Typography variant="note" color={'text.main'}>
                        ※お二人が受ける贈与
                      </Typography>
                    )}
                  </Stack>
                }
                pb={3}
                px={2}
              >
                <ApNumberInputField
                  name="p_application_headers__funding_relative_donation_amount"
                  placeholder={'0'}
                  unit={'万円'}
                  maxLength={6}
                  width={1}
                />
              </ApItemGroup>

              <ApItemGroup label={'本件ローン'} labelFontSize={13} pb={3} px={2}>
                <ApNumberInputField
                  name="p_application_headers__funding_loan_amount"
                  placeholder={'0'}
                  unit={'万円'}
                  maxLength={6}
                  width={1}
                />
              </ApItemGroup>
              {p_application_headers__loan_type === '2' && (
                <ApItemGroup label={'ペアローン'} labelFontSize={13} pb={3} px={2}>
                  <ApNumberInputField
                    name="p_application_headers__funding_pair_loan_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
              )}
              <ApItemGroup label={'その他'} labelFontSize={13} pb={3} px={2}>
                <Stack spacing={3}>
                  <ApNumberInputField
                    name="p_application_headers__funding_other_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                  {Number(formik.values.p_application_headers__funding_other_amount) > 0 && (
                    <Stack spacing={'6px'}>
                      <ApStarHelp label={'詳細を入力ください。'} />
                      <ApTextInputField name="p_application_headers__funding_other_amount_detail" convertFullWidth />
                    </Stack>
                  )}
                </Stack>
              </ApItemGroup>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={'1px'} direction={'row'} justifyContent={'space-between'} sx={{ bgcolor: 'primary.60' }}>
          <Stack sx={{ width: '50%' }}>
            <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.60' }}>
              <Typography variant="form_item_label" color="white">
                {'必要資金　合計'}
              </Typography>
            </Stack>
            <Stack sx={{ px: 2, py: 1, bgcolor: 'white' }}>
              <Stack spacing={1} direction={'row'} alignItems={'center'}>
                <Stack
                  flex={1}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  sx={{
                    pl: 3,
                    py: 3,
                    px: 3,
                    height: 48,
                    width: 62,
                    borderRadius: 1,
                    bgcolor: 'gray.100',
                    fontFamily: 'Hiragino Sans',
                    fontStyle: 'normal',
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: '100%',
                    letterSpacing: 0.6,
                    textAlign: 'right',
                  }}
                >
                  {Number(formik.values.p_application_headers__required_funds_total_amount).toLocaleString()}
                </Stack>
                <Typography variant="unit" color={'text.main'}>
                  万円
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ width: '50%' }}>
            <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.60' }}>
              <Typography variant="form_item_label" color="white">
                {'調達資金　合計'}
              </Typography>
            </Stack>
            <Stack sx={{ px: 2, py: 1, bgcolor: 'white' }}>
              <Stack spacing={1} direction={'row'} alignItems={'center'}>
                <Stack
                  flex={1}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  sx={{
                    pl: 3,
                    py: 3,
                    px: 3,
                    height: 48,
                    width: 62,
                    borderRadius: 1,
                    bgcolor: 'gray.100',
                    fontFamily: 'Hiragino Sans',
                    fontStyle: 'normal',
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: '100%',
                    letterSpacing: 0.6,
                    textAlign: 'right',
                  }}
                >
                  {Number(formik.values.p_application_headers__funding_total_amount).toLocaleString()}
                </Stack>
                <Typography variant="unit" color={'text.main'}>
                  万円
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
