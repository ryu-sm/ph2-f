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
  AdYmdInput,
  DayPicker,
  MonthPicker,
} from '@/components/administrator';
import {
  incomeOptions,
  industryOptions,
  leaveStatusDownYearOptions,
  leaveStatusUpYearOptions,
  maternityPaternityLeaveOptions,
  nursingLeaveOptions,
  occupationDetailOptions,
  occupationOptions,
  officeJoiningDateOptions,
  taxReturnOptions,
  taxReturnReasonsOptions,
  transferOfficeOptions,
} from './options';

import dayjs from 'dayjs';
import { useApUpdateApplyInfo } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR, PREFECTURES } from '@/constant';

export const Item03 = () => {
  const { p_application_headers, p_applicant_persons__0, isMCJ } = useRecoilValue(preliminaryAotm);
  const setPreliminaryInfo = useSetRecoilState(preliminaryAotm);
  const initialValues = {
    p_applicant_persons__0: {
      office_occupation: p_applicant_persons__0.office_occupation,
      office_occupation_other: p_applicant_persons__0.office_occupation_other,
      office_industry: p_applicant_persons__0.office_industry,
      office_industry_other: p_applicant_persons__0.office_industry_other,
      office_occupation_detail: p_applicant_persons__0.office_occupation_detail,
      office_occupation_detail_other: p_applicant_persons__0.office_occupation_detail_other,
      office_name_kanji: p_applicant_persons__0.office_name_kanji,
      office_department: p_applicant_persons__0.office_department,
      office_phone: p_applicant_persons__0.office_phone,
      office_postal_code: p_applicant_persons__0.office_postal_code,
      office_prefecture_kanji: p_applicant_persons__0.office_prefecture_kanji,
      office_city_kanji: p_applicant_persons__0.office_city_kanji,
      office_district_kanji: p_applicant_persons__0.office_district_kanji,
      office_other_address_kanji: p_applicant_persons__0.office_other_address_kanji,
      office_prefecture_kana: p_applicant_persons__0.office_prefecture_kana,
      office_city_kana: p_applicant_persons__0.office_city_kana,
      office_district_kana: p_applicant_persons__0.office_district_kana,
      office_other_address_kana: p_applicant_persons__0.office_other_address_kana,
      office_employee_num: p_applicant_persons__0.office_employee_num,
      office_joining_date: p_applicant_persons__0.office_joining_date,
      last_year_income: p_applicant_persons__0.last_year_income,
      last_year_bonus_income: p_applicant_persons__0.last_year_bonus_income,
      income_sources: p_applicant_persons__0.income_sources,
      tax_return: p_applicant_persons__0.tax_return,
      tax_return_reasons: p_applicant_persons__0.tax_return_reasons,
      tax_return_reason_other: p_applicant_persons__0.tax_return_reason_other,
      transfer_office: p_applicant_persons__0.transfer_office,
      transfer_office_name_kanji: p_applicant_persons__0.transfer_office_name_kanji,
      transfer_office_name_kana: p_applicant_persons__0.transfer_office_name_kana,
      transfer_office_phone: p_applicant_persons__0.transfer_office_phone,
      transfer_office_postal_code: p_applicant_persons__0.transfer_office_postal_code,
      transfer_office_prefecture_kanji: p_applicant_persons__0.transfer_office_prefecture_kanji,
      transfer_office_city_kanji: p_applicant_persons__0.transfer_office_city_kanji,
      transfer_office_district_kanji: p_applicant_persons__0.transfer_office_district_kanji,
      transfer_office_other_address_kanji: p_applicant_persons__0.transfer_office_other_address_kanji,
      maternity_paternity_leave: p_applicant_persons__0.maternity_paternity_leave,
      maternity_paternity_leave_start_date: p_applicant_persons__0.maternity_paternity_leave_start_date,
      maternity_paternity_leave_end_date: p_applicant_persons__0.maternity_paternity_leave_end_date,
      nursing_leave: p_applicant_persons__0.nursing_leave,
      office_employment_type: p_applicant_persons__0.office_employment_type,
      office_name_kana: p_applicant_persons__0.office_name_kana,
      office_role: p_applicant_persons__0.office_role,
      office_head_location: p_applicant_persons__0.office_head_location,
      office_listed_division: p_applicant_persons__0.office_listed_division,
      office_establishment_date: p_applicant_persons__0.office_establishment_date,
      office_capital_stock: p_applicant_persons__0.office_capital_stock,
      main_income_source: p_applicant_persons__0.main_income_source,
      before_last_year_bonus_income: p_applicant_persons__0.before_last_year_bonus_income,
    },
  };
  const updateApply = useApUpdateApplyInfo();
  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__0: {
        ...diffObj(initialValues.p_applicant_persons__0, values.p_applicant_persons__0),
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

  const temp = useRecoilValue(preliminaryAotm);
  console.log(temp);
  useEffect(() => {
    console.log(999, isMCJ);
    console.log(formik.values);
  }, [formik.values]);
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
          <EditRow label={'ご職業'} isRequired error={formik.errors?.p_applicant_persons__0?.office_occupation}>
            {isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__0.office_occupation"
                options={occupationOptions}
                onChange={(value) => {
                  if (value === '12') {
                    formik.setFieldValue('p_applicant_persons__0.office_phone', '');
                  }
                  if (value === '99') {
                    formik.setFieldValue('p_applicant_persons__0.office_occupation_other', '');
                  }
                }}
              />
            ) : (
              occupationOptions.find((item) => item.value === formik.values.p_applicant_persons__0.office_occupation)
                ?.label
            )}
          </EditRow>
          {formik.values.p_applicant_persons__0.office_occupation === '99' && (
            <EditRow
              label={'勤務先　職業（その他）'}
              isLogicRequired
              error={formik.errors?.p_applicant_persons__0?.office_occupation_other}
            >
              {isEditable ? (
                <AdEditInput name="p_applicant_persons__0.office_occupation_other" convertFullWidth />
              ) : (
                formik.values.p_applicant_persons__0.office_occupation_other
              )}
            </EditRow>
          )}
          <EditRow label={'業種'} error={formik.errors?.p_applicant_persons__0?.office_industry}>
            {isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__0.office_industry"
                options={industryOptions}
                onChange={(value) => {
                  if (value === '99') {
                    formik.setFieldValue('p_applicant_persons__0.office_industry_other', '');
                  }
                }}
              />
            ) : (
              industryOptions.find((item) => item.value === formik.values.p_applicant_persons__0.office_industry)?.label
            )}
          </EditRow>
          {formik.values.p_applicant_persons__0.office_industry === '99' && (
            <EditRow
              label={'勤務先　業種（その他）'}
              isLogicRequired
              error={formik.errors?.p_applicant_persons__0?.office_industry_other}
            >
              {isEditable ? (
                <AdEditInput name="p_applicant_persons__0.office_industry_other" convertFullWidth />
              ) : (
                formik.values.p_applicant_persons__0.office_industry_other
              )}
            </EditRow>
          )}
          <EditRow label={'職種'} error={formik.errors?.p_applicant_persons__0?.office_occupation_detail}>
            {isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__0.office_occupation_detail"
                options={occupationDetailOptions}
                onChange={(value) => {
                  if (value === '99') {
                    formik.setFieldValue('p_applicant_persons__0.office_occupation_detail_other', '');
                  }
                }}
              />
            ) : (
              occupationDetailOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__0.office_occupation_detail
              )?.label
            )}
          </EditRow>
          {formik.values.p_applicant_persons__0.office_occupation_detail === '99' && (
            <EditRow
              label={'勤務先　職種（その他）'}
              isLogicRequired
              error={formik.errors?.p_applicant_persons__0?.office_occupation_detail_other}
            >
              {isEditable ? (
                <AdEditInput name="p_applicant_persons__0.office_occupation_detail_other" convertFullWidth />
              ) : (
                formik.values.p_applicant_persons__0.office_occupation_detail_other
              )}
            </EditRow>
          )}
          <EditRow
            label={'雇用形態'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_employment_type}
          ></EditRow>
          <EditRow label={'勤務先名'} isRequired error={formik.errors?.p_applicant_persons__0?.office_name_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_name_kanji
            )}
          </EditRow>
          <EditRow
            label={'勤務先名（フリガナ）'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_name_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_name_kana
            )}
          </EditRow>
          <EditRow label={'所属部課'} error={formik.errors?.p_applicant_persons__0?.office_department}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_department" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_department
            )}
          </EditRow>
          <EditRow label={'役職'} isAddendum error={formik.errors?.p_applicant_persons__0?.office_role}></EditRow>
          <EditRow label={'勤務先の電話番号'} isRequired error={formik.errors?.p_applicant_persons__0?.office_phone}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_phone" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_phone
            )}
          </EditRow>
          <EditRow
            label={'勤務先本社所在地'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_head_location}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_head_location" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_head_location
            )}
          </EditRow>
          <EditRow
            label={'勤務先上場区分'}
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_listed_division}
          ></EditRow>
          <EditRow
            label={'勤務先設立年月日'}
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_establishment_date}
          >
            {isEditable ? (
              <AdYmdInput name="p_application_headers.office_establishment_date" />
            ) : (
              formatJapanDate(formik.values.p_application_headers.office_establishment_date)
            )}
          </EditRow>
          <EditRow
            label={'勤務先資本金'}
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_capital_stock}
          ></EditRow>
          <EditRow label={'郵便番号'} isRequired error={formik.errors?.p_applicant_persons__0?.office_postal_code}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_postal_code" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_postal_code
            )}
          </EditRow>
          <EditRow label={'都道府県'} isRequired error={formik.errors?.p_applicant_persons__0?.office_prefecture_kanji}>
            {isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.office_prefecture_kanji" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_applicant_persons__0.tax_return)?.label
            )}
          </EditRow>
          <EditRow label={'市区郡'} error={formik.errors?.p_applicant_persons__0?.office_city_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_city_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_city_kanji
            )}
          </EditRow>
          <EditRow label={'町村丁目'} error={formik.errors?.p_applicant_persons__0?.office_district_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_district_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_district_kanji
            )}
          </EditRow>
          <EditRow
            label={'丁目以下・建物名・部屋番号'}
            error={formik.errors?.p_applicant_persons__0?.office_other_address_kanji}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_other_address_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_other_address_kanji
            )}
          </EditRow>
          <EditRow
            label={'都道府県（フリガナ）'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_prefecture_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_prefecture_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_prefecture_kana
            )}
          </EditRow>
          <EditRow
            label={'市区郡（フリガナ）'}
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_city_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_city_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_city_kana
            )}
          </EditRow>
          <EditRow
            label={'町村丁目（フリガナ）'}
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_district_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_district_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_district_kana
            )}
          </EditRow>
          <EditRow
            label={'丁目以下・建物名・部屋番号（フリガナ）'}
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.office_other_address_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.office_other_address_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.office_other_address_kana
            )}
          </EditRow>
          <EditRow label={'従業員数'} isRequired error={formik.errors?.p_applicant_persons__0?.office_employee_num}>
            {isEditable ? (
              <AdNumericInput name="p_borrowing_details__1.office_employee_num" maxLength={6} unit={' 名'} />
            ) : (
              formik.values.p_borrowing_details__1.office_employee_num &&
              `${Number(formik.values.p_borrowing_details__1.office_employee_num).toLocaleString()} 名`
            )}
          </EditRow>
          <EditRow label={'入社年月'} error={formik.errors?.p_applicant_persons__0?.office_joining_date}>
            {isEditable ? (
              <MonthPicker name="p_application_headers.office_joining_date" yearOptions={officeJoiningDateOptions} />
            ) : (
              formatJapanDate(formik.values.p_application_headers.office_joining_date, true)
            )}
          </EditRow>
          <EditRow label={'前年度年収'} isRequired error={formik.errors?.p_applicant_persons__0?.last_year_income}>
            {isEditable ? (
              <AdNumericInput name="p_applicant_persons__0.last_year_income" maxLength={6} />
            ) : (
              formik.values.p_applicant_persons__0.last_year_income &&
              `${Number(formik.values.p_applicant_persons__0.last_year_income).toLocaleString()}万円`
            )}
          </EditRow>
          {isMCJ && (
            <Stack>
              <EditRow
                label={'うち、ボーナス'}
                isRequired
                error={formik.errors?.p_applicant_persons__0?.last_year_bonus_income}
              >
                {isEditable ? (
                  <AdNumericInput name="p_applicant_persons__0.last_year_bonus_income" maxLength={6} />
                ) : (
                  formik.values.p_applicant_persons__0.last_year_bonus_income &&
                  `${Number(formik.values.p_applicant_persons__0.last_year_bonus_income).toLocaleString()}万円`
                )}
              </EditRow>
              <EditRow
                label={'前々年度年収 （MCJ固有項目）'}
                isRequired
                error={formik.errors?.p_applicant_persons__0?.before_last_year_bonus_income}
              >
                {isEditable ? (
                  <AdNumericInput name="p_applicant_persons__0.before_last_year_bonus_income" maxLength={6} />
                ) : (
                  formik.values.p_applicant_persons__0.before_last_year_bonus_income &&
                  `${Number(formik.values.p_applicant_persons__0.before_last_year_bonus_income).toLocaleString()}万円`
                )}
              </EditRow>
            </Stack>
          )}

          <EditRow label={'収入源'} error={formik.errors?.p_applicant_persons__0?.income_sources}>
            {isEditable ? (
              <AdSelectCheckbox name="p_applicant_persons__0.income_sources" options={incomeOptions} />
            ) : (
              incomeOptions
                .map((item) =>
                  formik.values.p_applicant_persons__0.income_sources.includes(item.value) ? item.label : null
                )
                .filter((item) => item)
                .join('・')
            )}
          </EditRow>
          <EditRow
            label={'収入源（銀行送信用）'}
            isRequired
            error={formik.errors?.p_applicant_persons__0?.main_income_source}
          >
            {isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.main_income_source" options={incomeOptions} />
            ) : (
              incomeOptions.find((item) => item.value === formik.values.p_applicant_persons__0.main_income_source)
                ?.label
            )}
          </EditRow>
          <EditRow label={'確定申告をしていますか？'} error={formik.errors?.p_applicant_persons__0?.tax_return}>
            {isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__0.tax_return"
                options={taxReturnOptions}
                onChange={(value) => {
                  if (value === '0') {
                    formik.setFieldValue('p_applicant_persons__0.tax_return_reasons', []);
                    formik.setFieldValue('p_applicant_persons__0.tax_return_reason_other', '');
                    formik.setFieldTouched('p_applicant_persons__0.tax_return_reasons', false);
                    formik.setFieldTouched('p_applicant_persons__0.tax_return_reason_other', false);
                  }
                }}
              />
            ) : (
              taxReturnOptions.find((item) => item.value === formik.values.p_applicant_persons__0.tax_return)?.label
            )}
          </EditRow>
          {formik.values.p_applicant_persons__0.tax_return === '1' && (
            <Stack>
              <EditRow
                label={'確定申告の理由'}
                isLogicRequired
                error={formik.errors?.p_applicant_persons__0?.tax_return_reasons}
              >
                {isEditable ? (
                  <AdSelectCheckbox
                    name="p_applicant_persons__0.tax_return_reasons"
                    options={taxReturnReasonsOptions}
                  />
                ) : (
                  taxReturnReasonsOptions
                    .map((item) =>
                      formik.values.p_applicant_persons__0.tax_return_reasons.includes(item.value) ? item.label : null
                    )
                    .filter((item) => item)
                    .join('・')
                )}
              </EditRow>
              {formik.values.p_applicant_persons__0.tax_return_reasons.includes('99') && (
                <EditRow
                  label={'確定申告の理由　その他'}
                  isLogicRequired
                  error={formik.errors?.p_applicant_persons__0?.tax_return_reason_other}
                >
                  {isEditable ? (
                    <AdEditInput name="p_applicant_persons__0.tax_return_reason_other" convertFullWidth />
                  ) : (
                    formik.values.p_applicant_persons__0.tax_return_reason_other
                  )}
                </EditRow>
              )}
            </Stack>
          )}

          <EditRow
            label={'現在、出向（派遣）していますか？'}
            isLogicRequired
            error={formik.errors?.p_applicant_persons__0?.transfer_office}
          >
            {isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__0.transfer_office"
                options={transferOfficeOptions}
                onChange={(value) => {
                  if (value === '0') {
                    formik.setFieldValue('p_applicant_persons__0.transfer_office_name_kanji', '');
                    formik.setFieldValue('p_applicant_persons__0.transfer_office_name_kana', '');
                    formik.setFieldValue('p_applicant_persons__0.transfer_office_phone', '');

                    formik.setFieldTouched('p_applicant_persons__0.transfer_office_name_kanji', false);
                    formik.setFieldTouched('p_applicant_persons__0.transfer_office_name_kana', false);
                    formik.setFieldTouched('p_applicant_persons__0.transfer_office_phone', false);
                  }
                }}
              />
            ) : (
              transferOfficeOptions.find((item) => item.value === formik.values.p_applicant_persons__0.transfer_office)
                ?.label
            )}
          </EditRow>
          {formik.values.p_applicant_persons__0.transfer_office === '1' && (
            <Stack>
              <EditRow
                label={'出向（派遣）勤務先名'}
                isLogicRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_name_kanji}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_name_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_name_kanji
                )}
              </EditRow>
              <EditRow
                label={'出向（派遣）勤務先名（フリガナ）'}
                isLogicRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_name_kana}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_name_kana" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_name_kana
                )}
              </EditRow>
              <EditRow
                label={'出向（派遣）先 電話番号'}
                isLogicRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_phone}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_phone" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_phone
                )}
              </EditRow>
              <EditRow
                label={'出向（派遣）先 郵便番号'}
                isLogicRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_postal_code}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_postal_code" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_postal_code
                )}
              </EditRow>
              <EditRow
                label={'出向（派遣）先 都道府県'}
                isLogicRequired
                error={formik.errors?.p_applicant_persons__0?.last_name_kanji}
              ></EditRow>
              <EditRow
                label={'出向（派遣）先 市区郡'}
                isRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_city_kanji}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_city_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_city_kanji
                )}
              </EditRow>
              <EditRow
                label={'出向（派遣）先 町村丁目'}
                isRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_district_kanji}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_district_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_district_kanji
                )}
              </EditRow>
              <EditRow
                label={'出向（派遣）先 丁目以下・建物名・部屋番号'}
                isRequired
                error={formik.errors?.p_applicant_persons__0?.transfer_office_other_address_kanji}
              >
                {isEditable ? (
                  <AdEditInput name="p_applicant_persons__0.transfer_office_other_address_kanji" convertFullWidth />
                ) : (
                  formik.values.p_applicant_persons__0.transfer_office_other_address_kanji
                )}
              </EditRow>
            </Stack>
          )}

          <EditRow
            label={'産休・育休の取得状況'}
            error={formik.errors?.p_applicant_persons__0?.maternity_paternity_leave}
          >
            {isEditable ? (
              <AdSelectRadios
                name="p_applicant_persons__0.maternity_paternity_leave"
                options={maternityPaternityLeaveOptions}
                onChange={() => {
                  formik.setFieldValue('p_applicant_persons__0.maternity_paternity_leave_start_date', '');
                  formik.setFieldValue('p_applicant_persons__0.maternity_paternity_leave_end_date', '');
                }}
              />
            ) : (
              maternityPaternityLeaveOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__0.maternity_paternity_leave
              )?.label
            )}
          </EditRow>
          <EditRow
            label={'取得開始時期'}
            isLogicRequired
            error={formik.errors?.p_applicant_persons__0?.maternity_paternity_leave_start_date}
          >
            {isEditable ? (
              <MonthPicker
                name="p_application_headers.maternity_paternity_leave_start_date"
                yearOptions={
                  formik.values.p_applicant_persons__0.maternity_paternity_leave === '1'
                    ? leaveStatusUpYearOptions
                    : leaveStatusDownYearOptions
                }
              />
            ) : (
              formatJapanDate(formik.values.p_application_headers.maternity_paternity_leave_start_date, true)
            )}
          </EditRow>
          <EditRow
            label={'取得終了時期'}
            isLogicRequired
            error={formik.errors?.p_applicant_persons__0?.maternity_paternity_leave_end_date}
          >
            {isEditable ? (
              <MonthPicker
                name="p_application_headers.maternity_paternity_leave_end_date"
                yearOptions={
                  formik.values.p_applicant_persons__0.maternity_paternity_leave === '1' ||
                  formik.values.p_applicant_persons__0.maternity_paternity_leave === '2'
                    ? leaveStatusUpYearOptions
                    : leaveStatusDownYearOptions
                }
              />
            ) : (
              formatJapanDate(formik.values.p_application_headers.maternity_paternity_leave_end_date, true)
            )}
          </EditRow>
          <EditRow label={'介護休暇の取得状況'} error={formik.errors?.p_applicant_persons__0?.nursing_leave}>
            {isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.nursing_leave" options={nursingLeaveOptions} />
            ) : (
              nursingLeaveOptions.find((item) => item.value === formik.values.p_applicant_persons__0.nursing_leave)
                ?.label
            )}
          </EditRow>
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
