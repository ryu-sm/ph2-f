import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, localApplication } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApCheckboxButtonGroup,
  ApErrorScroll,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApPhoneInputField,
  ApRadioColumnGroup,
  ApRadioRowGroup,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYm,
  ApStarHelp,
  ApTextInputField,
  ApUpdateApply,
  ApZipCodeInputField,
} from '@/components';
import { Stack, Typography } from '@mui/material';
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
import { API_500_ERROR, PREFECTURES } from '@/constant';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { routeNames } from '@/router/settings';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';

export const ApStep03Page = () => {
  const { updateSendedInfo } = useApplicationContext();
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { agentSended } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { isMCJ, apNextStepId, apPreStepId, p_applicant_persons__0 } = localApplicationInfo;
  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_applicant_persons__0: {
          ...pre.p_applicant_persons__0,
          office_occupation: values.p_applicant_persons__0.office_occupation,
          office_occupation_other: values.p_applicant_persons__0.office_occupation_other,
          office_industry: values.p_applicant_persons__0.office_industry,
          office_industry_other: values.p_applicant_persons__0.office_industry_other,
          office_occupation_detail: values.p_applicant_persons__0.office_occupation_detail,
          office_occupation_detail_other: values.p_applicant_persons__0.office_occupation_detail_other,
          office_name_kanji: values.p_applicant_persons__0.office_name_kanji,
          office_department: values.p_applicant_persons__0.office_department,
          office_phone: values.p_applicant_persons__0.office_phone,
          office_postal_code: values.p_applicant_persons__0.office_postal_code,
          office_prefecture_kanji: values.p_applicant_persons__0.office_prefecture_kanji,
          office_city_kanji: values.p_applicant_persons__0.office_city_kanji,
          office_district_kanji: values.p_applicant_persons__0.office_district_kanji,
          office_other_address_kanji: values.p_applicant_persons__0.office_other_address_kanji,
          office_prefecture_kana: values.p_applicant_persons__0.office_prefecture_kana,
          office_city_kana: values.p_applicant_persons__0.office_city_kana,
          office_district_kana: values.p_applicant_persons__0.office_district_kana,
          office_employee_num: values.p_applicant_persons__0.office_employee_num,
          office_joining_date: values.p_applicant_persons__0.office_joining_date,
          last_year_income: values.p_applicant_persons__0.last_year_income,
          last_year_bonus_income: values.p_applicant_persons__0.last_year_bonus_income,
          before_last_year_income: values.p_applicant_persons__0.before_last_year_income,
          income_sources: values.p_applicant_persons__0.income_sources,
          tax_return: values.p_applicant_persons__0.tax_return,
          tax_return_reasons: values.p_applicant_persons__0.tax_return_reasons,
          tax_return_reason_other: values.p_applicant_persons__0.tax_return_reason_other,
          transfer_office: values.p_applicant_persons__0.transfer_office,
          transfer_office_name_kanji: values.p_applicant_persons__0.transfer_office_name_kanji,
          transfer_office_name_kana: values.p_applicant_persons__0.transfer_office_name_kana,
          transfer_office_phone: values.p_applicant_persons__0.transfer_office_phone,
          transfer_office_postal_code: values.p_applicant_persons__0.transfer_office_postal_code,
          transfer_office_prefecture_kanji: values.p_applicant_persons__0.transfer_office_prefecture_kanji,
          transfer_office_city_kanji: values.p_applicant_persons__0.transfer_office_city_kanji,
          transfer_office_district_kanji: values.p_applicant_persons__0.transfer_office_district_kanji,
          transfer_office_other_address_kanji: values.p_applicant_persons__0.transfer_office_other_address_kanji,
          maternity_paternity_leave: values.p_applicant_persons__0.maternity_paternity_leave,
          maternity_paternity_leave_start_date: values.p_applicant_persons__0.maternity_paternity_leave_start_date,
          maternity_paternity_leave_end_date: values.p_applicant_persons__0.maternity_paternity_leave_end_date,
          nursing_leave: values.p_applicant_persons__0.nursing_leave,
        },
      };
    });
  };
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
      office_employee_num: p_applicant_persons__0.office_employee_num,
      office_joining_date: p_applicant_persons__0.office_joining_date,
      last_year_income: p_applicant_persons__0.last_year_income,
      before_last_year_income: p_applicant_persons__0.before_last_year_income,
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
    },
  };

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
      try {
        if (agentSended) {
          await updateSendedInfo(setUpdateData(values));
          updateModal.onTrue();
        } else {
          setLocalData(values);
          navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apNextStepId}`);
        }
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      setLocalData(formik.values);
      navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apPreStepId}`);
    }
  };

  const { dbData } = useApplicationContext();

  useEffect(() => {
    if (agentSended && dbData) {
      const newData = {
        p_applicant_persons__0: {
          office_occupation: dbData?.p_applicant_persons__0?.office_occupation,
          office_occupation_other: dbData?.p_applicant_persons__0?.office_occupation_other,
          office_industry: dbData?.p_applicant_persons__0?.office_industry,
          office_industry_other: dbData?.p_applicant_persons__0?.office_industry_other,
          office_occupation_detail: dbData?.p_applicant_persons__0?.office_occupation_detail,
          office_occupation_detail_other: dbData?.p_applicant_persons__0?.office_occupation_detail_other,
          office_name_kanji: dbData?.p_applicant_persons__0?.office_name_kanji,
          office_department: dbData?.p_applicant_persons__0?.office_department,
          office_phone: dbData?.p_applicant_persons__0?.office_phone,
          office_postal_code: dbData?.p_applicant_persons__0?.office_postal_code,
          office_prefecture_kanji: dbData?.p_applicant_persons__0?.office_prefecture_kanji,
          office_city_kanji: dbData?.p_applicant_persons__0?.office_city_kanji,
          office_district_kanji: dbData?.p_applicant_persons__0?.office_district_kanji,
          office_other_address_kanji: dbData?.p_applicant_persons__0?.office_other_address_kanji,
          office_prefecture_kana: dbData?.p_applicant_persons__0?.office_prefecture_kana,
          office_city_kana: dbData?.p_applicant_persons__0?.office_city_kana,
          office_district_kana: dbData?.p_applicant_persons__0?.office_district_kana,
          office_employee_num: dbData?.p_applicant_persons__0?.office_employee_num,
          office_joining_date: dbData?.p_applicant_persons__0?.office_joining_date,
          last_year_income: dbData?.p_applicant_persons__0?.last_year_income,
          before_last_year_income: dbData?.p_applicant_persons__0?.before_last_year_income,
          last_year_bonus_income: dbData?.p_applicant_persons__0?.last_year_bonus_income,
          income_sources: dbData?.p_applicant_persons__0?.income_sources,
          tax_return: dbData?.p_applicant_persons__0?.tax_return,
          tax_return_reasons: dbData?.p_applicant_persons__0?.tax_return_reasons,
          tax_return_reason_other: dbData?.p_applicant_persons__0?.tax_return_reason_other,
          transfer_office: dbData?.p_applicant_persons__0?.transfer_office,
          transfer_office_name_kanji: dbData?.p_applicant_persons__0?.transfer_office_name_kanji,
          transfer_office_name_kana: dbData?.p_applicant_persons__0?.transfer_office_name_kana,
          transfer_office_phone: dbData?.p_applicant_persons__0?.transfer_office_phone,
          transfer_office_postal_code: dbData?.p_applicant_persons__0?.transfer_office_postal_code,
          transfer_office_prefecture_kanji: dbData?.p_applicant_persons__0?.transfer_office_prefecture_kanji,
          transfer_office_city_kanji: dbData?.p_applicant_persons__0?.transfer_office_city_kanji,
          transfer_office_district_kanji: dbData?.p_applicant_persons__0?.transfer_office_district_kanji,
          transfer_office_other_address_kanji: dbData?.p_applicant_persons__0?.transfer_office_other_address_kanji,
          maternity_paternity_leave: dbData?.p_applicant_persons__0?.maternity_paternity_leave,
          maternity_paternity_leave_start_date: dbData?.p_applicant_persons__0?.maternity_paternity_leave_start_date,
          maternity_paternity_leave_end_date: dbData?.p_applicant_persons__0?.maternity_paternity_leave_end_date,
          nursing_leave: dbData?.p_applicant_persons__0?.nursing_leave,
        },
      };
      formik.setValues(newData);
    }
  }, [dbData]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout
        hasMenu
        hasStepBar
        bottomContent={
          <>
            <ApSaveDraftButton pageInfo={parseVaildData} />
            <ApStepFooter
              left={handelLeft}
              right={formik.handleSubmit}
              rightLabel={agentSended && '保存'}
              rightDisable={formik.isSubmitting}
            />
          </>
        }
      >
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle py={8}>{`あなたのご職業について\n教えてください。`}</ApPageTitle>
        <ApItemGroup label={'ご職業'}>
          <Stack spacing={3}>
            <ApSelectField
              name="p_applicant_persons__0.office_occupation"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={occupationOptions}
              onChange={(e) => {
                if (e.target.value === '12') {
                  formik.setFieldValue('p_applicant_persons__0.office_phone', '');
                }
                if (e.target.value === '99') {
                  formik.setFieldValue('p_applicant_persons__0.office_occupation_other', '');
                }
              }}
            />
            {formik.values.p_applicant_persons__0.office_occupation === '99' && (
              <Stack spacing={'6px'}>
                <Typography variant="note" color={'text.main'}>
                  ※その他の方は詳細を入力ください。
                </Typography>
                <ApTextInputField
                  name="p_applicant_persons__0.office_occupation_other"
                  placeholder={'入力してください'}
                  convertFullWidth
                />
              </Stack>
            )}
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'業種'}>
          <Stack spacing={3}>
            <ApSelectField
              name="p_applicant_persons__0.office_industry"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={industryOptions}
              onChange={(e) => {
                if (e.target.value === '99') {
                  formik.setFieldValue('p_applicant_persons__0.office_industry_other', '');
                }
              }}
            />
            {formik.values.p_applicant_persons__0.office_industry === '99' && (
              <Stack spacing={'6px'}>
                <Typography variant="note" color={'text.main'}>
                  ※その他の方は詳細を入力ください。
                </Typography>
                <ApTextInputField
                  name="p_applicant_persons__0.office_industry_other"
                  placeholder={'入力してください'}
                  convertFullWidth
                />
              </Stack>
            )}
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'職種'}>
          <Stack spacing={3}>
            <ApSelectField
              name="p_applicant_persons__0.office_occupation_detail"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={occupationDetailOptions}
              onChange={(e) => {
                if (e.target.value === '99') {
                  formik.setFieldValue('p_applicant_persons__0.office_occupation_detail_other', '');
                }
              }}
            />
            {formik.values.p_applicant_persons__0.office_occupation_detail === '99' && (
              <Stack spacing={'6px'}>
                <Typography variant="note" color={'text.main'}>
                  ※その他の方は詳細を入力ください。
                </Typography>
                <ApTextInputField
                  name="p_applicant_persons__0.office_occupation_detail_other"
                  placeholder={'入力してください'}
                  convertFullWidth
                />
              </Stack>
            )}
          </Stack>
        </ApItemGroup>

        <ApItemGroup label={'勤務先名'}>
          <ApTextInputField
            name="p_applicant_persons__0.office_name_kanji"
            placeholder={'例：株式会社○○○○○'}
            convertFullWidth
          />
        </ApItemGroup>
        {formik.values.p_applicant_persons__0.office_occupation !== '5' && (
          <ApItemGroup label={'所属部課'}>
            <Stack spacing={'6px'}>
              <ApTextInputField
                name="p_applicant_persons__0.office_department"
                placeholder={'例：○○部'}
                convertFullWidth
              />
              <ApStarHelp label={'所属部課が無い方は「なし」とご入力ください。'} />
            </Stack>
          </ApItemGroup>
        )}

        <ApItemGroup label={'勤務先の電話番号'}>
          <Stack spacing={'6px'}>
            <ApPhoneInputField name="p_applicant_persons__0.office_phone" />
            <Stack spacing={'6px'}>
              <ApStarHelp label={'半角数字でご入力ください。'} />
              <ApStarHelp label={'現在所属する部署の電話番号をご入力ください。'} />
            </Stack>
          </Stack>
        </ApItemGroup>

        <ApItemGroup label={'勤務先の住所'} note={'※実際に勤務している事業所の住所をご入力ください'}>
          <Stack spacing={4}>
            <ApZipCodeInputField
              name="p_applicant_persons__0.office_postal_code"
              setPrefectureKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_prefecture_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.office_prefecture_kanji', touched);
              }}
              setCityKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_city_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.office_city_kanji', touched);
              }}
              setDistrictKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_district_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.office_district_kanji', touched);
              }}
              setOtherAddressKanji={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_other_address_kanji', value);
                formik.setFieldTouched('p_applicant_persons__0.office_other_address_kanji', touched);
              }}
              setPrefectureKana={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_prefecture_kana', value);
                formik.setFieldTouched('p_applicant_persons__0.office_prefecture_kana', touched);
              }}
              setCityKana={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_city_kana', value);
                formik.setFieldTouched('p_applicant_persons__0.office_city_kana', touched);
              }}
              setDistrictKana={(value, touched) => {
                formik.setFieldValue('p_applicant_persons__0.office_district_kana', value);
                formik.setFieldTouched('p_applicant_persons__0.office_district_kana', touched);
              }}
            />
            <ApSelectField
              name="p_applicant_persons__0.office_prefecture_kanji"
              options={PREFECTURES}
              placeholder={'----'}
              width={110}
              label={'都道府県'}
            />
            <ApTextInputField
              name="p_applicant_persons__0.office_city_kanji"
              placeholder={'例：港区'}
              label={'市区郡　（例：港区）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0.office_district_kanji"
              placeholder={'例：芝浦４丁目'}
              label={'町村丁目（例：芝浦４丁目）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0.office_other_address_kanji"
              placeholder={'例：12-38　キャナルゲート芝浦605号室'}
              label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
              convertFullWidth
            />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'従業員数'}>
          <ApNumberInputField
            name="p_applicant_persons__0.office_employee_num"
            unit={'名'}
            placeholder={'0'}
            width={156}
            maxLength={9}
          />
        </ApItemGroup>
        <ApItemGroup label={'入社年月'}>
          <ApSelectFieldYm name="p_applicant_persons__0.office_joining_date" yearOptions={officeJoiningDateOptions} />
        </ApItemGroup>
        <ApItemGroup label={'ご年収'}>
          <Stack
            sx={{
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: 'primary.main',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Stack
              sx={{
                bgcolor: 'white',
                borderRadius: '7px',
              }}
            >
              <ApItemGroup label={'前年度年収'} pb={3} px={2} borderTopRightRadius={'7px'} borderTopLeftRadius={'7px'}>
                <Stack spacing={3}>
                  <ApNumberInputField
                    name="p_applicant_persons__0.last_year_income"
                    placeholder={'0'}
                    unit={'万円'}
                    width={156}
                    maxLength={6}
                  />
                  {isMCJ && (
                    <ApNumberInputField
                      name="p_applicant_persons__0.last_year_bonus_income"
                      label={
                        <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                          <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
                            うち、ボーナス
                          </Typography>
                          <Typography variant="note" color={'text.main'} lineHeight={'130%'}>
                            （MCJ固有項目）
                          </Typography>
                        </Stack>
                      }
                      placeholder={'0'}
                      unit={'万円'}
                      width={156}
                      maxLength={6}
                    />
                  )}
                </Stack>
              </ApItemGroup>
              {isMCJ && (
                <ApItemGroup
                  label={
                    <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                      <Typography variant="form_item_label" color={'text.main'}>
                        前々年度の年収
                      </Typography>
                      <Typography variant="note" color={'text.main'}>
                        （MCJ固有項目）
                      </Typography>
                    </Stack>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_applicant_persons__0.before_last_year_income"
                    placeholder={'0'}
                    unit={'万円'}
                    width={156}
                    maxLength={6}
                  />
                </ApItemGroup>
              )}

              <ApItemGroup
                label={
                  <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                    <Typography variant="form_item_label" color={'text.main'}>
                      収入源
                    </Typography>
                    <Typography variant="note" color={'text.main'}>
                      ※複数選択可
                    </Typography>
                  </Stack>
                }
              >
                <ApCheckboxButtonGroup name="p_applicant_persons__0.income_sources" options={incomeOptions} />
              </ApItemGroup>

              <ApItemGroup label={'確定申告をしていますか？'}>
                <ApRadioRowGroup
                  name="p_applicant_persons__0.tax_return"
                  options={taxReturnOptions}
                  onChange={(e) => {
                    if (e.target.value === '0') {
                      formik.setFieldValue('p_applicant_persons__0.tax_return_reasons', []);
                      formik.setFieldValue('p_applicant_persons__0.tax_return_reason_other', '');
                      formik.setFieldTouched('p_applicant_persons__0.tax_return_reasons', false);
                      formik.setFieldTouched('p_applicant_persons__0.tax_return_reason_other', false);
                    }
                  }}
                />
              </ApItemGroup>
              {formik.values.p_applicant_persons__0.tax_return === '1' && (
                <ApItemGroup
                  label={
                    <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                      <Typography variant="form_item_label" color={'text.main'}>
                        確定申告の理由
                      </Typography>
                      <Typography variant="note" color={'text.main'}>
                        ※複数選択可
                      </Typography>
                    </Stack>
                  }
                >
                  <Stack spacing={3}>
                    <ApCheckboxButtonGroup
                      name="p_applicant_persons__0.tax_return_reasons"
                      options={taxReturnReasonsOptions}
                    />
                    {formik.values.p_applicant_persons__0.tax_return_reasons.includes('99') && (
                      <Stack spacing={'6px'}>
                        <Typography variant="note" color={'text.main'}>
                          ※その他の方は詳細を入力ください。
                        </Typography>
                        <ApTextInputField
                          name="p_applicant_persons__0.tax_return_reason_other"
                          placeholder={'入力してください'}
                          convertFullWidth
                        />
                      </Stack>
                    )}
                  </Stack>
                </ApItemGroup>
              )}
            </Stack>
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現在、出向（派遣）していますか？'}>
          <Stack spacing={3}>
            <ApRadioRowGroup
              name="p_applicant_persons__0.transfer_office"
              options={transferOfficeOptions}
              onChange={(e) => {
                if (e.target.value === '0') {
                  formik.setFieldValue('p_applicant_persons__0.transfer_office_name_kanji', '');
                  formik.setFieldValue('p_applicant_persons__0.transfer_office_name_kana', '');
                  formik.setFieldValue('p_applicant_persons__0.transfer_office_phone', '');

                  formik.setFieldTouched('p_applicant_persons__0.transfer_office_name_kanji', false);
                  formik.setFieldTouched('p_applicant_persons__0.transfer_office_name_kana', false);
                  formik.setFieldTouched('p_applicant_persons__0.transfer_office_phone', false);
                }
              }}
            />
            {formik.values.p_applicant_persons__0.transfer_office === '1' && (
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
                    出向（派遣）勤務先の情報
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '7px',
                  }}
                >
                  <ApItemGroup label={'出向（派遣）勤務先名'} pb={3} px={2}>
                    <ApTextInputField
                      name="p_applicant_persons__0.transfer_office_name_kanji"
                      placeholder={'例：株式会社○○○○○'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'出向（派遣）勤務先名（フリガナ）'} pb={3} px={2}>
                    <ApTextInputField
                      name="p_applicant_persons__0.transfer_office_name_kana"
                      placeholder={'例：カブシキガイシャ○○○○○'}
                      convertFullWidt
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'出向（派遣）先　電話番号'}>
                    <Stack spacing={'6px'}>
                      <ApPhoneInputField name="p_applicant_persons__0.transfer_office_phone" />
                      <ApStarHelp label={'半角数字でご入力ください。'} />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup label={'出向（派遣）先　住所'}>
                    <Stack spacing={4}>
                      <ApZipCodeInputField
                        name="p_applicant_persons__0.transfer_office_postal_code"
                        setPrefectureKanji={(value, touched) => {
                          formik.setFieldValue('p_applicant_persons__0.transfer_office_prefecture_kanji', value);
                          formik.setFieldTouched('p_applicant_persons__0.transfer_office_prefecture_kanji', touched);
                        }}
                        setCityKanji={(value, touched) => {
                          formik.setFieldValue('p_applicant_persons__0.transfer_office_city_kanji', value);
                          formik.setFieldTouched('p_applicant_persons__0.transfer_office_city_kanji', touched);
                        }}
                        setDistrictKanji={(value, touched) => {
                          formik.setFieldValue('p_applicant_persons__0.transfer_office_district_kanji', value);
                          formik.setFieldTouched('p_applicant_persons__0.transfer_office_district_kanji', touched);
                        }}
                        setOtherAddressKanji={(value, touched) => {
                          formik.setFieldValue('p_applicant_persons__0.transfer_office_other_address_kanji', value);
                          formik.setFieldTouched('p_applicant_persons__0.transfer_office_other_address_kanji', touched);
                        }}
                      />
                      <ApSelectField
                        name="p_applicant_persons__0.transfer_office_prefecture_kanji"
                        options={PREFECTURES}
                        placeholder={'----'}
                        width={110}
                        label={'都道府県'}
                      />
                      <ApTextInputField
                        name="p_applicant_persons__0.transfer_office_city_kanji"
                        placeholder={'例：港区'}
                        label={'市区郡　（例：港区）'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name="p_applicant_persons__0.transfer_office_district_kanji"
                        placeholder={'例：芝浦４丁目'}
                        label={'町村丁目（例：芝浦４丁目）'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name="p_applicant_persons__0.transfer_office_other_address_kanji"
                        placeholder={'例：12-38　キャナルゲート芝浦605号室'}
                        label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
                        convertFullWidth
                      />
                    </Stack>
                  </ApItemGroup>
                </Stack>
              </Stack>
            )}
          </Stack>
        </ApItemGroup>

        <ApItemGroup optional label={'産休・育休の取得状況'} note={'※該当する方のみお答えください。'}>
          <Stack spacing={3}>
            <ApRadioColumnGroup
              name="p_applicant_persons__0.maternity_paternity_leave"
              options={maternityPaternityLeaveOptions}
              cancelable
              onChange={() => {
                formik.setFieldValue('p_applicant_persons__0.maternity_paternity_leave_start_date', '');
                formik.setFieldValue('p_applicant_persons__0.maternity_paternity_leave_end_date', '');

                formik.setFieldTouched('p_applicant_persons__0.maternity_paternity_leave_start_date', false);
                formik.setFieldTouched('p_applicant_persons__0.maternity_paternity_leave_end_date', false);
              }}
            />

            {formik.values.p_applicant_persons__0.maternity_paternity_leave && (
              <Stack
                sx={{
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  bgcolor: 'primary.main',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Stack
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '7px',
                  }}
                >
                  <ApItemGroup
                    label={'取得開始時期'}
                    pb={3}
                    px={2}
                    borderTopRightRadius={'7px'}
                    borderTopLeftRadius={'7px'}
                  >
                    <ApSelectFieldYm
                      name="p_applicant_persons__0.maternity_paternity_leave_start_date"
                      unit={'月から'}
                      yearOptions={
                        formik.values.p_applicant_persons__0.maternity_paternity_leave === '1'
                          ? leaveStatusUpYearOptions
                          : leaveStatusDownYearOptions
                      }
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'取得終了時期'} pb={3} px={2}>
                    <ApSelectFieldYm
                      name="p_applicant_persons__0.maternity_paternity_leave_end_date"
                      unit={'月まで'}
                      yearOptions={
                        formik.values.p_applicant_persons__0.maternity_paternity_leave === '1' ||
                        formik.values.p_applicant_persons__0.maternity_paternity_leave === '2'
                          ? leaveStatusUpYearOptions
                          : leaveStatusDownYearOptions
                      }
                    />
                  </ApItemGroup>
                </Stack>
              </Stack>
            )}
          </Stack>
        </ApItemGroup>

        {isMCJ && (
          <ApItemGroup
            optional
            label={
              <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                <Typography variant="form_item_label" color={'text.main'}>
                  介護休暇の取得状況
                </Typography>
                <Typography variant="note" color={'text.main'}>
                  （MCJ固有項目）
                </Typography>
              </Stack>
            }
            note={'※該当する方のみお答えください。'}
          >
            <ApRadioColumnGroup name="p_applicant_persons__0.nursing_leave" options={nursingLeaveOptions} cancelable />
          </ApItemGroup>
        )}
      </ApLayout>
    </FormikProvider>
  );
};
