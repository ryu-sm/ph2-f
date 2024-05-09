import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { formatNumber } from '@/utils';
import { useEffect } from 'react';
import { AdEditFullWidthInput, AdNumericInput } from '@/components/administrator';
import { diffObj } from '@/utils';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab07Schema } from '../../fullSchema';
import { useIsManager } from '@/hooks';

export const Item07 = () => {
  const {
    preliminaryInfo: { p_application_headers },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const isManager = useIsManager();

  const initialValues = {
    p_application_headers: {
      required_funds_land_amount: p_application_headers?.required_funds_land_amount,
      required_funds_house_amount: p_application_headers?.required_funds_house_amount,
      required_funds_accessory_amount: p_application_headers?.required_funds_accessory_amount,
      required_funds_additional_amount: p_application_headers?.required_funds_additional_amount,
      required_funds_refinance_loan_balance: p_application_headers?.required_funds_refinance_loan_balance,
      required_funds_upgrade_amount: p_application_headers?.required_funds_upgrade_amount,
      required_funds_loan_plus_amount: p_application_headers?.required_funds_loan_plus_amount,
      required_funds_total_amount: p_application_headers?.required_funds_total_amount,
      funding_saving_amount: p_application_headers?.funding_saving_amount,
      funding_estate_sale_amount: p_application_headers?.funding_estate_sale_amount,
      funding_other_saving_amount: p_application_headers?.funding_other_saving_amount,
      funding_relative_donation_amount: p_application_headers?.funding_relative_donation_amount,
      funding_loan_amount: p_application_headers?.funding_loan_amount,
      funding_pair_loan_amount: p_application_headers?.funding_pair_loan_amount,
      funding_other_amount: p_application_headers?.funding_other_amount,
      funding_other_amount_detail: p_application_headers?.funding_other_amount_detail,
      funding_total_amount: p_application_headers?.funding_total_amount,
      funding_self_amount: p_application_headers?.funding_self_amount,
      property_building_price: p_application_headers?.property_building_price,
      property_land_price: p_application_headers?.property_land_price,
      property_total_price: p_application_headers?.property_total_price,
      funding_other_refinance_amount: p_application_headers?.funding_other_refinance_amount,
      funding_other_loan_amount: p_application_headers?.funding_other_loan_amount,
    },
  };
  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
        join_guarantor_umu: p_application_headers.join_guarantor_umu,
        land_advance_plan: p_application_headers.land_advance_plan,
        loan_type: p_application_headers.loan_type,
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab07Schema,
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
      };
    });
  }, [formik.values]);

  useEffect(() => {
    const tempRequiredFundsTotalAmount =
      Number(formik.values.p_application_headers.required_funds_land_amount) +
      Number(formik.values.p_application_headers.required_funds_house_amount) +
      Number(formik.values.p_application_headers.required_funds_accessory_amount) +
      Number(formik.values.p_application_headers.required_funds_upgrade_amount) +
      Number(formik.values.p_application_headers.required_funds_refinance_loan_balance) +
      Number(formik.values.p_application_headers.required_funds_additional_amount) +
      Number(formik.values.p_application_headers.required_funds_loan_plus_amount);
    formik.setFieldValue('p_application_headers.required_funds_total_amount', `${tempRequiredFundsTotalAmount}`);
  }, [
    formik.values.p_application_headers.required_funds_land_amount,
    formik.values.p_application_headers.required_funds_house_amount,
    formik.values.p_application_headers.required_funds_accessory_amount,
    formik.values.p_application_headers.required_funds_upgrade_amount,
    formik.values.p_application_headers.required_funds_refinance_loan_balance,
    formik.values.p_application_headers.required_funds_additional_amount,
    formik.values.p_application_headers.required_funds_loan_plus_amount,
  ]);

  useEffect(() => {
    const tempFundingSelfAmount =
      Number(formik.values.p_application_headers.funding_saving_amount) +
      Number(formik.values.p_application_headers.funding_estate_sale_amount) +
      Number(formik.values.p_application_headers.funding_other_saving_amount);
    formik.setFieldValue('p_application_headers.funding_self_amount', `${tempFundingSelfAmount}`);
  }, [
    formik.values.p_application_headers.funding_saving_amount,
    formik.values.p_application_headers.funding_estate_sale_amount,
    formik.values.p_application_headers.funding_other_saving_amount,
  ]);

  useEffect(() => {
    const fundingTotalAmountt =
      Number(formik.values.p_application_headers.funding_saving_amount) +
      Number(formik.values.p_application_headers.funding_estate_sale_amount) +
      Number(formik.values.p_application_headers.funding_other_saving_amount) +
      Number(formik.values.p_application_headers.funding_relative_donation_amount) +
      Number(formik.values.p_application_headers.funding_loan_amount) +
      Number(formik.values.p_application_headers.funding_pair_loan_amount) +
      Number(formik.values.p_application_headers.funding_other_loan_amount) +
      Number(formik.values.p_application_headers.funding_other_refinance_amount) +
      Number(formik.values.p_application_headers.funding_other_amount);
    formik.setFieldValue('p_application_headers.funding_total_amount', `${fundingTotalAmountt}`);
  }, [
    formik.values.p_application_headers.funding_saving_amount,
    formik.values.p_application_headers.funding_estate_sale_amount,
    formik.values.p_application_headers.funding_other_saving_amount,
    formik.values.p_application_headers.funding_relative_donation_amount,
    formik.values.p_application_headers.funding_loan_amount,
    formik.values.p_application_headers.funding_pair_loan_amount,
    formik.values.p_application_headers.funding_other_loan_amount,
    formik.values.p_application_headers.funding_other_refinance_amount,
    formik.values.p_application_headers.funding_other_amount,
  ]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        {p_application_headers.loan_target === '6' && (
          <EditRow
            label={'土地'}
            upConfig={{
              key: `p_application_headers.required_funds_land_amount.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput name="p_application_headers.required_funds_land_amount" maxLength={6} unit={'万円'} />
              ) : (
                formatNumber(formik.values.p_application_headers.required_funds_land_amount)
              )
            }
          />
        )}
        {['1', '2', '3', '4', '5', '6'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'物件価格／マンション価格'}
            upConfig={{
              key: `p_application_headers.required_funds_house_amount.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput name="p_application_headers.required_funds_house_amount" maxLength={6} unit={'万円'} />
              ) : (
                formatNumber(formik.values.p_application_headers.required_funds_house_amount)
              )
            }
          />
        )}
        {['5', '6'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'付帯設備'}
            upConfig={{
              key: `p_application_headers.required_funds_accessory_amount.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_accessory_amount"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatNumber(formik.values.p_application_headers.required_funds_accessory_amount)
              )
            }
          />
        )}
        {p_application_headers.loan_target === '8' && (
          <EditRow
            label={'増改築費'}
            upConfig={{
              key: `p_application_headers.required_funds_upgrade_amount.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_upgrade_amount"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatNumber(formik.values.p_application_headers.required_funds_upgrade_amount)
              )
            }
          />
        )}
        {['7', '8'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'借換対象ローン残債'}
            upConfig={{
              key: `p_application_headers.required_funds_refinance_loan_balance.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_refinance_loan_balance"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatNumber(formik.values.p_application_headers.required_funds_refinance_loan_balance)
              )
            }
          />
        )}
        <EditRow
          label={'諸費用等'}
          upConfig={{
            key: `p_application_headers.required_funds_additional_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isRequired
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.required_funds_additional_amount"
                maxLength={6}
                unit={'万円'}
              />
            ) : (
              formatNumber(formik.values.p_application_headers.required_funds_additional_amount)
            )
          }
        />
        {p_application_headers.loan_plus === '1' && (
          <EditRow
            label={'住宅ローンプラス利用'}
            upConfig={{
              key: `p_application_headers.required_funds_loan_plus_amount.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_loan_plus_amount"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatNumber(formik.values.p_application_headers.required_funds_loan_plus_amount)
              )
            }
          />
        )}
        <EditRow
          label={'土地価格'}
          upConfig={{
            key: `p_application_headers.property_land_price.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_land_price" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.property_land_price)
            )
          }
        />
        <EditRow
          label={'建物価格'}
          upConfig={{
            key: `p_application_headers.property_building_price.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_building_price" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.property_building_price)
            )
          }
        />
        <EditRow
          label={'合計価格'}
          upConfig={{
            key: `p_application_headers.property_total_price.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_total_price" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.property_total_price)
            )
          }
        />

        <EditRow
          label={'必要資金　合計'}
          upConfig={{
            key: `p_application_headers.required_funds_total_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={formatNumber(formik.values.p_application_headers.required_funds_total_amount)}
        />

        <EditRow
          label={'預貯金'}
          upConfig={{
            key: `p_application_headers.funding_saving_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_saving_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_saving_amount)
            )
          }
        />
        <EditRow
          label={'不動産売却代金'}
          upConfig={{
            key: `p_application_headers.funding_estate_sale_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_estate_sale_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_estate_sale_amount)
            )
          }
        />
        <EditRow
          label={'有価証券売却など'}
          upConfig={{
            key: `p_application_headers.funding_other_saving_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_saving_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_other_saving_amount)
            )
          }
        />

        <EditRow
          label={'自己資金'}
          upConfig={{
            key: `p_application_headers.funding_self_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isRequired
          isAddendum={isManager}
          field={formatNumber(formik.values.p_application_headers.funding_self_amount)}
        />
        <EditRow
          label={'その他の借り入れ'}
          upConfig={{
            key: `p_application_headers.funding_other_loan_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isRequired
          isAddendum={isManager}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_loan_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_other_loan_amount)
            )
          }
        />
        <EditRow
          label={'親族からの贈与'}
          upConfig={{
            key: `p_application_headers.funding_relative_donation_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isRequired
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.funding_relative_donation_amount"
                maxLength={6}
                unit={'万円'}
              />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_relative_donation_amount)
            )
          }
        />
        <EditRow
          label={'本件ローン'}
          upConfig={{
            key: `p_application_headers.funding_loan_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_loan_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_loan_amount)
            )
          }
        />
        {p_application_headers.loan_type === '2' && (
          <EditRow
            label={'ペアローン'}
            upConfig={{
              key: `p_application_headers.funding_pair_loan_amount.${p_application_headers?.id}`,
              formatNumber: true,
              unit: '万円',
            }}
            field={
              isEditable ? (
                <AdNumericInput name="p_application_headers.funding_pair_loan_amount" maxLength={6} unit={'万円'} />
              ) : (
                formatNumber(formik.values.p_application_headers.funding_pair_loan_amount)
              )
            }
          />
        )}
        <EditRow
          label={'その他'}
          upConfig={{
            key: `p_application_headers.funding_other_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.funding_other_amount"
                maxLength={6}
                unit={'万円'}
                onChange={() => {
                  formik.setFieldTouched('p_application_headers.funding_other_amount_detail', true);
                }}
              />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_other_amount)
            )
          }
        />

        {Number(formik.values.p_application_headers.funding_other_amount) > 0 && (
          <EditRow
            label={'※詳細を入力ください。'}
            isLogicRequired
            field={
              isEditable ? (
                <AdEditFullWidthInput name="p_application_headers.funding_other_amount_detail" convertFullWidth />
              ) : (
                formik.values.p_application_headers.funding_other_amount_detail
              )
            }
          />
        )}

        <EditRow
          label={'その他（借換）'}
          upConfig={{
            key: `p_application_headers.funding_other_refinance_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_refinance_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_application_headers.funding_other_refinance_amount)
            )
          }
        />
        <EditRow
          label={'調達資金　合計'}
          upConfig={{
            key: `p_application_headers.funding_total_amount.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={formatNumber(formik.values.p_application_headers.funding_total_amount)}
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
