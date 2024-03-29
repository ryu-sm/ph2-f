import { Stack } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { formatJapanDate, formatMoney } from '@/utils';
import { useEffect } from 'react';
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
import { diffObj } from '@/utils';
import { MCJ_CODE } from '@/configs';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab01Schema } from '../../fullSchema';

export const Item01 = () => {
  const {
    preliminaryInfo: {
      p_application_headers,
      p_application_banks,
      p_borrowing_details__1,
      p_borrowing_details__2,
      p_borrowings,
    },
    setPreliminarySnap,
    handleSave,
  } = usePreliminaryContext();
  const isEditable = false;
  const initialValues = {
    p_application_headers: {
      created_at: p_application_headers?.created_at,
      apply_date: p_application_headers?.apply_date,
      move_scheduled_date: p_application_headers?.move_scheduled_date,
      loan_target: p_application_headers?.loan_target,
      land_advance_plan: p_application_headers?.land_advance_plan,
      loan_type: p_application_headers?.loan_type,
      pair_loan_last_name: p_application_headers?.pair_loan_last_name,
      pair_loan_first_name: p_application_headers?.pair_loan_first_name,
      pair_loan_rel_name: p_application_headers?.pair_loan_rel_name,
      pair_loan_rel: p_application_headers?.pair_loan_rel,
      join_guarantor_umu: p_application_headers?.join_guarantor_umu,
      loan_plus: p_application_headers?.loan_plus,
    },
    p_application_banks,
    p_borrowing_details__1: {
      desired_borrowing_date: p_borrowing_details__1?.desired_borrowing_date,
      desired_loan_amount: p_borrowing_details__1?.desired_loan_amount,
      bonus_repayment_amount: p_borrowing_details__1?.bonus_repayment_amount,
      bonus_repayment_month: p_borrowing_details__1?.bonus_repayment_month,
      loan_term_year: p_borrowing_details__1?.loan_term_year,
      repayment_method: p_borrowing_details__1?.repayment_method,
    },
    p_borrowing_details__2: {
      desired_borrowing_date: p_borrowing_details__2?.desired_borrowing_date,
      desired_loan_amount: p_borrowing_details__2?.desired_loan_amount,
      bonus_repayment_amount: p_borrowing_details__2?.bonus_repayment_amount,
    },
    // 補助フィールド
    loan_target_: '0',
  };

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
    validationSchema: tab01Schema,
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          ...formik.values.p_application_headers,
        },
        p_application_banks: formik.values.p_application_banks,
        p_borrowing_details__1: {
          ...pre.p_borrowing_details__1,
          ...formik.values.p_borrowing_details__1,
        },
        p_borrowing_details__2: {
          ...pre.p_borrowing_details__2,
          ...formik.values.p_borrowing_details__2,
        },
      };
    });
  }, [formik.values]);

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
      setPreliminarySnap((pre) => ({ ...pre, isMCJ: true }));
    } else {
      setPreliminarySnap((pre) => ({ ...pre, isMCJ: false }));
    }
  }, [bankMaster.length, formik.values.p_application_banks.length]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={() => handleSave(setUpdateData(formik.values))}>
        <EditRow
          label={'申込日時'}
          field={`${formatJapanDate(formik.values.p_application_headers.created_at.split(' ')[0], true)} ${
            formik.values.p_application_headers.created_at.split(' ')[1]
          }`}
        />
        <EditRow label={'同意日'} field={formatJapanDate(formik.values.p_application_headers.apply_date, true)} />
        <EditRow
          label={'入居予定年月'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <MonthPicker name="p_application_headers.move_scheduled_date" yearOptions={yearOptions} />
            ) : (
              formatJapanDate(formik.values.p_application_headers.move_scheduled_date, true)
            )
          }
          error={formik.errors?.p_application_headers?.move_scheduled_date}
        />
        <EditRow
          label={'仮審査を申し込む金融機関の選択'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectCheckbox name="p_application_banks" options={bankMaster} />
            ) : (
              bankMaster
                .map((item) => (formik.values.p_application_banks.includes(item.value) ? item.label : null))
                .filter((item) => item)
                .join('・')
            )
          }
          error={formik.errors?.p_application_banks}
        />
        <EditRow
          label={'お借入の目的'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="loan_target_" options={loanTargetOptions_} />
            ) : (
              loanTargetOptions_.find((item) => item.value === formik.values.loan_target_)?.label
            )
          }
          error={formik.errors?.loan_target_}
          onChange={(value) => {
            switch (value) {
              case '0':
                formik.setFieldValue('p_application_headers.loan_target', '');
                break;
              case '7':
                setPreliminarySnap((pre) => {
                  return {
                    ...pre,
                    p_application_headers: {
                      ...pre?.p_application_headers,
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
              formik.setFieldValue('p_borrowing_details__2._desired_borrowing_date', '');
              formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
              formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
            }
          }}
        />
        <EditRow
          label={'資金の使いみち'}
          isLogicRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.loan_target'}
                options={loanTargetOptions}
                onChange={(value) => {
                  setPreliminarySnap((pre) => {
                    return {
                      ...pre,
                      p_application_headers: {
                        ...pre?.p_application_headers,
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
                    formik.setFieldValue('p_borrowing_details__2.desired_borrowing_date', '');
                    formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                    formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                  }
                }}
              />
            ) : (
              loanTargetOptions.find((item) => item.value === formik.values.p_application_headers.loan_target)?.label
            )
          }
          error={formik.errors?.p_application_headers?.loan_target}
        />
        {formik.values.p_application_headers.loan_target === '6' && (
          <EditRow
            label={'「土地先行プラン」を希望ですか？'}
            isLogicRequired
            hasPleft={isEditable}
            field={
              isEditable ? (
                <AdSelectRadios name={'p_application_headers.land_advance_plan'} options={landAadvancePlanOptions} />
              ) : (
                landAadvancePlanOptions.find(
                  (item) => item.value === formik.values.p_application_headers.land_advance_plan
                )?.label
              )
            }
            error={formik.errors?.p_application_headers?.land_advance_plan}
          />
        )}
        <EditRow
          label={'お借入形態'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.loan_type'}
                options={loanTypeOptions}
                onChange={(value) => {
                  if (
                    (value === '3' || value === '4') &&
                    (p_application_headers.loan_type !== '3' || p_application_headers.loan_type !== '4')
                  ) {
                    setPreliminarySnap((pre) => {
                      return { ...pre, changeToIncomeTotalizer: true, apNextStepId: 4 };
                    });
                  } else {
                    setPreliminarySnap((pre) => {
                      return { ...pre, changeToIncomeTotalizer: false, apNextStepId: 2 };
                    });
                  }
                  if (value === '3' || value === '4') {
                    setPreliminarySnap((pre) => {
                      return { ...pre, hasIncomeTotalizer: true };
                    });
                  } else {
                    setPreliminarySnap((pre) => {
                      return { ...pre, hasIncomeTotalizer: false };
                    });
                  }
                  if (
                    (formik.values.p_application_headers.loan_type === '3' ||
                      formik.values.p_application_headers.loan_type === '4') &&
                    (value !== '3' || value !== '4')
                  ) {
                    setPreliminarySnap((pre) => {
                      return {
                        ...pre,
                        p_application_headers: {
                          ...pre?.p_application_headers,
                          rent_to_be_paid_land_borrower: '',
                          rent_to_be_paid_house_borrower: '',
                        },
                        p_borrowings: p_borrowings.map((item) => ({ ...item, borrower: '' })),
                      };
                    });
                  }
                }}
              />
            ) : (
              loanTypeOptions.find((item) => item.value === formik.values.p_application_headers.loan_type)?.label
            )
          }
          error={formik.errors?.p_application_headers?.loan_type}
        />
        {formik.values.p_application_headers.loan_type === '2' && (
          <Stack>
            <EditRow
              label={'ペアローン　お名前（姓）'}
              isLogicRequired
              field={
                isEditable ? (
                  <AdEditInput name="p_application_headers.pair_loan_last_name" />
                ) : (
                  formik.values.p_application_headers.pair_loan_last_name
                )
              }
              error={formik.errors?.p_application_headers?.pair_loan_last_name}
            />
            <EditRow
              label={'ペアローン　お名前（名）'}
              isLogicRequired
              field={
                isEditable ? (
                  <AdEditInput name="p_application_headers.pair_loan_first_name" />
                ) : (
                  formik.values.p_application_headers.pair_loan_last_name
                )
              }
              error={formik.errors?.p_application_headers?.pair_loan_first_name}
            />
            <EditRow
              label={'ペアローン　続柄'}
              isLogicRequired
              isAddendum
              field={
                isEditable ? (
                  <AdEditInput name="p_application_headers.pair_loan_rel_name" />
                ) : (
                  formik.values.p_application_headers.pair_loan_rel_name
                )
              }
              subField={
                isEditable ? (
                  <AdSelectRadios name={'p_application_headers.pair_loan_rel'} options={pairLoanRelOptions} />
                ) : (
                  pairLoanRelOptions.find((item) => item.value === formik.values.p_application_headers.pair_loan_rel)
                    ?.label
                )
              }
              error={formik.errors?.p_application_headers?.pair_loan_rel}
            />
          </Stack>
        )}
        <EditRow
          label={'お借入希望日'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <DayPicker
                name="p_borrowing_details__1.desired_borrowing_date"
                minDate={dayjs().startOf('year')}
                maxDate={dayjs().add(4, 'year').endOf('year')}
              />
            ) : (
              formatJapanDate(formik.values.p_borrowing_details__1.desired_borrowing_date, true)
            )
          }
          error={formik.errors?.p_borrowing_details__1?.desired_borrowing_date}
        />
        <EditRow
          label={'お借入希望額'}
          isRequired
          field={
            isEditable ? (
              <AdNumericInput name="p_borrowing_details__1.desired_loan_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_borrowing_details__1.desired_loan_amount)
            )
          }
          error={formik.errors?.p_borrowing_details__1?.desired_loan_amount}
        />
        <EditRow
          label={'お借入内容　うち、ボーナス返済分'}
          isLogicRequired
          field={
            isEditable ? (
              <AdNumericInput
                name="p_borrowing_details__1.bonus_repayment_amount"
                maxLength={6}
                unit={'万円'}
                onBlur={(e) => {
                  if (!!e.target.value && formik.values.p_borrowing_details__1.bonus_repayment_month === '1') {
                    formik.setFieldValue('p_borrowing_details__1.bonus_repayment_month', '2');
                  }
                  if (e.target.value === '' || e.target.value === '0') {
                    formik.setFieldValue('p_borrowing_details__1.bonus_repayment_month', '1');
                  }
                }}
              />
            ) : (
              formatMoney(formik.values.p_borrowing_details__1.bonus_repayment_amount)
            )
          }
          error={formik.errors?.p_borrowing_details__1?.bonus_repayment_amount}
        />
        <EditRow
          label={'ボーナス返済月'}
          isLogicRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name={'p_borrowing_details__1.bonus_repayment_month'}
                options={bonusRepaymentMonthOptions}
              />
            ) : (
              bonusRepaymentMonthOptions.find(
                (item) => item.value === formik.values.p_borrowing_details__1.bonus_repayment_month
              )?.label
            )
          }
          error={formik.errors?.p_borrowing_details__1?.bonus_repayment_month}
        />
        <EditRow
          label={'お借入内容　お借入期間（年）'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name={'p_borrowing_details__1.loan_term_year'} options={yearNumOptions} />
            ) : (
              yearNumOptions.find((item) => item.value === formik.values.p_borrowing_details__1.loan_term_year)?.label
            )
          }
          error={formik.errors?.p_borrowing_details__1?.loan_term_year}
        />
        <EditRow
          label={'お借入内容　返済方法'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name={'p_borrowing_details__1.repayment_method'} options={repaymentMethodOptions} />
            ) : (
              repaymentMethodOptions.find(
                (item) => item.value === formik.values.p_borrowing_details__1.repayment_method
              )?.label
            )
          }
          error={formik.errors?.p_borrowing_details__1?.loan_term_year}
        />
        {formik.values.p_application_headers.land_advance_plan === '1' && (
          <Stack>
            <EditRow
              label={'お借入希望日（2回目融資）'}
              isRequired
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <DayPicker
                    name="p_borrowing_details__2.desired_borrowing_date"
                    minDate={dayjs().startOf('year')}
                    maxDate={dayjs().add(4, 'year').endOf('year')}
                  />
                ) : (
                  formatJapanDate(formik.values.p_borrowing_details__2.desired_borrowing_date, true)
                )
              }
              error={formik.errors?.p_borrowing_details__2?.desired_borrowing_date}
            />
            <EditRow
              label={'お借入希望額（2回目融資）'}
              isRequired
              field={
                isEditable ? (
                  <AdNumericInput name="p_borrowing_details__2.desired_loan_amount" maxLength={6} unit={'万円'} />
                ) : (
                  formatMoney(formik.values.p_borrowing_details__2.desired_loan_amount)
                )
              }
              error={formik.errors?.p_borrowing_details__2?.desired_loan_amount}
            />
            <EditRow
              label={'うち、ボーナス返済分（2回目融資）'}
              field={
                isEditable ? (
                  <AdNumericInput name="p_borrowing_details__2.bonus_repayment_amount" maxLength={6} unit={'万円'} />
                ) : (
                  formatMoney(formik.values.p_borrowing_details__2.bonus_repayment_amount)
                )
              }
              error={formik.errors?.p_borrowing_details__2?.bonus_repayment_amount}
            />
          </Stack>
        )}
        <EditRow
          label={'担保提供者がいる方のみ、チェックをつけてください。'}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name={'p_application_headers.join_guarantor_umu'} options={hasJoinGuarantorOptions} />
            ) : (
              hasJoinGuarantorOptions.find(
                (item) => item.value === formik.values.p_application_headers.join_guarantor_umu
              )?.label
            )
          }
          error={formik.errors?.p_application_headers?.join_guarantor_umu}
        />
        <EditRow
          label={'住信SBIネット銀行の「住宅ローンプラス」の申し込みの有無'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name={'p_application_headers.loan_plus'} options={loanPlusOptions} />
            ) : (
              loanPlusOptions.find((item) => item.value === formik.values.p_application_headers.loan_plus)?.label
            )
          }
          error={formik.errors?.p_application_headers?.loan_plus}
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
