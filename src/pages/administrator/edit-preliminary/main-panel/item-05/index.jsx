import { Stack } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FieldArray, FormikProvider, useFormik } from 'formik';

import { formatJapanDate, formatMoney } from '@/utils';
import { useEffect, useMemo } from 'react';
import {
  AdAreaInput,
  AdEditFullWidthInput,
  AdEditInput,
  AdEditOutLineInput,
  AdNumericInput,
  AdSelectCheckbox,
  AdSelectRadios,
  AdZipCodeInput,
  DayPicker,
  MonthPicker,
} from '@/components/administrator';
import {
  currHouseLoanBalanceTypeOptions,
  currHouseResidenceTypeOptions,
  currHouseScheduleDisposalTypeOptions,
  currHouseShellScheduledDateOptions,
  genderOptions,
  loanFromJapanHouseFinanceAgencyOptions,
  nationalityOptions,
  newHouseAcquireReasonOptions,
  newHouseSelfResidentOptions,
  oneRoofOptions,
  propertyBusinessTypeOptions,
  propertyFlat35PlanOptions,
  propertyFlat35TechOptions,
  propertyJointOwnershipTypeOptions,
  propertyLandTypeOptions,
  propertyMaintenanceTypeOptions,
  propertyPlanningAreaOptions,
  propertyPurchaseTypeOptions,
  propertyRebuildingReasonOptions,
  propertyRegionTypeOptions,
  propertyTypeOptions,
  relToApplicantAOptions,
} from './options';
import dayjs from 'dayjs';
import { diffObj } from '@/utils';
import { PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { PlannedResidentSelect } from './planned-resident-select';
import { tab05Schema } from '../../fullSchema';

export const Item05 = () => {
  const {
    preliminaryInfo: { p_application_headers, p_applicant_persons__0, p_residents },
    preliminarySnap: { isMCJ },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_application_headers: {
      curr_house_lived_year: p_application_headers?.curr_house_lived_year,
      curr_house_lived_month: p_application_headers?.curr_house_lived_month,
      curr_house_residence_type: p_application_headers?.curr_house_residence_type,
      curr_house_floor_area: p_application_headers?.curr_house_floor_area,
      curr_house_owner_name: p_application_headers?.curr_house_owner_name,
      curr_house_owner_rel: p_application_headers?.curr_house_owner_rel,
      curr_house_schedule_disposal_type: p_application_headers?.curr_house_schedule_disposal_type,
      curr_house_schedule_disposal_type_other: p_application_headers?.curr_house_schedule_disposal_type_other,
      curr_house_shell_scheduled_date: p_application_headers?.curr_house_shell_scheduled_date,
      curr_house_shell_scheduled_price: p_application_headers?.curr_house_shell_scheduled_price,
      curr_house_loan_balance_type: p_application_headers?.curr_house_loan_balance_type,
      property_publish_url: p_application_headers?.property_publish_url,
      new_house_acquire_reason: p_application_headers?.new_house_acquire_reason,
      new_house_acquire_reason_other: p_application_headers?.new_house_acquire_reason_other,
      new_house_self_resident: p_application_headers?.new_house_self_resident,
      new_house_self_not_resident_reason: p_application_headers?.new_house_self_not_resident_reason,
      new_house_planned_resident_overview: p_application_headers?.new_house_planned_resident_overview,
      property_business_type: p_application_headers?.property_business_type,
      property_prefecture: p_application_headers?.property_prefecture,
      property_postal_code: p_application_headers?.property_postal_code,
      property_city: p_application_headers?.property_city,
      property_district: p_application_headers?.property_district,
      property_apartment_and_room_no: p_application_headers?.property_apartment_and_room_no,
      property_address_kana: p_application_headers?.property_address_kana,
      property_private_area: p_application_headers?.property_private_area,
      property_total_floor_area: p_application_headers?.property_total_floor_area,
      property_land_area: p_application_headers?.property_land_area,
      property_floor_area: p_application_headers?.property_floor_area,
      property_land_type: p_application_headers?.property_land_type,
      property_type: p_application_headers?.property_type,
      property_land_acquire_date: p_application_headers?.property_land_acquire_date,
      property_joint_ownership_type: p_application_headers?.property_joint_ownership_type,
      property_building_ratio_numerator: p_application_headers?.property_building_ratio_numerator,
      property_building_ratio_denominator: p_application_headers?.property_building_ratio_denominator,
      property_land_ratio_numerator: p_application_headers?.property_land_ratio_numerator,
      property_land_ratio_denominator: p_application_headers?.property_land_ratio_denominator,
      property_purchase_type: p_application_headers?.property_purchase_type,
      property_planning_area: p_application_headers?.property_planning_area,
      property_planning_area_other: p_application_headers?.property_planning_area_other,
      property_rebuilding_reason: p_application_headers?.property_rebuilding_reason,
      property_rebuilding_reason_other: p_application_headers?.property_rebuilding_reason_other,
      property_flat_35_plan: p_application_headers?.property_flat_35_plan,
      property_maintenance_type: p_application_headers?.property_maintenance_type,
      property_flat_35_tech: p_application_headers?.property_flat_35_tech,
      property_region_type: p_application_headers?.property_region_type,
    },
    p_residents,
    isMCJ,
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
      },
      p_residents: values.p_residents,
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab05Schema,
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
        p_residents: formik.values.p_residents,
      };
    });
  }, [formik.values]);

  const age = useMemo(() => {
    const date = new Date(p_applicant_persons__0.birthday);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (dayjs().month() + 1 < month) {
      return dayjs().year() - year - 1;
    } else {
      return dayjs().year() - year;
    }
  }, [p_applicant_persons__0.birthday]);

  const yearNum = formik.values.p_application_headers.curr_house_lived_year;

  const birthdayMonth = useMemo(() => {
    const date = new Date(p_applicant_persons__0.birthday);
    const month = date.getMonth() + 1;
    if (+yearNum === age && dayjs().month() + 1 >= month) {
      return Math.abs(dayjs().month() + 1 - +month) + 1;
    }
    if (+yearNum === age && dayjs().month() + 1 < month) {
      return Math.abs(12 - +month + dayjs().month() + 1) + 1;
    }
    return 12;
  }, [age, p_applicant_persons__0.birthday, yearNum]);

  const yearNumOptions = useMemo(
    () =>
      Array.from(Array(age), (_, index) => {
        return {
          value: String(index + 1),
          label: (index + 1).toString(),
        };
      }),
    [age]
  );

  const monthOptions = useMemo(
    () =>
      Array.from(Array(birthdayMonth), (_, index) => ({
        value: String(index),
        label: index.toString(),
      })),
    [birthdayMonth]
  );

  const conter = useMemo(() => {
    const temp = formik.values.p_application_headers.new_house_planned_resident_overview;
    const conter = [];
    if (temp.spouse_umu) conter.push(`配偶者`);
    if (temp.children_umu) conter.push(`子ども（${temp.children}人）`);
    if (temp.father_umu) conter.push(`父`);
    if (temp.mother_umu) conter.push(`母`);
    if (temp.brothers_sisters_umu) conter.push(`兄弟姉妹（${temp.brothers_sisters}人）`);
    if (temp.fiance_umu) conter.push(`婚約者`);
    if (temp.others_umu) conter.push(`その他（${temp.others}人）`);

    if (!temp.others_umu) {
      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.others_rel', '');
    }

    return conter.join('・');
  }, [formik.values.p_application_headers.new_house_planned_resident_overview]);

  // useEffect(() => {
  //   const temp00 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a_name !== '');
  //   const temp01 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '1');
  //   const temp02 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '2');
  //   const temp03 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '3');
  //   const temp04 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '4');
  //   const temp05 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '5');
  //   const temp06 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '6');
  //   const temp99 = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '99');
  //   const tempNull = formik.values.p_residents.filter((item) => item?.rel_to_applicant_a === '');
  //   const temp = [...temp00, ...temp01, ...temp02, ...temp03, ...temp04, ...temp05, ...temp06, ...temp99, ...tempNull];
  //   formik.setFieldValue('p_residents', temp.slice(0, 6));
  // }, [formik.values.p_application_headers.new_house_planned_resident_overview]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'現在居住　居住年数（年）'}
          upConfig={{
            key: `p_application_headers.curr_house_lived_year.${p_application_headers?.id}`,
            formatNumber: true,
            unit: '年',
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.curr_house_lived_year'}
                options={yearNumOptions}
                unit={'年'}
              />
            ) : (
              yearNumOptions.find((item) => item.value === formik.values.p_application_headers.curr_house_lived_year)
                ?.label
            )
          }
        />
        <EditRow
          label={'現在居住　居住年数（ヶ月）'}
          upConfig={{
            key: `p_application_headers.curr_house_lived_month.${p_application_headers?.id}`,
            formatNumber: true,
            unit: 'ヶ月',
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.curr_house_lived_month'}
                options={monthOptions}
                unit={'ヶ月'}
              />
            ) : (
              monthOptions.find((item) => item.value === formik.values.p_application_headers.curr_house_lived_month)
                ?.label
            )
          }
        />
        <EditRow
          label={'現在のお住まいの種類'}
          upConfig={{
            key: `p_application_headers.curr_house_residence_type.${p_application_headers?.id}`,
            options: currHouseResidenceTypeOptions,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name={'p_application_headers.curr_house_residence_type'}
                options={currHouseResidenceTypeOptions}
                onChange={(value) => {
                  if (value !== '4') {
                    formik.setFieldValue('p_application_headers.curr_house_owner_name', '');
                    formik.setFieldValue('p_application_headers.curr_house_owner_rel', '');
                  }
                  if (value !== '5') {
                    formik.setFieldValue('p_application_headers.curr_house_schedule_disposal_type', '');
                    formik.setFieldValue('p_application_headers.curr_house_schedule_disposal_type_other', '');
                    formik.setFieldValue('p_application_headers.curr_house_shell_scheduled_date', '');
                    formik.setFieldValue('p_application_headers.curr_house_shell_scheduled_price', '');
                    formik.setFieldValue('p_application_headers.curr_house_loan_balance_type', '');
                  }
                }}
              />
            ) : (
              currHouseResidenceTypeOptions.find(
                (item) => item.value === formik.values.p_application_headers.curr_house_residence_type
              )?.label
            )
          }
        />
        {isMCJ && (
          <EditRow
            label={'現在のお住まいの床面積 (MCJ固有項目)'}
            upConfig={{
              key: `p_application_headers.curr_house_floor_area.${p_application_headers?.id}`,
              formatNumber: true,
              unit: 'm²',
            }}
            field={
              isEditable ? (
                <AdAreaInput name="p_application_headers.curr_house_floor_area" unit={'m²'} />
              ) : (
                formik.values.p_application_headers.curr_house_floor_area
              )
            }
          />
        )}
        {formik.values.p_application_headers.curr_house_residence_type === '4' && (
          <Stack>
            <EditRow
              label={'所有者の氏名'}
              upConfig={{
                key: `p_application_headers.curr_house_owner_name.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_application_headers.curr_house_owner_name" convertFullWidth />
                ) : (
                  formik.values.p_application_headers.curr_house_owner_name
                )
              }
            />
            <EditRow
              label={'続柄'}
              upConfig={{
                key: `p_application_headers.curr_house_owner_rel.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_application_headers.curr_house_owner_rel" convertFullWidth />
                ) : (
                  formik.values.p_application_headers.curr_house_owner_rel
                )
              }
            />
          </Stack>
        )}
        {formik.values.p_application_headers.curr_house_residence_type === '5' && (
          <Stack>
            <EditRow
              label={'持家　処分方法'}
              upConfig={{
                key: `p_application_headers.curr_house_schedule_disposal_type.${p_application_headers?.id}`,
                options: currHouseScheduleDisposalTypeOptions,
              }}
              isLogicRequired
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name={'p_application_headers.curr_house_schedule_disposal_type'}
                    options={currHouseScheduleDisposalTypeOptions}
                  />
                ) : (
                  currHouseScheduleDisposalTypeOptions.find(
                    (item) => item.value === formik.values.p_application_headers.curr_house_schedule_disposal_type
                  )?.label
                )
              }
            />
            {formik.values.p_application_headers.curr_house_schedule_disposal_type === '99' && (
              <EditRow
                label={'持家　処分方法（その他）'}
                upConfig={{
                  key: `p_application_headers.curr_house_schedule_disposal_type_other.${p_application_headers?.id}`,
                }}
                isLogicRequired
                field={
                  isEditable ? (
                    <AdEditFullWidthInput
                      name="p_application_headers.curr_house_schedule_disposal_type_other"
                      convertFullWidth
                    />
                  ) : (
                    formik.values.p_application_headers.curr_house_schedule_disposal_type_other
                  )
                }
              />
            )}

            {formik.values.p_application_headers.curr_house_schedule_disposal_type === '1' && (
              <Stack>
                <EditRow
                  label={'持家　売却予定価格'}
                  upConfig={{
                    key: `p_application_headers.curr_house_shell_scheduled_price.${p_application_headers?.id}`,
                    formatNumber: true,
                    unit: '万円',
                  }}
                  field={
                    isEditable ? (
                      <AdNumericInput name="p_application_headers.curr_house_shell_scheduled_price" unit={'万円'} />
                    ) : (
                      formatMoney(formik.values.p_application_headers.curr_house_shell_scheduled_price)
                    )
                  }
                />
                <EditRow
                  label={'持家　売却予定時期'}
                  upConfig={{
                    key: `p_application_headers.curr_house_shell_scheduled_date.${p_application_headers?.id}`,
                    formatJaDate: true,
                  }}
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <MonthPicker
                        name="p_application_headers.curr_house_shell_scheduled_date"
                        yearOptions={currHouseShellScheduledDateOptions}
                      />
                    ) : (
                      formatJapanDate(formik.values.p_application_headers.curr_house_shell_scheduled_date)
                    )
                  }
                />
                <EditRow
                  label={'持家　ローン残高'}
                  upConfig={{
                    key: `p_application_headers.curr_house_loan_balance_type.${p_application_headers?.id}`,
                    options: currHouseLoanBalanceTypeOptions,
                  }}
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <AdSelectRadios
                        name={'p_application_headers.curr_house_loan_balance_type'}
                        options={currHouseLoanBalanceTypeOptions}
                      />
                    ) : (
                      currHouseLoanBalanceTypeOptions.find(
                        (item) => item.value === formik.values.p_application_headers.curr_house_loan_balance_type
                      )?.label
                    )
                  }
                />
              </Stack>
            )}
          </Stack>
        )}

        <EditRow
          label={'物件情報が掲載されたURL'}
          upConfig={{
            key: `p_application_headers.property_publish_url.${p_application_headers?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_application_headers.property_publish_url" convertHalfWidth />
            ) : (
              formik.values.p_application_headers.property_publish_url
            )
          }
        />
        <EditRow
          label={'新しい住居を必要とする理由'}
          upConfig={{
            key: `p_application_headers.new_house_acquire_reason.${p_application_headers?.id}`,
            options: newHouseAcquireReasonOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_application_headers.new_house_acquire_reason"
                options={newHouseAcquireReasonOptions}
              />
            ) : (
              newHouseAcquireReasonOptions.find(
                (item) => item.value === formik.values.p_application_headers.new_house_acquire_reason
              )?.label
            )
          }
        />
        {formik.values.p_application_headers.new_house_acquire_reason === '99' && (
          <EditRow
            label={'新しい住居を必要とする理由（その他）'}
            upConfig={{
              key: `p_application_headers.new_house_acquire_reason_other.${p_application_headers?.id}`,
            }}
            hasPleft={isEditable}
            field={
              isEditable ? (
                <AdEditFullWidthInput name="p_application_headers.new_house_acquire_reason_other" convertFullWidth />
              ) : (
                formik.values.p_application_headers.new_house_acquire_reason_other
              )
            }
          />
        )}
        <EditRow
          label={'新しい住居に、あなたは居住しますか？'}
          upConfig={{
            key: `p_application_headers.new_house_self_resident.${p_application_headers?.id}`,
            options: newHouseSelfResidentOptions,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_application_headers.new_house_self_resident"
                options={newHouseSelfResidentOptions}
                onChange={(value) => {
                  if (value !== '0') {
                    formik.setFieldValue('p_application_headers.new_house_self_not_resident_reason', '');
                    formik.setFieldTouched('p_application_headers.new_house_self_not_resident_reason', false);
                    formik.setFieldValue('p_residents', []);
                  }
                }}
              />
            ) : (
              newHouseSelfResidentOptions.find(
                (item) => item.value === formik.values.p_application_headers.new_house_self_resident
              )?.label
            )
          }
        />
        {formik.values.p_application_headers.new_house_self_resident === '0' && (
          <EditRow
            label={'新しい住居に、居住しない理由'}
            upConfig={{
              key: `p_application_headers.new_house_self_not_resident_reason.${p_application_headers?.id}`,
            }}
            isLogicRequired
            field={
              isEditable ? (
                <AdEditFullWidthInput
                  name="p_application_headers.new_house_self_not_resident_reason"
                  convertFullWidth
                />
              ) : (
                formik.values.p_application_headers.new_house_self_not_resident_reason
              )
            }
          />
        )}

        <FieldArray
          name="p_residents"
          render={(arrayHelpers) => (
            <Stack>
              <EditRow
                label={'あなた以外の入居予定者'}
                hasPleft={isEditable}
                field={
                  isEditable ? (
                    <Stack direction={'row'}>
                      <PlannedResidentSelect
                        name="p_application_headers.new_house_planned_resident_overview"
                        arrayHelpers={arrayHelpers}
                      />
                      {formik.values.p_application_headers.new_house_planned_resident_overview.others_umu && (
                        <AdEditOutLineInput
                          name={`p_application_headers.new_house_planned_resident_overview.others_rel`}
                          width={120}
                          convertFullWidth
                        />
                      )}
                    </Stack>
                  ) : (
                    `${conter}　${formik.values.p_application_headers.new_house_planned_resident_overview.others_rel}`
                  )
                }
              />
              <Stack>
                {formik.values.p_residents.map((item, index) => (
                  <Stack key={index}>
                    <EditRow
                      label={`入居家族${index + 1} 現在申込人との同居有無`}
                      upConfig={{
                        key: `p_residents.one_roof.${item?.id}`,
                        options: oneRoofOptions,
                      }}
                      isAddendum
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <AdSelectRadios name={`p_residents[${index}].one_roof`} options={oneRoofOptions} />
                        ) : (
                          oneRoofOptions.find((op) => op.value === item.one_roof)?.label
                        )
                      }
                    />
                    <EditRow
                      label={`入居家族${index + 1} 姓　漢字`}
                      upConfig={{
                        key: `p_residents.last_name_kanji.${item?.id}`,
                      }}
                      isLogicRequired
                      isAddendum={!item?.rel_to_applicant_a_name}
                      field={
                        isEditable ? (
                          <AdEditFullWidthInput name={`p_residents[${index}].last_name_kanji`} convertFullWidth />
                        ) : (
                          item.last_name_kanji
                        )
                      }
                    />
                    <EditRow
                      label={`入居家族${index + 1} 名　漢字`}
                      upConfig={{
                        key: `p_residents.first_name_kanji.${item?.id}`,
                      }}
                      isLogicRequired
                      isAddendum={!item?.rel_to_applicant_a_name}
                      field={
                        isEditable ? (
                          <AdEditFullWidthInput name={`p_residents[${index}].first_name_kanji`} convertFullWidth />
                        ) : (
                          item.first_name_kanji
                        )
                      }
                    />
                    <EditRow
                      label={`入居家族${index + 1} 姓　カナ`}
                      upConfig={{
                        key: `p_residents.last_name_kana.${item?.id}`,
                      }}
                      isLogicRequired
                      isAddendum={!item?.rel_to_applicant_a_name}
                      field={
                        isEditable ? (
                          <AdEditFullWidthInput name={`p_residents[${index}].last_name_kana`} convertFullWidth />
                        ) : (
                          item.last_name_kana
                        )
                      }
                    />
                    <EditRow
                      label={`入居家族${index + 1} 名　カナ`}
                      upConfig={{
                        key: `p_residents.first_name_kana.${item?.id}`,
                      }}
                      isLogicRequired
                      isAddendum={!item?.rel_to_applicant_a_name}
                      field={
                        isEditable ? (
                          <AdEditFullWidthInput name={`p_residents[${index}].first_name_kana`} convertFullWidth />
                        ) : (
                          item.first_name_kana
                        )
                      }
                    />
                    <EditRow
                      label={`入居家族${index + 1} 性別`}
                      upConfig={{
                        key: `p_residents.gender.${item?.id}`,
                        options: genderOptions,
                      }}
                      isAddendum
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <AdSelectRadios name={`p_residents[${index}].gender`} options={genderOptions} />
                        ) : (
                          genderOptions.find((op) => op.value === item.gender)?.label
                        )
                      }
                    />
                    {item?.rel_to_applicant_a_name ? (
                      <EditRow
                        label={`入居家族${index + 1} 続柄`}
                        upConfig={{
                          key: `p_residents.rel_to_applicant_a_name.${item?.id}`,
                        }}
                        isLogicRequired
                        field={
                          isEditable ? (
                            <AdEditInput name={`p_residents[${index}].rel_to_applicant_a_name`} convertFullWidth />
                          ) : (
                            item.first_name_kana
                          )
                        }
                        subField={
                          isEditable ? (
                            <Stack direction={'row'}>
                              <AdSelectRadios
                                name={`p_residents[${index}].rel_to_applicant_a`}
                                options={relToApplicantAOptions}
                                onChange={(value) => {
                                  if (value !== '99') {
                                    formik.setFieldValue(`p_residents[${index}].rel_to_applicant_a_other`, '');
                                  }
                                }}
                              />
                              {item.rel_to_applicant_a === '99' && (
                                <AdEditOutLineInput
                                  name={`p_residents[${index}].rel_to_applicant_a_other`}
                                  convertFullWidth
                                />
                              )}
                            </Stack>
                          ) : (
                            `${relToApplicantAOptions.find((op) => op.value === item.rel_to_applicant_a)?.label}　${
                              item.rel_to_applicant_a === '99' ? `${item.rel_to_applicant_a_other}` : ''
                            }`
                          )
                        }
                      />
                    ) : (
                      <EditRow
                        label={`入居家族${index + 1} 続柄`}
                        upConfig={{
                          key: `p_residents.rel_to_applicant_a.${item?.id}`,
                        }}
                        isLogicRequired
                        hasPleft={isEditable}
                        field={
                          isEditable ? (
                            <Stack direction={'row'}>
                              <AdSelectRadios
                                name={`p_residents[${index}].rel_to_applicant_a`}
                                options={relToApplicantAOptions}
                                onChange={(value) => {
                                  if (value !== '99') {
                                    formik.setFieldValue(`p_residents[${index}].rel_to_applicant_a_other`, '');
                                  }
                                }}
                              />
                              {item.rel_to_applicant_a === '99' && (
                                <AdEditOutLineInput
                                  name={`p_residents[${index}].rel_to_applicant_a_other`}
                                  convertFullWidth
                                />
                              )}
                            </Stack>
                          ) : (
                            `${relToApplicantAOptions.find((op) => op.value === item.rel_to_applicant_a)?.label}　${
                              item.rel_to_applicant_a === '99' ? `${item.rel_to_applicant_a_other}` : ''
                            }`
                          )
                        }
                      />
                    )}

                    <EditRow
                      label={`入居家族${index + 1} 生年月日`}
                      upConfig={{
                        key: `p_residents.birthday.${item?.id}`,
                        formatJaDate: true,
                      }}
                      isAddendum={!item?.rel_to_applicant_a_name}
                      hasPleft={isEditable}
                      field={
                        isEditable ? (
                          <DayPicker name={`p_residents[${index}].birthday`} />
                        ) : (
                          formatJapanDate(item.birthday, true)
                        )
                      }
                    />

                    {isMCJ && item?.rel_to_applicant_a_name && (
                      <Stack>
                        <EditRow
                          label={`入居家族${index + 1} 住宅金融支援機構（旧：公庫）からの融資の有無`}
                          upConfig={{
                            key: `p_residents.loan_from_japan_house_finance_agency.${item?.id}`,
                            options: loanFromJapanHouseFinanceAgencyOptions,
                          }}
                          hasPleft={isEditable}
                          field={
                            isEditable ? (
                              <AdSelectRadios
                                name={`p_residents[${index}].loan_from_japan_house_finance_agency`}
                                options={loanFromJapanHouseFinanceAgencyOptions}
                                cancelable
                              />
                            ) : (
                              loanFromJapanHouseFinanceAgencyOptions.find(
                                (op) => op.value === item?.loan_from_japan_house_finance_agency
                              )?.label
                            )
                          }
                        />

                        <EditRow
                          label={`入居家族${index + 1} 郵便番号`}
                          upConfig={{
                            key: `p_residents.postal_code.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdZipCodeInput
                                name={`p_residents[${index}].postal_code`}
                                setPrefectureKanji={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].prefecture_kanji`, value);
                                  formik.setFieldTouched(`p_residents[${index}].prefecture_kanji`, touched);
                                }}
                                setCityKanji={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].city_kanji`, value);
                                  formik.setFieldTouched(`p_residents[${index}].city_kanji`, touched);
                                }}
                                setDistrictKanji={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].district_kanji`, value);
                                  formik.setFieldTouched(`p_residents[${index}].district_kanji`, touched);
                                }}
                                setOtherAddressKanji={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].other_address_kanji`, value);
                                  formik.setFieldTouched(`p_residents[${index}].other_address_kanji`, touched);
                                }}
                                setPrefectureKana={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].prefecture_kana`, value);
                                  formik.setFieldTouched(`p_residents[${index}].prefecture_kana`, touched);
                                }}
                                setCityKana={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].city_kana`, value);
                                  formik.setFieldTouched(`p_residents[${index}].city_kana`, touched);
                                }}
                                setDistrictKana={(value, touched) => {
                                  formik.setFieldValue(`p_residents[${index}].district_kana`, value);
                                  formik.setFieldTouched(`p_residents[${index}].district_kana`, touched);
                                }}
                              />
                            ) : (
                              item.postal_code
                            )
                          }
                        />
                        <EditRow
                          label={`入居家族${index + 1} 都道府県`}
                          upConfig={{
                            key: `p_residents.prefecture_kanji.${item?.id}`,
                            options: PREFECTURES,
                          }}
                          hasPleft={isEditable}
                          field={
                            isEditable ? (
                              <AdSelectRadios
                                name={`p_residents[${index}].prefecture_kanji`}
                                options={PREFECTURES}
                                cancelable
                              />
                            ) : (
                              PREFECTURES.find((op) => op.value === item?.prefecture_kanji)?.label
                            )
                          }
                        />

                        <EditRow
                          label={`入居家族${index + 1} 市区郡`}
                          upConfig={{
                            key: `p_residents.city_kanji.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdEditFullWidthInput name={`p_residents[${index}].city_kanji`} convertFullWidth />
                            ) : (
                              item.city_kanji
                            )
                          }
                        />

                        <EditRow
                          label={`入居家族${index + 1} 町村丁目`}
                          upConfig={{
                            key: `p_residents.district_kanji.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdEditFullWidthInput name={`p_residents[${index}].district_kanji`} convertFullWidth />
                            ) : (
                              item.district_kanji
                            )
                          }
                        />

                        <EditRow
                          label={`入居家族${index + 1} 丁目以下・建物名・部屋番号`}
                          upConfig={{
                            key: `p_residents.other_address_kanji.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdEditFullWidthInput
                                name={`p_residents[${index}].other_address_kanji`}
                                convertFullWidth
                              />
                            ) : (
                              item.other_address_kanji
                            )
                          }
                        />
                        <EditRow
                          label={`入居家族${index + 1} 電話番号`}
                          upConfig={{
                            key: `p_residents.contact_phone.${item?.id}`,
                          }}
                          field={
                            isEditable ? (
                              <AdEditInput name={`p_residents[${index}].contact_phone`} convertHalfWidth />
                            ) : (
                              item.contact_phone
                            )
                          }
                        />

                        <EditRow
                          label={`入居家族${index + 1} 国籍`}
                          upConfig={{
                            key: `p_residents.nationality.${item?.id}`,
                            options: nationalityOptions,
                          }}
                          hasPleft={isEditable}
                          field={
                            isEditable ? (
                              <AdSelectRadios
                                name={`p_residents[${index}].nationality`}
                                options={nationalityOptions}
                                cancelable
                              />
                            ) : (
                              nationalityOptions.find((op) => op.value === item?.nationality)?.label
                            )
                          }
                        />
                      </Stack>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        />
        <EditRow
          label={'新しい住居（融資対象物件）の事業性'}
          upConfig={{
            key: `p_application_headers.property_business_type.${p_application_headers?.id}`,
            options: propertyBusinessTypeOptions,
            mapOptions: true,
            join: '・',
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectCheckbox
                name="p_application_headers.property_business_type"
                options={propertyBusinessTypeOptions}
              />
            ) : (
              propertyBusinessTypeOptions.find(
                (item) => item.value === formik.values.p_application_headers.property_business_type
              )?.label
            )
          }
        />
        <EditRow
          label={'融資対象物件　郵便番号'}
          upConfig={{
            key: `p_application_headers.property_postal_code.${p_application_headers?.id}`,
          }}
          field={
            isEditable ? (
              <AdZipCodeInput
                name="p_application_headers.property_postal_code"
                callback={(values) => {
                  formik.setFieldValue('p_application_headers.property_prefecture_kanji', values.prefecture_kanji);
                  formik.setFieldValue('p_application_headers.property_city_kanji', values.city_kanji);
                  formik.setFieldValue('p_application_headers.property_district_kanji', values.district_kanji);
                }}
              />
            ) : (
              formik.values.p_application_headers?.property_postal_code
            )
          }
        />
        <EditRow
          label={'融資対象物件　都道府県'}
          upConfig={{
            key: `p_application_headers.property_prefecture.${p_application_headers?.id}`,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_application_headers.property_prefecture" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_application_headers?.property_prefecture)?.label
            )
          }
        />
        <EditRow
          label={'融資対象物件　市区町村郡'}
          upConfig={{
            key: `p_application_headers.property_city.${p_application_headers?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_application_headers.property_city" convertFullWidth />
            ) : (
              formik.values.p_application_headers?.property_city
            )
          }
        />
        <EditRow
          label={'融資対象物件　以下地番'}
          upConfig={{
            key: `p_application_headers.property_district.${p_application_headers?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_application_headers.property_district" convertFullWidth />
            ) : (
              formik.values.p_application_headers?.property_district
            )
          }
        />
        {['2', '3'].includes(p_application_headers.loan_target) && (
          <EditRow
            label={'融資対象物件　マンション名・部屋番号'}
            upConfig={{
              key: `p_application_headers.property_apartment_and_room_no.${p_application_headers?.id}`,
            }}
            isLogicRequired
            field={
              isEditable ? (
                <AdEditFullWidthInput name="p_application_headers.property_apartment_and_room_no" convertFullWidth />
              ) : (
                formik.values.p_application_headers?.property_apartment_and_room_no
              )
            }
          />
        )}
        <EditRow
          label={'融資対象物件　物件所在地住所（フリガナ）'}
          upConfig={{
            key: `p_application_headers.property_address_kana.${p_application_headers?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_application_headers.property_address_kana" convertFullWidth />
            ) : (
              formik.values.p_application_headers?.property_address_kana
            )
          }
        />
        {!['2', '3'].includes(p_application_headers.loan_target) ? (
          <Stack>
            <EditRow
              label={'融資対象物件　土地の敷地面積'}
              upConfig={{
                key: `p_application_headers.property_land_area.${p_application_headers?.id}`,
                formatNumber: true,
                unit: 'm²',
              }}
              field={
                isEditable ? (
                  <AdAreaInput name="p_application_headers.property_land_area" unit={'m²'} />
                ) : (
                  formatMoney(formik.values.p_application_headers?.property_land_area, 'm²')
                )
              }
            />
            <EditRow
              label={'融資対象物件　建物の延べ床面積'}
              upConfig={{
                key: `p_application_headers.property_floor_area.${p_application_headers?.id}`,
                formatNumber: true,
                unit: 'm²',
              }}
              field={
                isEditable ? (
                  <AdAreaInput name="p_application_headers.property_floor_area" unit={'m²'} />
                ) : (
                  formatMoney(formik.values.p_application_headers?.property_floor_area, 'm²')
                )
              }
            />
          </Stack>
        ) : (
          <Stack>
            <EditRow
              label={'融資対象物件　専有面積'}
              upConfig={{
                key: `p_application_headers.property_private_area.${p_application_headers?.id}`,
                formatNumber: true,
                unit: 'm²',
              }}
              field={
                isEditable ? (
                  <AdAreaInput name="p_application_headers.property_private_area" unit={'m²'} />
                ) : (
                  formatMoney(formik.values.p_application_headers?.property_private_area, 'm²')
                )
              }
            />
            <EditRow
              label={'融資対象物件　マンション全体の延べ床面積'}
              upConfig={{
                key: `p_application_headers.property_total_floor_area.${p_application_headers?.id}`,
                formatNumber: true,
                unit: 'm²',
              }}
              field={
                isEditable ? (
                  <AdAreaInput name="p_application_headers.property_total_floor_area" unit={'m²'} />
                ) : (
                  formatMoney(formik.values.p_application_headers?.property_total_floor_area, 'm²')
                )
              }
            />
          </Stack>
        )}

        <EditRow
          label={'担保物件種類'}
          upConfig={{
            key: `p_application_headers.property_type.${p_application_headers?.id}`,
            options: propertyTypeOptions,
          }}
          isRequired
          isAddendum
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_application_headers.property_type" options={propertyTypeOptions} />
            ) : (
              propertyTypeOptions.find((item) => item.value === formik.values.p_application_headers.property_type)
                ?.label
            )
          }
        />
        <EditRow
          label={'土地取得時期'}
          upConfig={{
            key: `p_application_headers.property_land_acquire_date.${p_application_headers?.id}`,
            formatJaDate: true,
          }}
          isAddendum
          hasPleft={isEditable}
          field={
            isEditable ? (
              <DayPicker name="p_application_headers.property_land_acquire_date" />
            ) : (
              formatJapanDate(formik.values.p_application_headers?.property_land_acquire_date, true)
            )
          }
        />
        <EditRow
          label={'共有区分'}
          upConfig={{
            key: `p_application_headers.property_joint_ownership_type.${p_application_headers?.id}`,
            options: propertyJointOwnershipTypeOptions,
          }}
          isAddendum
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_application_headers.property_joint_ownership_type"
                options={propertyJointOwnershipTypeOptions}
              />
            ) : (
              propertyJointOwnershipTypeOptions.find(
                (item) => item.value === formik.values.p_application_headers.property_joint_ownership_type
              )?.label
            )
          }
        />
        <EditRow
          label={'建物割合分子'}
          upConfig={{
            key: `p_application_headers.property_building_ratio_numerator.${p_application_headers?.id}`,
            formatNumber: true,
            unit: 'm²',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.property_building_ratio_numerator"
                maxLength={3}
                unit={'m²'}
              />
            ) : (
              formatMoney(formik.values.p_application_headers?.property_building_ratio_numerator, 'm²')
            )
          }
        />
        <EditRow
          label={'建物割合分母'}
          upConfig={{
            key: `p_application_headers.property_building_ratio_denominator.${p_application_headers?.id}`,
            formatNumber: true,
            unit: 'm²',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput
                name="p_application_headers.property_building_ratio_denominator"
                maxLength={3}
                unit={'m²'}
              />
            ) : (
              formatMoney(formik.values.p_application_headers?.property_building_ratio_denominator, 'm²')
            )
          }
        />
        <EditRow
          label={'土地割合分子'}
          upConfig={{
            key: `p_application_headers.property_land_ratio_numerator.${p_application_headers?.id}`,
            formatNumber: true,
            unit: 'm²',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_land_ratio_numerator" maxLength={3} unit={'m²'} />
            ) : (
              formatMoney(formik.values.p_application_headers?.property_land_ratio_numerator, 'm²')
            )
          }
        />
        <EditRow
          label={'土地割合分母'}
          upConfig={{
            key: `p_application_headers.property_land_ratio_denominator.${p_application_headers?.id}`,
            formatNumber: true,
            unit: 'm²',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_application_headers.property_land_ratio_denominator" maxLength={3} unit={'m²'} />
            ) : (
              formatMoney(formik.values.p_application_headers?.property_land_ratio_denominator, 'm²')
            )
          }
        />
        {isMCJ && (
          <Stack>
            <EditRow
              label={'購入物件の土地権利'}
              upConfig={{
                key: `p_application_headers.property_land_type.${p_application_headers?.id}`,
                options: propertyLandTypeOptions,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_application_headers.property_land_type"
                    options={propertyLandTypeOptions}
                    cancelable
                  />
                ) : (
                  propertyLandTypeOptions.find(
                    (item) => item.value === formik.values.p_application_headers.property_land_type
                  )?.label
                )
              }
            />
            <EditRow
              label={'買戻・保留地・仮換地'}
              upConfig={{
                key: `p_application_headers.property_purchase_type.${p_application_headers?.id}`,
                options: propertyPurchaseTypeOptions,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_application_headers.property_purchase_type"
                    options={propertyPurchaseTypeOptions}
                    cancelable
                  />
                ) : (
                  propertyPurchaseTypeOptions.find(
                    (item) => item.value === formik.values.p_application_headers.property_purchase_type
                  )?.label
                )
              }
            />
            <EditRow
              label={'都市計画区域等'}
              upConfig={{
                key: `p_application_headers.property_planning_area.${p_application_headers?.id}`,
                options: propertyPlanningAreaOptions,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_application_headers.property_planning_area"
                    options={propertyPlanningAreaOptions}
                    cancelable
                  />
                ) : (
                  propertyPlanningAreaOptions.find(
                    (item) => item.value === formik.values.p_application_headers.property_planning_area
                  )?.label
                )
              }
            />
            {formik.values.p_application_headers.property_planning_area === '99' && (
              <EditRow
                label={'都市計画区域（その他）'}
                upConfig={{
                  key: `p_application_headers.property_planning_area_other.${p_application_headers?.id}`,
                }}
                field={
                  isEditable ? (
                    <AdEditFullWidthInput name="p_application_headers.property_planning_area_other" convertFullWidth />
                  ) : (
                    formik.values.p_application_headers.property_planning_area_other
                  )
                }
              />
            )}
            {['1', '2'].includes(formik.values.p_application_headers.property_planning_area) && (
              <Stack>
                <EditRow
                  label={'再建築理由'}
                  upConfig={{
                    key: `p_application_headers.property_rebuilding_reason.${p_application_headers?.id}`,
                    options: propertyRebuildingReasonOptions,
                  }}
                  hasPleft={isEditable}
                  field={
                    isEditable ? (
                      <AdSelectRadios
                        name="p_application_headers.property_rebuilding_reason"
                        options={propertyRebuildingReasonOptions}
                        cancelable
                      />
                    ) : (
                      propertyRebuildingReasonOptions.find(
                        (item) => item.value === formik.values.p_application_headers.property_rebuilding_reason
                      )?.label
                    )
                  }
                />
                {formik.values.p_application_headers.property_rebuilding_reason === '99' && (
                  <EditRow
                    label={'再建築理由（その他）'}
                    upConfig={{
                      key: `p_application_headers.property_rebuilding_reason_other.${p_application_headers?.id}`,
                    }}
                    hasPleft={isEditable}
                    field={
                      isEditable ? (
                        <AdEditFullWidthInput
                          name="p_application_headers.property_rebuilding_reason_other"
                          convertFullWidth
                        />
                      ) : (
                        formik.values.p_application_headers.property_rebuilding_reason_other
                      )
                    }
                  />
                )}
              </Stack>
            )}

            <EditRow
              label={'フラット35S適用プラン'}
              upConfig={{
                key: `p_application_headers.property_flat_35_plan.${p_application_headers?.id}`,
                options: propertyFlat35PlanOptions,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_application_headers.property_flat_35_plan"
                    options={propertyFlat35PlanOptions}
                    cancelable
                    onChange={(value) => {
                      if (!value === '2') {
                        formik.setFieldValue('p_application_headers.property_flat_35_tech', '');
                      }
                    }}
                  />
                ) : (
                  propertyFlat35PlanOptions.find(
                    (item) => item.value === formik.values.p_application_headers.property_flat_35_plan
                  )?.label
                )
              }
            />
            <EditRow
              label={'維持保全型'}
              upConfig={{
                key: `p_application_headers.property_maintenance_type.${p_application_headers?.id}`,
                options: propertyMaintenanceTypeOptions,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_application_headers.property_maintenance_type"
                    options={propertyMaintenanceTypeOptions}
                    cancelable
                  />
                ) : (
                  propertyMaintenanceTypeOptions.find(
                    (item) => item.value === formik.values.p_application_headers.property_maintenance_type
                  )?.label
                )
              }
            />
            {formik.values.p_application_headers.property_flat_35_plan === '2' && (
              <EditRow
                label={'フラット35S（優良住宅取得支援制度）'}
                upConfig={{
                  key: `p_application_headers.property_flat_35_tech.${p_application_headers?.id}`,
                  options: propertyFlat35TechOptions,
                }}
                hasPleft={isEditable}
                field={
                  isEditable ? (
                    <AdSelectRadios
                      name="p_application_headers.property_flat_35_tech"
                      options={propertyFlat35TechOptions}
                      cancelable
                    />
                  ) : (
                    propertyFlat35TechOptions.find(
                      (item) => item.value === formik.values.p_application_headers.property_flat_35_tech
                    )?.label
                  )
                }
              />
            )}
            <EditRow
              label={'地域連携型・地方移住支援型'}
              upConfig={{
                key: `p_application_headers.property_region_type.${p_application_headers?.id}`,
                options: propertyRegionTypeOptions,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_application_headers.property_region_type"
                    options={propertyRegionTypeOptions}
                    cancelable
                  />
                ) : (
                  propertyRegionTypeOptions.find(
                    (item) => item.value === formik.values.p_application_headers.property_region_type
                  )?.label
                )
              }
            />
          </Stack>
        )}
      </ContentEditGroup>
    </FormikProvider>
  );
};
