import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { formatMoney } from '@/utils';
import { useEffect } from 'react';
import { AdNumericInput } from '@/components/administrator';
import { diffObj } from '@/utils';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab07Schema } from '../../fullSchema';

export const Item07 = () => {
  const {
    preliminaryInfo: { p_application_headers },
    setPreliminarySnap,
    handleSave,
  } = usePreliminaryContext();
  const isEditable = false;
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
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab07Schema,
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
    if (
      formik.values.p_application_headers.required_funds_land_amount ||
      formik.values.p_application_headers.required_funds_house_amount ||
      formik.values.p_application_headers.required_funds_accessory_amount ||
      formik.values.p_application_headers.required_funds_upgrade_amount ||
      formik.values.p_application_headers.required_funds_refinance_loan_balance ||
      formik.values.p_application_headers.required_funds_additional_amount ||
      formik.values.p_application_headers.required_funds_loan_plus_amount ||
      formik.values.p_application_headers.funding_other_loan_amount
    ) {
      formik.setFieldValue(
        'p_application_headers.required_funds_total_amount',
        `${
          Number(formik.values.p_application_headers.required_funds_land_amount) +
          Number(formik.values.p_application_headers.required_funds_house_amount) +
          Number(formik.values.p_application_headers.required_funds_accessory_amount) +
          Number(formik.values.p_application_headers.required_funds_upgrade_amount) +
          Number(formik.values.p_application_headers.required_funds_refinance_loan_balance) +
          Number(formik.values.p_application_headers.required_funds_additional_amount) +
          Number(formik.values.p_application_headers.required_funds_loan_plus_amount) +
          Number(formik.values.p_application_headers.funding_other_loan_amount)
        }`
      );
    } else {
      formik.setFieldValue('p_application_headers.required_funds_total_amount', '');
    }
  }, [
    formik.values.p_application_headers.required_funds_land_amount,
    formik.values.p_application_headers.required_funds_house_amount,
    formik.values.p_application_headers.required_funds_accessory_amount,
    formik.values.p_application_headers.required_funds_upgrade_amount,
    formik.values.p_application_headers.required_funds_refinance_loan_balance,
    formik.values.p_application_headers.required_funds_additional_amount,
    formik.values.p_application_headers.required_funds_loan_plus_amount,
    formik.values.p_application_headers.funding_other_loan_amount,
  ]);

  useEffect(() => {
    if (
      formik.values.p_application_headers.funding_saving_amount ||
      formik.values.p_application_headers.funding_estate_sale_amount ||
      formik.values.p_application_headers.funding_other_saving_amount
    ) {
      formik.setFieldValue(
        'p_application_headers.funding_self_amount',
        `${
          Number(formik.values.p_application_headers.funding_saving_amount) +
          Number(formik.values.p_application_headers.funding_estate_sale_amount) +
          Number(formik.values.p_application_headers.funding_other_saving_amount)
        }`
      );
    } else {
      formik.setFieldValue('p_application_headers.funding_self_amount', '');
    }
  }, [
    formik.values.p_application_headers.funding_saving_amount,
    formik.values.p_application_headers.funding_estate_sale_amount,
    formik.values.p_application_headers.funding_other_saving_amount,
  ]);

  useEffect(() => {
    if (
      formik.values.p_application_headers.funding_saving_amount ||
      formik.values.p_application_headers.funding_estate_sale_amount ||
      formik.values.p_application_headers.funding_other_saving_amount ||
      formik.values.p_application_headers.funding_relative_donation_amount ||
      formik.values.p_application_headers.funding_loan_amount ||
      formik.values.p_application_headers.funding_pair_loan_amount ||
      formik.values.p_application_headers.funding_other_amount
    ) {
      formik.setFieldValue(
        'p_application_headers.funding_total_amount',
        `${
          Number(formik.values.p_application_headers.funding_saving_amount) +
          Number(formik.values.p_application_headers.funding_estate_sale_amount) +
          Number(formik.values.p_application_headers.funding_other_saving_amount) +
          Number(formik.values.p_application_headers.funding_relative_donation_amount) +
          Number(formik.values.p_application_headers.funding_loan_amount) +
          Number(formik.values.p_application_headers.funding_pair_loan_amount) +
          Number(formik.values.p_application_headers.funding_other_amount)
        }`
      );
    } else {
      formik.setFieldValue('p_application_headers.funding_total_amount', '');
    }
  }, [
    formik.values.p_application_headers.funding_saving_amount,
    formik.values.p_application_headers.funding_estate_sale_amount,
    formik.values.p_application_headers.funding_other_saving_amount,
    formik.values.p_application_headers.funding_relative_donation_amount,
    formik.values.p_application_headers.funding_loan_amount,
    formik.values.p_application_headers.funding_pair_loan_amount,
    formik.values.p_application_headers.funding_other_amount,
  ]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={() => handleSave(setUpdateData(formik.values))}>
        {p_application_headers.loan_target === '6' && (
          <EditRow
            label={'土地'}
            field={
              isEditable ? (
                <AdNumericInput name="p_application_headers.required_funds_land_amount" maxLength={6} unit={'万円'} />
              ) : (
                formatMoney(formik.values.p_application_headers.required_funds_land_amount)
              )
            }
            error={formik.errors?.p_application_headers?.required_funds_land_amount}
          />
        )}
        {['1', '2', '3', '4', '5', '6'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'物件価格／マンション価格'}
            field={
              isEditable ? (
                <AdNumericInput name="p_application_headers.required_funds_house_amount" maxLength={6} unit={'万円'} />
              ) : (
                formatMoney(formik.values.p_application_headers.required_funds_house_amount)
              )
            }
            error={formik.errors?.p_application_headers?.required_funds_house_amount}
          />
        )}
        {['5', '6'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'付帯設備'}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_accessory_amount"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatMoney(formik.values.p_application_headers.required_funds_accessory_amount)
              )
            }
            error={formik.errors?.p_application_headers?.required_funds_accessory_amount}
          />
        )}
        {p_application_headers.loan_target === '8' && (
          <EditRow
            label={'増改築費'}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_upgrade_amount"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatMoney(formik.values.p_application_headers.required_funds_upgrade_amount)
              )
            }
            error={formik.errors?.p_application_headers?.required_funds_upgrade_amount}
          />
        )}
        {['7', '8'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'借換対象ローン残債'}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_refinance_loan_balance"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatMoney(formik.values.p_application_headers.required_funds_refinance_loan_balance)
              )
            }
            error={formik.errors?.p_application_headers?.required_funds_refinance_loan_balance}
          />
        )}
        <EditRow
          label={'諸費用等'}
          isRequired
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.required_funds_additional_amount"
                maxLength={6}
                unit={'万円'}
              />
            ) : (
              formatMoney(formik.values.p_application_headers.required_funds_additional_amount)
            )
          }
          error={formik.errors?.p_application_headers?.required_funds_additional_amount}
        />
        {p_application_headers.loan_plus === '1' && (
          <EditRow
            label={'住宅ローンプラス利用'}
            field={
              isEditable ? (
                <AdNumericInput
                  name="p_application_headers.required_funds_loan_plus_amount"
                  maxLength={6}
                  unit={'万円'}
                />
              ) : (
                formatMoney(formik.values.p_application_headers.required_funds_loan_plus_amount)
              )
            }
            error={formik.errors?.p_application_headers?.required_funds_loan_plus_amount}
          />
        )}
        <EditRow
          label={'土地価格'}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_land_price" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.property_land_price)
            )
          }
          error={formik.errors?.p_application_headers?.property_land_price}
        />
        <EditRow
          label={'建物価格'}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_building_price" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.property_building_price)
            )
          }
          error={formik.errors?.p_application_headers?.property_building_price}
        />
        <EditRow
          label={'合計価格'}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_total_price" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.property_total_price)
            )
          }
          error={formik.errors?.p_application_headers?.property_total_price}
        />

        <EditRow
          label={'必要資金　合計'}
          field={formatMoney(formik.values.p_application_headers.required_funds_total_amount)}
          error={formik.errors?.p_application_headers?.required_funds_total_amount}
        />

        <EditRow
          label={'預貯金'}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_saving_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_saving_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_saving_amount}
        />
        <EditRow
          label={'不動産売却代金'}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_estate_sale_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_estate_sale_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_estate_sale_amount}
        />
        <EditRow
          label={'有価証券売却など'}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_saving_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_other_saving_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_other_saving_amount}
        />

        <EditRow
          label={'自己資金'}
          isRequired
          isAddendum
          field={formatMoney(formik.values.p_application_headers.funding_self_amount)}
          error={formik.errors?.p_application_headers?.funding_self_amount}
        />
        <EditRow
          label={'その他の借り入れ'}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_loan_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_other_loan_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_other_loan_amount}
        />
        <EditRow
          label={'親族からの贈与'}
          isRequired
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.funding_relative_donation_amount"
                maxLength={6}
                unit={'万円'}
              />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_relative_donation_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_relative_donation_amount}
        />
        <EditRow
          label={'本件ローン'}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_loan_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_loan_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_loan_amount}
        />
        {p_application_headers.loan_type === '2' && (
          <EditRow
            label={'ペアローン'}
            field={
              isEditable ? (
                <AdNumericInput name="p_application_headers.funding_pair_loan_amount" maxLength={6} unit={'万円'} />
              ) : (
                formatMoney(formik.values.p_application_headers.funding_pair_loan_amount)
              )
            }
            error={formik.errors?.p_application_headers?.funding_pair_loan_amount}
          />
        )}
        <EditRow
          label={'その他'}
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_other_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_other_amount}
        />
        <EditRow
          label={'その他（借換）'}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.funding_other_refinance_amount" maxLength={6} unit={'万円'} />
            ) : (
              formatMoney(formik.values.p_application_headers.funding_other_refinance_amount)
            )
          }
          error={formik.errors?.p_application_headers?.funding_other_refinance_amount}
        />
        <EditRow
          label={'調達資金　合計'}
          field={formatMoney(formik.values.p_application_headers.funding_total_amount)}
          error={formik.errors?.p_application_headers?.funding_total_amount}
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
