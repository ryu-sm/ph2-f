import { Stack } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';

import { Fragment, useEffect } from 'react';
import { AdEditInput, AdNumericInput, AdSelectCheckbox, AdSelectRadios, MonthPicker } from '@/components/administrator';
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
      },
      p_borrowings: values.p_borrowings,
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab06Schema,
    validateOnMount: true,
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

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);
  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={() => handleSave(setUpdateData(formik.values))}>
        <EditRow
          label={'あなたや連帯保証人予定者に、現在お借入はありますか？'}
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
          error={formik.errors?.p_application_headers?.curr_borrowing_status}
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
                      field={
                        isEditable ? (
                          <AdSelectRadios name={`p_borrowings[${index}].borrower`} options={borrowerOptions} />
                        ) : (
                          borrowerOptions.find((item) => item.value === item.borrower)?.label
                        )
                      }
                      error={
                        formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.borrower
                      }
                    />
                  )}
                  <EditRow
                    label={'お借入の種類は？'}
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
                    error={formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.type}
                  />

                  <EditRow
                    label={'借入先（金融機関）'}
                    field={
                      isEditable ? <AdEditInput name={`p_borrowings[${index}].lender`} convertFullWidth /> : item.lender
                    }
                    error={formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.lender}
                  />
                  {formik.values.p_borrowings[index].type === '2' && (
                    <Stack>
                      <EditRow
                        label={'お借入の目的'}
                        field={
                          isEditable ? (
                            <AdSelectRadios name={`p_borrowings[${index}].loan_purpose`} options={loanPurposeOptions} />
                          ) : (
                            loanPurposeOptions.find((item) => item.value === item.loan_purpose)?.label
                          )
                        }
                        error={
                          formik.errors?.p_borrowings?.length > index &&
                          formik.errors?.p_borrowings[index]?.loan_purpose
                        }
                      />
                      {formik.values.p_borrowings[index].loan_purpose === '99' && (
                        <EditRow
                          label={'お借入の目的（その他）'}
                          field={
                            isEditable ? (
                              <AdEditInput name={`p_borrowings[${index}].loan_purpose_other`} convertFullWidth />
                            ) : (
                              item.loan_purpose_other
                            )
                          }
                          error={
                            formik.errors?.p_borrowings?.length > index &&
                            formik.errors?.p_borrowings[index]?.loan_purpose_other
                          }
                        />
                      )}
                    </Stack>
                  )}

                  {formik.values.p_borrowings[index].type === '4' && (
                    <Stack>
                      <EditRow
                        label={'お借入の目的'}
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
                        error={
                          formik.errors?.p_borrowings?.length > index &&
                          formik.errors?.p_borrowings[index]?.loan_business_target
                        }
                      />
                      {formik.values.p_borrowings[index].loan_business_target === '99' && (
                        <EditRow
                          label={'お借入の目的（その他）'}
                          field={
                            isEditable ? (
                              <AdEditInput
                                name={`p_borrowings[${index}].loan_business_target_other`}
                                convertFullWidth
                              />
                            ) : (
                              item.loan_business_target_other
                            )
                          }
                          error={
                            formik.errors?.p_borrowings?.length > index &&
                            formik.errors?.p_borrowings[index]?.loan_business_target_other
                          }
                        />
                      )}
                    </Stack>
                  )}
                  <EditRow
                    label={'住宅金融支援機構からの借入'}
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
                    error={
                      formik.errors?.p_borrowings?.length > index &&
                      formik.errors?.p_borrowings[index]?.borrowing_from_house_finance_agency
                    }
                  />
                  <EditRow
                    label={'借入区分'}
                    field={
                      isEditable ? (
                        <AdSelectRadios name={`p_borrowings[${index}].category`} options={categoryOptions} />
                      ) : (
                        categoryOptions.find((item) => item.value === item.category)?.label
                      )
                    }
                    error={formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.category}
                  />
                  <EditRow
                    label={formik.values.p_borrowings[index].type === '2' ? '当初カード契約年月' : '当初借入年月'}
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
                    error={
                      formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.loan_start_date
                    }
                    isLogicRequired
                  />
                  <EditRow
                    label={formik.values.p_borrowings[index].type === '2' ? '借入限度額' : '当初借入額'}
                    isLogicRequired
                    field={
                      isEditable ? (
                        <AdNumericInput name={`p_borrowings[${index}].loan_amount`} unit={'万円'} />
                      ) : (
                        formatMoney(item.loan_amount)
                      )
                    }
                    error={
                      formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.loan_amount
                    }
                  />
                  <EditRow
                    label={'現在の残高'}
                    field={
                      isEditable ? (
                        <AdNumericInput name={`p_borrowings[${index}].curr_loan_balance_amount`} unit={'万円'} />
                      ) : (
                        formatMoney(item.curr_loan_balance_amount)
                      )
                    }
                    error={
                      formik.errors?.p_borrowings?.length > index &&
                      formik.errors?.p_borrowings[index]?.curr_loan_balance_amount
                    }
                  />
                  <EditRow
                    label={'年間返済額'}
                    field={
                      isEditable ? (
                        <AdNumericInput name={`p_borrowings[${index}].annual_repayment_amount`} unit={'万円'} />
                      ) : (
                        formatMoney(item.annual_repayment_amount)
                      )
                    }
                    error={
                      formik.errors?.p_borrowings?.length > index &&
                      formik.errors?.p_borrowings[index]?.annual_repayment_amount
                    }
                  />
                  {formik.values.p_borrowings[index].type === '2' ? (
                    <EditRow
                      label={'カード有効期限'}
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
                      error={
                        formik.errors?.p_borrowings?.length > index &&
                        formik.errors?.p_borrowings[index]?.card_expiry_date
                      }
                    />
                  ) : (
                    <EditRow
                      label={'契約期限、最終期限／最終返済年月'}
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
                      error={
                        formik.errors?.p_borrowings?.length > index && formik.errors?.p_borrowings[index]?.loan_end_date
                      }
                    />
                  )}
                  {formik.values.p_borrowings[index].type === '3' && (
                    <Stack>
                      <EditRow
                        label={'賃貸戸（室）数'}
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
                        error={
                          formik.errors?.p_borrowings?.length > index &&
                          formik.errors?.p_borrowings[index]?.rental_room_num
                        }
                      />
                      <EditRow
                        label={'共同住宅'}
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
                        error={
                          formik.errors?.p_borrowings?.length > index &&
                          formik.errors?.p_borrowings[index]?.common_housing
                        }
                      />
                    </Stack>
                  )}
                  {!['1', '2'].includes(formik.values.p_borrowings[index].type) && (
                    <EditRow
                      label={'不動産担保設定'}
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
                      error={
                        formik.errors?.p_borrowings?.length > index &&
                        formik.errors?.p_borrowings[index]?.estate_setting
                      }
                    />
                  )}
                  {formik.values.p_borrowings[index].type !== '4' && (
                    <Stack>
                      <EditRow
                        label={'今回のお借入までに完済の予定はありますか？'}
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
                        error={
                          formik.errors?.p_borrowings?.length > index &&
                          formik.errors?.p_borrowings[index]?.scheduled_loan_payoff
                        }
                      />
                      {formik.values.p_borrowings[index].scheduled_loan_payoff === '1' && (
                        <EditRow
                          label={'完済（予定）年月'}
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
                          error={
                            formik.errors?.p_borrowings?.length > index &&
                            formik.errors?.p_borrowings[index]?.scheduled_loan_payoff_date
                          }
                        />
                      )}
                    </Stack>
                  )}

                  <EditRow
                    label={'審査に含める/含めない'}
                    isAddendum
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
                    error={
                      formik.errors?.p_borrowings?.length > index &&
                      formik.errors?.p_borrowings[index]?.include_in_examination
                    }
                  />
                </ContentEditGroup>
              ))}

              {isMCJ && formik.values.p_borrowings.some((item) => item?.scheduled_loan_payoff === '1') && (
                <Stack>
                  <EditRow
                    label={'完済原資の種類'}
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
                    error={formik.errors?.p_application_headers?.refund_source_type}
                  />
                  <EditRow
                    label={'完済原資の内容'}
                    field={
                      isEditable ? (
                        <AdEditInput name="p_application_headers.refund_source_content" convertFullWidth />
                      ) : (
                        formik.values.p_application_headers.refund_source_content
                      )
                    }
                    error={formik.errors?.p_application_headers?.refund_source_content}
                  />
                  <EditRow
                    label={'完済原資の金額'}
                    field={
                      isEditable ? (
                        <AdNumericInput name="p_application_headers.refund_source_amount" maxLength={6} unit={'万円'} />
                      ) : (
                        formatMoney(formik.values.p_application_headers.refund_source_amount)
                      )
                    }
                    error={formik.errors?.p_application_headers?.refund_source_amount}
                  />
                  <EditRow
                    label={'今回の住宅取得後も継続する支払地代'}
                    field={
                      isEditable ? (
                        <AdNumericInput name="p_application_headers.rent_to_be_paid_land" maxLength={10} unit={'円'} />
                      ) : (
                        formatMoney(formik.values.p_application_headers.rent_to_be_paid_land, '円')
                      )
                    }
                    error={formik.errors?.p_application_headers?.rent_to_be_paid_land}
                  />
                  <EditRow
                    label={'今回の住宅取得後も継続する支払家賃'}
                    field={
                      isEditable ? (
                        <AdNumericInput name="p_application_headers.rent_to_be_paid_house" maxLength={10} unit={'円'} />
                      ) : (
                        formatMoney(formik.values.p_application_headers.rent_to_be_paid_house, '円')
                      )
                    }
                    error={formik.errors?.p_application_headers?.rent_to_be_paid_house}
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
