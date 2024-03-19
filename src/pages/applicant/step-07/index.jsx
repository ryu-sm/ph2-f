import { ApLayout, ApStepFooter } from '@/containers';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { agentSendedSelector, applicationAtom, applyNoSelector, authAtom } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApAreaInputField,
  ApCheckboxButtonGroup,
  ApCheckox,
  ApErrorScroll,
  ApImgUpload,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApPhoneInputField,
  ApRadioColumnGroup,
  ApRadioRowGroup,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYm,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApUpdateApply,
  ApZipCodeInputField,
} from '@/components';
import { dayjs } from '@/libs';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import {
  currHouseLoanBalanceTypeOptions,
  currHouseResidenceTypeOptions,
  currHouseScheduleDisposalTypeOptions,
  currHouseShellScheduledDateOptions,
  loanFromJapanHouseFinanceAgencyOptions,
  nationalityOptions,
  newHouseAcquireReasonOptions,
  newHousePlannedResidentOptions,
  newHouseSelfResidentOptions,
  propertyBusinessTypeOptions,
  propertyFlat35PlanOptions,
  propertyFlat35TechOptions,
  propertyLandTypeOptions,
  propertyMaintenanceTypeOptions,
  propertyPlanningAreaOptions,
  propertyPurchaseTypeOptions,
  propertyRebuildingReasonOptions,
  propertyRegionTypeOptions,
  yearOptions,
} from './options';
import { API_500_ERROR, PREFECTURES } from '@/constant';

import { cloneDeep } from 'lodash';
import { apApplicationFile } from '@/services';
import { useApUpdateApplyInfo, useBoolean } from '@/hooks';
import { routeNames } from '@/router/settings';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';

export const ApStep07Page = () => {
  const navigate = useNavigate();
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const { applyNo, agentSended } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);
  const {
    isMCJ,
    apNextStepId,
    apPreStepId,
    //
    p_application_headers,
    p_residents,
    p_applicant_persons__0,
    p_uploaded_files,
  } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();
  const setLocalData = (values) => {
    setApplicationInfo((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          curr_house_lived_year: values.p_application_headers.curr_house_lived_year,
          curr_house_lived_month: values.p_application_headers.curr_house_lived_month,
          curr_house_residence_type: values.p_application_headers.curr_house_residence_type,
          curr_house_floor_area: values.p_application_headers.curr_house_floor_area,
          curr_house_owner_name: values.p_application_headers.curr_house_owner_name,
          curr_house_owner_rel: values.p_application_headers.curr_house_owner_rel,
          curr_house_schedule_disposal_type: values.p_application_headers.curr_house_schedule_disposal_type,
          curr_house_schedule_disposal_type_other: values.p_application_headers.curr_house_schedule_disposal_type_other,
          curr_house_shell_scheduled_date: values.p_application_headers.curr_house_shell_scheduled_date,
          curr_house_shell_scheduled_price: values.p_application_headers.curr_house_shell_scheduled_price,
          curr_house_loan_balance_type: values.p_application_headers.curr_house_loan_balance_type,
          property_publish_url: values.p_application_headers.property_publish_url,
          new_house_acquire_reason: values.p_application_headers.new_house_acquire_reason,
          new_house_acquire_reason_other: values.p_application_headers.new_house_acquire_reason_other,
          new_house_self_resident: values.p_application_headers.new_house_self_resident,
          new_house_self_not_resident_reason: values.p_application_headers.new_house_self_not_resident_reason,
          new_house_planned_resident_overview: values.p_application_headers.new_house_planned_resident_overview,
          property_business_type: values.p_application_headers.property_business_type,
          property_prefecture: values.p_application_headers.property_prefecture,
          property_city: values.p_application_headers.property_city,
          property_district: values.p_application_headers.property_district,
          property_apartment_and_room_no: values.p_application_headers.property_apartment_and_room_no,
          property_private_area: values.p_application_headers.property_private_area,
          property_total_floor_area: values.p_application_headers.property_total_floor_area,
          property_land_area: values.p_application_headers.property_land_area,
          property_floor_area: values.p_application_headers.property_floor_area,
          property_land_type: values.p_application_headers.property_land_type,
          property_purchase_type: values.p_application_headers.property_purchase_type,
          property_planning_area: values.p_application_headers.property_planning_area,
          property_planning_area_other: values.p_application_headers.property_planning_area_other,
          property_rebuilding_reason: values.p_application_headers.property_rebuilding_reason,
          property_rebuilding_reason_other: values.p_application_headers.property_rebuilding_reason_other,
          property_flat_35_plan: values.p_application_headers.property_flat_35_plan,
          property_maintenance_type: values.p_application_headers.property_maintenance_type,
          property_flat_35_tech: values.p_application_headers.property_flat_35_tech,
          property_region_type: values.p_application_headers.property_region_type,
        },
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          G: values.p_uploaded_files.G,
        },
        p_residents: values.p_residents,
      };
    });
  };
  const initialValues = {
    p_application_headers: {
      curr_house_lived_year: p_application_headers.curr_house_lived_year,
      curr_house_lived_month: p_application_headers.curr_house_lived_month,
      curr_house_residence_type: p_application_headers.curr_house_residence_type,
      curr_house_floor_area: p_application_headers.curr_house_floor_area,
      curr_house_owner_name: p_application_headers.curr_house_owner_name,
      curr_house_owner_rel: p_application_headers.curr_house_owner_rel,
      curr_house_schedule_disposal_type: p_application_headers.curr_house_schedule_disposal_type,
      curr_house_schedule_disposal_type_other: p_application_headers.curr_house_schedule_disposal_type_other,
      curr_house_shell_scheduled_date: p_application_headers.curr_house_shell_scheduled_date,
      curr_house_shell_scheduled_price: p_application_headers.curr_house_shell_scheduled_price,
      curr_house_loan_balance_type: p_application_headers.curr_house_loan_balance_type,
      property_publish_url: p_application_headers.property_publish_url,
      new_house_acquire_reason: p_application_headers.new_house_acquire_reason,
      new_house_acquire_reason_other: p_application_headers.new_house_acquire_reason_other,
      new_house_self_resident: p_application_headers.new_house_self_resident,
      new_house_self_not_resident_reason: p_application_headers.new_house_self_not_resident_reason,
      new_house_planned_resident_overview: p_application_headers.new_house_planned_resident_overview,
      property_business_type: p_application_headers.property_business_type,
      property_prefecture: p_application_headers.property_prefecture,
      property_city: p_application_headers.property_city,
      property_district: p_application_headers.property_district,
      property_apartment_and_room_no: p_application_headers.property_apartment_and_room_no,
      property_private_area: p_application_headers.property_private_area,
      property_total_floor_area: p_application_headers.property_total_floor_area,
      property_land_area: p_application_headers.property_land_area,
      property_floor_area: p_application_headers.property_floor_area,
      property_land_type: p_application_headers.property_land_type,
      property_purchase_type: p_application_headers.property_purchase_type,
      property_planning_area: p_application_headers.property_planning_area,
      property_planning_area_other: p_application_headers.property_planning_area_other,
      property_rebuilding_reason: p_application_headers.property_rebuilding_reason,
      property_rebuilding_reason_other: p_application_headers.property_rebuilding_reason_other,
      property_flat_35_plan: p_application_headers.property_flat_35_plan,
      property_maintenance_type: p_application_headers.property_maintenance_type,
      property_flat_35_tech: p_application_headers.property_flat_35_tech,
      property_region_type: p_application_headers.property_region_type,
    },
    p_uploaded_files: {
      G: p_uploaded_files.G,
    },
    p_residents,
    isMCJ,
    set_addr_with_application_a: false,
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
      },
      p_uploaded_files: {
        G: values.p_uploaded_files.G,
      },
      p_residents: values.p_residents,
    };
    return diffData;
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (agentSended) {
          await updateApply(applyNo, setUpdateData(values));
          updateModal.onTrue();
        } else {
          setLocalData(values);
          navigate(`/step-id-${apNextStepId}`);
        }
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  const sendedFile = useCallback(async () => {
    if (agentSended) {
      try {
        const res = await apApplicationFile(applyNo);
        formik.setFieldValue('p_uploaded_files.G', res.data.G);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    sendedFile();
  }, [agentSended, applyNo]);

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    delete dataCopy.isMCJ;
    delete dataCopy.set_addr_with_application_a;
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      setLocalData(formik.values);
      navigate(`/step-id-${apPreStepId}`);
    }
  };

  //
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
      [{ value: '', label: '年' }].concat(
        Array.from(Array(age), (_, index) => {
          return {
            value: String(index + 1),
            label: (index + 1).toString(),
          };
        })
      ),
    [age]
  );

  const monthOptions = useMemo(
    () =>
      [{ value: '', label: '月' }].concat(
        Array.from(Array(birthdayMonth), (_, index) => ({
          value: String(index),
          label: index.toString(),
        }))
      ),
    [birthdayMonth]
  );

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle py={8}>{`現在のお住まいと\nご購入物件について\n教えてください。`}</ApPageTitle>
        <ApItemGroup label={'現在のお住まいの居住年数'}>
          <Stack spacing={'6px'} direction={'row'}>
            <ApSelectField
              name="p_application_headers.curr_house_lived_year"
              unit={'年'}
              placeholder={'--'}
              options={yearNumOptions}
              width={52}
            />
            <ApSelectField
              name="p_application_headers.curr_house_lived_month"
              unit={'月'}
              placeholder={'--'}
              options={monthOptions}
              width={52}
            />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'現在のお住まいの種類'}>
          <Stack spacing={3}>
            <ApSelectField
              name="p_application_headers.curr_house_residence_type"
              placeholder={'選択してください'}
              width={1}
              justifyContent={'start'}
              options={currHouseResidenceTypeOptions}
              disableOptions={
                ['7', '8'].includes(p_application_headers.loan_target) ? currHouseResidenceTypeOptions.slice(0, 4) : []
              }
              onChange={(e) => {
                if (e.target.value !== '4') {
                  formik.setFieldValue('p_application_headers.curr_house_owner_name', '');
                  formik.setFieldValue('p_application_headers.curr_house_owner_rel', '');

                  formik.setFieldTouched('p_application_headers.curr_house_owner_name', false);
                  formik.setFieldTouched('p_application_headers.curr_house_owner_rel', false);
                }
                if (e.target.value !== '5') {
                  formik.setFieldValue('p_application_headers.curr_house_schedule_disposal_type', '');
                  formik.setFieldValue('p_application_headers.curr_house_schedule_disposal_type_other', '');
                  formik.setFieldValue('p_application_headers.curr_house_shell_scheduled_date', '');
                  formik.setFieldValue('p_application_headers.curr_house_shell_scheduled_price', '');
                  formik.setFieldValue('p_application_headers.curr_house_loan_balance_type', '');

                  formik.setFieldTouched('p_application_headers.curr_house_schedule_disposal_type', false);
                  formik.setFieldTouched('p_application_headers.curr_house_schedule_disposal_type_other', false);
                  formik.setFieldTouched('p_application_headers.curr_house_shell_scheduled_date', false);
                  formik.setFieldTouched('p_application_headers.curr_house_shell_scheduled_price', false);
                  formik.setFieldTouched('p_application_headers.curr_house_loan_balance_type', false);
                }
              }}
            />
            {formik.values.p_application_headers.curr_house_residence_type === '4' && (
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
                    label={'所有者の氏名'}
                    pb={3}
                    px={2}
                    borderTopRightRadius={'7px'}
                    borderTopLeftRadius={'7px'}
                  >
                    <ApTextInputField
                      name="p_application_headers.curr_house_owner_name"
                      placeholder={'例：山田 太郎'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'続柄'} pb={3} px={2}>
                    <ApTextInputField
                      name="p_application_headers.curr_house_owner_rel"
                      placeholder={'例：父'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                </Stack>
              </Stack>
            )}
            {formik.values.p_application_headers.curr_house_residence_type === '5' && (
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
                    label={'持ち家の処分方法'}
                    pb={3}
                    px={2}
                    borderTopRightRadius={'7px'}
                    borderTopLeftRadius={'7px'}
                  >
                    <Stack spacing={3}>
                      <ApRadioColumnGroup
                        name="p_application_headers.curr_house_schedule_disposal_type"
                        options={currHouseScheduleDisposalTypeOptions}
                        onChange={(e) => {
                          if (e.target.value !== '1') {
                            formik.setFieldValue('p_application_headers.curr_house_shell_scheduled_date', '');
                            formik.setFieldValue('p_application_headers.curr_house_shell_scheduled_price', '');

                            formik.setFieldTouched('p_application_headers.curr_house_shell_scheduled_date', false);
                            formik.setFieldTouched('p_application_headers.curr_house_shell_scheduled_price', false);
                          }
                          if (e.target.value !== '99') {
                            formik.setFieldValue('p_application_headers.curr_house_schedule_disposal_type_other', '');

                            formik.setFieldTouched(
                              'p_application_headers.curr_house_schedule_disposal_type_other',
                              false
                            );
                          }
                        }}
                      />
                      {formik.values.p_application_headers.curr_house_schedule_disposal_type === '99' && (
                        <Stack spacing={1}>
                          <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                          <ApTextInputField
                            name="p_application_headers.curr_house_schedule_disposal_type_other"
                            placeholder={'入力してください'}
                            convertFullWidth
                          />
                        </Stack>
                      )}
                    </Stack>
                  </ApItemGroup>
                  {formik.values.p_application_headers.curr_house_schedule_disposal_type === '1' && (
                    <Stack>
                      <ApItemGroup label={'売却予定時期'} pb={3} px={2}>
                        <ApSelectFieldYm
                          name="p_application_headers.curr_house_shell_scheduled_date"
                          yearOptions={currHouseShellScheduledDateOptions}
                        />
                      </ApItemGroup>
                      <ApItemGroup label={'売却予定価格'} pb={3} px={2}>
                        <ApNumberInputField
                          name="p_application_headers.curr_house_shell_scheduled_price"
                          placeholder="0"
                          unit={
                            <Typography variant="unit" color={'text.main'}>
                              {'万円'}
                              <Typography variant="note" color={'text.main'}>
                                {` ※10万円単位`}
                              </Typography>
                            </Typography>
                          }
                          align="right"
                          width={140}
                          maxLength={5}
                        />
                      </ApItemGroup>
                    </Stack>
                  )}

                  <ApItemGroup label={'ローン残高'} pb={3} px={2}>
                    <ApRadioRowGroup
                      name="p_application_headers.curr_house_loan_balance_type"
                      options={currHouseLoanBalanceTypeOptions}
                    />
                  </ApItemGroup>
                </Stack>
              </Stack>
            )}
          </Stack>
        </ApItemGroup>
        {isMCJ && (
          <ApItemGroup
            label={
              <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                <Typography variant="form_item_label" color={'text.main'}>
                  現在のお住まいの床面積
                </Typography>
                <Typography variant="note" color={'text.main'}>
                  （MCJ固有項目）
                </Typography>
              </Stack>
            }
          >
            <ApAreaInputField name="p_application_headers.curr_house_floor_area" />
          </ApItemGroup>
        )}
        <ApItemGroup
          optional
          label={'新しい住居の物件情報'}
          note={'※物件情報の画像、またはURLのいずれかがあれば添付してください。'}
        >
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
                label={'物件情報の画像添付'}
                pb={3}
                px={2}
                borderTopRightRadius={'7px'}
                borderTopLeftRadius={'7px'}
              >
                <Stack spacing={3}>
                  <ApStarHelp
                    label={
                      'ご購入される土地・建物の 所在地・面積・価格などが記載されたチラシやパンフレット等があればアップロードしてください。'
                    }
                  />
                  <ApImgUpload name="p_uploaded_files.G" />
                </Stack>
              </ApItemGroup>

              <ApItemGroup
                label={
                  <Stack>
                    <Typography variant="note" color={'text.main'}>
                      ※チラシ等がない場合
                    </Typography>
                    <Typography variant="label" color={'text.main'}>
                      物件情報が掲載されたURL添付
                    </Typography>
                  </Stack>
                }
                pb={3}
                px={2}
              >
                <ApTextInputField
                  name="p_application_headers.property_publish_url"
                  placeholder={'例：http://xxxxxx.com'}
                />
              </ApItemGroup>
            </Stack>
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'新しい住居を必要とする理由'}>
          <Stack spacing={3}>
            <ApSelectField
              name="p_application_headers.new_house_acquire_reason"
              placeholder={'選択してください'}
              options={newHouseAcquireReasonOptions}
              justifyContent={'start'}
              width={1}
              onChange={(e) => {
                if (e.target.value !== '99') {
                  formik.setFieldValue('p_application_headers.new_house_acquire_reason_other', '');
                  formik.setFieldTouched('p_application_headers.new_house_acquire_reason_other', false);
                }
              }}
            />
            {formik.values.p_application_headers.new_house_acquire_reason === '99' && (
              <Stack spacing={'2px'}>
                <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                <ApTextInputField
                  name="p_application_headers.new_house_acquire_reason_other"
                  placeholder={'入力してください'}
                  convertFullWidth
                />
              </Stack>
            )}
            <ApStarHelp label={'ご本人またはご家族の居住用が融資対象で、セカンドハウス等は対象外になります。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'新しい住居に、あなたは居住しますか？'}>
          <Stack spacing={3}>
            <ApRadioRowGroup
              name="p_application_headers.new_house_self_resident"
              options={newHouseSelfResidentOptions}
              onChange={(e) => {
                if (e.target.value !== '0') {
                  formik.setFieldValue('p_application_headers.new_house_self_not_resident_reason', '');
                  formik.setFieldTouched('p_application_headers.new_house_self_not_resident_reason', false);
                  formik.setFieldValue('p_residents', []);
                }
                if (e.target.value === '0' && isMCJ) {
                  formik.setFieldValue('p_residents', [
                    {
                      id: '',
                      last_name_kanji: '',
                      first_name_kanji: '',
                      last_name_kana: '',
                      first_name_kana: '',
                      rel_to_applicant_a_name: '',
                      nationality: '',
                      birthday: '',
                      loan_from_japan_house_finance_agency: '',
                      contact_phone: '',
                      postal_code: '',
                      prefecture_kanji: '',
                      city_kanji: '',
                      district_kanji: '',
                      other_address_kanji: '',
                      prefecture_kana: '',
                      city_kana: '',
                      district_kana: '',
                    },
                  ]);
                }
              }}
            />
            {formik.values.p_application_headers.new_house_self_resident === '0' && (
              <Stack spacing={'2px'}>
                <ApStarHelp label={'「いいえ」の方は理由を入力ください。'} />
                <ApTextInputField
                  name="p_application_headers.new_house_self_not_resident_reason"
                  placeholder={'入力してください'}
                  convertFullWidth
                />
              </Stack>
            )}
          </Stack>
        </ApItemGroup>
        <ApItemGroup label={'あなた以外の入居予定者'} note={'※該当する方のみお答えください。'}>
          <Stack spacing={3}>
            <Stack
              sx={{
                px: 2,
                py: 3,
                border: (theme) => `1px solid ${theme.palette.primary[40]}`,
                borderRadius: 2,
                boxShadow: '0 0 15px rgba(60, 72, 196, 0.1)',
                bgcolor: 'white',
              }}
            >
              {!formik.values.p_application_headers.new_house_planned_resident_overview.fiance_umu && (
                <Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                    <ApCheckox
                      name="p_application_headers.new_house_planned_resident_overview.spouse_umu"
                      label={'配偶者'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.spouse', '1');
                          formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.fiance', '');
                        } else {
                          formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.spouse', '');
                        }
                      }}
                    />
                  </Stack>
                  <Box sx={{ borderTop: (theme) => `1px dashed ${theme.palette.primary[60]}` }} />
                </Stack>
              )}

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                <ApCheckox
                  name="p_application_headers.new_house_planned_resident_overview.children_umu"
                  label={'子ども'}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.children', '');
                    }
                  }}
                />
                <ApSelectField
                  name="p_application_headers.new_house_planned_resident_overview.children"
                  placeholder={'--'}
                  width={62}
                  unit={'人'}
                  disabled={!formik.values.p_application_headers.new_house_planned_resident_overview.children_umu}
                  options={newHousePlannedResidentOptions}
                />
              </Stack>
              <Box sx={{ borderTop: (theme) => `1px dashed ${theme.palette.primary[60]}` }} />

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                <ApCheckox
                  name="p_application_headers.new_house_planned_resident_overview.father_umu"
                  label={'父'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.father', '1');
                    } else {
                      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.father', '');
                    }
                  }}
                />
              </Stack>
              <Box sx={{ borderTop: (theme) => `1px dashed ${theme.palette.primary[60]}` }} />

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                <ApCheckox
                  name="p_application_headers.new_house_planned_resident_overview.mother_umu"
                  label={'母'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.mother', '1');
                    } else {
                      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.mother', '');
                    }
                  }}
                />
              </Stack>
              <Box sx={{ borderTop: (theme) => `1px dashed ${theme.palette.primary[60]}` }} />

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                <ApCheckox
                  name="p_application_headers.new_house_planned_resident_overview.brothers_sisters_umu"
                  label={'兄弟姉妹'}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      formik.setFieldValue(
                        'p_application_headers.new_house_planned_resident_overview.brothers_sisters',
                        ''
                      );
                    }
                  }}
                />
                <ApSelectField
                  name="p_application_headers.new_house_planned_resident_overview.brothers_sisters"
                  placeholder={'--'}
                  width={62}
                  unit={'人'}
                  disabled={
                    !formik.values.p_application_headers.new_house_planned_resident_overview.brothers_sisters_umu
                  }
                  options={newHousePlannedResidentOptions}
                />
              </Stack>
              <Box sx={{ borderTop: (theme) => `1px dashed ${theme.palette.primary[60]}` }} />

              {!formik.values.p_application_headers.new_house_planned_resident_overview.spouse_umu && (
                <Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                    <ApCheckox
                      name="p_application_headers.new_house_planned_resident_overview.fiance_umu"
                      label={'婚約者'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.fiance', '1');
                          formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.spouse', '');
                        } else {
                          formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.fiance', '');
                        }
                      }}
                    />
                  </Stack>
                  <Box sx={{ borderTop: (theme) => `1px dashed ${theme.palette.primary[60]}` }} />
                </Stack>
              )}

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ py: '10px' }}>
                <ApCheckox
                  name="p_application_headers.new_house_planned_resident_overview.others_umu"
                  label={'その他'}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      formik.setFieldValue('p_application_headers.new_house_planned_resident_overview.others', '');
                    }
                  }}
                />
                <ApSelectField
                  name="p_application_headers.new_house_planned_resident_overview.others"
                  placeholder={'--'}
                  width={62}
                  unit={'人'}
                  disabled={!formik.values.p_application_headers.new_house_planned_resident_overview.others_umu}
                  options={newHousePlannedResidentOptions}
                />
              </Stack>
              {formik.values.p_application_headers.new_house_planned_resident_overview.others_umu && (
                <Stack spacing={'6px'} sx={{ pb: 3 }}>
                  <ApStarHelp label={'その他の方は続柄をご入力ください。'} />
                  <ApTextInputField
                    name="p_application_headers.new_house_planned_resident_overview.others_rel"
                    placeholder={'続柄を入力ください'}
                    convertFullWidth
                  />
                </Stack>
              )}
              <Box sx={{ borderTop: (theme) => `3px double ${theme.palette.primary[60]}` }} />
              <Stack
                spacing={2}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                sx={{ py: '10px' }}
              >
                <Typography variant="unit" color={'text.main'}>
                  {'ご本人を除き、合計'}
                </Typography>
                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                  <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{
                      pl: 3,
                      py: 3,
                      height: 48,
                      width: 62,
                      borderRadius: 1,
                      bgcolor: 'gray.100',
                    }}
                  >
                    <Typography variant="unit">
                      {Number(formik.values.p_application_headers.new_house_planned_resident_overview.spouse) +
                        Number(formik.values.p_application_headers.new_house_planned_resident_overview.children) +
                        Number(formik.values.p_application_headers.new_house_planned_resident_overview.mother) +
                        Number(formik.values.p_application_headers.new_house_planned_resident_overview.father) +
                        Number(
                          formik.values.p_application_headers.new_house_planned_resident_overview.brothers_sisters
                        ) +
                        Number(formik.values.p_application_headers.new_house_planned_resident_overview.fiance) +
                        Number(formik.values.p_application_headers.new_house_planned_resident_overview.others)}
                    </Typography>
                  </Stack>
                  <Typography variant="unit" color={'text.main'}>
                    人
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {isMCJ && formik.values.p_application_headers.new_house_self_resident === '0' && (
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
                  <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                    <Typography variant="form_item_label" color="white">
                      ご入居予定者の情報
                    </Typography>
                    <Typography variant="note" color="white">
                      （MCJ固有項目）
                    </Typography>
                  </Stack>
                  <Typography variant="note" color="white">
                    ※複数人該当の場合は代表者を入力してください。
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    bgcolor: 'white',
                    borderRadius: '7px',
                  }}
                >
                  <ApItemGroup label={'入居予定者の氏名'} pb={3} px={2}>
                    <Stack spacing={3}>
                      <ApTextInputField name="p_residents[0].last_name_kanji" placeholder={'姓'} convertFullWidth />
                      <ApTextInputField name="p_residents[0].first_name_kanji" placeholder={'名'} convertFullWidth />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup label={'入居予定者の氏名（フリガナ）'} pb={3} px={2}>
                    <Stack spacing={3}>
                      <ApTextInputField name="p_residents[0].last_name_kana" placeholder={'セイ'} convertFullWidth />
                      <ApTextInputField name="p_residents[0].first_name_kana" placeholder={'メイ'} convertFullWidth />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup label={'続柄'} pb={3} px={2}>
                    <ApTextInputField
                      name="p_residents[0].rel_to_applicant_a_name"
                      placeholder={'例：父'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'国籍'} pb={3} px={2}>
                    <ApRadioRowGroup name="p_residents[0].nationality" options={nationalityOptions} />
                  </ApItemGroup>
                  <ApItemGroup label={'生年月日'} pb={3} px={2}>
                    <ApSelectFieldYmd name="p_residents[0].birthday" yearOptions={yearOptions} />
                  </ApItemGroup>
                  <ApItemGroup label={'住宅金融支援機構（旧：公庫）からの融資の有無'} pb={3} px={2}>
                    <ApRadioRowGroup
                      name="p_residents[0].loan_from_japan_house_finance_agency"
                      options={loanFromJapanHouseFinanceAgencyOptions}
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'電話番号'} pb={3} px={2}>
                    <ApPhoneInputField name="p_residents[0].contact_phone" />
                    <ApStarHelp label={'半角数字でご入力ください。'} />
                  </ApItemGroup>
                  <ApItemGroup label={'住所'} pb={3} px={2}>
                    <Stack spacing={4}>
                      <ApCheckox
                        name="set_addr_with_application_a"
                        label={'申込者本人と同じ住所'}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formik.setFieldValue('p_residents[0].postal_code', p_applicant_persons__0.postal_code);
                            formik.setFieldValue(
                              'p_residents[0].prefecture_kanji',
                              p_applicant_persons__0.prefecture_kanji
                            );
                            formik.setFieldValue('p_residents[0].city_kanji', p_applicant_persons__0.city_kanji);
                            formik.setFieldValue(
                              'p_residents[0].district_kanji',
                              p_applicant_persons__0.district_kanji
                            );
                            formik.setFieldValue(
                              'p_residents[0].other_address_kanji',
                              p_applicant_persons__0.other_address_kanji
                            );
                            formik.setFieldValue(
                              'p_residents[0].prefecture_kana',
                              p_applicant_persons__0.prefecture_kana
                            );
                            formik.setFieldValue('p_residents[0].city_kana', p_applicant_persons__0.city_kana);
                            formik.setFieldValue('p_residents[0].district_kana', p_applicant_persons__0.district_kana);
                          } else {
                            formik.setFieldValue('p_residents[0].postal_code', '');
                            formik.setFieldValue('p_residents[0].prefecture_kanji', '');
                            formik.setFieldValue('p_residents[0].city_kanji', '');
                            formik.setFieldValue('p_residents[0].district_kanji', '');
                            formik.setFieldValue('p_residents[0].other_address_kanji', '');
                            formik.setFieldValue('p_residents[0].prefecture_kana', '');
                            formik.setFieldValue('p_residents[0].city_kana', '');
                            formik.setFieldValue('p_residents[0].district_kana', '');
                          }
                        }}
                      />
                      <ApZipCodeInputField
                        name="p_residents[0].postal_code"
                        callback={(addr) => {
                          formik.setFieldValue('p_residents[0].prefecture_kanji', addr.prefecture_kanji);
                          formik.setFieldValue('p_residents[0].city_kanji', addr.city_kanji);
                          formik.setFieldValue('p_residents[0].district_kanji', addr.district_kanji);
                          formik.setFieldValue('p_residents[0].prefecture_kana', addr.prefecture_kana);
                          formik.setFieldValue('p_residents[0].city_kana', addr.city_kana);
                          formik.setFieldValue('p_residents[0].district_kana', addr.district_kana);
                        }}
                        errorCallback={() => {
                          formik.setFieldValue('p_residents[0].prefecture_kanji', '');
                          formik.setFieldValue('p_residents[0].city_kanji', '');
                          formik.setFieldValue('p_residents[0].district_kanji', '');
                          formik.setFieldValue('p_residents[0].prefecture_kana', '');
                          formik.setFieldValue('p_residents[0].city_kana', '');
                          formik.setFieldValue('p_residents[0].district_kana', '');
                        }}
                      />
                      <ApSelectField
                        name="p_residents[0].prefecture_kanji"
                        options={PREFECTURES}
                        placeholder={'----'}
                        width={110}
                        label={'都道府県'}
                      />
                      <ApTextInputField
                        name="p_residents[0].city_kanji"
                        placeholder={'例：港区'}
                        label={'市区郡　（例：港区）'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name="p_residents[0].district_kanji"
                        placeholder={'例：芝浦４丁目'}
                        label={'町村丁目（例：芝浦４丁目）'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name="p_residents[0].other_address_kanji"
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
        <ApItemGroup optional label={'新しい住居（融資対象物件）の事業性'} note={'※該当する方のみお答えください。'}>
          <Stack spacing={3}>
            <ApCheckboxButtonGroup
              name="p_application_headers.property_business_type"
              options={propertyBusinessTypeOptions}
            />
            <ApStarHelp label={'事業用との併用物件の場合は居宅部分が延床面積の1/2以上あることが必要です。'} />
          </Stack>
        </ApItemGroup>
        <ApItemGroup optional label={'ご購入物件の所在地'}>
          <Stack spacing={3}>
            <ApStarHelp label={'登記簿上の表記でご入力ください。'} />
            <ApStarHelp label={'住信SBIネット銀行は借地・共有仮換地・保有地・離島にある物件はお取扱いできません。'} />
            <ApSelectField
              name="p_application_headers.property_prefecture"
              options={PREFECTURES}
              placeholder={'----'}
              width={110}
              label={'都道府県'}
            />
            <ApTextInputField
              name="p_application_headers.property_city"
              placeholder={'港区芝浦'}
              label={'市区町村郡'}
              convertFullWidth
            />
            <ApTextInputField
              name="p_application_headers.property_district"
              placeholder={'４丁目１２−３８'}
              label={'以下地番'}
              convertFullWidth
            />
            {['2', '3'].includes(p_application_headers.loan_target) && (
              <ApTextInputField
                name="p_application_headers.property_apartment_and_room_no"
                placeholder={'４−１２−３８ 建物名 部屋番号'}
                label={'丁目以下'}
                convertFullWidth
              />
            )}
          </Stack>
        </ApItemGroup>

        <ApItemGroup optional label={'ご購入物件の面積'}>
          {['2', '3'].includes(p_application_headers.loan_target) ? (
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
                  専有面積
                </Typography>
                <ApAreaInputField name="p_application_headers.property_private_area" />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
                  マンション全体の延べ床面積
                </Typography>
                <ApAreaInputField name="p_application_headers.property_total_floor_area" />
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={4}>
              <Stack spacing={1}>
                <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
                  土地の敷地面積
                </Typography>
                <ApAreaInputField name="p_application_headers.property_land_area" />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="label" color={'text.main'} lineHeight={'130%'}>
                  建物の延べ床面積
                </Typography>
                <ApAreaInputField name="p_application_headers.property_floor_area" />
              </Stack>
            </Stack>
          )}
        </ApItemGroup>

        {isMCJ && (
          <Stack>
            <ApItemGroup optional label={'ご購入物件の土地権利'} note={'※該当する方のみお答えください。(MCJ固有項目)'}>
              <ApRadioColumnGroup name="p_application_headers.property_land_type" options={propertyLandTypeOptions} />
            </ApItemGroup>
            <ApItemGroup optional label={'買戻・保留地・仮換地'} note={'※該当する方のみお答えください。(MCJ固有項目)'}>
              <ApRadioColumnGroup
                name="p_application_headers.property_purchase_type"
                options={propertyPurchaseTypeOptions}
              />
            </ApItemGroup>
            <ApItemGroup
              optional
              label={
                <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                  <Typography variant="form_item_label" color={'text.main'}>
                    都市計画区域等
                  </Typography>
                  <Typography variant="note" color={'text.main'}>
                    （MCJ固有項目）
                  </Typography>
                </Stack>
              }
              note={'※「市街化区域」以外の方のみお答えください'}
            >
              <Stack spacing={2}>
                <ApRadioColumnGroup
                  name="p_application_headers.property_planning_area"
                  options={propertyPlanningAreaOptions}
                />
                {formik.values.p_application_headers.property_planning_area === '99' && (
                  <Stack spacing={'6px'}>
                    <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                    <ApTextInputField
                      name="p_application_headers.property_planning_area_other"
                      placeholder={'入力してください'}
                      convertFullWidth
                    />
                  </Stack>
                )}
              </Stack>
            </ApItemGroup>
            {['1', '2'].includes(formik.values.p_application_headers.property_planning_area) && (
              <ApItemGroup
                optional
                label={'上記に該当する場合の「再建築理由」を教えてください。'}
                note={'※該当する方のみお答えください。(MCJ固有項目)'}
              >
                <Stack spacing={2}>
                  <ApRadioColumnGroup
                    name="p_application_headers.property_rebuilding_reason"
                    options={propertyRebuildingReasonOptions}
                  />
                  {formik.values.p_application_headers.property_rebuilding_reason === '99' && (
                    <Stack spacing={'6px'}>
                      <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                      <ApTextInputField
                        name="p_application_headers.property_rebuilding_reason_other"
                        placeholder={'入力してください'}
                        convertFullWidth
                      />
                    </Stack>
                  )}
                </Stack>
              </ApItemGroup>
            )}
            <ApItemGroup
              optional
              label={'フラット35S（優良住宅取得支援制度）対象項目'}
              note={'※該当する方のみお答えください。(MCJ固有項目)'}
            >
              <ApRadioColumnGroup
                name="p_application_headers.property_flat_35_plan"
                options={propertyFlat35PlanOptions}
                onChange={(e) => {
                  if (!e.target.value === '2') {
                    formik.setFieldValue('p_application_headers.property_flat_35_tech', '');
                  }
                }}
              />
            </ApItemGroup>
            <ApItemGroup optional label={'維持保全型'} note={'※該当する方のみお答えください。(MCJ固有項目)'}>
              <ApRadioColumnGroup
                name="p_application_headers.property_maintenance_type"
                options={propertyMaintenanceTypeOptions}
              />
            </ApItemGroup>
            {formik.values.p_application_headers.property_flat_35_plan === '2' && (
              <ApItemGroup
                optional
                label={'フラット35S（優良住宅取得支援制度）対象項目②'}
                note={'※該当する方のみお答えください。(MCJ固有項目)'}
              >
                <ApRadioColumnGroup
                  name="p_application_headers.property_flat_35_tech"
                  options={propertyFlat35TechOptions}
                />
              </ApItemGroup>
            )}
            <ApItemGroup
              optional
              label={'地域連携型・地方移住支援型'}
              note={'※該当する方のみお答えください。(MCJ固有項目)'}
            >
              <ApRadioColumnGroup
                name="p_application_headers.property_region_type"
                options={propertyRegionTypeOptions}
              />
            </ApItemGroup>
          </Stack>
        )}
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} rightLabel={agentSended && '保存'} />
      </ApLayout>
    </FormikProvider>
  );
};
