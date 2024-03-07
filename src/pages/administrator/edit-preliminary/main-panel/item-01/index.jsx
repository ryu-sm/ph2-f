import { Button, Stack, Typography } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { preliminaryAotm } from '@/store';
import { formatJapanDate } from '@/utils';
import { useEffect, useMemo } from 'react';
import {
  AdEditInput,
  AdNumericInput,
  AdSelectCheckbox,
  AdSelectRadios,
  DayPicker,
  MonthPicker,
} from '@/components/administrator';
import {
  bonusRepaymentMonthOptions,
  hasJoinGuarantorOptions,
  landAadvancePlanOptions,
  loanPlusOptions,
  loanTargetOptions,
  loanTargetOptions_,
  loanTypeOptions,
  pairLoanRelOptions,
  repaymentMethodOptions,
  yearNumOptions,
  yearOptions,
} from './options';
import { useBankMaster } from '@/hooks/use-bank-master';
import dayjs from 'dayjs';
import { useApUpdateApplyInfo } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { MCJ_CODE } from '@/configs';

export const Item01 = () => {
  const { p_application_headers, p_application_banks, p_borrowing_details__1, p_borrowing_details__2 } =
    useRecoilValue(preliminaryAotm);
  const setPreliminaryInfo = useSetRecoilState(preliminaryAotm);
  const initialValues = {
    p_application_headers: {
      created_at: p_application_headers.created_at,
      apply_date: p_application_headers.apply_date,
      move_scheduled_date: p_application_headers.move_scheduled_date,
      loan_target: p_application_headers.loan_target,
      land_advance_plan: p_application_headers.land_advance_plan,
      loan_type: p_application_headers.loan_type,
      pair_loan_last_name: p_application_headers.pair_loan_last_name,
      pair_loan_first_name: p_application_headers.pair_loan_first_name,
      pair_loan_rel_name: p_application_headers.pair_loan_rel_name,
      pair_loan_rel: p_application_headers.pair_loan_rel,
      join_guarantor_umu: p_application_headers.join_guarantor_umu,
      loan_plus: p_application_headers.loan_plus,
    },
    p_application_banks,
    p_borrowing_details__1: {
      desired_borrowing_date: p_borrowing_details__1.desired_borrowing_date,
      desired_loan_amount: p_borrowing_details__1.desired_loan_amount,
      bonus_repayment_amount: p_borrowing_details__1.bonus_repayment_amount,
      bonus_repayment_month: p_borrowing_details__1.bonus_repayment_month,
      loan_term_year: p_borrowing_details__1.loan_term_year,
      repayment_method: p_borrowing_details__1.repayment_method,
    },
    p_borrowing_details__2: {
      desired_borrowing_date: p_borrowing_details__2.desired_borrowing_date,
      desired_loan_amount: p_borrowing_details__2.desired_loan_amount,
      bonus_repayment_amount: p_borrowing_details__2.bonus_repayment_amount,
    },
    // 補助フィールド
    loan_target_: '0',
  };

  const updateApply = useApUpdateApplyInfo();
  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
        land_advance_plan: values.p_application_headers.land_advance_plan,
      },
      p_application_banks: values.p_application_banks,
      p_borrowing_details__1: {
        ...diffObj(initialValues.p_borrowing_details__1, values.p_borrowing_details__1),
      },
      p_borrowing_details__2: {
        ...diffObj(initialValues.p_borrowing_details__2, values.p_borrowing_details__2),
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateApply(p_application_headers.apply_no, setUpdateData(values));
        toast.success('申込内容を更新しました。');
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });
  const isEditable = useMemo(() => {
    return true;
  }, []);

  const bankMaster = useBankMaster();

  useEffect(() => {
    if (['1', '2', '3', '4', '5', '6', ''].includes(p_application_headers.loan_target)) {
      formik.setFieldValue('loan_target_', '0');
    } else {
      formik.setFieldValue('loan_target_', p_application_headers.loan_target);
    }
  }, [p_application_headers.loan_target]);

  useEffect(() => {
    if (formik.values.p_application_banks.includes(bankMaster.find((item) => item.code === MCJ_CODE)?.value)) {
      setPreliminaryInfo((pre) => ({ ...pre, isMCJ: true }));
    } else {
      setPreliminaryInfo((pre) => ({ ...pre, isMCJ: false }));
    }
  }, [bankMaster.length, formik.values.p_application_banks.length]);

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
  return (
    <FormikProvider value={formik}>
      <Stack width={'100%'} marginTop={'16px'} height={'calc(100dvh - 320px)'}>
        <Stack width={'100%'} direction={'row'} justifyContent={'flex-end'}>
          <Button
            sx={{
              width: 200,
              padding: '6px 16px',
              bgcolor: 'secondary.main',
              color: 'white',
              boxShadow: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'secondary.main', opacity: 0.8 },
            }}
            onClick={formik.handleSubmit}
          >
            保存
          </Button>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          width={'100%'}
          borderBottom={'1px solid '}
          borderColor={'gray.100'}
        >
          <Typography
            variant="edit_content_title"
            sx={{ fontWeight: 500, color: 'gray.100', flex: 1, textAlign: 'center' }}
          >
            入力項目
          </Typography>
          <Typography
            variant="edit_content_title"
            sx={{ fontWeight: 500, color: 'gray.100', flex: 2, textAlign: 'center' }}
          >
            入力内容
          </Typography>
        </Stack>
        <Stack width={1} overflow={'auto'} pb={'10px'}>
          <EditRow label={'申込日時'}>
            {`${formatJapanDate(formik.values.p_application_headers.created_at.split(' ')[0], true)} ${
              formik.values.p_application_headers.created_at.split(' ')[1]
            }`}
          </EditRow>
          <EditRow label={'同意日'}>{formatJapanDate(formik.values.p_application_headers.apply_date, true)}</EditRow>
          <EditRow
            label={'入居予定年月'}
            hasPleft={isEditable}
            error={formik.errors?.p_application_headers?.move_scheduled_date}
          >
            {isEditable ? (
              <MonthPicker name="p_application_headers.move_scheduled_date" yearOptions={yearOptions} />
            ) : (
              formatJapanDate(formik.values.p_application_headers.move_scheduled_date, true)
            )}
          </EditRow>
          <EditRow
            label={'仮審査を申し込む金融機関の選択'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_application_banks}
          >
            {isEditable ? (
              <AdSelectCheckbox name="p_application_banks" options={bankMaster} />
            ) : (
              bankMaster
                .map((item) => (formik.values.p_application_banks.includes(item.value) ? item.label : null))
                .filter((item) => item)
                .join('・')
            )}
          </EditRow>
          <EditRow label={'お借入の目的'} isRequired hasPleft={isEditable} error={formik.errors?.loan_target_}>
            {isEditable ? (
              <AdSelectRadios
                name="loan_target_"
                options={loanTargetOptions_}
                onChange={(value) => {
                  switch (value) {
                    case '0':
                      formik.setFieldValue('p_application_headers.loan_target', '');
                      formik.setFieldTouched('p_application_headers.loan_target', false);
                      break;
                    case '7':
                      setPreliminaryInfo((pre) => {
                        return {
                          ...pre,
                          p_application_headers: {
                            ...pre.p_application_headers,
                            new_house_acquire_reason: '',
                            new_house_acquire_reason_other: '',
                          },
                        };
                      });
                      formik.setFieldValue('p_application_headers.loan_target', '7');
                      break;
                    case '8':
                      formik.setFieldValue('p_application_headers.loan_target', '8');
                      break;
                  }
                  if (value !== '0') {
                    formik.setFieldValue('p_application_headers.land_advance_plan', '');
                    formik.setFieldTouched('p_application_headers.land_advance_plan', false);

                    formik.setFieldValue('p_borrowing_details__2._desired_borrowing_date', '');
                    formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                    formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                    formik.setFieldTouched('p_borrowing_details__2._desired_borrowing_date', false);
                    formik.setFieldTouched('p_borrowing_details__2.desired_loan_amount', false);
                    formik.setFieldTouched('p_borrowing_details__2.bonus_repayment_amount', false);
                  }
                }}
              />
            ) : (
              loanTargetOptions_.find((item) => item.value === formik.values.loan_target_)?.label
            )}
          </EditRow>
          <EditRow
            label={'資金の使いみち'}
            isLogicRequired
            hasPleft={isEditable}
            error={formik.errors?.p_application_headers?.loan_target}
          >
            {isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.loan_target'}
                options={loanTargetOptions}
                onChange={(value) => {
                  setPreliminaryInfo((pre) => {
                    return {
                      ...pre,
                      p_application_headers: {
                        ...pre.p_application_headers,
                        required_funds_land_amount: '',
                        required_funds_house_amount: '',
                        required_funds_accessory_amount: '',
                        required_funds_additional_amount: '',
                        required_funds_refinance_loan_balance: '',
                        required_funds_upgrade_amount: '',
                        required_funds_loan_plus_amount: '',
                        required_funds_total_amount: '',
                        funding_saving_amount: '',
                        funding_estate_sale_amount: '',
                        funding_other_saving_amount: '',
                        funding_relative_donation_amount: '',
                        funding_loan_amount: '',
                        funding_pair_loan_amount: '',
                        funding_other_amount: '',
                        funding_other_amount_detail: '',
                        funding_total_amount: '',
                      },
                    };
                  });
                  if (value !== '6') {
                    formik.setFieldValue('p_application_headers.land_advance_plan', '');
                    formik.setFieldTouched('p_application_headers.land_advance_plan', false);
                    formik.setFieldValue('p_borrowing_details__2.desired_borrowing_date', '');
                    formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                    formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                    formik.setFieldTouched('p_borrowing_details__2.desired_borrowing_date', false);
                    formik.setFieldTouched('p_borrowing_details__2.desired_loan_amount', false);
                    formik.setFieldTouched('p_borrowing_details__2.bonus_repayment_amount', false);
                  }
                }}
              />
            ) : (
              loanTargetOptions.find((item) => item.value === formik.values.p_application_headers.loan_target)?.label
            )}
          </EditRow>
          {formik.values.p_application_headers.loan_target === '6' && (
            <EditRow
              label={'「土地先行プラン」を希望ですか？'}
              isLogicRequired
              hasPleft={isEditable}
              error={formik.errors?.p_application_headers?.land_advance_plan}
            >
              {isEditable ? (
                <AdSelectRadios
                  name={'p_application_headers.land_advance_plan'}
                  options={landAadvancePlanOptions}
                  onChange={(value) => {
                    if (value !== '1') {
                      formik.setFieldValue('p_borrowing_details__2.desired_borrowing_date', '');
                      formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                      formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                      formik.setFieldTouched('p_borrowing_details__2.desired_borrowing_date', false);
                      formik.setFieldTouched('p_borrowing_details__2.desired_loan_amount', false);
                      formik.setFieldTouched('p_borrowing_details__2.bonus_repayment_amount', false);
                    }
                  }}
                />
              ) : (
                landAadvancePlanOptions.find(
                  (item) => item.value === formik.values.p_application_headers.land_advance_plan
                )?.label
              )}
            </EditRow>
          )}
          <EditRow
            label={'お借入形態'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_application_headers?.loan_type}
          >
            {isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.loan_type'}
                options={loanTypeOptions}
                onChange={(value) => {
                  if (
                    (value === '3' || value === '4') &&
                    (p_application_headers.loan_type !== '3' || p_application_headers.loan_type !== '4')
                  ) {
                    setPreliminaryInfo((pre) => {
                      return { ...pre, changeToIncomeTotalizer: true, apNextStepId: 4 };
                    });
                  } else {
                    setPreliminaryInfo((pre) => {
                      return { ...pre, changeToIncomeTotalizer: false, apNextStepId: 2 };
                    });
                  }
                  if (value === '3' || value === '4') {
                    setPreliminaryInfo((pre) => {
                      return { ...pre, hasIncomeTotalizer: true };
                    });
                  } else {
                    setPreliminaryInfo((pre) => {
                      return { ...pre, hasIncomeTotalizer: false };
                    });
                  }
                  if (
                    (formik.values.p_application_headers.loan_type === '3' ||
                      formik.values.p_application_headers.loan_type === '4') &&
                    (value !== '3' || value !== '4')
                  ) {
                    setPreliminaryInfo((pre) => {
                      return {
                        ...pre,
                        p_application_headers: {
                          ...pre.p_application_headers,
                          rent_to_be_paid_land_borrower: '',
                          rent_to_be_paid_house_borrower: '',
                        },
                        p_borrowings: pre.p_borrowings.map((item) => ({ ...item, borrower: '' })),
                      };
                    });
                  }
                }}
              />
            ) : (
              loanTypeOptions.find((item) => item.value === formik.values.p_application_headers.loan_type)?.label
            )}
          </EditRow>
          {formik.values.p_application_headers.loan_type === '2' && (
            <Stack>
              <EditRow
                label={'ペアローン　お名前（姓）'}
                isLogicRequired
                error={formik.errors?.p_application_headers?.pair_loan_last_name}
              >
                {isEditable ? (
                  <AdEditInput name="p_application_headers.pair_loan_last_name" />
                ) : (
                  formik.values.p_application_headers.pair_loan_last_name
                )}
              </EditRow>
              <EditRow
                label={'ペアローン　お名前（名）'}
                isLogicRequired
                error={formik.errors?.p_application_headers?.pair_loan_first_name}
              >
                {isEditable ? (
                  <AdEditInput name="p_application_headers.pair_loan_first_name" />
                ) : (
                  formik.values.p_application_headers.pair_loan_first_name
                )}
              </EditRow>
              <EditRow
                label={'ペアローン　続柄'}
                isLogicRequired
                isAddendum
                error={formik.errors?.p_application_headers?.pair_loan_rel}
              >
                <Stack direction={'row'} alignItems={'center'} flex={1} spacing={3}>
                  <Stack sx={{ minWidth: '50%' }}>
                    {isEditable ? (
                      <AdEditInput name="p_application_headers.pair_loan_rel_name" />
                    ) : (
                      <Typography variant="edit_content">
                        {formik.values.p_application_headers.pair_loan_rel_name}
                      </Typography>
                    )}
                  </Stack>
                  <Stack sx={{ minWidth: '50%' }}>
                    {isEditable ? (
                      <AdSelectRadios name={'p_application_headers.pair_loan_rel'} options={pairLoanRelOptions} />
                    ) : (
                      <Typography variant="edit_content">
                        {
                          pairLoanRelOptions.find(
                            (item) => item.value === formik.values.p_application_headers.pair_loan_rel
                          )?.label
                        }
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </EditRow>
            </Stack>
          )}
          <EditRow
            label={'お借入希望日'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_borrowing_details__1?.desired_borrowing_date}
          >
            {isEditable ? (
              <DayPicker
                name="p_borrowing_details__1.desired_borrowing_date"
                minDate={dayjs().startOf('year')}
                maxDate={dayjs().add(4, 'year').endOf('year')}
              />
            ) : (
              formatJapanDate(formik.values.p_borrowing_details__1.desired_borrowing_date, true)
            )}
          </EditRow>
          <EditRow label={'お借入希望額'} isRequired error={formik.errors?.p_borrowing_details__1?.desired_loan_amount}>
            {isEditable ? (
              <AdNumericInput name="p_borrowing_details__1.desired_loan_amount" maxLength={6} />
            ) : (
              formik.values.p_borrowing_details__1.desired_loan_amount &&
              `${Number(formik.values.p_borrowing_details__1.desired_loan_amount).toLocaleString()}万円`
            )}
          </EditRow>
          <EditRow
            label={'お借入内容　うち、ボーナス返済分'}
            isLogicRequired
            error={formik.errors?.p_borrowing_details__1?.bonus_repayment_amount}
          >
            {isEditable ? (
              <AdNumericInput
                name="p_borrowing_details__1.bonus_repayment_amount"
                maxLength={6}
                onBlur={(e) => {
                  if (!!e.target.value && formik.values.p_borrowing_details__1.bonus_repayment_month === '1') {
                    formik.setFieldValue('p_borrowing_details__1.bonus_repayment_month', '2');
                  }
                  if (e.target.value === '' || e.target.value === '0') {
                    formik.setFieldTouched('p_borrowing_details__1.bonus_repayment_amount', false);
                    formik.setFieldValue('p_borrowing_details__1.bonus_repayment_month', '1');
                  }
                }}
              />
            ) : (
              formik.values.p_borrowing_details__1.bonus_repayment_amount &&
              `${Number(formik.values.p_borrowing_details__1.bonus_repayment_amount).toLocaleString()}万円`
            )}
          </EditRow>
          <EditRow
            label={'ボーナス返済月'}
            isLogicRequired
            hasPleft={isEditable}
            error={formik.errors?.p_borrowing_details__1?.bonus_repayment_month}
          >
            {isEditable ? (
              <AdSelectRadios
                name={'p_borrowing_details__1.bonus_repayment_month'}
                options={bonusRepaymentMonthOptions}
              />
            ) : (
              bonusRepaymentMonthOptions.find(
                (item) => item.value === formik.values.p_borrowing_details__1.bonus_repayment_month
              )?.label
            )}
          </EditRow>
          <EditRow label={'お借入内容　お借入期間（年）'} isRequired hasPleft={isEditable}>
            {isEditable ? (
              <AdSelectRadios name={'p_borrowing_details__1.loan_term_year'} options={yearNumOptions} />
            ) : (
              yearNumOptions.find((item) => item.value === formik.values.p_borrowing_details__1.loan_term_year)?.label
            )}
          </EditRow>
          <EditRow label={'お借入内容　返済方法'} isRequired hasPleft={isEditable}>
            {isEditable ? (
              <AdSelectRadios name={'p_borrowing_details__1.repayment_method'} options={repaymentMethodOptions} />
            ) : (
              repaymentMethodOptions.find(
                (item) => item.value === formik.values.p_borrowing_details__1.repayment_method
              )?.label
            )}
          </EditRow>
          {formik.values.p_application_headers.land_advance_plan === '1' && (
            <Stack>
              <EditRow label={'お借入希望日（2回目融資）'} isRequired hasPleft={isEditable}>
                {isEditable ? (
                  <DayPicker
                    name="p_borrowing_details__2.desired_borrowing_date"
                    minDate={dayjs().startOf('year')}
                    maxDate={dayjs().add(4, 'year').endOf('year')}
                  />
                ) : (
                  formatJapanDate(formik.values.p_borrowing_details__2.desired_borrowing_date, true)
                )}
              </EditRow>
              <EditRow label={'お借入希望額（2回目融資）'} isRequired>
                {isEditable ? (
                  <AdNumericInput name="p_borrowing_details__2.desired_loan_amount" maxLength={6} />
                ) : (
                  formik.values.p_borrowing_details__2.desired_loan_amount &&
                  `${Number(formik.values.p_borrowing_details__2.desired_loan_amount).toLocaleString()}万円`
                )}
              </EditRow>
              <EditRow label={'うち、ボーナス返済分（2回目融資）'}>
                {isEditable ? (
                  <AdNumericInput name="p_borrowing_details__2.bonus_repayment_amount" maxLength={6} />
                ) : (
                  formik.values.p_borrowing_details__2.bonus_repayment_amount &&
                  `${Number(formik.values.p_borrowing_details__2.bonus_repayment_amount).toLocaleString()}万円`
                )}
              </EditRow>
            </Stack>
          )}

          <EditRow
            label={'担保提供者がいる方のみ、チェックをつけてください。'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_application_headers?.join_guarantor_umu}
          >
            {isEditable ? (
              <AdSelectRadios name={'p_application_headers.join_guarantor_umu'} options={hasJoinGuarantorOptions} />
            ) : (
              hasJoinGuarantorOptions.find(
                (item) => item.value === formik.values.p_application_headers.join_guarantor_umu
              )?.label
            )}
          </EditRow>
          <EditRow
            label={'住信SBIネット銀行の「住宅ローンプラス」の申し込みの有無'}
            hasPleft={isEditable}
            error={formik.errors?.p_application_headers?.loan_plus}
          >
            {isEditable ? (
              <AdSelectRadios name={'p_application_headers.loan_plus'} options={loanPlusOptions} />
            ) : (
              loanPlusOptions.find((item) => item.value === formik.values.p_application_headers.loan_plus)?.label
            )}
          </EditRow>
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
