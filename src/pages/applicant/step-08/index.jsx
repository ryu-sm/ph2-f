import { ApLayout, ApStepFooter } from '@/containers';
import { Fragment, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, localApplication } from '@/store';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApCheckboxButtonGroup,
  ApCheckox,
  ApErrorScroll,
  ApImgUpload,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApPrimaryButton,
  ApRadioColumnGroup,
  ApRadioRowGroup,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYm,
  ApStarHelp,
  ApTextInputField,
  ApUpdateApply,
} from '@/components';
import { Stack, Typography } from '@mui/material';
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
} from './options';

import { useNavigate } from 'react-router-dom';

import { Icons } from '@/assets';
import { cloneDeep } from 'lodash';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { routeNames } from '@/router/settings';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { apGetPborrowingsFiles } from '@/services';

export const ApStep08Page = () => {
  const { updateSendedInfo } = useApplicationContext();
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();

  const { agentSended, user } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);

  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { isMCJ, apNextStepId, apPreStepId, hasIncomeTotalizer, p_application_headers, p_borrowings } =
    localApplicationInfo;

  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          curr_borrowing_status: values.p_application_headers.curr_borrowing_status,
          refund_source_type: values.p_application_headers.refund_source_type,
          refund_source_type_other: values.p_application_headers.refund_source_type_other,
          refund_source_content: values.p_application_headers.refund_source_content,
          refund_source_amount: values.p_application_headers.refund_source_amount,
          rent_to_be_paid_land: values.p_application_headers.rent_to_be_paid_land,
          rent_to_be_paid_land_borrower: values.p_application_headers.rent_to_be_paid_land_borrower,
          rent_to_be_paid_house: values.p_application_headers.rent_to_be_paid_house,
          rent_to_be_paid_house_borrower: values.p_application_headers.rent_to_be_paid_house_borrower,
        },
        p_borrowings: values.p_borrowings,
      };
    });
  };
  const initialValues = {
    p_application_headers: {
      curr_borrowing_status: p_application_headers.curr_borrowing_status,
      refund_source_type: p_application_headers.refund_source_type,
      refund_source_type_other: p_application_headers.refund_source_type_other,
      refund_source_content: p_application_headers.refund_source_content,
      refund_source_amount: p_application_headers.refund_source_amount,
      rent_to_be_paid_land: p_application_headers.rent_to_be_paid_land,
      rent_to_be_paid_land_borrower: p_application_headers.rent_to_be_paid_land_borrower,
      rent_to_be_paid_house: p_application_headers.rent_to_be_paid_house,
      rent_to_be_paid_house_borrower: p_application_headers.rent_to_be_paid_house_borrower,
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
        console.log(error);
        // toast.error(API_500_ERROR);
      }
    },
  });

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    delete dataCopy.isMCJ;
    delete dataCopy.hasIncomeTotalizer;
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

  const fetchPborrowingsFiles = async () => {
    try {
      const res = await apGetPborrowingsFiles(user.id);
      const temp = formik.values.p_borrowings.map((item) => {
        const files = res.data.find((i) => i.borrowing_id == item.id);
        if (files) {
          return { ...item, I: files?.I };
        } else {
          return item;
        }
      });
      formik.setFieldValue('p_borrowings', temp);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (agentSended) {
      fetchPborrowingsFiles();
    }
  }, []);

  const { refreshsendedApllication } = useApplicationContext();
  useEffect(() => {
    if (agentSended) {
      refreshsendedApllication();
    }
  }, []);
  useEffect(() => {
    if (agentSended) {
      formik.setValues(initialValues);
    }
  }, [localApplicationInfo]);

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
        <Stack flex={1}>
          <ApPageTitle py={8}>{`現在のお借入状況について\n教えてください。`}</ApPageTitle>
          <ApItemGroup label={'あなたや連帯保証人予定者に、現在お借入はありますか？'}>
            <ApRadioRowGroup
              name="p_application_headers.curr_borrowing_status"
              options={CurrBorrowingStatusOptions}
              onChange={(e) => {
                if (e.target.value === '1') {
                  let tempPborrowings = [];
                  if (p_borrowings.length > 0) {
                    tempPborrowings = p_borrowings;
                  } else {
                    tempPborrowings = [
                      {
                        id: '',
                        I: [],
                        self_input: '0',
                        borrower: hasIncomeTotalizer ? '' : '1',
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
                      },
                    ];
                  }

                  formik.setFieldValue('p_borrowings', tempPborrowings);
                  formik.setFieldValue(
                    'p_application_headers.refund_source_type',
                    p_application_headers.refund_source_type
                  );
                  formik.setFieldValue(
                    'p_application_headers.refund_source_type_other',
                    p_application_headers.refund_source_type_other
                  );
                  formik.setFieldValue(
                    'p_application_headers.refund_source_content',
                    p_application_headers.refund_source_content
                  );
                  formik.setFieldValue(
                    'p_application_headers.refund_source_amount',
                    p_application_headers.refund_source_amount
                  );
                  formik.setFieldValue(
                    'p_application_headers.rent_to_be_paid_land',
                    p_application_headers.rent_to_be_paid_land
                  );
                  formik.setFieldValue(
                    'p_application_headers.rent_to_be_paid_land_borrower',
                    p_application_headers.rent_to_be_paid_land_borrower
                  );
                  formik.setFieldValue(
                    'p_application_headers.rent_to_be_paid_house',
                    p_application_headers.rent_to_be_paid_house
                  );
                  formik.setFieldValue(
                    'p_application_headers.rent_to_be_paid_house_borrower',
                    p_application_headers.rent_to_be_paid_house_borrower
                  );
                } else {
                  formik.setFieldValue('p_application_headers.refund_source_type', []);
                  formik.setFieldValue('p_application_headers.refund_source_type_other', '');
                  formik.setFieldValue('p_application_headers.refund_source_content', '');
                  formik.setFieldValue('p_application_headers.refund_source_amount', '');
                  formik.setFieldValue('p_application_headers.rent_to_be_paid_land', '');
                  formik.setFieldValue('p_application_headers.rent_to_be_paid_land_borrower', '');
                  formik.setFieldValue('p_application_headers.rent_to_be_paid_house', '');
                  formik.setFieldValue('p_application_headers.rent_to_be_paid_house_borrower', '');
                  formik.setFieldValue('p_borrowings', []);
                }
              }}
            />
          </ApItemGroup>
          <Stack px={4} pb={4}>
            <ApStarHelp
              label={
                '住宅ローン、車のローン、奨学金などの他、カードローン、キャッシングがある場合も「有」を選択ください。'
              }
            />
          </Stack>
          {formik.values.p_application_headers.curr_borrowing_status === '1' && (
            <Stack>
              <FieldArray
                name="p_borrowings"
                render={(arrayHelpers) => (
                  <Fragment>
                    <Stack spacing={8} sx={{ px: 4 }}>
                      {formik.values.p_borrowings.map((p_borrowing, index) => (
                        <Stack
                          key={index}
                          sx={{
                            borderRadius: 2,
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                            bgcolor: 'primary.main',
                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          <Stack
                            direction={'row'}
                            justifyItems={'center'}
                            justifyContent={'space-between'}
                            sx={{ px: 4, py: 1, cursor: 'pointer' }}
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                          >
                            <Typography variant="form_item_label" color="white">
                              {`${index + 1}件目`}
                            </Typography>
                            {index > 0 && (
                              <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
                                <Icons.ApDeleteIcon />
                                <Typography variant="label" color={'white'}>
                                  削除する
                                </Typography>
                              </Stack>
                            )}
                          </Stack>
                          <Stack
                            sx={{
                              bgcolor: 'white',
                              borderRadius: '7px',
                            }}
                          >
                            {hasIncomeTotalizer && (
                              <ApItemGroup label={'借入名義人'} pb={3} px={2}>
                                <ApRadioColumnGroup
                                  name={`p_borrowings[${index}].borrower`}
                                  options={borrowerOptions}
                                />
                              </ApItemGroup>
                            )}
                            <ApItemGroup label={'お借入の種類は？'} pb={3} px={2}>
                              <ApSelectField
                                name={`p_borrowings[${index}].type`}
                                placeholder={'選択してください'}
                                options={typeOptions}
                                justifyContent={'start'}
                                width={1}
                                onChange={(e) => {
                                  if (formik.values.p_borrowings[index].type !== '')
                                    arrayHelpers.replace(index, {
                                      id: p_borrowing.id,
                                      I: p_borrowing.I,
                                      self_input: '0',
                                      borrower: p_borrowing.borrower,
                                      type: e.target.value,
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
                                    });
                                }}
                              />
                            </ApItemGroup>
                            <ApItemGroup
                              label={
                                <Typography variant="notify" lineHeight={'130%'}>
                                  {'①返済予定表・利用明細等の画像をアップロードするか、\n②詳細を入力してください。'}
                                </Typography>
                              }
                              pb={3}
                              px={2}
                            >
                              <Stack spacing={3}>
                                <ApImgUpload name={`p_borrowings[${index}].I`} />
                                <ApCheckox
                                  name={`p_borrowings[${index}].self_input`}
                                  label={'アップロードせず、詳細入力する'}
                                  disabled={formik.values.p_borrowings[index].type === ''}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      formik.setFieldValue(`p_borrowings[${index}].self_input`, '1');
                                    } else {
                                      formik.setFieldValue(`p_borrowings[${index}].self_input`, '0');
                                    }
                                  }}
                                />
                              </Stack>
                            </ApItemGroup>
                            {formik.values.p_borrowings[index].self_input === '1' && (
                              <Stack>
                                <ApItemGroup label={'借入先（金融機関）'} pb={3} px={2}>
                                  <ApTextInputField
                                    name={`p_borrowings[${index}].lender`}
                                    placeholder={'例：○○○○銀行'}
                                    convertFullWidth
                                  />
                                </ApItemGroup>
                                {formik.values.p_borrowings[index].type === '2' && (
                                  <ApItemGroup label={'お借入の目的'} pb={3} px={2}>
                                    <Stack spacing={3}>
                                      <ApSelectField
                                        name={`p_borrowings[${index}].loan_purpose`}
                                        placeholder={'選択してください'}
                                        options={loanPurposeOptions}
                                        width={1}
                                        justifyContent={'start'}
                                      />
                                      {formik.values.p_borrowings[index].loan_purpose === '99' && (
                                        <Stack spacing={'6px'}>
                                          <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                                          <ApTextInputField
                                            name={`p_borrowings[${index}].loan_purpose_other`}
                                            placeholder={'入力してください'}
                                            convertFullWidth
                                          />
                                        </Stack>
                                      )}
                                    </Stack>
                                  </ApItemGroup>
                                )}
                                {formik.values.p_borrowings[index].type === '4' && (
                                  <ApItemGroup label={'お借入の目的'} pb={3} px={2}>
                                    <Stack spacing={3}>
                                      <ApSelectField
                                        name={`p_borrowings[${index}].loan_business_target`}
                                        placeholder={'選択してください'}
                                        options={loanBusinessTargetOptions}
                                        width={1}
                                        justifyContent={'start'}
                                      />
                                      {formik.values.p_borrowings[index].loan_business_target === '99' && (
                                        <Stack spacing={'6px'}>
                                          <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                                          <ApTextInputField
                                            name={`p_borrowings[${index}].loan_business_target_other`}
                                            placeholder={'入力してください'}
                                            convertFullWidth
                                          />
                                        </Stack>
                                      )}
                                    </Stack>
                                  </ApItemGroup>
                                )}

                                {formik.values.p_borrowings[index].type === '2' && (
                                  <ApItemGroup label={'借入区分'} pb={3} px={2}>
                                    <ApRadioColumnGroup
                                      name={`p_borrowings[${index}].category`}
                                      options={categoryOptions}
                                    />
                                  </ApItemGroup>
                                )}

                                {formik.values.p_borrowings[index].type === '1' && (
                                  <ApItemGroup label={'住宅金融支援機構からの借入ですか？'} pb={3} px={2}>
                                    <ApRadioRowGroup
                                      name={`p_borrowings[${index}].borrowing_from_house_finance_agency`}
                                      options={houseFinanceAgency}
                                    />
                                  </ApItemGroup>
                                )}

                                <ApItemGroup
                                  label={
                                    formik.values.p_borrowings[index].type === '2'
                                      ? '当初カード契約年月'
                                      : '当初借入年月'
                                  }
                                  pb={3}
                                  px={2}
                                >
                                  <ApSelectFieldYm name={`p_borrowings[${index}].loan_start_date`} />
                                </ApItemGroup>

                                <ApItemGroup
                                  label={formik.values.p_borrowings[index].type === '2' ? '借入限度額' : '当初借入額'}
                                  pb={3}
                                  px={2}
                                >
                                  <ApNumberInputField
                                    name={`p_borrowings[${index}].loan_amount`}
                                    placeholder={'0'}
                                    unit={'万円'}
                                    width={156}
                                    maxLength={5}
                                  />
                                </ApItemGroup>
                                <ApItemGroup label={'現在の残高'} pb={3} px={2}>
                                  <ApNumberInputField
                                    name={`p_borrowings[${index}].curr_loan_balance_amount`}
                                    placeholder={'0'}
                                    unit={'万円'}
                                    width={156}
                                    maxLength={5}
                                  />
                                </ApItemGroup>
                                <ApItemGroup label={'年間返済額'} pb={3} px={2}>
                                  <ApNumberInputField
                                    name={`p_borrowings[${index}].annual_repayment_amount`}
                                    placeholder={'0'}
                                    unit={'万円'}
                                    width={156}
                                    maxLength={5}
                                  />
                                </ApItemGroup>

                                {formik.values.p_borrowings[index].type === '2' ? (
                                  <ApItemGroup label={'カード有効期限'} pb={3} px={2}>
                                    <ApSelectFieldYm
                                      name={`p_borrowings[${index}].card_expiry_date`}
                                      yearOptions={loanDeadlineYearOptions}
                                    />
                                  </ApItemGroup>
                                ) : (
                                  <ApItemGroup
                                    label={formik.values.p_borrowings[index].type === '1' ? '最終期限' : '最終返済年月'}
                                    pb={3}
                                    px={2}
                                  >
                                    <ApSelectFieldYm
                                      name={`p_borrowings[${index}].loan_end_date`}
                                      yearOptions={loanDeadlineYearOptions}
                                    />
                                  </ApItemGroup>
                                )}

                                {formik.values.p_borrowings[index].type === '3' && (
                                  <Stack>
                                    <ApItemGroup label={'賃貸戸（室）数'} pb={3} px={2}>
                                      <ApNumberInputField
                                        name={`p_borrowings[${index}].rental_room_num`}
                                        placeholder={'0'}
                                        unit={'戸（室）'}
                                        width={156}
                                        maxLength={2}
                                      />
                                    </ApItemGroup>
                                    <ApItemGroup label={'共同住宅'} pb={3} px={2}>
                                      <ApRadioRowGroup
                                        name={`p_borrowings[${index}].common_housing`}
                                        options={commonHousingOptions}
                                      />
                                    </ApItemGroup>
                                  </Stack>
                                )}
                                {!['1', '2'].includes(formik.values.p_borrowings[index].type) && (
                                  <ApItemGroup label={'不動産担保設定'} pb={3} px={2}>
                                    <ApRadioRowGroup
                                      name={`p_borrowings[${index}].estate_setting`}
                                      options={estateSettingOptions}
                                    />
                                  </ApItemGroup>
                                )}
                                {formik.values.p_borrowings[index].type !== '4' && (
                                  <Stack>
                                    <ApItemGroup label={'今回のお借入までに完済の予定はありますか？'} pb={3} px={2}>
                                      <ApRadioColumnGroup
                                        name={`p_borrowings[${index}].scheduled_loan_payoff`}
                                        options={
                                          ['2', '5', '6', '7', '99'].includes(formik.values.p_borrowings[index].type) &&
                                          p_application_headers.loan_plus === '1'
                                            ? scheduledLoanPayoffOptions
                                            : scheduledLoanPayoffOptions.slice(0, 2)
                                        }
                                      />
                                    </ApItemGroup>

                                    {formik.values.p_borrowings[index].scheduled_loan_payoff === '1' && (
                                      <ApItemGroup label={'完済（予定）年月'} pb={3} px={2}>
                                        <ApSelectFieldYm
                                          name={`p_borrowings[${index}].scheduled_loan_payoff_date`}
                                          yearOptions={scheduledLoanPayoffYearOptions}
                                        />
                                      </ApItemGroup>
                                    )}
                                  </Stack>
                                )}
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>

                    {formik.values.p_borrowings.length < 8 && (
                      <Stack spacing={2} alignItems={'center'} sx={{ py: 8 }}>
                        <ApStarHelp label={'他にも借入がある場合は、追加してください。'} />
                        <ApPrimaryButton
                          height={40}
                          onClick={() => {
                            arrayHelpers.push({
                              id: '',
                              I: [],
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
                            });
                          }}
                        >
                          <Stack spacing={2} direction={'row'} alignItems={'center'}>
                            <Icons.ApAddIcon />
                            <Typography variant="radio_checkbox_button">もう1件追加する</Typography>
                          </Stack>
                        </ApPrimaryButton>
                      </Stack>
                    )}
                  </Fragment>
                )}
              />
              {isMCJ && formik.values.p_borrowings.some((item) => item?.scheduled_loan_payoff === '1') && (
                <Stack>
                  <ApItemGroup
                    label={
                      <Typography variant="form_item_label" color={'text.main'}>
                        完済予定のお借入がある場合の完済原資について教えてください。
                        <Typography variant="note" color={'text.main'}>
                          （MCJ固有項目）
                        </Typography>
                      </Typography>
                    }
                  >
                    <Stack spacing={3}>
                      <Typography variant="form_item_label" color={'text.main'}>
                        完済原資の種類
                      </Typography>
                      <ApCheckboxButtonGroup
                        name="p_application_headers.refund_source_type"
                        options={refundSourceTypeOptions}
                      />
                      {formik.values.p_application_headers.refund_source_type.includes('99') && (
                        <Stack spacing={'6px'}>
                          <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                          <ApTextInputField
                            name="p_application_headers.refund_source_type_other"
                            placeholder={'入力してください'}
                            convertFullWidth
                          />
                        </Stack>
                      )}
                      <Typography variant="form_item_label" color={'text.main'}>
                        完済原資の内容
                        <Typography variant="note" color={'text.main'}>
                          ※金融機関・預貯金種類など
                        </Typography>
                      </Typography>
                      <ApTextInputField
                        name="p_application_headers.refund_source_content"
                        placeholder={'例：〇〇○○銀行 普通預金'}
                        convertFullWidth
                      />
                      <Typography variant="form_item_label" color={'text.main'}>
                        完済原資の金額
                        <Typography variant="note" color={'text.main'}>
                          ※金融機関・預貯金種類など
                        </Typography>
                      </Typography>
                      <ApNumberInputField
                        name="p_application_headers.refund_source_amount"
                        placeholder={'0'}
                        unit={'万円'}
                        maxLength={5}
                        width={156}
                      />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup
                    optional
                    label={
                      <Typography variant="form_item_label" color={'text.main'}>
                        {`今回の住宅取得後も継続する支払地代・支払家賃があれば記入してください。\n`}
                        <Typography variant="note" color={'text.main'}>
                          （MCJ固有項目）
                        </Typography>
                      </Typography>
                    }
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
                          label={'支払地代'}
                          pb={3}
                          px={2}
                          borderTopRightRadius={'7px'}
                          borderTopLeftRadius={'7px'}
                        >
                          <Stack spacing={3}>
                            {hasIncomeTotalizer && (
                              <ApRadioColumnGroup
                                name="p_application_headers.rent_to_be_paid_land_borrower"
                                options={borrowerOptions}
                              />
                            )}
                            <ApNumberInputField
                              name="p_application_headers.rent_to_be_paid_land"
                              label={'月間の支払金額'}
                              placeholder={'0'}
                              unit={'円'}
                              maxLength={7}
                              width={156}
                            />
                          </Stack>
                        </ApItemGroup>

                        <ApItemGroup label={'支払家賃'} pb={3} px={2}>
                          <Stack spacing={3}>
                            {hasIncomeTotalizer && (
                              <ApRadioColumnGroup
                                name="p_application_headers.rent_to_be_paid_house_borrower"
                                options={borrowerOptions}
                              />
                            )}
                            <ApNumberInputField
                              name="p_application_headers.rent_to_be_paid_house"
                              label={'月間の支払金額'}
                              placeholder={'0'}
                              unit={'円'}
                              maxLength={7}
                              width={156}
                            />
                          </Stack>
                        </ApItemGroup>
                      </Stack>
                    </Stack>
                  </ApItemGroup>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </ApLayout>
    </FormikProvider>
  );
};
