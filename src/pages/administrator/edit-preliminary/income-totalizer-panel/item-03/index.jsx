import { Stack } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { formatJapanDate, formatNumber } from '@/utils';
import { useEffect, useMemo } from 'react';
import {
  AdEditFullWidthInput,
  AdNumericInput,
  AdPhoneInputField,
  AdSelectCheckbox,
  AdSelectRadios,
  AdYmdInput,
  AdZipCodeInput,
  MonthPicker,
} from '@/components/administrator';
import {
  employmentTypeOptions,
  incomeOptions,
  industryOptions,
  listedDivisionOptions,
  maternityPaternityLeaveOptions,
  nursingLeaveOptions,
  occupationDetailOptions,
  occupationOptions,
  officeJoiningDateOptions,
  roleOptions,
  taxReturnOptions,
  taxReturnReasonsOptions,
  transferOfficeOptions,
  jobChangeOfficeOptions,
} from './options';

import { diffObj } from '@/utils';

import { PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab03SchemaI } from '../../fullSchema';
import { useSetRecoilState } from 'recoil';
import { infoGroupTabAtom } from '@/store';
import { dayjs } from '@/libs';

export const Item03 = () => {
  const setInfoGroupTab = useSetRecoilState(infoGroupTabAtom);
  const {
    preliminaryInfo: { p_applicant_persons__1, p_borrowing_details__1 },
    preliminarySnap: { isMCJ, changeToIncomeTotalizer },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_applicant_persons__1: {
      office_occupation: p_applicant_persons__1?.office_occupation,
      office_occupation_other: p_applicant_persons__1?.office_occupation_other,
      office_industry: p_applicant_persons__1?.office_industry,
      office_industry_other: p_applicant_persons__1?.office_industry_other,
      office_occupation_detail: p_applicant_persons__1?.office_occupation_detail,
      office_occupation_detail_other: p_applicant_persons__1?.office_occupation_detail_other,
      office_name_kanji: p_applicant_persons__1?.office_name_kanji,
      office_name_kana: p_applicant_persons__1?.office_name_kana,
      office_department: p_applicant_persons__1?.office_department,
      office_phone: p_applicant_persons__1?.office_phone,
      office_postal_code: p_applicant_persons__1?.office_postal_code,
      office_prefecture_kanji: p_applicant_persons__1?.office_prefecture_kanji,
      office_city_kanji: p_applicant_persons__1?.office_city_kanji,
      office_district_kanji: p_applicant_persons__1?.office_district_kanji,
      office_other_address_kanji: p_applicant_persons__1?.office_other_address_kanji,
      office_prefecture_kana: p_applicant_persons__1?.office_prefecture_kana,
      office_city_kana: p_applicant_persons__1?.office_city_kana,
      office_district_kana: p_applicant_persons__1?.office_district_kana,
      office_other_address_kana: p_applicant_persons__1?.office_other_address_kana,
      office_employee_num: p_applicant_persons__1?.office_employee_num,
      office_joining_date: p_applicant_persons__1?.office_joining_date,
      last_year_income: p_applicant_persons__1?.last_year_income,
      last_year_bonus_income: p_applicant_persons__1?.last_year_bonus_income,
      income_sources: p_applicant_persons__1?.income_sources,
      tax_return: p_applicant_persons__1?.tax_return,
      tax_return_reasons: p_applicant_persons__1?.tax_return_reasons,
      tax_return_reason_other: p_applicant_persons__1?.tax_return_reason_other,
      transfer_office: p_applicant_persons__1?.transfer_office,
      transfer_office_name_kanji: p_applicant_persons__1?.transfer_office_name_kanji,
      transfer_office_name_kana: p_applicant_persons__1?.transfer_office_name_kana,
      transfer_office_phone: p_applicant_persons__1?.transfer_office_phone,
      transfer_office_postal_code: p_applicant_persons__1?.transfer_office_postal_code,
      transfer_office_prefecture_kanji: p_applicant_persons__1?.transfer_office_prefecture_kanji,
      transfer_office_city_kanji: p_applicant_persons__1?.transfer_office_city_kanji,
      transfer_office_district_kanji: p_applicant_persons__1?.transfer_office_district_kanji,
      transfer_office_other_address_kanji: p_applicant_persons__1?.transfer_office_other_address_kanji,
      maternity_paternity_leave: p_applicant_persons__1?.maternity_paternity_leave,
      maternity_paternity_leave_start_date: p_applicant_persons__1?.maternity_paternity_leave_start_date,
      maternity_paternity_leave_end_date: p_applicant_persons__1?.maternity_paternity_leave_end_date,
      nursing_leave: p_applicant_persons__1?.nursing_leave,
      office_employment_type: p_applicant_persons__1?.office_employment_type,

      office_role: p_applicant_persons__1?.office_role,
      office_head_location: p_applicant_persons__1?.office_head_location,
      office_listed_division: p_applicant_persons__1?.office_listed_division,
      office_establishment_date: p_applicant_persons__1?.office_establishment_date,
      office_capital_stock: p_applicant_persons__1?.office_capital_stock,
      main_income_source: p_applicant_persons__1?.main_income_source,
      before_last_year_income: p_applicant_persons__1?.before_last_year_income,

      job_change: p_applicant_persons__1?.job_change,
      job_change_office_name_kana: p_applicant_persons__1?.job_change_office_name_kana,
      job_change_office_name_kanji: p_applicant_persons__1?.job_change_office_name_kanji,
      prev_office_year_num: p_applicant_persons__1?.prev_office_year_num,
      prev_office_industry: p_applicant_persons__1?.prev_office_industry,
      prev_office_industry_other: p_applicant_persons__1?.prev_office_industry_other,
    },
    p_borrowing_details__1: {
      desired_borrowing_date: p_borrowing_details__1?.desired_borrowing_date,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__1: {
        ...diffObj(initialValues.p_applicant_persons__1, values.p_applicant_persons__1),
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab03SchemaI,
    validateOnChange: false,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (changeToIncomeTotalizer) {
        setInfoGroupTab(9);
      } else {
        handleSave(setUpdateData(values));
      }
    },
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_applicant_persons__1: {
          ...pre.p_applicant_persons__1,
          ...formik.values.p_applicant_persons__1,
        },
      };
    });
  }, [formik.values]);

  const basicYear = useMemo(() => {
    return p_borrowing_details__1?.desired_borrowing_date
      ? Number(p_borrowing_details__1?.desired_borrowing_date.split('/')[0])
      : dayjs().year();
  }, [p_borrowing_details__1?.desired_borrowing_date]);

  const leaveStatusDownYearOptions = Array.from(Array(5), (_, index) => {
    const year = String(basicYear - index).padStart(2, '0');
    return {
      value: `${year}`,
      label: `${year}`,
    };
  });

  const leaveStatusUpYearOptions = Array.from(Array(5), (_, index) => {
    const year = String(basicYear + index).padStart(2, '0');
    return {
      value: `${year}`,
      label: `${year}`,
    };
  });

  useEffect(() => {
    formik.validateForm();
    console.log(formik.values);
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'ご職業'}
          upConfig={{
            key: `p_applicant_persons.office_occupation.${p_applicant_persons__1?.id}`,
            options: occupationOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.office_occupation"
                options={occupationOptions}
                onChange={(value) => {
                  if (value === '12') {
                    formik.setFieldValue('p_applicant_persons__1.office_phone', '');
                  }
                  if (value === '99') {
                    formik.setFieldTouched('p_applicant_persons__1.office_occupation_other', true);
                  } else {
                    formik.setFieldValue('p_applicant_persons__1.office_occupation_other', '');
                    formik.setFieldTouched('p_applicant_persons__1.office_occupation_other', false);
                  }
                }}
              />
            ) : (
              occupationOptions.find((item) => item.value === formik.values.p_applicant_persons__1.office_occupation)
                ?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.office_occupation === '99' && (
          <EditRow
            label={'勤務先　職業（その他）'}
            upConfig={{
              key: `p_applicant_persons.office_occupation_other.${p_applicant_persons__1?.id}`,
            }}
            isLogicRequired
            field={
              isEditable ? (
                <AdEditFullWidthInput name="p_applicant_persons__1.office_occupation_other" convertFullWidth />
              ) : (
                formik.values.p_applicant_persons__1.office_occupation_other
              )
            }
          />
        )}
        <EditRow
          label={'業種'}
          upConfig={{
            key: `p_applicant_persons.office_industry.${p_applicant_persons__1?.id}`,
            options: industryOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.office_industry"
                options={industryOptions}
                onChange={(value) => {
                  if (value === '99') {
                    formik.setFieldTouched('p_applicant_persons__1.office_industry_other', true);
                  } else {
                    formik.setFieldValue('p_applicant_persons__1.office_industry_other', '');
                    formik.setFieldTouched('p_applicant_persons__1.office_industry_other', false);
                  }
                }}
              />
            ) : (
              industryOptions.find((item) => item.value === formik.values.p_applicant_persons__1.office_industry)?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.office_industry === '99' && (
          <EditRow
            label={'勤務先　業種（その他）'}
            upConfig={{
              key: `p_applicant_persons.office_industry_other.${p_applicant_persons__1?.id}`,
            }}
            isLogicRequired
            field={
              isEditable ? (
                <AdEditFullWidthInput name="p_applicant_persons__1.office_industry_other" convertFullWidth />
              ) : (
                formik.values.p_applicant_persons__1.office_industry_other
              )
            }
          />
        )}
        <EditRow
          label={'職種'}
          upConfig={{
            key: `p_applicant_persons.office_occupation_detail.${p_applicant_persons__1?.id}`,
            options: occupationDetailOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.office_occupation_detail"
                options={occupationDetailOptions}
                onChange={(value) => {
                  if (value === '99') {
                    formik.setFieldTouched('p_applicant_persons__1.office_occupation_detail_other', true);
                  } else {
                    formik.setFieldValue('p_applicant_persons__1.office_occupation_detail_other', '');
                    formik.setFieldTouched('p_applicant_persons__1.office_occupation_detail_other', false);
                  }
                }}
              />
            ) : (
              occupationDetailOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__1.office_occupation_detail
              )?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.office_occupation_detail === '99' && (
          <EditRow
            label={'勤務先　職種（その他）'}
            upConfig={{
              key: `p_applicant_persons.office_occupation_detail_other.${p_applicant_persons__1?.id}`,
            }}
            isLogicRequired
            field={
              isEditable ? (
                <AdEditFullWidthInput name="p_applicant_persons__1.office_occupation_detail_other" convertFullWidth />
              ) : (
                formik.values.p_applicant_persons__1.office_occupation_detail_other
              )
            }
          />
        )}
        <EditRow
          label={'雇用形態'}
          upConfig={{
            key: `p_applicant_persons.office_employment_type.${p_applicant_persons__1?.id}`,
            options: employmentTypeOptions,
          }}
          isAddendum
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.office_employment_type" options={employmentTypeOptions} />
            ) : (
              employmentTypeOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__1.office_employment_type
              )?.label
            )
          }
        />
        <EditRow
          label={'勤務先名'}
          upConfig={{
            key: `p_applicant_persons.office_name_kanji.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_name_kanji
            )
          }
        />
        <EditRow
          label={'勤務先名（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.office_name_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_name_kana
            )
          }
        />
        <EditRow
          label={'所属部課'}
          upConfig={{
            key: `p_applicant_persons.office_department.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_department" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_department
            )
          }
        />
        <EditRow
          label={'役職'}
          upConfig={{
            key: `p_applicant_persons.office_role.${p_applicant_persons__1?.id}`,
            options: roleOptions,
          }}
          isAddendum
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.office_role" options={roleOptions} />
            ) : (
              roleOptions.find((item) => item.value === formik.values.p_applicant_persons__1.office_role)?.label
            )
          }
        />
        <EditRow
          label={'勤務先の電話番号'}
          upConfig={{
            key: `p_applicant_persons.office_phone.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdPhoneInputField name="p_applicant_persons__1.office_phone" convertHalfWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_phone
            )
          }
        />
        <EditRow
          label={'勤務先本社所在地'}
          upConfig={{
            key: `p_applicant_persons.office_head_location.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_head_location" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_head_location
            )
          }
        />
        <EditRow
          label={'勤務先上場区分'}
          upConfig={{
            key: `p_applicant_persons.office_listed_division.${p_applicant_persons__1?.id}`,
            options: listedDivisionOptions,
          }}
          isAddendum
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.office_listed_division" options={listedDivisionOptions} />
            ) : (
              listedDivisionOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__1.office_listed_division
              )?.label
            )
          }
        />
        <EditRow
          label={'勤務先設立年月日'}
          upConfig={{
            key: `p_applicant_persons.office_establishment_date.${p_applicant_persons__1?.id}`,
            formatDate: true,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdYmdInput name="p_applicant_persons__1.office_establishment_date" />
            ) : (
              formatJapanDate(formik.values.p_applicant_persons__1.office_establishment_date)
            )
          }
        />
        <EditRow
          label={'勤務先資本金'}
          upConfig={{
            key: `p_applicant_persons.office_capital_stock.${p_applicant_persons__1?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          isAddendum
          field={
            isEditable ? (
              <AdNumericInput name="p_applicant_persons__1.office_capital_stock" maxLength={10} unit={'万円'} />
            ) : (
              formatNumber(formik.values.p_applicant_persons__1.office_capital_stock)
            )
          }
        />
        <EditRow
          label={'郵便番号'}
          upConfig={{
            key: `p_applicant_persons.office_postal_code.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdZipCodeInput
                name="p_applicant_persons__1.office_postal_code"
                setPrefectureKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_prefecture_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_prefecture_kanji', touched);
                }}
                setCityKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_city_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_city_kanji', touched);
                }}
                setDistrictKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_district_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_district_kanji', touched);
                }}
                setOtherAddressKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_other_address_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_other_address_kanji', touched);
                }}
                setPrefectureKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_prefecture_kana', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_prefecture_kana', touched);
                }}
                setCityKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_city_kana', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_city_kana', touched);
                }}
                setDistrictKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.office_district_kana', value);
                  formik.setFieldTouched('p_applicant_persons__1.office_district_kana', touched);
                }}
              />
            ) : (
              formik.values.p_applicant_persons__1.office_postal_code
            )
          }
        />
        <EditRow
          label={'都道府県'}
          upConfig={{
            key: `p_applicant_persons.office_prefecture_kanji.${p_applicant_persons__1?.id}`,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.office_prefecture_kanji" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_applicant_persons__1.office_prefecture_kanji)
                ?.label
            )
          }
        />
        <EditRow
          label={'市区郡'}
          upConfig={{
            key: `p_applicant_persons.office_city_kanji.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_city_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_city_kanji
            )
          }
        />
        <EditRow
          label={'町村丁目'}
          upConfig={{
            key: `p_applicant_persons.office_district_kanji.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_district_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_district_kanji
            )
          }
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号'}
          upConfig={{
            key: `p_applicant_persons.office_other_address_kanji.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_other_address_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_other_address_kanji
            )
          }
        />
        <EditRow
          label={'都道府県（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.office_prefecture_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_prefecture_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_prefecture_kana
            )
          }
        />
        <EditRow
          label={'市区郡（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.office_city_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_city_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_city_kana
            )
          }
        />
        <EditRow
          label={'町村丁目（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.office_district_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_district_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_district_kana
            )
          }
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.office_other_address_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.office_other_address_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.office_other_address_kana
            )
          }
        />
        <EditRow
          label={'従業員数'}
          upConfig={{
            key: `p_applicant_persons.office_employee_num.${p_applicant_persons__1?.id}`,
            formatNumber: true,
            unit: '名',
          }}
          field={
            isEditable ? (
              <AdNumericInput name="p_applicant_persons__1.office_employee_num" maxLength={9} unit={'名'} />
            ) : (
              formatNumber(formik.values.p_applicant_persons__1.office_employee_num, '名')
            )
          }
        />
        <EditRow
          label={'入社年月'}
          upConfig={{
            key: `p_applicant_persons.office_joining_date.${p_applicant_persons__1?.id}`,
            formatJaDate: true,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <MonthPicker name="p_applicant_persons__1.office_joining_date" yearOptions={officeJoiningDateOptions} />
            ) : (
              formatJapanDate(formik.values.p_applicant_persons__1.office_joining_date, true)
            )
          }
        />
        <EditRow
          label={'前年度年収'}
          upConfig={{
            key: `p_applicant_persons.last_year_income.${p_applicant_persons__1?.id}`,
            formatNumber: true,
            unit: '万円',
          }}
          field={
            isEditable ? (
              <AdNumericInput name="p_applicant_persons__1.last_year_income" maxLength={6} />
            ) : (
              formatNumber(formik.values.p_applicant_persons__1.last_year_income)
            )
          }
        />
        {isMCJ && (
          <Stack>
            <EditRow
              label={'うち、ボーナス（MCJ固有項目）'}
              upConfig={{
                key: `p_applicant_persons.last_year_bonus_income.${p_applicant_persons__1?.id}`,
                formatNumber: true,
                unit: '万円',
              }}
              field={
                isEditable ? (
                  <AdNumericInput name="p_applicant_persons__1.last_year_bonus_income" maxLength={6} />
                ) : (
                  formatNumber(formik.values.p_applicant_persons__1.last_year_bonus_income)
                )
              }
            />
            <EditRow
              label={'前々年度年収 （MCJ固有項目）'}
              upConfig={{
                key: `p_applicant_persons.before_last_year_income.${p_applicant_persons__1?.id}`,
                formatNumber: true,
                unit: '万円',
              }}
              field={
                isEditable ? (
                  <AdNumericInput name="p_applicant_persons__1.before_last_year_income" maxLength={6} />
                ) : (
                  formatNumber(formik.values.p_applicant_persons__1.before_last_year_income)
                )
              }
            />
          </Stack>
        )}
        <EditRow
          label={'収入源'}
          upConfig={{
            key: `p_applicant_persons.income_sources.${p_applicant_persons__1?.id}`,
            options: incomeOptions,
            mapOptions: true,
            join: '・',
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectCheckbox name="p_applicant_persons__1.income_sources" options={incomeOptions} />
            ) : (
              incomeOptions
                .map((item) =>
                  formik.values.p_applicant_persons__1.income_sources.includes(item.value) ? item.label : null
                )
                .filter((item) => item)
                .join('・')
            )
          }
        />
        <EditRow
          label={'収入源（銀行送信用）'}
          upConfig={{
            key: `p_applicant_persons.main_income_source.${p_applicant_persons__1?.id}`,
            options: incomeOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.main_income_source" options={incomeOptions} />
            ) : (
              incomeOptions.find((item) => item.value === formik.values.p_applicant_persons__1.main_income_source)
                ?.label
            )
          }
        />
        <EditRow
          label={'確定申告をしていますか？'}
          upConfig={{
            key: `p_applicant_persons.tax_return.${p_applicant_persons__1?.id}`,
            options: taxReturnOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.tax_return"
                options={taxReturnOptions}
                onChange={(value) => {
                  formik.setFieldValue('p_applicant_persons__1.tax_return_reasons', []);
                  formik.setFieldValue('p_applicant_persons__1.tax_return_reason_other', '');
                  formik.setFieldTouched('p_applicant_persons__1.tax_return_reasons', true);
                  formik.setFieldTouched('p_applicant_persons__1.tax_return_reason_other', true);
                }}
              />
            ) : (
              taxReturnOptions.find((item) => item.value === formik.values.p_applicant_persons__1.tax_return)?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.tax_return === '1' && (
          <Stack>
            <EditRow
              label={'確定申告の理由'}
              upConfig={{
                key: `p_applicant_persons.tax_return_reasons.${p_applicant_persons__1?.id}`,
                options: taxReturnReasonsOptions,
                mapOptions: true,
                join: '・',
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectCheckbox
                    name="p_applicant_persons__1.tax_return_reasons"
                    options={taxReturnReasonsOptions}
                    onChange={(value) => {
                      if (!value.includes('99')) {
                        formik.setFieldValue('p_applicant_persons__1.tax_return_reason_other', '');
                      }
                    }}
                  />
                ) : (
                  taxReturnReasonsOptions
                    .map((item) =>
                      formik.values.p_applicant_persons__1.tax_return_reasons.includes(item.value) ? item.label : null
                    )
                    .filter((item) => item)
                    .join('・')
                )
              }
            />
            {formik.values.p_applicant_persons__1.tax_return_reasons.includes('99') && (
              <EditRow
                label={'確定申告の理由　その他'}
                upConfig={{
                  key: `p_applicant_persons.tax_return_reason_other.${p_applicant_persons__1?.id}`,
                }}
                field={
                  isEditable ? (
                    <AdEditFullWidthInput name="p_applicant_persons__1.tax_return_reason_other" convertFullWidth />
                  ) : (
                    formik.values.p_applicant_persons__1.tax_return_reason_other
                  )
                }
              />
            )}
          </Stack>
        )}
        <EditRow
          label={'現在、出向（派遣）していますか？'}
          upConfig={{
            key: `p_applicant_persons.transfer_office.${p_applicant_persons__1?.id}`,
            options: transferOfficeOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.transfer_office"
                options={transferOfficeOptions}
                onChange={(value) => {
                  if (value === '0') {
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_name_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_name_kana', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_phone', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_postal_code', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_prefecture_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_city_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_district_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.transfer_office_other_address_kanji', '');
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_name_kanji', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_name_kana', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_phone', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_postal_code', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_prefecture_kanji', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_city_kanji', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_district_kanji', false);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_other_address_kanji', false);
                  }
                  if (value === '1') {
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_name_kanji', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_name_kana', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_phone', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_postal_code', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_prefecture_kanji', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_city_kanji', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_district_kanji', true);
                    formik.setFieldTouched('p_applicant_persons__1.transfer_office_other_address_kanji', true);
                  }
                }}
              />
            ) : (
              transferOfficeOptions.find((item) => item.value === formik.values.p_applicant_persons__1.transfer_office)
                ?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.transfer_office === '1' && (
          <Stack>
            <EditRow
              label={'出向（派遣）勤務先名'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_name_kanji.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_applicant_persons__1.transfer_office_name_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_name_kanji
                )
              }
            />
            <EditRow
              label={'出向（派遣）勤務先名（フリガナ）'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_name_kana.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_applicant_persons__1.transfer_office_name_kana" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_name_kana
                )
              }
            />
            <EditRow
              label={'出向（派遣）先 電話番号'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_phone.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdPhoneInputField name="p_applicant_persons__1.transfer_office_phone" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_phone
                )
              }
            />
            <EditRow
              label={'出向（派遣）先 郵便番号'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_postal_code.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdZipCodeInput
                    name="p_applicant_persons__1.transfer_office_postal_code"
                    setPrefectureKanji={(value, touched) => {
                      formik.setFieldValue('p_applicant_persons__1.transfer_office_prefecture_kanji', value);
                      formik.setFieldTouched('p_applicant_persons__1.transfer_office_prefecture_kanji', touched);
                    }}
                    setCityKanji={(value, touched) => {
                      formik.setFieldValue('p_applicant_persons__1.transfer_office_city_kanji', value);
                      formik.setFieldTouched('p_applicant_persons__1.transfer_office_city_kanji', touched);
                    }}
                    setDistrictKanji={(value, touched) => {
                      formik.setFieldValue('p_applicant_persons__1.transfer_office_district_kanji', value);
                      formik.setFieldTouched('p_applicant_persons__1.transfer_office_district_kanji', touched);
                    }}
                    setOtherAddressKanji={(value, touched) => {
                      formik.setFieldValue('p_applicant_persons__1.transfer_office_other_address_kanji', value);
                      formik.setFieldTouched('p_applicant_persons__1.transfer_office_other_address_kanji', touched);
                    }}
                  />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_postal_code
                )
              }
            />
            <EditRow
              label={'出向（派遣）先 都道府県'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_prefecture_kanji.${p_applicant_persons__1?.id}`,
              }}
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_applicant_persons__1.transfer_office_prefecture_kanji"
                    options={PREFECTURES}
                  />
                ) : (
                  PREFECTURES.find(
                    (item) => item.value === formik.values.p_applicant_persons__1.transfer_office_prefecture_kanji
                  )?.label
                )
              }
            />
            <EditRow
              label={'出向（派遣）先 市区郡'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_city_kanji.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_applicant_persons__1.transfer_office_city_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_city_kanji
                )
              }
            />
            <EditRow
              label={'出向（派遣）先 町村丁目'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_district_kanji.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_applicant_persons__1.transfer_office_district_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_district_kanji
                )
              }
            />
            <EditRow
              label={'出向（派遣）先 丁目以下・建物名・部屋番号'}
              upConfig={{
                key: `p_applicant_persons.transfer_office_other_address_kanji.${p_applicant_persons__1?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput
                    name="p_applicant_persons__1.transfer_office_other_address_kanji"
                    convertFullWidth
                  />
                ) : (
                  formik.values.p_applicant_persons__1.transfer_office_other_address_kanji
                )
              }
            />
          </Stack>
        )}
        {/* 転職有無 */}
        <EditRow
          label={'過去に、転職のご経験はありますか？'}
          upConfig={{
            key: `p_applicant_persons.job_change.${p_applicant_persons__1?.id}`,
            options: jobChangeOfficeOptions,
          }}
          hasPleft={isEditable}
          isAddendum
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.job_change"
                options={jobChangeOfficeOptions}
                onChange={(value) => {
                  if (value === '0') {
                    formik.setFieldValue('p_applicant_persons__1.job_change_office_name_kana', '');
                    formik.setFieldValue('p_applicant_persons__1.job_change_office_name_kanji', '');
                    formik.setFieldValue('p_applicant_persons__1.prev_office_year_num', '');
                    formik.setFieldValue('p_applicant_persons__1.prev_office_industry', '');
                    formik.setFieldValue('p_applicant_persons__1.prev_office_industry_other', '');

                    formik.setFieldTouched('p_applicant_persons__1.job_change_office_name_kana', false);
                    formik.setFieldTouched('p_applicant_persons__1.job_change_office_name_kanji', false);
                    formik.setFieldTouched('p_applicant_persons__1.prev_office_year_num', false);
                    formik.setFieldTouched('p_applicant_persons__1.prev_office_industry', false);
                    formik.setFieldTouched('p_applicant_persons__1.prev_office_industry_other', false);
                  }
                  if (value === '1') {
                    formik.setFieldTouched('p_applicant_persons__1.job_change_office_name_kana', true);
                    formik.setFieldTouched('p_applicant_persons__1.job_change_office_name_kanji', true);
                    formik.setFieldTouched('p_applicant_persons__1.prev_office_year_num', true);
                    formik.setFieldTouched('p_applicant_persons__1.prev_office_industry', true);
                    formik.setFieldTouched('p_applicant_persons__1.prev_office_industry_other', true);
                  }
                }}
              />
            ) : (
              transferOfficeOptions.find((item) => item.value === formik.values.p_applicant_persons__1.job_change)
                ?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.job_change === '1' && (
          <Stack>
            <EditRow
              label={'前勤務先名'}
              upConfig={{
                key: `p_applicant_persons.job_change_office_name_kanji.${p_applicant_persons__1?.id}`,
              }}
              isLogicRequired
              isAddendum
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_applicant_persons__1.job_change_office_name_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.job_change_office_name_kanji
                )
              }
            />
            <EditRow
              label={'前勤務先名（フリガナ）'}
              upConfig={{
                key: `p_applicant_persons.job_change_office_name_kana.${p_applicant_persons__1?.id}`,
              }}
              isLogicRequired
              isAddendum
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_applicant_persons__1.job_change_office_name_kana" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__1.job_change_office_name_kana
                )
              }
            />
            <EditRow
              label={'前勤務先 勤続年数'}
              upConfig={{
                key: `p_applicant_persons.prev_office_year_num.${p_applicant_persons__1?.id}`,
              }}
              isLogicRequired
              isAddendum
              field={
                isEditable ? (
                  <AdNumericInput name="p_applicant_persons__1.prev_office_year_num" unit={'年'} maxLength={2} />
                ) : (
                  formatNumber(formik.values.p_applicant_persons__1.prev_office_year_num, '年')
                )
              }
            />
            <EditRow
              label={'前勤務先 業種'}
              upConfig={{
                key: `p_applicant_persons.prev_office_industry.${p_applicant_persons__1?.id}`,
              }}
              isLogicRequired
              isAddendum
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <AdSelectRadios
                    name="p_applicant_persons__1.prev_office_industry"
                    options={industryOptions}
                    onChange={(value) => {
                      if (value === '99') {
                        formik.setFieldTouched('p_applicant_persons__1.prev_office_industry_other', true);
                      } else {
                        formik.setFieldValue('p_applicant_persons__1.prev_office_industry_other', '');
                        formik.setFieldTouched('p_applicant_persons__1.prev_office_industry_other', false);
                      }
                    }}
                  />
                ) : (
                  industryOptions.find(
                    (item) => item.value === formik.values.p_applicant_persons__1.prev_office_industry
                  )?.label
                )
              }
            />
            {formik.values.p_applicant_persons__1.prev_office_industry === '99' && (
              <EditRow
                label={'前勤務先 業種　その他'}
                upConfig={{
                  key: `p_applicant_persons.prev_office_industry_other.${p_applicant_persons__1?.id}`,
                }}
                isLogicRequired
                isAddendum
                field={
                  isEditable ? (
                    <AdEditFullWidthInput name="p_applicant_persons__1.prev_office_industry_other" convertFullWidth />
                  ) : (
                    formik.values.p_applicant_persons__1.prev_office_industry_other
                  )
                }
              />
            )}
          </Stack>
        )}
        <EditRow
          label={'産休・育休の取得状況'}
          upConfig={{
            key: `p_applicant_persons.maternity_paternity_leave.${p_applicant_persons__1?.id}`,
            options: maternityPaternityLeaveOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__1.maternity_paternity_leave"
                options={maternityPaternityLeaveOptions}
                cancelable
                onChange={(value) => {
                  if (value === '') {
                    formik.setFieldValue('p_applicant_persons__1.maternity_paternity_leave_start_date', '');
                    formik.setFieldValue('p_applicant_persons__1.maternity_paternity_leave_end_date', '');
                    formik.setFieldTouched('p_applicant_persons__1.maternity_paternity_leave_start_date', false);
                    formik.setFieldTouched('p_applicant_persons__1.maternity_paternity_leave_end_date', false);
                  } else {
                    formik.setFieldValue(
                      'p_applicant_persons__1.maternity_paternity_leave_start_date',
                      formik.values.p_applicant_persons__1.maternity_paternity_leave_start_date ||
                        p_applicant_persons__1.maternity_paternity_leave_start_date
                    );
                    formik.setFieldValue(
                      'p_applicant_persons__1.maternity_paternity_leave_end_date',
                      formik.values.p_applicant_persons__1.maternity_paternity_leave_end_date ||
                        p_applicant_persons__1.maternity_paternity_leave_end_date
                    );
                    formik.setFieldTouched('p_applicant_persons__1.maternity_paternity_leave_start_date', true);
                    formik.setFieldTouched('p_applicant_persons__1.maternity_paternity_leave_end_date', true);
                  }
                }}
              />
            ) : (
              maternityPaternityLeaveOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__1.maternity_paternity_leave
              )?.label
            )
          }
        />
        {formik.values.p_applicant_persons__1.maternity_paternity_leave && (
          <Stack>
            <EditRow
              label={'取得開始時期'}
              upConfig={{
                key: `p_applicant_persons.maternity_paternity_leave_start_date.${p_applicant_persons__1?.id}`,
                formatJaDate: true,
              }}
              isLogicRequired
              hasPleft={isEditable}
              field={
                isEditable ? (
                  <MonthPicker
                    name="p_applicant_persons__1.maternity_paternity_leave_start_date"
                    yearOptions={
                      formik.values.p_applicant_persons__1.maternity_paternity_leave === '1'
                        ? leaveStatusUpYearOptions
                        : leaveStatusDownYearOptions
                    }
                  />
                ) : (
                  formatJapanDate(formik.values.p_applicant_persons__1.maternity_paternity_leave_start_date, true)
                )
              }
            />
            <EditRow
              label={'取得終了時期'}
              upConfig={{
                key: `p_applicant_persons.maternity_paternity_leave_end_date.${p_applicant_persons__1?.id}`,
                formatJaDate: true,
              }}
              hasPleft={isEditable}
              isLogicRequired
              field={
                isEditable ? (
                  <MonthPicker
                    name="p_applicant_persons__1.maternity_paternity_leave_end_date"
                    yearOptions={
                      formik.values.p_applicant_persons__1.maternity_paternity_leave === '1' ||
                      formik.values.p_applicant_persons__1.maternity_paternity_leave === '2'
                        ? leaveStatusUpYearOptions
                        : leaveStatusDownYearOptions
                    }
                  />
                ) : (
                  formatJapanDate(formik.values.p_applicant_persons__1.maternity_paternity_leave_end_date, true)
                )
              }
            />
          </Stack>
        )}
        {isMCJ && (
          <EditRow
            label={'介護休暇の取得状況'}
            upConfig={{
              key: `p_applicant_persons.nursing_leave.${p_applicant_persons__1?.id}`,
              options: nursingLeaveOptions,
            }}
            hasPleft={isEditable}
            field={
              isEditable ? (
                <AdSelectRadios name="p_applicant_persons__1.nursing_leave" options={nursingLeaveOptions} cancelable />
              ) : (
                nursingLeaveOptions.find((item) => item.value === formik.values.p_applicant_persons__1.nursing_leave)
                  ?.label
              )
            }
          />
        )}
      </ContentEditGroup>
    </FormikProvider>
  );
};
