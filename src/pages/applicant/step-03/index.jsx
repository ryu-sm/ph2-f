import { ApLayout, ApStepFooter } from '@/containers';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom, isMcjSelector, userEmailSelector } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApCheckboxButton,
  ApCheckboxButtonGroup,
  ApEmailInputField,
  ApErrorScroll,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApPhoneInputField,
  ApPrimaryButton,
  ApRadioColumnGroup,
  ApRadioRowGroup,
  ApSelectField,
  ApSelectFieldYm,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApZipCodeInputField,
} from '@/components';
import { Stack, Typography } from '@mui/material';
import {
  incomeOptions,
  industryOptions,
  maternityPaternityLeaveOptions,
  nursingLeaveOptions,
  occupationDetailOptions,
  occupationOptions,
  officeJoiningDateOptions,
  taxReturnOptions,
  taxReturnReasonsOptions,
  transferOfficeOptions,
} from './options';
import { PREFECTURES } from '@/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ApStep03Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const isMCJ = useRecoilValue(isMcjSelector);
  const {
    p_applicant_persons__0__office_occupation,
    p_applicant_persons__0__office_occupation_other,
    p_applicant_persons__0__office_industry,
    p_applicant_persons__0__office_industry_other,
    p_applicant_persons__0__office_occupation_detail,
    p_applicant_persons__0__office_occupation_detail_other,
    p_applicant_persons__0__office_name_kanji,
    p_applicant_persons__0__office_department,
    p_applicant_persons__0__office_phone,
    p_applicant_persons__0__office_postal_code,
    p_applicant_persons__0__office_prefecture_kanji,
    p_applicant_persons__0__office_city_kanji,
    p_applicant_persons__0__office_district_kanji,
    p_applicant_persons__0__office_other_address_kanji,
    p_applicant_persons__0__office_employee_num,
    p_applicant_persons__0__office_joining_date,
    p_applicant_persons__0__last_year_income,
    p_applicant_persons__0__last_year_bonus_income,
    p_applicant_persons__0__income_sources,
    p_applicant_persons__0__tax_return,
    p_applicant_persons__0__tax_return_reasons,
    p_applicant_persons__0__tax_return_reason_other,
    p_applicant_persons__0__transfer_office,
    p_applicant_persons__0__transfer_office_name_kanji,
    p_applicant_persons__0__transfer_office_name_kana,
    p_applicant_persons__0__transfer_office_phone,
    p_applicant_persons__0__transfer_office_postal_code,
    p_applicant_persons__0__transfer_office_prefecture_kanji,
    p_applicant_persons__0__transfer_office_city_kanji,
    p_applicant_persons__0__transfer_office_district_kanji,
    p_applicant_persons__0__transfer_office_other_address_kanji,
    p_applicant_persons__0__maternity_paternity_leave,
    p_applicant_persons__0__maternity_paternity_leave_start_date,
    p_applicant_persons__0__maternity_paternity_leave_end_date,
    p_applicant_persons__0__nursing_leave,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      p_applicant_persons__0__office_occupation,
      p_applicant_persons__0__office_occupation_other,
      p_applicant_persons__0__office_industry,
      p_applicant_persons__0__office_industry_other,
      p_applicant_persons__0__office_occupation_detail,
      p_applicant_persons__0__office_occupation_detail_other,
      p_applicant_persons__0__office_name_kanji,
      p_applicant_persons__0__office_department,
      p_applicant_persons__0__office_phone,
      p_applicant_persons__0__office_postal_code,
      p_applicant_persons__0__office_prefecture_kanji,
      p_applicant_persons__0__office_city_kanji,
      p_applicant_persons__0__office_district_kanji,
      p_applicant_persons__0__office_other_address_kanji,
      p_applicant_persons__0__office_employee_num,
      p_applicant_persons__0__office_joining_date,
      p_applicant_persons__0__last_year_income,
      p_applicant_persons__0__last_year_bonus_income,
      p_applicant_persons__0__income_sources,
      p_applicant_persons__0__tax_return,
      p_applicant_persons__0__tax_return_reasons,
      p_applicant_persons__0__tax_return_reason_other,
      p_applicant_persons__0__transfer_office,
      p_applicant_persons__0__transfer_office_name_kanji,
      p_applicant_persons__0__transfer_office_name_kana,
      p_applicant_persons__0__transfer_office_phone,
      p_applicant_persons__0__transfer_office_postal_code,
      p_applicant_persons__0__transfer_office_prefecture_kanji,
      p_applicant_persons__0__transfer_office_city_kanji,
      p_applicant_persons__0__transfer_office_district_kanji,
      p_applicant_persons__0__transfer_office_other_address_kanji,
      p_applicant_persons__0__maternity_paternity_leave,
      p_applicant_persons__0__maternity_paternity_leave_start_date,
      p_applicant_persons__0__maternity_paternity_leave_end_date,
      p_applicant_persons__0__nursing_leave,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setApplicationInfo((pre) => {
        return { ...pre, ...values };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };

  useEffect(() => {
    if (
      formik.values.p_applicant_persons__0__office_postal_code.length === 8 &&
      !formik.errors.p_applicant_persons__0__office_postal_code
    ) {
      axios
        .get(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formik.values.p_applicant_persons__0__office_postal_code}`
        )
        .then((res) => {
          formik.setFieldValue('p_applicant_persons__0__office_prefecture_kanji', res.data.results[0].address1);
          formik.setFieldValue('p_applicant_persons__0__office_city_kanji', res.data.results[0].address2);
          formik.setFieldValue('p_applicant_persons__0__office_district_kanji', res.data.results[0].address3);
        })
        .catch(() => {
          console.log(999);
          formik.setFieldError(
            'p_applicant_persons__0__office_postal_code',
            '住所が取得できませんでした。再度入力してください。'
          );
        });
    }
  }, [
    formik.values.p_applicant_persons__0__office_postal_code,
    formik.errors.p_applicant_persons__0__office_postal_code,
  ]);

  useEffect(() => {
    if (
      formik.values.p_applicant_persons__0__transfer_office_postal_code.length === 8 &&
      !formik.errors.p_applicant_persons__0__transfer_office_postal_code
    ) {
      axios
        .get(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formik.values.p_applicant_persons__0__transfer_office_postal_code}`
        )
        .then((res) => {
          formik.setFieldValue(
            'p_applicant_persons__0__transfer_office_prefecture_kanji',
            res.data.results[0].address1
          );
          formik.setFieldValue('p_applicant_persons__0__transfer_office_city_kanji', res.data.results[0].address2);
          formik.setFieldValue('p_applicant_persons__0__transfer_office_district_kanji', res.data.results[0].address3);
        })
        .catch(() => {
          console.log(999);
          formik.setFieldError(
            'p_applicant_persons__0__transfer_office_postal_code',
            '住所が取得できませんでした。再度入力してください。'
          );
        });
    }
  }, [
    formik.values.p_applicant_persons__0__transfer_office_postal_code,
    formik.errors.p_applicant_persons__0__transfer_office_postal_code,
  ]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={38}>
        <ApPageTitle py={8}>{`あなたのご職業について\n教えてください。`}</ApPageTitle>
        <ApItemGroup label={'ご職業'}>
          <Stack spacing={3}>
            <ApSelectField
              name="p_applicant_persons__0__office_occupation"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={occupationOptions}
            />
            {formik.values.p_applicant_persons__0__office_occupation === '99' && (
              <Stack spacing={'6px'}>
                <Typography variant="note" color={'text.main'}>
                  ※その他の方は詳細を入力ください。
                </Typography>
                <ApTextInputField
                  name="p_applicant_persons__0__office_occupation_other"
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
              name="p_applicant_persons__0__office_industry"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={industryOptions}
            />
            {formik.values.p_applicant_persons__0__office_industry === '99' && (
              <Stack spacing={'6px'}>
                <Typography variant="note" color={'text.main'}>
                  ※その他の方は詳細を入力ください。
                </Typography>
                <ApTextInputField
                  name="p_applicant_persons__0__office_industry_other"
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
              name="p_applicant_persons__0__office_occupation_detail"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={occupationDetailOptions}
            />
            {formik.values.p_applicant_persons__0__office_occupation_detail === '99' && (
              <Stack spacing={'6px'}>
                <Typography variant="note" color={'text.main'}>
                  ※その他の方は詳細を入力ください。
                </Typography>
                <ApTextInputField
                  name="p_applicant_persons__0__office_occupation_detail_other"
                  placeholder={'入力してください'}
                  convertFullWidth
                />
              </Stack>
            )}
          </Stack>
        </ApItemGroup>

        <ApItemGroup label={'勤務先名'}>
          <ApTextInputField
            name="p_applicant_persons__0__office_name_kanji"
            placeholder={'例：株式会社○○○○○'}
            convertFullWidth
          />
        </ApItemGroup>
        <ApItemGroup label={'所属部課'}>
          <Stack spacing={'6px'}>
            <ApTextInputField
              name="p_applicant_persons__0__office_department"
              placeholder={'例：○○部'}
              convertFullWidth
            />
            <ApStarHelp label={'所属部課が無い方は「なし」とご入力ください。'} />
          </Stack>
        </ApItemGroup>

        <ApItemGroup label={'勤務先の電話番号'}>
          <Stack spacing={'6px'}>
            <ApPhoneInputField name="p_applicant_persons__0__office_phone" />
            <Stack spacing={'6px'}>
              <ApStarHelp label={'半角数字でご入力ください。'} />
              <ApStarHelp label={'現在所属する部署の電話番号をご入力ください。'} />
            </Stack>
          </Stack>
        </ApItemGroup>

        <ApItemGroup label={'勤務先の住所'} note={'※実際に勤務している事業所の住所をご入力ください'}>
          <Stack spacing={4}>
            <ApZipCodeInputField name="p_applicant_persons__0__office_postal_code" />
            <ApSelectField
              name="p_applicant_persons__0__office_prefecture_kanji"
              options={PREFECTURES}
              placeholder={'----'}
              width={110}
              label={'都道府県'}
            />
            <ApTextInputField
              name="p_applicant_persons__0__office_city_kanji"
              placeholder={'例：港区'}
              label={'市区郡　（例：港区）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0__office_district_kanji"
              placeholder={'例：芝浦４丁目'}
              label={'町村丁目（例：芝浦４丁目）'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_applicant_persons__0__office_other_address_kanji"
              placeholder={'例：12-38　キャナルゲート芝浦605号室'}
              label={'丁目以下・建物名・部屋番号（例：12-38　キャナルゲート芝浦605号室）'}
              convertFullWidth
            />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'従業員数'}>
          <ApNumberInputField
            name="p_applicant_persons__0__office_employee_num"
            unit={'名'}
            placeholder={'0'}
            width={156}
            maxLength={9}
          />
        </ApItemGroup>
        <ApItemGroup label={'入社年月'}>
          <ApSelectFieldYm name="p_applicant_persons__0__office_joining_date" yearOptions={officeJoiningDateOptions} />
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
                    name="p_applicant_persons__0__last_year_income"
                    placeholder={'0'}
                    unit={'万円'}
                    width={156}
                    maxLength={6}
                  />
                  {isMCJ && (
                    <ApNumberInputField
                      name="p_applicant_persons__0__last_year_bonus_income"
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
                <ApCheckboxButtonGroup name="p_applicant_persons__0__income_sources" options={incomeOptions} />
              </ApItemGroup>

              <ApItemGroup label={'確定申告をしていますか？'}>
                <ApRadioRowGroup
                  name="p_applicant_persons__0__tax_return"
                  options={taxReturnOptions}
                  onChange={(e) => {
                    if (e.target.value === '0') {
                      formik.setFieldValue('p_applicant_persons__0__tax_return_reasons', []);
                      formik.setFieldValue('p_applicant_persons__0__tax_return_reason_other', '');
                      formik.setFieldTouched('p_applicant_persons__0__tax_return_reasons', false);
                      formik.setFieldTouched('p_applicant_persons__0__tax_return_reason_other', false);
                    }
                  }}
                />
              </ApItemGroup>
              {formik.values.p_applicant_persons__0__tax_return === '1' && (
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
                      name="p_applicant_persons__0__tax_return_reasons"
                      options={taxReturnReasonsOptions}
                      onChange={(e) => {
                        console.log(e);
                      }}
                    />
                    {formik.values.p_applicant_persons__0__tax_return_reasons.includes('99') && (
                      <Stack spacing={'6px'}>
                        <Typography variant="note" color={'text.main'}>
                          ※その他の方は詳細を入力ください。
                        </Typography>
                        <ApTextInputField
                          name="p_applicant_persons__0__tax_return_reason_other"
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
              name="p_applicant_persons__0__transfer_office"
              options={transferOfficeOptions}
              onChange={(e) => {
                if (e.target.value === '0') {
                  formik.setFieldValue('p_applicant_persons__0__transfer_office_name_kanji', '');
                  formik.setFieldValue('p_applicant_persons__0__transfer_office_name_kana', '');
                  formik.setFieldValue('p_applicant_persons__0__transfer_office_phone', '');

                  formik.setFieldTouched('p_applicant_persons__0__transfer_office_name_kanji', false);
                  formik.setFieldTouched('p_applicant_persons__0__transfer_office_name_kana', false);
                  formik.setFieldTouched('p_applicant_persons__0__transfer_office_phone', false);
                }
              }}
            />
            {formik.values.p_applicant_persons__0__transfer_office === '1' && (
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
                      name="p_applicant_persons__0__transfer_office_name_kanji"
                      placeholder={'例：株式会社○○○○○'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'出向（派遣）勤務先名（フリガナ）'} pb={3} px={2}>
                    <ApTextInputField
                      name="p_applicant_persons__0__transfer_office_name_kana"
                      placeholder={'例：カブシキガイシャ○○○○○'}
                      convertFullWidt
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'出向（派遣）先　電話番号'}>
                    <Stack spacing={'6px'}>
                      <ApPhoneInputField name="p_applicant_persons__0__transfer_office_phone" />
                      <ApStarHelp label={'半角数字でご入力ください。'} />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup label={'出向（派遣）先　住所'}>
                    <Stack spacing={4}>
                      <ApZipCodeInputField name="p_applicant_persons__0__transfer_office_postal_code" />
                      <ApSelectField
                        name="p_applicant_persons__0__transfer_office_prefecture_kanji"
                        options={PREFECTURES}
                        placeholder={'----'}
                        width={110}
                        label={'都道府県'}
                      />
                      <ApTextInputField
                        name="p_applicant_persons__0__transfer_office_city_kanji"
                        placeholder={'例：港区'}
                        label={'市区郡　（例：港区）'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name="p_applicant_persons__0__transfer_office_district_kanji"
                        placeholder={'例：芝浦４丁目'}
                        label={'町村丁目（例：芝浦４丁目）'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name="p_applicant_persons__0__transfer_office_other_address_kanji"
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
              name="p_applicant_persons__0__maternity_paternity_leave"
              options={maternityPaternityLeaveOptions}
              onChange={() => {
                formik.setFieldValue('p_applicant_persons__0__maternity_paternity_leave_start_date', '');
                formik.setFieldValue('p_applicant_persons__0__maternity_paternity_leave_end_date', '');
                // TODO:
                formik.setFieldTouched('p_applicant_persons__0__maternity_paternity_leave_start_date', false);
                formik.setFieldTouched('p_applicant_persons__0__maternity_paternity_leave_end_date', false);
              }}
            />

            {formik.values.p_applicant_persons__0__maternity_paternity_leave && (
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
                      name="p_applicant_persons__0__maternity_paternity_leave_start_date"
                      unit={'月から'}
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'取得終了時期'} pb={3} px={2}>
                    <ApSelectFieldYm
                      name="p_applicant_persons__0__maternity_paternity_leave_end_date"
                      unit={'月まで'}
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
            <ApRadioColumnGroup name="p_applicant_persons__0__nursing_leave" options={nursingLeaveOptions} />
          </ApItemGroup>
        )}
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
