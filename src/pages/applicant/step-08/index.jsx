import { ApLayout, ApStepFooter } from '@/containers';
import { Fragment, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  apNextStepIdSelector,
  apPreStepIdSelector,
  applicationAtom,
  hasIncomeTotalizerSelector,
  isMcjSelector,
} from '@/store';
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
} from './options';

import { useNavigate } from 'react-router-dom';

import { Icons } from '@/assets';

export const ApStep08Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const isMCJ = useRecoilValue(isMcjSelector);
  const hasIncomeTotalizer = useRecoilValue(hasIncomeTotalizerSelector);
  const {
    p_application_headers__curr_borrowing_status,
    p_borrowings,
    p_application_headers__refund_source_type,
    p_application_headers__refund_source_type_other,
    p_application_headers__refund_source_content,
    p_application_headers__refund_source_amount,
    p_application_headers__rent_to_be_paid_land_borrower,
    p_application_headers__rent_to_be_paid_land,
    p_application_headers__rent_to_be_paid_house_borrower,
    p_application_headers__rent_to_be_paid_house,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      p_application_headers__curr_borrowing_status,
      p_borrowings,
      p_application_headers__refund_source_type,
      p_application_headers__refund_source_type_other,
      p_application_headers__refund_source_content,
      p_application_headers__refund_source_amount,
      p_application_headers__rent_to_be_paid_land_borrower,
      p_application_headers__rent_to_be_paid_land,
      p_application_headers__rent_to_be_paid_house_borrower,
      p_application_headers__rent_to_be_paid_house,
      //
      isMCJ,
      hasIncomeTotalizer,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApplicationInfo((pre) => {
        return {
          ...pre,
          p_application_headers__curr_borrowing_status: formik.values.p_application_headers__curr_borrowing_status,
          p_borrowings: formik.values.p_borrowings,
          p_application_headers__refund_source_type: formik.values.p_application_headers__refund_source_type,
          p_application_headers__refund_source_type_other:
            formik.values.p_application_headers__refund_source_type_other,
          p_application_headers__refund_source_content: formik.values.p_application_headers__refund_source_content,
          p_application_headers__refund_source_amount: formik.values.p_application_headers__refund_source_amount,
          p_application_headers__rent_to_be_paid_land_borrower:
            formik.values.p_application_headers__rent_to_be_paid_land_borrower,
          p_application_headers__rent_to_be_paid_land: formik.values.p_application_headers__rent_to_be_paid_land,
          p_application_headers__rent_to_be_paid_house_borrower:
            formik.values.p_application_headers__rent_to_be_paid_house_borrower,
          p_application_headers__rent_to_be_paid_house: formik.values.p_application_headers__rent_to_be_paid_house,
        };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const parseVaildData = useMemo(() => {
    return {
      p_application_headers__curr_borrowing_status: formik.values.p_application_headers__curr_borrowing_status,
      p_borrowings: formik.values.p_borrowings,
      p_application_headers__refund_source_type: formik.values.p_application_headers__refund_source_type,
      p_application_headers__refund_source_type_other: formik.values.p_application_headers__refund_source_type_other,
      p_application_headers__refund_source_content: formik.values.p_application_headers__refund_source_content,
      p_application_headers__refund_source_amount: formik.values.p_application_headers__refund_source_amount,
      p_application_headers__rent_to_be_paid_land_borrower:
        formik.values.p_application_headers__rent_to_be_paid_land_borrower,
      p_application_headers__rent_to_be_paid_land: formik.values.p_application_headers__rent_to_be_paid_land,
      p_application_headers__rent_to_be_paid_house_borrower:
        formik.values.p_application_headers__rent_to_be_paid_house_borrower,
      p_application_headers__rent_to_be_paid_house: formik.values.p_application_headers__rent_to_be_paid_house,
    };
  }, [formik.values]);

  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <Stack flex={1}>
          <ApPageTitle py={8}>{`現在のお借入状況について\n教えてください。`}</ApPageTitle>
          <ApItemGroup label={'あなたや連帯保証人予定者に、現在お借入はありますか？'}>
            <ApRadioRowGroup name="p_application_headers__curr_borrowing_status" options={CurrBorrowingStatusOptions} />
          </ApItemGroup>
          <Stack px={4} pb={4}>
            <ApStarHelp
              label={
                '住宅ローン、車のローン、奨学金などの他、カードローン、キャッシングがある場合も「有」を選択ください。'
              }
            />
          </Stack>
          {formik.values.p_application_headers__curr_borrowing_status === '1' && (
            <Stack>
              <FieldArray
                name="p_borrowings"
                render={(arrayHelpers) => (
                  <Fragment>
                    <Stack spacing={8} sx={{ px: 4 }}>
                      {formik.values.p_borrowings.map((item, index) => (
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
                              {`${index + 1}人目`}
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
                            <ApItemGroup label={'借入名義人'} pb={3} px={2}>
                              <ApRadioColumnGroup name={`p_borrowings[${index}].borrower`} options={borrowerOptions} />
                            </ApItemGroup>
                            <ApItemGroup label={'お借入の種類は？'} pb={3} px={2}>
                              <ApSelectField
                                name={`p_borrowings[${index}].type`}
                                placeholder={'選択してください'}
                                options={typeOptions}
                                justifyContent={'start'}
                                width={1}
                              />
                            </ApItemGroup>
                            <ApItemGroup
                              label={
                                <Typography variant="notify" lineHeight={'130%'}>
                                  {'返済予定表・利用明細等の画像をアップロードするか、詳細を入力してください。'}
                                </Typography>
                              }
                              pb={3}
                              px={2}
                            >
                              <Stack spacing={3}>
                                <ApImgUpload name={`p_borrowings[${index}].p_borrowing_I`} />
                                <ApCheckox
                                  name={`p_borrowings[${index}].self_input`}
                                  label={'アップロードせず、詳細入力する'}
                                  disabled={formik.values.p_borrowings[index].type === ''}
                                />
                              </Stack>
                            </ApItemGroup>
                            {formik.values.p_borrowings[index].self_input && (
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
                                        options={loanPurposeOptions}
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
                                    maxLength={6}
                                  />
                                </ApItemGroup>
                                <ApItemGroup label={'現在の残高'} pb={3} px={2}>
                                  <ApNumberInputField
                                    name={`p_borrowings[${index}].curr_loan_balance_amount`}
                                    placeholder={'0'}
                                    unit={'万円'}
                                    width={156}
                                    maxLength={6}
                                  />
                                </ApItemGroup>
                                <ApItemGroup label={'年間返済額'} pb={3} px={2}>
                                  <ApNumberInputField
                                    name={`p_borrowings[${index}].annual_repayment_amount`}
                                    placeholder={'0'}
                                    unit={'万円'}
                                    width={156}
                                    maxLength={6}
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
                                    label={formik.values.p_borrowings[index].type === '2' ? '最終期限' : '最終返済年月'}
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
                                          ['2', '5', '6', '7', '99'].includes(formik.values.p_borrowings[index].type)
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
                              self_input: false,
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
                        name="p_application_headers__refund_source_type"
                        options={refundSourceTypeOptions}
                      />
                      {formik.values.p_application_headers__refund_source_type.includes('99') && (
                        <Stack spacing={'6px'}>
                          <ApStarHelp label={'その他の方は詳細を入力ください。'} />
                          <ApTextInputField
                            name="p_application_headers__refund_source_type_other"
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
                        name="p_application_headers__refund_source_content"
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
                        name="p_application_headers__refund_source_amount"
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
                                name="p_application_headers__rent_to_be_paid_land_borrower"
                                options={borrowerOptions}
                              />
                            )}
                            <ApNumberInputField
                              name="p_application_headers__rent_to_be_paid_land"
                              label={'月間の支払金額'}
                              placeholder={'0'}
                              unit={'円'}
                              maxLength={10}
                              width={156}
                            />
                          </Stack>
                        </ApItemGroup>

                        <ApItemGroup label={'支払家賃'} pb={3} px={2}>
                          <Stack spacing={3}>
                            {hasIncomeTotalizer && (
                              <ApRadioColumnGroup
                                name="p_application_headers__rent_to_be_paid_house_borrower"
                                options={borrowerOptions}
                              />
                            )}
                            <ApNumberInputField
                              name="p_application_headers__rent_to_be_paid_house"
                              label={'月間の支払金額'}
                              placeholder={'0'}
                              unit={'円'}
                              maxLength={10}
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
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
