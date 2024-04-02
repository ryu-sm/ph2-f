import { Stack } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FieldArray, FormikProvider, useFormik } from 'formik';

import { Fragment, useEffect } from 'react';
import {
  AdEditFullWidthInput,
  AdNumericInput,
  AdSelectCheckbox,
  AdSelectRadios,
  MonthPicker,
} from '@/components/administrator';
import {
  borrowerOptions,
  CurrBorrowingStatusOptions,
  categoryOptions,
  commonHousingOptions,
  estateSettingOptions,
  houseFinanceAgency,
  loanDeadlineYearOptions,
  loanPurposeOptions,
  refundSourceTypeOptions,
  scheduledLoanPayoffOptions,
  scheduledLoanPayoffYearOptions,
  typeOptions,
  loanBusinessTargetOptions,
  loanStartDateYearOptions,
  includeInExaminationOptions,
} from './options';

import { diffObj, formatJapanDate, formatMoney } from '@/utils';

import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { AdPrimaryButton } from '@/components/administrator/button';
import { Icons } from '@/assets';
import { tab06Schema } from '../../fullSchema';

export const Item06 = () => {
  const {
    preliminaryInfo: { p_application_headers, p_borrowings },
    preliminarySnap: { isMCJ, hasIncomeTotalizer },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();
  const initialValues = {
    p_application_headers: {
      curr_borrowing_status: p_application_headers?.curr_borrowing_status,
      refund_source_type: p_application_headers?.refund_source_type,
      refund_source_type_other: p_application_headers?.refund_source_type_other,
      refund_source_content: p_application_headers?.refund_source_content,
      refund_source_amount: p_application_headers?.refund_source_amount,
      rent_to_be_paid_land: p_application_headers?.rent_to_be_paid_land,
      rent_to_be_paid_land_borrower: p_application_headers?.rent_to_be_paid_land_borrower,
      rent_to_be_paid_house: p_application_headers?.rent_to_be_paid_house,
      rent_to_be_paid_house_borrower: p_application_headers?.rent_to_be_paid_house_borrower,
    },
    p_borrowings: p_borrowings,
    isMCJ,
    hasIncomeTotalizer,
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
        curr_borrowing_status: values.p_application_headers.curr_borrowing_status,
        join_guarantor_umu: p_application_headers.join_guarantor_umu,
        land_advance_plan: p_application_headers.land_advance_plan,
        loan_type: p_application_headers.loan_type,
      },
      p_borrowings: values.p_borrowings,
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab06Schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await handleSave(setUpdateData(values));
    },
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          ...formik.values.p_application_headers,
        },
        p_borrowings: formik.values.p_borrowings,
      };
    });
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'あなたや連帯保証人予定者に、現在お借入はありますか？'}
          upConfig={{
            key: `p_application_headers.curr_borrowing_status.${p_application_headers?.id}`,
            options: CurrBorrowingStatusOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_application_headers.curr_borrowing_status"
                options={CurrBorrowingStatusOptions}
                onChange={(value) => {
                  if (value === '1') {
                    formik.setFieldValue('p_borrowings', [
                      {
                        id: '',
                        borrower: '',
                        type: '',
                        lender: '',
                        borrowing_from_house_finance_agency: '',
                        loan_start_date: '',
                        loan_amount: '',
                        curr_loan_balance_amount: '',
                        annual_repayment_amount: '',
                        loan_end_date: '',
                        scheduled_loan_payoff: '',
                        scheduled_loan_payoff_date: '',
                        loan_business_target: '',
                        loan_business_target_other: '',
                        loan_purpose: '',
                        loan_purpose_other: '',
                        category: '',
                        card_expiry_date: '',
                        rental_room_num: '',
                        common_housing: '',
                        estate_setting: '',
                        include_in_examination: '',
                      },
                    ]);
                  } else {
                    formik.setFieldValue('p_borrowings', []);
                  }
                }}
              />
            ) : (
              CurrBorrowingStatusOptions.find(
                (item) => item.value === formik.values.p_application_headers.curr_borrowing_status
              )?.label
            )
          }
        />
        <FieldArray
          name="p_borrowings"
          render={(arrayHelpers) => (
            <Fragment>
              {formik.values.p_borrowings.map((item, index) => (
                <ContentEditGroup
                  key={index}
                  label={'現在の借入状況'}
                  subLabel={`（${index + 1}件目）`}
                  hiddenTitle
                  handleDeleteItem={() => arrayHelpers.remove(index)}
                >
                  {hasIncomeTotalizer && (
                    <EditRow
                      label={'借入名義人'}
                      upConfig={{
                        key: `p_borrowings.borrower.${item?.id}`,
                        options: borrowerOptions,
                      }}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <AdSelectRadios name={`p_borrowings[${index}].borrower`} options={borrowerOptions} />
                        ) : (
                          borrowerOptions.find((item) => item.value === item.borrower)?.label
                        )
                      }
                    />
                  )}
                  <EditRow
                    label={'お借入の種類は？'}
                    upConfig={{
                      key: `p_borrowings.type.${item?.id}`,
                      options: CurrBorrowingStatusOptions,
                    }}
                    hasPleft={isEditable}
                    field={
                      isEditable ? (
                        <AdSelectRadios
                          name={`p_borrowings[${index}].type`}
                          options={typeOptions}
                          onChange={() => {
                            if (formik.values.p_borrowings[index].type !== '')
                              arrayHelpers.replace(index, {
                                id: item.id,
                                self_input: '0',
                                borrower: '',
                                type: '',
                                lender: '',
                                borrowing_from_house_finance_agency: '',
                                loan_start_date: '',
                                loan_amount: '',
                                curr_loan_balance_amount: '',
                                annual_repayment_amount: '',
                                loan_end_date: '',
                                scheduled_loan_payoff: '',
                                scheduled_loan_payoff_date: '',
                                loan_business_target: '',
                                loan_business_target_other: '',
                                loan_purpose: '',
                                loan_purpose_other: '',
                                category: '',
                                card_expiry_date: '',
                                rental_room_num: '',
                                common_housing: '',
                                estate_setting: '',
                                include_in_examination: '',
                              });
                          }}
                        />
                      ) : (
                        typeOptions.find((item) => item.value === item.type)?.label
                      )
                    }
                  />

                  <EditRow
                    label={'借入先（金融機関）'}
                    upConfig={{
                      key: `p_borrowings.lender.${item?.id}`,
                    }}
                    field={
                      isEditable ? (
                        <AdEditFullWidthInput name={`p_borrowings[${index}].lender`} convertFullWidth />
                      ) : (
                        item.lender
                      )
                    }
                  />
                  {formik.values.p_borrowings[index].type === '2' && (
                    <Stack>
                      <EditRow
                        label={'お借入の目的'}
                        upConfig={{
                          key: `p_borrowings.loan_purpose.${item?.id}`,
                          options: loanPurposeOptions,
                        }}
                        hasPleft={isEditable}
                        field={
                          isEditable ? (
                            <AdSelectRadios name={`p_borrowings[${index}].loan_purpose`} options={loanPurposeOptions} />
                          ) : (
                            loanPurposeOptions.find((item) => item.value === item.loan_purpose)?.label
                          )
                        }
                      />
                      {formik.values.p_borrowings[index].loan_purpose === '99' && (
                        <EditRow
                          label={'お借入の目的（その他）'}
                          upConfig={{
                            key: `p_borrowings.loan_purpose_other.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdEditFullWidthInput
                                name={`p_borrowings[${index}].loan_purpose_other`}
                                convertFullWidth
                              />
                            ) : (
                              item.loan_purpose_other
                            )
                          }
                        />
                      )}
                    </Stack>
                  )}

                  {formik.values.p_borrowings[index].type === '4' && (
                    <Stack>
                      <EditRow
                        label={'お借入の目的'}
                        upConfig={{
                          key: `p_borrowings.loan_business_target.${item?.id}`,
                          options: loanBusinessTargetOptions,
                        }}
                        hasPleft={isEditable}
                        field={
                          isEditable ? (
                            <AdSelectRadios
                              name={`p_borrowings[${index}].loan_business_target`}
                              options={loanBusinessTargetOptions}
                            />
                          ) : (
                            loanBusinessTargetOptions.find((item) => item.value === item.loan_business_target)?.label
                          )
                        }
                      />
                      {formik.values.p_borrowings[index].loan_business_target === '99' && (
                        <EditRow
                          label={'お借入の目的（その他）'}
                          upConfig={{
                            key: `p_borrowings.loan_business_target_other.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdEditFullWidthInput
                                name={`p_borrowings[${index}].loan_business_target_other`}
                                convertFullWidth
                              />
                            ) : (
                              item.loan_business_target_other
                            )
                          }
                        />
                      )}
                    </Stack>
                  )}
                  {formik.values.p_borrowings[index].type === '1' && (
                    <EditRow
                      label={'住宅金融支援機構からの借入'}
                      upConfig={{
                        key: `p_borrowings.borrowing_from_house_finance_agency.${item?.id}`,
                        options: houseFinanceAgency,
                      }}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <AdSelectRadios
                            name={`p_borrowings[${index}].borrowing_from_house_finance_agency`}
                            options={houseFinanceAgency}
                          />
                        ) : (
                          houseFinanceAgency.find((item) => item.value === item.borrowing_from_house_finance_agency)
                            ?.label
                        )
                      }
                    />
                  )}
                  {formik.values.p_borrowings[index].type === '2' && (
                    <EditRow
                      label={'借入区分'}
                      upConfig={{
                        key: `p_borrowings.category.${item?.id}`,
                        options: categoryOptions,
                      }}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <AdSelectRadios name={`p_borrowings[${index}].category`} options={categoryOptions} />
                        ) : (
                          categoryOptions.find((item) => item.value === item.category)?.label
                        )
                      }
                    />
                  )}
                  <EditRow
                    label={formik.values.p_borrowings[index].type === '2' ? '当初カード契約年月' : '当初借入年月'}
                    upConfig={{
                      key: `p_borrowings.loan_start_date.${item?.id}`,
                      formatJaDate: true,
                    }}
                    hasPleft={isEditable}
                    field={
                      isEditable ? (
                        <MonthPicker
                          name={`p_borrowings[${index}].loan_start_date`}
                          yearOptions={loanStartDateYearOptions}
                        />
                      ) : (
                        formatJapanDate(item.loan_start_date, true)
                      )
                    }
                    isLogicRequired
                  />
                  <EditRow
                    label={formik.values.p_borrowings[index].type === '2' ? '借入限度額' : '当初借入額'}
                    upConfig={{
                      key: `p_borrowings.loan_amount.${item?.id}`,
                      formatNumber: true,
                      unit: '万円',
                    }}
                    isLogicRequired
                    field={
                      isEditable ? (
                        <AdNumericInput name={`p_borrowings[${index}].loan_amount`} unit={'万円'} />
                      ) : (
                        formatMoney(item.loan_amount)
                      )
                    }
                  />
                  <EditRow
                    label={'現在の残高'}
                    upConfig={{
                      key: `p_borrowings.curr_loan_balance_amount.${item?.id}`,
                      formatNumber: true,
                      unit: '万円',
                    }}
                    field={
                      isEditable ? (
                        <AdNumericInput name={`p_borrowings[${index}].curr_loan_balance_amount`} unit={'万円'} />
                      ) : (
                        formatMoney(item.curr_loan_balance_amount)
                      )
                    }
                  />
                  <EditRow
                    label={'年間返済額'}
                    upConfig={{
                      key: `p_borrowings.annual_repayment_amount.${item?.id}`,
                      formatNumber: true,
                      unit: '万円',
                    }}
                    field={
                      isEditable ? (
                        <AdNumericInput name={`p_borrowings[${index}].annual_repayment_amount`} unit={'万円'} />
                      ) : (
                        formatMoney(item.annual_repayment_amount)
                      )
                    }
                  />
                  {formik.values.p_borrowings[index].type === '2' ? (
                    <EditRow
                      label={'カード有効期限'}
                      upConfig={{
                        key: `p_borrowings.card_expiry_date.${item?.id}`,
                        formatJaDate: true,
                      }}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <MonthPicker
                            name={`p_borrowings[${index}].card_expiry_date`}
                            yearOptions={loanDeadlineYearOptions}
                          />
                        ) : (
                          formatJapanDate(item.card_expiry_date, true)
                        )
                      }
                    />
                  ) : (
                    <EditRow
                      label={'契約期限、最終期限／最終返済年月'}
                      upConfig={{
                        key: `p_borrowings.loan_end_date.${item?.id}`,
                        formatJaDate: true,
                      }}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <MonthPicker
                            name={`p_borrowings[${index}].loan_end_date`}
                            yearOptions={loanDeadlineYearOptions}
                          />
                        ) : (
                          formatJapanDate(item.loan_end_date, true)
                        )
                      }
                    />
                  )}
                  {formik.values.p_borrowings[index].type === '3' && (
                    <Stack>
                      <EditRow
                        label={'賃貸戸（室）数'}
                        upConfig={{
                          key: `p_borrowings.rental_room_num.${item?.id}`,
                          formatNumber: true,
                          unit: '戸（室）',
                        }}
                        field={
                          isEditable ? (
                            <AdNumericInput
                              name={`p_borrowings[${index}].rental_room_num`}
                              maxLength={2}
                              unit={'戸（室）'}
                            />
                          ) : (
                            formatMoney(item.rental_room_num, '戸（室）')
                          )
                        }
                      />
                      <EditRow
                        label={'共同住宅'}
                        upConfig={{
                          key: `p_borrowings.common_housing.${item?.id}`,
                          options: commonHousingOptions,
                        }}
                        hasPleft={isEditable}
                        field={
                          isEditable ? (
                            <AdSelectRadios
                              name={`p_borrowings[${index}].common_housing`}
                              options={commonHousingOptions}
                            />
                          ) : (
                            commonHousingOptions.find((item) => item.value === item.common_housing)?.label
                          )
                        }
                      />
                    </Stack>
                  )}
                  {!['1', '2'].includes(formik.values.p_borrowings[index].type) && (
                    <EditRow
                      label={'不動産担保設定'}
                      upConfig={{
                        key: `p_borrowings.estate_setting.${item?.id}`,
                        options: estateSettingOptions,
                      }}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <AdSelectRadios
                            name={`p_borrowings[${index}].estate_setting`}
                            options={estateSettingOptions}
                          />
                        ) : (
                          estateSettingOptions.find((item) => item.value === item.estate_setting)?.label
                        )
                      }
                    />
                  )}
                  {formik.values.p_borrowings[index].type !== '4' && (
                    <Stack>
                      <EditRow
                        label={'今回のお借入までに完済の予定はありますか？'}
                        upConfig={{
                          key: `p_borrowings.scheduled_loan_payoff.${item?.id}`,
                          options: scheduledLoanPayoffOptions,
                        }}
                        hasPleft={isEditable}
                        field={
                          isEditable ? (
                            <AdSelectRadios
                              name={`p_borrowings[${index}].scheduled_loan_payoff`}
                              options={
                                ['2', '5', '6', '7', '99'].includes(formik.values.p_borrowings[index].type)
                                  ? scheduledLoanPayoffOptions
                                  : scheduledLoanPayoffOptions.slice(0, 2)
                              }
                            />
                          ) : (
                            estateSettingOptions.find((item) => item.value === item.scheduled_loan_payoff)?.label
                          )
                        }
                      />
                      {formik.values.p_borrowings[index].scheduled_loan_payoff === '1' && (
                        <EditRow
                          label={'完済（予定）年月'}
                          upConfig={{
                            key: `p_borrowings.scheduled_loan_payoff_date.${item?.id}`,
                            formatJaDate: true,
                          }}
                          hasPleft={isEditable}
                          field={
                            isEditable ? (
                              <MonthPicker
                                name={`p_borrowings[${index}].scheduled_loan_payoff_date`}
                                yearOptions={scheduledLoanPayoffYearOptions}
                              />
                            ) : (
                              formatJapanDate(item.scheduled_loan_payoff_date, true)
                            )
                          }
                        />
                      )}
                    </Stack>
                  )}

                  <EditRow
                    label={'審査に含める/含めない'}
                    upConfig={{
                      key: `p_borrowings.include_in_examination.${item?.id}`,
                      options: includeInExaminationOptions,
                    }}
                    isAddendum
                    hasPleft={isEditable}
                    field={
                      isEditable ? (
                        <AdSelectRadios
                          name={`p_borrowings[${index}].include_in_examination`}
                          options={includeInExaminationOptions}
                        />
                      ) : (
                        estateSettingOptions.find((item) => item.value === item.include_in_examination)?.label
                      )
                    }
                  />
                </ContentEditGroup>
              ))}

              {isMCJ && formik.values.p_borrowings.some((item) => item?.scheduled_loan_payoff === '1') && (
                <Stack>
                  <EditRow
                    label={'完済原資の種類'}
                    upConfig={{
                      key: `p_application_headers.refund_source_type.${p_application_headers?.id}`,
                      options: refundSourceTypeOptions,
                      mapOptions: true,
                      join: '・',
                    }}
                    hasPleft={isEditable}
                    field={
                      isEditable ? (
                        <AdSelectCheckbox
                          name="p_application_headers.refund_source_type"
                          options={refundSourceTypeOptions}
                        />
                      ) : (
                        refundSourceTypeOptions
                          .map((item) =>
                            formik.values.p_application_headers.refund_source_type.includes(item.value)
                              ? item.label
                              : null
                          )
                          .filter((item) => item)
                          .join('・')
                      )
                    }
                  />
                  <EditRow
                    label={'完済原資の内容'}
                    upConfig={{
                      key: `p_application_headers.refund_source_content.${p_application_headers?.id}`,
                    }}
                    field={
                      isEditable ? (
                        <AdEditFullWidthInput name="p_application_headers.refund_source_content" convertFullWidth />
                      ) : (
                        formik.values.p_application_headers.refund_source_content
                      )
                    }
                  />
                  <EditRow
                    label={'完済原資の金額'}
                    upConfig={{
                      key: `p_application_headers.refund_source_amount.${p_application_headers?.id}`,
                      formatNumber: true,
                      unit: '万円',
                    }}
                    field={
                      isEditable ? (
                        <AdNumericInput name="p_application_headers.refund_source_amount" maxLength={6} unit={'万円'} />
                      ) : (
                        formatMoney(formik.values.p_application_headers.refund_source_amount)
                      )
                    }
                  />
                  <EditRow
                    label={'今回の住宅取得後も継続する支払地代'}
                    upConfig={{
                      key: `p_application_headers.rent_to_be_paid_land.${p_application_headers?.id}`,
                      formatNumber: true,
                      unit: '円',
                    }}
                    field={
                      isEditable ? (
                        <AdNumericInput name="p_application_headers.rent_to_be_paid_land" maxLength={10} unit={'円'} />
                      ) : (
                        formatMoney(formik.values.p_application_headers.rent_to_be_paid_land, '円')
                      )
                    }
                  />
                  <EditRow
                    label={'今回の住宅取得後も継続する支払家賃'}
                    upConfig={{
                      key: `p_application_headers.rent_to_be_paid_house.${p_application_headers?.id}`,
                      formatNumber: true,
                      unit: '円',
                    }}
                    field={
                      isEditable ? (
                        <AdNumericInput name="p_application_headers.rent_to_be_paid_house" maxLength={10} unit={'円'} />
                      ) : (
                        formatMoney(formik.values.p_application_headers.rent_to_be_paid_house, '円')
                      )
                    }
                  />
                </Stack>
              )}

              {formik.values.p_borrowings.length < 8 && (
                <Stack sx={{ py: 4 }}>
                  <AdPrimaryButton
                    width={120}
                    startIcon={<Icons.AdNewApply sx={{ width: 14, height: 16 }} />}
                    onClick={() => {
                      arrayHelpers.push({
                        id: '',
                        borrower: '',
                        type: '',
                        lender: '',
                        borrowing_from_house_finance_agency: '',
                        loan_start_date: '',
                        loan_amount: '',
                        curr_loan_balance_amount: '',
                        annual_repayment_amount: '',
                        loan_end_date: '',
                        scheduled_loan_payoff: '',
                        scheduled_loan_payoff_date: '',
                        loan_business_target: '',
                        loan_business_target_other: '',
                        loan_purpose: '',
                        loan_purpose_other: '',
                        category: '',
                        card_expiry_date: '',
                        rental_room_num: '',
                        common_housing: '',
                        estate_setting: '',
                        include_in_examination: '',
                      });
                    }}
                  >
                    新規作成
                  </AdPrimaryButton>
                </Stack>
              )}
            </Fragment>
          )}
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
