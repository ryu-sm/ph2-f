import { FormikProvider, useFormik } from 'formik';
import {
  ApBonusRepaymentModal,
  ApCheckboxButton,
  ApCheckboxButtonGroup,
  ApErrorScroll,
  ApIncomeTotalizerModal,
  ApItemGroup,
  ApJoinGuarantorModal,
  ApLandAdvancePlanModal,
  ApLighterButton,
  ApLoanPlusModal,
  ApModalWrapper,
  ApNumberInputField,
  ApPageTitle,
  ApPairLoanModal,
  ApRadioColumnGroup,
  ApRepaymentMethodModal,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYm,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
} from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, applicationAtom, authAtom, isMcjSelector } from '@/store';
import {
  bonusRepaymentMonthOptions,
  hasJoinGuarantorOptions,
  landAadvancePlanOptions,
  loanPlusOptions,
  loanTargetOptions,
  loanTargetOptions_,
  loanTypeOptions,
  repaymentMethodOptions,
  yearNumOptions,
  yearOptions,
} from './options';
import { validationSchema } from './validationSchema';
import { useBankMaster } from '@/hooks/use-bank-master';
import { Box, Stack, Typography } from '@mui/material';
import { useBoolean } from '@/hooks';
import { Icons } from '@/assets';
import { MCJ_CODE } from '@/configs';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

export const ApStep01Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const pairLoanModal = useBoolean(false);
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const isMCJ = useRecoilValue(isMcjSelector);
  const {
    p_application_headers__move_scheduled_date,
    p_application_banks__s_bank_ids,
    p_application_headers__loan_target,
    p_application_headers__land_advance_plan,
    p_application_headers__loan_type,
    p_application_headers__pair_loan_last_name,
    p_application_headers__pair_loan_first_name,
    p_application_headers__pair_loan_rel_name,
    p_borrowing_details__0__desired_borrowing_date,
    p_borrowing_details__0__desired_loan_amount,
    p_borrowing_details__0__bonus_repayment_amount,
    p_borrowing_details__0__bonus_repayment_month,
    p_borrowing_details__0__loan_term_year,
    p_borrowing_details__0__repayment_method,
    p_borrowing_details__1__desired_borrowing_date,
    p_borrowing_details__1__desired_loan_amount,
    p_borrowing_details__1__bonus_repayment_amount,
    p_application_headers__join_guarantor_umu,
    p_application_headers__loan_plus,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      p_application_headers__move_scheduled_date,
      p_application_banks__s_bank_ids,
      p_application_headers__loan_target,
      p_application_headers__land_advance_plan,
      p_application_headers__loan_type,
      p_application_headers__pair_loan_last_name,
      p_application_headers__pair_loan_first_name,
      p_application_headers__pair_loan_rel_name,
      p_borrowing_details__0__desired_borrowing_date,
      p_borrowing_details__0__desired_loan_amount,
      p_borrowing_details__0__bonus_repayment_amount,
      p_borrowing_details__0__bonus_repayment_month,
      p_borrowing_details__0__loan_term_year,
      p_borrowing_details__0__repayment_method,
      p_borrowing_details__1__desired_borrowing_date,
      p_borrowing_details__1__desired_loan_amount,
      p_borrowing_details__1__bonus_repayment_amount,
      p_application_headers__join_guarantor_umu,
      p_application_headers__loan_plus,
      p_application_headers__loan_target_: '0',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApplicationInfo((pre) => {
        return {
          ...pre,
          p_application_headers__move_scheduled_date: formik.values.p_application_headers__move_scheduled_date,
          p_application_banks__s_bank_ids: formik.values.p_application_banks__s_bank_ids,
          p_application_headers__loan_target: formik.values.p_application_headers__loan_target,
          p_application_headers__land_advance_plan: formik.values.p_application_headers__land_advance_plan,
          p_application_headers__loan_type: formik.values.p_application_headers__loan_type,
          p_application_headers__pair_loan_last_name: formik.values.p_application_headers__pair_loan_last_name,
          p_application_headers__pair_loan_first_name: formik.values.p_application_headers__pair_loan_first_name,
          p_application_headers__pair_loan_rel_name: formik.values.p_application_headers__pair_loan_rel_name,
          p_borrowing_details__0__desired_borrowing_date: formik.values.p_borrowing_details__0__desired_borrowing_date,
          p_borrowing_details__0__desired_loan_amount: formik.values.p_borrowing_details__0__desired_loan_amount,
          p_borrowing_details__0__bonus_repayment_amount: formik.values.p_borrowing_details__0__bonus_repayment_amount,
          p_borrowing_details__0__bonus_repayment_month: formik.values.p_borrowing_details__0__bonus_repayment_month,
          p_borrowing_details__0__loan_term_year: formik.values.p_borrowing_details__0__loan_term_year,
          p_borrowing_details__0__repayment_method: formik.values.p_borrowing_details__0__repayment_method,
          p_borrowing_details__1__desired_borrowing_date: formik.values.p_borrowing_details__1__desired_borrowing_date,
          p_borrowing_details__1__desired_loan_amount: formik.values.p_borrowing_details__1__desired_loan_amount,
          p_borrowing_details__1__bonus_repayment_amount: formik.values.p_borrowing_details__1__bonus_repayment_amount,
          p_application_headers__join_guarantor_umu: formik.values.p_application_headers__join_guarantor_umu,
          p_application_headers__loan_plus: formik.values.p_application_headers__loan_plus,
        };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const parseVaildData = useMemo(() => {
    return {
      p_application_headers__move_scheduled_date: formik.values.p_application_headers__move_scheduled_date,
      p_application_banks__s_bank_ids: formik.values.p_application_banks__s_bank_ids,
      p_application_headers__loan_target: formik.values.p_application_headers__loan_target,
      p_application_headers__land_advance_plan: formik.values.p_application_headers__land_advance_plan,
      p_application_headers__loan_type: formik.values.p_application_headers__loan_type,
      p_application_headers__pair_loan_last_name: formik.values.p_application_headers__pair_loan_last_name,
      p_application_headers__pair_loan_first_name: formik.values.p_application_headers__pair_loan_first_name,
      p_application_headers__pair_loan_rel_name: formik.values.p_application_headers__pair_loan_rel_name,
      p_borrowing_details__0__desired_borrowing_date: formik.values.p_borrowing_details__0__desired_borrowing_date,
      p_borrowing_details__0__desired_loan_amount: formik.values.p_borrowing_details__0__desired_loan_amount,
      p_borrowing_details__0__bonus_repayment_amount: formik.values.p_borrowing_details__0__bonus_repayment_amount,
      p_borrowing_details__0__bonus_repayment_month: formik.values.p_borrowing_details__0__bonus_repayment_month,
      p_borrowing_details__0__loan_term_year: formik.values.p_borrowing_details__0__loan_term_year,
      p_borrowing_details__0__repayment_method: formik.values.p_borrowing_details__0__repayment_method,
      p_borrowing_details__1__desired_borrowing_date: formik.values.p_borrowing_details__1__desired_borrowing_date,
      p_borrowing_details__1__desired_loan_amount: formik.values.p_borrowing_details__1__desired_loan_amount,
      p_borrowing_details__1__bonus_repayment_amount: formik.values.p_borrowing_details__1__bonus_repayment_amount,
      p_application_headers__join_guarantor_umu: formik.values.p_application_headers__join_guarantor_umu,
      p_application_headers__loan_plus: formik.values.p_application_headers__loan_plus,
    };
  }, [formik.values]);
  const handelLeft = () => {
    navigate(routeNames.apTopPage.path);
  };
  const bankMaster = useBankMaster();
  useEffect(() => {
    if (bankMaster.length === 1)
      formik.setFieldValue(
        'p_application_banks__s_bank_ids',
        bankMaster.map((item) => item.value)
      );
  }, [bankMaster.length]);

  useEffect(() => {
    if (p_application_banks__s_bank_ids.includes(String(bankMaster.find((item) => item.code === MCJ_CODE)?.value))) {
      setApplicationInfo((pre) => ({ ...pre, isMCJ: true }));
    } else {
      setApplicationInfo((pre) => ({ ...pre, isMCJ: false }));
    }
    if (['3', '4'].includes(p_application_headers__loan_type)) {
      setApplicationInfo((pre) => ({ ...pre, hasIncomeTotalizer: true }));
    } else {
      setApplicationInfo((pre) => ({ ...pre, hasIncomeTotalizer: false }));
    }
    if (p_application_headers__join_guarantor_umu === '1') {
      setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: true }));
    } else {
      setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: false }));
    }
    if (['1', '2', '3', '4', '5', '6', ''].includes(p_application_headers__loan_target)) {
      formik.setFieldValue('p_application_headers__loan_target_', '0');
    } else {
      formik.setFieldValue('p_application_headers__loan_target_', p_application_headers__loan_target);
    }
  }, [
    p_application_banks__s_bank_ids,
    p_application_headers__loan_type,
    p_application_headers__join_guarantor_umu,
    bankMaster,
  ]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApPageTitle py={8}>{`まずは、お借入のご希望を\nお聞かせください。`}</ApPageTitle>
        <ApItemGroup label={'入居予定年月'}>
          <ApSelectFieldYm name={'p_application_headers__move_scheduled_date'} yearOptions={yearOptions} />
        </ApItemGroup>
        {bankMaster.length > 1 ? (
          <ApItemGroup label={'借入を申し込む金融機関を選択してください'} note={'※複数選択可'}>
            <ApCheckboxButtonGroup
              name={'p_application_banks__s_bank_ids'}
              options={bankMaster}
              onChange={(e) => {
                if (bankMaster.find((item) => item.code === MCJ_CODE)?.value == e.target.value) {
                  setApplicationInfo((pre) => {
                    return { ...pre, isMCJ: e.target.checked };
                  });
                }
              }}
            />
          </ApItemGroup>
        ) : (
          <ApItemGroup label={'借入を申し込む金融機関'}>
            <Typography variant="unit" sx={{ color: 'text.main', pl: 4 }}>
              {bankMaster.map((item) => item.label)}
            </Typography>
          </ApItemGroup>
        )}
        <ApItemGroup label={'お借入の目的'}>
          <ApRadioColumnGroup
            name={'p_application_headers__loan_target_'}
            options={loanTargetOptions_}
            onChange={(e) => {
              switch (e.target.value) {
                case '0':
                  formik.setFieldValue('p_application_headers__loan_target', '');
                  formik.setFieldTouched('p_application_headers__loan_target', false);
                  break;
                case '7':
                  setApplicationInfo((pre) => {
                    return {
                      ...pre,
                      p_application_headers__new_house_acquire_reason: '',
                      p_application_headers__new_house_acquire_reason_other: '',
                    };
                  });
                  formik.setFieldValue('p_application_headers__loan_target', '7');
                  break;
                case '8':
                  formik.setFieldValue('p_application_headers__loan_target', '8');
                  break;
              }
              if (e.target.value !== '0') {
                formik.setFieldValue('p_application_headers__land_advance_plan', '');
                formik.setFieldTouched('p_application_headers__land_advance_plan', false);
                formik.setFieldValue('p_borrowing_details__1__desired_borrowing_date', '');
                formik.setFieldValue('p_borrowing_details__1__desired_loan_amount', '');
                formik.setFieldValue('p_borrowing_details__1__bonus_repayment_amount', '');
                formik.setFieldTouched('p_borrowing_details__1__desired_borrowing_date', false);
                formik.setFieldTouched('p_borrowing_details__1__desired_loan_amount', false);
                formik.setFieldTouched('p_borrowing_details__1__bonus_repayment_amount', false);
              }
            }}
          />
        </ApItemGroup>
        {formik.values.p_application_headers__loan_target_ === '0' && (
          <ApItemGroup label={'資金の使いみち'}>
            <ApRadioColumnGroup
              name={'p_application_headers__loan_target'}
              options={loanTargetOptions}
              onChange={(e) => {
                setApplicationInfo((pre) => {
                  return {
                    ...pre,
                    p_application_headers__required_funds_land_amount: '',
                    p_application_headers__required_funds_house_amount: '',
                    p_application_headers__required_funds_accessory_amount: '',
                    p_application_headers__required_funds_additional_amount: '',
                    p_application_headers__required_funds_refinance_loan_balance: '',
                    p_application_headers__required_funds_upgrade_amount: '',
                    p_application_headers__required_funds_loan_plus_amount: '',
                    p_application_headers__required_funds_total_amount: '',
                    p_application_headers__funding_saving_amount: '',
                    p_application_headers__funding_estate_sale_amount: '',
                    p_application_headers__funding_other_saving_amount: '',
                    p_application_headers__funding_relative_donation_amount: '',
                    p_application_headers__funding_loan_amount: '',
                    p_application_headers__funding_pair_loan_amount: '',
                    p_application_headers__funding_other_amount: '',
                    p_application_headers__funding_other_amount_detail: '',
                    p_application_headers__funding_total_amount: '',
                  };
                });
                if (e.target.value !== '6') {
                  formik.setFieldValue('p_application_headers__land_advance_plan', '');
                  formik.setFieldTouched('p_application_headers__land_advance_plan', false);
                  formik.setFieldValue('p_borrowing_details__1__desired_borrowing_date', '');
                  formik.setFieldValue('p_borrowing_details__1__desired_loan_amount', '');
                  formik.setFieldValue('p_borrowing_details__1__bonus_repayment_amount', '');
                  formik.setFieldTouched('p_borrowing_details__1__desired_borrowing_date', false);
                  formik.setFieldTouched('p_borrowing_details__1__desired_loan_amount', false);
                  formik.setFieldTouched('p_borrowing_details__1__bonus_repayment_amount', false);
                }
              }}
            />
          </ApItemGroup>
        )}
        {formik.values.p_application_headers__loan_target === '6' && (
          <ApItemGroup
            label={'土地先行プランをご希望ですか？'}
            note={'※ 土地先行プランは住信SBIネット銀行でご利用できます。'}
            helps={[<ApLandAdvancePlanModal />]}
            helpsType={'break'}
          >
            <ApRadioColumnGroup
              name={'p_application_headers__land_advance_plan'}
              options={landAadvancePlanOptions}
              onChange={(e) => {
                if (e.target.value !== '1') {
                  formik.setFieldValue('p_borrowing_details__1__desired_borrowing_date', '');
                  formik.setFieldValue('p_borrowing_details__1__desired_loan_amount', '');
                  formik.setFieldValue('p_borrowing_details__1__bonus_repayment_amount', '');
                  formik.setFieldTouched('p_borrowing_details__1__desired_borrowing_date', false);
                  formik.setFieldTouched('p_borrowing_details__1__desired_loan_amount', false);
                  formik.setFieldTouched('p_borrowing_details__1__bonus_repayment_amount', false);
                }
              }}
            />
          </ApItemGroup>
        )}
        <ApItemGroup
          label={'お借入形態'}
          helps={[<ApPairLoanModal />, <ApIncomeTotalizerModal />]}
          helpsType={'nowrap'}
        >
          <ApRadioColumnGroup
            name={'p_application_headers__loan_type'}
            options={loanTypeOptions}
            onChange={(e) => {
              if (e.target.value === '2') pairLoanModal.onTrue();
              if (e.target.value === '3' || e.target.value === '4') {
                setApplicationInfo((pre) => {
                  return { ...pre, hasIncomeTotalizer: true };
                });
              } else {
                setApplicationInfo((pre) => {
                  return { ...pre, hasIncomeTotalizer: false };
                });
              }
            }}
          />
          {formik.values.p_application_headers__loan_type === '2' && (
            <Stack sx={{ pt: 4 }}>
              <Stack
                sx={{
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  bgcolor: 'primary.main',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Stack sx={{ px: 4, py: 1 }}>
                  <Typography variant="form_item_label" color="white">
                    ペアローンのお相手について
                  </Typography>
                </Stack>
                <Stack sx={{ bgcolor: 'white', borderRadius: '7px' }}>
                  <ApItemGroup label={'お名前'} pb={3} px={2}>
                    <Stack spacing={3}>
                      <ApTextInputField
                        name={'p_application_headers__pair_loan_last_name'}
                        placeholder={'姓'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name={'p_application_headers__pair_loan_first_name'}
                        placeholder={'名'}
                        convertFullWidth
                      />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup label={'続柄'} pb={3} px={2}>
                    <ApTextInputField
                      name={'p_application_headers__pair_loan_rel_name'}
                      placeholder={'例：妻'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                </Stack>
              </Stack>
            </Stack>
          )}
          <ApModalWrapper
            open={pairLoanModal.value}
            icon={<Icons.ApSmileIcon />}
            label={'ペアローンを\nお申し込みの方へ'}
          >
            <Stack sx={{ px: 6 }}>
              <Box
                sx={{
                  py: 4,
                  borderTop: '1px dashed',
                  borderBottom: '1px dashed',
                  borderColor: 'primary.60',
                }}
              >
                <Stack spacing={'8px'} direction={'row'} alignItems={'center'}>
                  <Box>
                    <Icons.ApWarningMainIcon />
                  </Box>
                  <Typography variant="modal_label" sx={{ color: 'taxt.main', textAlign: 'start' }}>
                    {'ペアローンを組むお相手も、別途仮審査申込が必要です。'}
                  </Typography>
                </Stack>
              </Box>
              {isMCJ && (
                <Box
                  sx={{
                    py: 4,
                    borderBottom: '1px dashed',
                    borderColor: 'primary.60',
                  }}
                >
                  <Stack spacing={'8px'} direction={'row'} alignItems={'center'}>
                    <Box>
                      <Icons.ApWarningMainIcon />
                    </Box>
                    <Typography variant="modal_label" sx={{ color: 'taxt.main', textAlign: 'start' }}>
                      {
                        'ペアローンは住信SBIネット銀行でご利用いただけます。日本住宅ローンではペアローンをお取り扱いしておりませんのでご了承ください。'
                      }
                    </Typography>
                  </Stack>
                </Box>
              )}
              <Stack alignItems={'center'} sx={{ pt: 6 }}>
                <ApLighterButton
                  height={40}
                  width={160}
                  endIcon={<Icons.ApForwardRightMainIcon />}
                  onClick={pairLoanModal.onFalse}
                >
                  とじる
                </ApLighterButton>
              </Stack>
            </Stack>
          </ApModalWrapper>
        </ApItemGroup>

        <ApItemGroup label={'お借入内容'}>
          <Stack
            sx={{
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: 'primary.main',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            {formik.values.p_application_headers__land_advance_plan === '1' && (
              <Stack sx={{ px: 4, py: 1 }}>
                <Typography variant="form_item_label" color="white">
                  1回目の融資
                </Typography>
              </Stack>
            )}
            <Stack
              sx={{
                bgcolor: 'white',
                borderRadius: '7px',
              }}
            >
              <ApItemGroup
                label={'お借入希望日'}
                pb={3}
                px={2}
                borderTopRightRadius={formik.values.p_application_headers__land_advance_plan === '1' ? 0 : '7px'}
                borderTopLeftRadius={formik.values.p_application_headers__land_advance_plan === '1' ? 0 : '7px'}
              >
                <ApSelectFieldYmd name={'p_borrowing_details__0__desired_borrowing_date'} yearOptions={yearOptions} />
              </ApItemGroup>
              <ApItemGroup label={'お借入希望額'} pb={3} px={2}>
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <ApNumberInputField
                      name={'p_borrowing_details__0__desired_loan_amount'}
                      placeholder="0"
                      unit={
                        <Typography variant="unit" color={'text.main'}>
                          {'万円'}
                          <Typography variant="note" color={'text.main'}>
                            {` ※10万円単位`}
                          </Typography>
                        </Typography>
                      }
                      align="right"
                      width={140}
                      maxLength={6}
                    />
                    {formik.values.p_application_headers__loan_type === '2' && (
                      <ApStarHelp
                        label={
                          'あなたの分の金額をご入力ください。ペアローン相手との合計金額ではございませんのでご注意ください。'
                        }
                      />
                    )}
                  </Stack>
                  <ApNumberInputField
                    name={'p_borrowing_details__0__bonus_repayment_amount'}
                    placeholder="0"
                    label={'うち、ボーナス返済分'}
                    unit={
                      <Typography variant="unit" color={'text.main'}>
                        {'万円'}
                        <Typography variant="note" color={'text.main'}>
                          {` ※10万円単位`}
                        </Typography>
                      </Typography>
                    }
                    align="right"
                    width={140}
                    maxLength={6}
                    onBlur={(e) => {
                      if (!!e.target.value && formik.values.p_borrowing_details__0__bonus_repayment_month === '1') {
                        formik.setFieldValue('p_borrowing_details__0__bonus_repayment_month', '2');
                      }
                      if (e.target.value === '' || e.target.value === '0') {
                        formik.setFieldTouched('p_borrowing_details__0__bonus_repayment_amount', false);
                        formik.setFieldValue('p_borrowing_details__0__bonus_repayment_month', '1');
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex' }}>
                    <ApBonusRepaymentModal />
                  </Box>

                  <Stack spacing={1}>
                    <Typography variant="unit" color={'text.main'}>
                      ボーナス返済月
                    </Typography>
                    <ApSelectField
                      placeholder="選択してください"
                      name={'p_borrowing_details__0__bonus_repayment_month'}
                      options={bonusRepaymentMonthOptions}
                      width={200}
                    />
                  </Stack>
                </Stack>
              </ApItemGroup>
              <ApItemGroup label={'お借入期間'} pb={3} px={2}>
                <ApSelectField
                  name={'p_borrowing_details__0__loan_term_year'}
                  placeholder={'--'}
                  options={yearNumOptions}
                  unit={'年'}
                  width={72}
                />
              </ApItemGroup>
              <ApItemGroup label={'返済方法'} pb={3} px={2} helps={[<ApRepaymentMethodModal />]} helpsType={'nowrap'}>
                <ApRadioColumnGroup
                  name={'p_borrowing_details__0__repayment_method'}
                  options={repaymentMethodOptions}
                />
              </ApItemGroup>
            </Stack>
          </Stack>
          {formik.values.p_application_headers__land_advance_plan === '1' && (
            <Stack
              sx={{
                mt: 3,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                bgcolor: 'primary.main',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Stack sx={{ px: 4, py: 1 }}>
                <Typography variant="form_item_label" color="white">
                  2回目の融資
                </Typography>
              </Stack>
              <Stack
                sx={{
                  bgcolor: 'white',
                  borderRadius: '7px',
                }}
              >
                <ApItemGroup
                  label={'お借入希望日'}
                  pb={3}
                  px={2}
                  borderTopRightRadius={formik.values.p_application_headers__land_advance_plan === '1' ? 0 : '7px'}
                  borderTopLeftRadius={formik.values.p_application_headers__land_advance_plan === '1' ? 0 : '7px'}
                >
                  <ApSelectFieldYmd name={'p_borrowing_details__1__desired_borrowing_date'} yearOptions={yearOptions} />
                </ApItemGroup>
                <ApItemGroup label={'お借入希望額'} pb={3} px={2}>
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <ApNumberInputField
                        name={'p_borrowing_details__1__desired_loan_amount'}
                        placeholder="0"
                        unit={
                          <Typography variant="unit" color={'text.main'}>
                            {'万円'}
                            <Typography variant="note" color={'text.main'}>
                              {` ※10万円単位`}
                            </Typography>
                          </Typography>
                        }
                        align="right"
                        width={140}
                        maxLength={6}
                      />
                    </Stack>
                    <ApNumberInputField
                      name={'p_borrowing_details__1__bonus_repayment_amount'}
                      placeholder="0"
                      label={'うち、ボーナス返済分'}
                      unit={
                        <Typography variant="unit" color={'text.main'}>
                          {'万円'}
                          <Typography variant="note" color={'text.main'}>
                            {` ※10万円単位`}
                          </Typography>
                        </Typography>
                      }
                      align="right"
                      width={140}
                      maxLength={6}
                    />
                  </Stack>
                </ApItemGroup>
              </Stack>
            </Stack>
          )}
        </ApItemGroup>
        <ApItemGroup
          label={'担保提供者がいる方のみ、チェックをつけてください。'}
          helps={[<ApJoinGuarantorModal />]}
          helpsType={'break'}
        >
          <ApCheckboxButton
            name={'p_application_headers__join_guarantor_umu'}
            options={hasJoinGuarantorOptions}
            onChange={(e) => {
              if (e.target.checked) {
                setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: true }));
              } else {
                setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: false }));
              }
            }}
          />
        </ApItemGroup>

        <ApItemGroup
          optional
          label={'住信SBIネット銀行の「住宅ローンプラス」を申し込みますか？'}
          helps={[<ApLoanPlusModal />]}
          helpsType={'break'}
        >
          <ApCheckboxButton name={'p_application_headers__loan_plus'} options={loanPlusOptions} />
        </ApItemGroup>
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
