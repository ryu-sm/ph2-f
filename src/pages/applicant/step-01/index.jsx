import { FormikProvider, useFormik } from 'formik';
import {
  ApBonusRepaymentModal,
  ApCheckboxButton,
  ApCheckboxButtonGroup,
  ApErrorScroll,
  ApIncomeTotalizerModal,
  ApItemGroup,
  ApJoinGuarantorModal,
  ApLandAdvancePlanModal,
  ApLighterButton,
  ApLoanPlusModal,
  ApModalWrapper,
  ApNumberInputField,
  ApPageTitle,
  ApPairLoanModal,
  ApPrimaryButton,
  ApRadioColumnGroup,
  ApRepaymentMethodModal,
  ApSaveDraftButton,
  ApSelectField,
  ApSelectFieldYm,
  ApSelectFieldYmd,
  ApStarHelp,
  ApTextInputField,
  ApUpdateApply,
} from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect, useMemo } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { applicationAtom, authAtom } from '@/store';
import {
  bonusRepaymentMonthOptions,
  hasJoinGuarantorOptions,
  landAadvancePlanOptions,
  loanPlusOptions,
  loanTargetOptions,
  loanTargetOptions_,
  loanTypeOptions,
  repaymentMethodOptions,
  yearNumOptions,
  yearOptions,
} from './options';
import { validationSchema } from './validationSchema';
import { useBankMaster } from '@/hooks/use-bank-master';
import { Box, Stack, Typography } from '@mui/material';
import { useApUpdateApplyInfo, useBoolean, useIsSalesPerson } from '@/hooks';
import { Icons } from '@/assets';
import { MCJ_CODE, SBI_CODE } from '@/configs';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { cloneDeep } from 'lodash';
import { API_500_ERROR, YUP_MESSAGES } from '@/constant';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';

export const ApStep01Page = () => {
  const isSalesPerson = useIsSalesPerson();
  const navigate = useNavigate();
  const pairLoanModal = useBoolean(false);
  const delPairLoanModal = useBoolean(false);
  const updateModal = useBoolean(false);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const resetApplication = useResetRecoilState(applicationAtom);
  const setAuthInfo = useSetRecoilState(authAtom);
  const { applyNo, agentSended } = useRecoilValue(authAtom);
  const {
    isMCJ,
    apNextStepId,
    changeJoinGuarantor,
    changeToIncomeTotalizer,
    //
    p_application_headers,
    p_application_banks,
    p_borrowing_details__1,
    p_borrowing_details__2,
  } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();
  const setLocalData = (values) => {
    setApplicationInfo((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          move_scheduled_date: values.p_application_headers.move_scheduled_date,
          loan_target: values.p_application_headers.loan_target,
          loan_target_type: values.p_application_headers.loan_target_type,
          land_advance_plan: values.p_application_headers.land_advance_plan,
          loan_type: values.p_application_headers.loan_type,
          pair_loan_last_name: values.p_application_headers.pair_loan_last_name,
          pair_loan_first_name: values.p_application_headers.pair_loan_first_name,
          pair_loan_rel_name: values.p_application_headers.pair_loan_rel_name,
          join_guarantor_umu: values.p_application_headers.join_guarantor_umu,
          loan_plus: values.p_application_headers.loan_plus,
        },
        p_application_banks: values.p_application_banks,
        p_borrowing_details__1: {
          ...pre.p_borrowing_details__1,
          desired_borrowing_date: values.p_borrowing_details__1.desired_borrowing_date,
          desired_loan_amount: values.p_borrowing_details__1.desired_loan_amount,
          bonus_repayment_amount: values.p_borrowing_details__1.bonus_repayment_amount,
          bonus_repayment_month: values.p_borrowing_details__1.bonus_repayment_month,
          loan_term_year: values.p_borrowing_details__1.loan_term_year,
          repayment_method: values.p_borrowing_details__1.repayment_method,
        },
        p_borrowing_details__2: {
          ...pre.p_borrowing_details__2,
          desired_borrowing_date: values.p_borrowing_details__2.desired_borrowing_date,
          desired_loan_amount: values.p_borrowing_details__2.desired_loan_amount,
          bonus_repayment_amount: values.p_borrowing_details__2.bonus_repayment_amount,
        },
      };
    });
  };

  const initialValues = {
    p_application_headers: {
      move_scheduled_date: p_application_headers.move_scheduled_date,
      loan_target: p_application_headers.loan_target,
      loan_target_type: p_application_headers.loan_target_type,
      land_advance_plan: p_application_headers.land_advance_plan,
      loan_type: p_application_headers.loan_type,
      pair_loan_last_name: p_application_headers.pair_loan_last_name,
      pair_loan_first_name: p_application_headers.pair_loan_first_name,
      pair_loan_rel_name: p_application_headers.pair_loan_rel_name,
      join_guarantor_umu: p_application_headers.join_guarantor_umu,
      loan_plus: p_application_headers.loan_plus,
    },
    p_application_banks,
    p_borrowing_details__1: {
      desired_borrowing_date: p_borrowing_details__1.desired_borrowing_date,
      desired_loan_amount: p_borrowing_details__1.desired_loan_amount,
      bonus_repayment_amount: p_borrowing_details__1.bonus_repayment_amount,
      bonus_repayment_month: p_borrowing_details__1.bonus_repayment_month,
      loan_term_year: p_borrowing_details__1.loan_term_year,
      repayment_method: p_borrowing_details__1.repayment_method,
    },
    p_borrowing_details__2: {
      desired_borrowing_date: p_borrowing_details__2.desired_borrowing_date,
      desired_loan_amount: p_borrowing_details__2.desired_loan_amount,
      bonus_repayment_amount: p_borrowing_details__2.bonus_repayment_amount,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
        land_advance_plan: values.p_application_headers.land_advance_plan,
      },
      p_application_banks: values.p_application_banks,
      p_borrowing_details__1: {
        ...diffObj(initialValues.p_borrowing_details__1, values.p_borrowing_details__1),
      },
      p_borrowing_details__2: {
        ...diffObj(initialValues.p_borrowing_details__2, values.p_borrowing_details__2),
      },
    };
    return diffData;
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (changeToIncomeTotalizer) {
          setLocalData(values);
          navigate(routeNames.apStep04Page.path);
        } else if (changeJoinGuarantor) {
          setLocalData(values);
          navigate(routeNames.apStep06Page.path);
        } else if (agentSended) {
          await updateApply(applyNo, setUpdateData(values));
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
    if (isSalesPerson) {
      if (
        window.confirm(
          '管理ページへ遷移します。\nご入力いただいた情報をまだ保存していない場合、破棄しますが、宜しいでしょうか。'
        )
      ) {
        setAuthInfo((pre) => {
          return {
            ...pre,
            applyNo: null,
            agentSended: false,
          };
        });
        resetApplication();
        navigate(routeNames.adSalesPersonDashboardPage.path);
      }
    } else {
      setLocalData(formik.values);
      navigate(routeNames.apTopPage.path);
    }
  };

  const bankMaster = useBankMaster();

  useEffect(() => {
    if (bankMaster.length > 0) {
      const sbiId = bankMaster.find((item) => item.code === SBI_CODE)?.value;
      if (!p_application_banks?.includes(sbiId)) {
        formik.setFieldValue('p_application_banks', [...p_application_banks, sbiId]);
      }
    }
  }, [bankMaster.length]);

  useEffect(() => {
    if (p_application_banks.includes(bankMaster.find((item) => item.code === MCJ_CODE)?.value)) {
      setApplicationInfo((pre) => ({ ...pre, isMCJ: true }));
    } else {
      setApplicationInfo((pre) => ({ ...pre, isMCJ: false }));
    }
    if (['3', '4'].includes(p_application_headers.loan_type)) {
      setApplicationInfo((pre) => ({ ...pre, hasIncomeTotalizer: true }));
    } else {
      setApplicationInfo((pre) => ({ ...pre, hasIncomeTotalizer: false }));
    }
    if (p_application_headers.join_guarantor_umu === '1') {
      setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: true }));
    } else {
      setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: false }));
    }
  }, [p_application_banks, p_application_headers.loan_type, p_application_headers.join_guarantor_umu, bankMaster]);

  // TODO: **delete**
  // useEffect(() => {
  //   if (formik.values.loan_type !== '3' || formik.values.loan_type !== '4') {
  //     setApplicationInfo((pre) => {
  //       return {
  //         ...pre,
  //         p_application_headers: {
  //           ...pre.p_application_headers,
  //           rent_to_be_paid_land_borrower: '',
  //           rent_to_be_paid_land: '',
  //           rent_to_be_paid_house_borrower: '',
  //           rent_to_be_paid_house: '',
  //           refund_source_type: [],
  //           refund_source_type_other: '',
  //           refund_source_content: '',
  //           refund_source_amount: '',
  //         },
  //       };
  //     });
  //   }
  // }, [formik.values.loan_type]);

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
              rightLabel={changeToIncomeTotalizer || changeJoinGuarantor ? false : agentSended && '保存'}
            />
          </>
        }
      >
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle py={8}>{`まずは、お借入のご希望を\nお聞かせください。`}</ApPageTitle>
        <ApItemGroup label={'入居予定年月'}>
          <ApSelectFieldYm name={'p_application_headers.move_scheduled_date'} yearOptions={yearOptions} />
        </ApItemGroup>
        {bankMaster.length > 1 ? (
          <ApItemGroup label={'借入を申し込む金融機関を選択してください'} note={'※複数選択可'}>
            <ApCheckboxButtonGroup
              name={'p_application_banks'}
              options={bankMaster}
              onChange={(e) => {
                if (bankMaster.find((item) => item.code === MCJ_CODE)?.value == e.target.value) {
                  setApplicationInfo((pre) => {
                    return { ...pre, isMCJ: e.target.checked };
                  });
                }
              }}
            />
          </ApItemGroup>
        ) : (
          <ApItemGroup label={'借入を申し込む金融機関'}>
            <Typography variant="unit" sx={{ color: 'text.main', pl: 4 }}>
              {bankMaster.map((item) => item.label)}
            </Typography>
          </ApItemGroup>
        )}
        <ApItemGroup label={'お借入の目的'}>
          <ApRadioColumnGroup
            name={'p_application_headers.loan_target_type'}
            options={loanTargetOptions_}
            onChange={(e) => {
              switch (e.target.value) {
                case '0':
                  formik.setFieldValue('p_application_headers.loan_target', '');
                  formik.setFieldTouched('p_application_headers.loan_target', false);
                  break;
                case '7':
                  setApplicationInfo((pre) => {
                    return {
                      ...pre,
                      p_application_headers: {
                        ...pre.p_application_headers,
                        new_house_acquire_reason: '',
                        new_house_acquire_reason_other: '',
                      },
                    };
                  });
                  formik.setFieldValue('p_application_headers.loan_target', '7');
                  break;
                case '8':
                  formik.setFieldValue('p_application_headers.loan_target', '8');
                  break;
              }
              if (e.target.value !== '0') {
                formik.setFieldValue('p_application_headers.land_advance_plan', '');
                formik.setFieldTouched('p_application_headers.land_advance_plan', false);

                formik.setFieldValue('p_borrowing_details__2._desired_borrowing_date', '');
                formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                formik.setFieldTouched('p_borrowing_details__2._desired_borrowing_date', false);
                formik.setFieldTouched('p_borrowing_details__2.desired_loan_amount', false);
                formik.setFieldTouched('p_borrowing_details__2.bonus_repayment_amount', false);
              }
            }}
          />
        </ApItemGroup>

        {formik.values.p_application_headers.loan_target_type === '0' && (
          <ApItemGroup label={'資金の使いみち'}>
            <ApRadioColumnGroup
              name={'p_application_headers.loan_target'}
              options={loanTargetOptions}
              onChange={(e) => {
                setApplicationInfo((pre) => {
                  return {
                    ...pre,
                    p_application_headers: {
                      ...pre.p_application_headers,
                      required_funds_land_amount: '',
                      required_funds_house_amount: '',
                      required_funds_accessory_amount: '',
                      required_funds_additional_amount: '',
                      required_funds_refinance_loan_balance: '',
                      required_funds_upgrade_amount: '',
                      required_funds_loan_plus_amount: '',
                      required_funds_total_amount: '',
                      funding_saving_amount: '',
                      funding_estate_sale_amount: '',
                      funding_other_saving_amount: '',
                      funding_relative_donation_amount: '',
                      funding_loan_amount: '',
                      funding_pair_loan_amount: '',
                      funding_other_amount: '',
                      funding_other_amount_detail: '',
                      funding_total_amount: '',
                    },
                  };
                });
                if (e.target.value !== '6') {
                  formik.setFieldValue('p_application_headers.land_advance_plan', '');
                  formik.setFieldTouched('p_application_headers.land_advance_plan', false);
                  formik.setFieldValue('p_borrowing_details__2.desired_borrowing_date', '');
                  formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                  formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                  formik.setFieldTouched('p_borrowing_details__2.desired_borrowing_date', false);
                  formik.setFieldTouched('p_borrowing_details__2.desired_loan_amount', false);
                  formik.setFieldTouched('p_borrowing_details__2.bonus_repayment_amount', false);
                }
              }}
            />
          </ApItemGroup>
        )}

        {formik.values.p_application_headers.loan_target === '6' && (
          <ApItemGroup
            label={'土地先行プランをご希望ですか？'}
            note={'※ 土地先行プランは住信SBIネット銀行でご利用できます。'}
            helps={[<ApLandAdvancePlanModal />]}
            helpsType={'break'}
          >
            <ApRadioColumnGroup
              name={'p_application_headers.land_advance_plan'}
              options={landAadvancePlanOptions}
              onChange={(e) => {
                if (e.target.value !== '1') {
                  formik.setFieldValue('p_borrowing_details__2.desired_borrowing_date', '');
                  formik.setFieldValue('p_borrowing_details__2.desired_loan_amount', '');
                  formik.setFieldValue('p_borrowing_details__2.bonus_repayment_amount', '');
                  formik.setFieldTouched('p_borrowing_details__2.desired_borrowing_date', false);
                  formik.setFieldTouched('p_borrowing_details__2.desired_loan_amount', false);
                  formik.setFieldTouched('p_borrowing_details__2.bonus_repayment_amount', false);
                }
              }}
            />
          </ApItemGroup>
        )}

        <ApItemGroup
          label={'お借入形態'}
          helps={[<ApPairLoanModal />, <ApIncomeTotalizerModal />]}
          helpsType={'nowrap'}
        >
          <ApRadioColumnGroup
            name={'p_application_headers.loan_type'}
            options={loanTypeOptions}
            onChange={(e) => {
              if (e.target.value !== '2' && formik.values.p_application_headers.loan_type === '2' && !!applyNo) {
                delPairLoanModal.onTrue();
              }
              if (
                (e.target.value === '3' || e.target.value === '4') &&
                (p_application_headers.loan_type !== '3' || p_application_headers.loan_type !== '4') &&
                agentSended
              ) {
                setApplicationInfo((pre) => {
                  return { ...pre, changeToIncomeTotalizer: true, apNextStepId: 4 };
                });
              } else {
                setApplicationInfo((pre) => {
                  return { ...pre, changeToIncomeTotalizer: false, apNextStepId: 2 };
                });
              }
              if (e.target.value === '2') pairLoanModal.onTrue();
              if (e.target.value === '3' || e.target.value === '4') {
                setApplicationInfo((pre) => {
                  return { ...pre, hasIncomeTotalizer: true };
                });
              } else {
                setApplicationInfo((pre) => {
                  return { ...pre, hasIncomeTotalizer: false };
                });
              }
              if (
                (formik.values.p_application_headers.loan_type === '3' ||
                  formik.values.p_application_headers.loan_type === '4') &&
                (e.target.value !== '3' || e.target.value !== '4')
              ) {
                setApplicationInfo((pre) => {
                  return {
                    ...pre,
                    p_application_headers: {
                      ...pre.p_application_headers,
                      rent_to_be_paid_land_borrower: '',
                      rent_to_be_paid_house_borrower: '',
                    },
                    p_borrowings: pre.p_borrowings.map((item) => ({ ...item, borrower: '' })),
                  };
                });
              }
            }}
          />
          <ApModalWrapper open={delPairLoanModal.value} icon={<Icons.ApSmileIcon />} label={'確認'}>
            <Stack spacing={8} sx={{ px: 8 }}>
              <Stack alignItems={'center'}>
                <Typography variant="notify" color={'text.main'} textAlign={'center'}>
                  {`借入状態にペアローンを外しましたら、\nペアローンに関して登録された情報が削除されますが、よろしいでしょうか。`}
                </Typography>
              </Stack>
              <Stack spacing={4} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <ApLighterButton
                  height={40}
                  width={160}
                  onClick={() => {
                    formik.setFieldValue('p_application_headers.loan_type', '2');
                    delPairLoanModal.onFalse();
                  }}
                >
                  キャンセル
                </ApLighterButton>
                <ApPrimaryButton height={40} width={160} onClick={delPairLoanModal.onFalse}>
                  OK
                </ApPrimaryButton>
              </Stack>
            </Stack>
          </ApModalWrapper>
          {formik.values.p_application_headers.loan_type === '2' && (
            <Stack sx={{ pt: 4 }}>
              <Stack
                sx={{
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  bgcolor: 'primary.main',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Stack sx={{ px: 4, py: 1 }}>
                  <Typography variant="form_item_label" color="white">
                    ペアローンのお相手について
                  </Typography>
                </Stack>
                <Stack sx={{ bgcolor: 'white', borderRadius: '7px' }}>
                  <ApItemGroup label={'お名前'} pb={3} px={2}>
                    <Stack spacing={3}>
                      <ApTextInputField
                        name={'p_application_headers.pair_loan_last_name'}
                        placeholder={'姓'}
                        convertFullWidth
                      />
                      <ApTextInputField
                        name={'p_application_headers.pair_loan_first_name'}
                        placeholder={'名'}
                        convertFullWidth
                      />
                    </Stack>
                  </ApItemGroup>
                  <ApItemGroup label={'続柄'} pb={3} px={2}>
                    <ApTextInputField
                      name={'p_application_headers.pair_loan_rel_name'}
                      placeholder={'例：妻'}
                      convertFullWidth
                    />
                  </ApItemGroup>
                </Stack>
              </Stack>
            </Stack>
          )}
          <ApModalWrapper
            open={pairLoanModal.value}
            icon={<Icons.ApSmileIcon />}
            label={'ペアローンを\nお申し込みの方へ'}
          >
            <Stack sx={{ px: 6 }}>
              <Box
                sx={{
                  py: 4,
                  borderTop: '1px dashed',
                  borderBottom: '1px dashed',
                  borderColor: 'primary.60',
                }}
              >
                <Stack spacing={'8px'} direction={'row'} alignItems={'center'}>
                  <Box>
                    <Icons.ApWarningMainIcon />
                  </Box>
                  <Typography variant="modal_label" sx={{ color: 'text.main', textAlign: 'start' }}>
                    {'ペアローンを組むお相手も、別途仮審査申込が必要です。'}
                  </Typography>
                </Stack>
              </Box>
              {isMCJ && (
                <Box
                  sx={{
                    py: 4,
                    borderBottom: '1px dashed',
                    borderColor: 'primary.60',
                  }}
                >
                  <Stack spacing={'8px'} direction={'row'} alignItems={'center'}>
                    <Box>
                      <Icons.ApWarningMainIcon />
                    </Box>
                    <Typography variant="modal_label" sx={{ color: 'taxt.main', textAlign: 'start' }}>
                      {
                        'ペアローンは住信SBIネット銀行でご利用いただけます。日本住宅ローンではペアローンをお取り扱いしておりませんのでご了承ください。'
                      }
                    </Typography>
                  </Stack>
                </Box>
              )}
              <Stack alignItems={'center'} sx={{ pt: 6 }}>
                <ApLighterButton
                  height={40}
                  width={160}
                  endIcon={<Icons.ApForwardRightMainIcon />}
                  onClick={pairLoanModal.onFalse}
                >
                  とじる
                </ApLighterButton>
              </Stack>
            </Stack>
          </ApModalWrapper>
        </ApItemGroup>

        <ApItemGroup label={'お借入内容'}>
          <Stack
            sx={{
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: 'primary.main',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            {formik.values.p_application_headers.land_advance_plan === '1' && (
              <Stack sx={{ px: 4, py: 1 }}>
                <Typography variant="form_item_label" color="white">
                  1回目の融資
                </Typography>
              </Stack>
            )}
            <Stack
              sx={{
                bgcolor: 'white',
                borderRadius: '7px',
              }}
            >
              <ApItemGroup
                label={'お借入希望日'}
                pb={3}
                px={2}
                borderTopRightRadius={formik.values.p_application_headers.land_advance_plan === '1' ? 0 : '7px'}
                borderTopLeftRadius={formik.values.p_application_headers.land_advance_plan === '1' ? 0 : '7px'}
              >
                <ApSelectFieldYmd name={'p_borrowing_details__1.desired_borrowing_date'} yearOptions={yearOptions} />
              </ApItemGroup>
              <ApItemGroup label={'お借入希望額'} pb={3} px={2}>
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <ApNumberInputField
                      name={'p_borrowing_details__1.desired_loan_amount'}
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
                      maxLength={6}
                    />
                    {formik.errors?.p_borrowing_details__1?.desired_loan_amount !==
                      YUP_MESSAGES.TEMPORARY_DESIRED_LOAN_AMOUNT &&
                      formik.values.p_application_headers.land_advance_plan === '1' && (
                        <ApStarHelp label={YUP_MESSAGES.TEMPORARY_DESIRED_LOAN_AMOUNT} />
                      )}
                    {formik.values.p_application_headers.loan_type === '2' && (
                      <ApStarHelp
                        label={
                          'あなたの分の金額をご入力ください。ペアローン相手との合計金額ではございませんのでご注意ください。'
                        }
                      />
                    )}
                  </Stack>
                  <ApNumberInputField
                    name={'p_borrowing_details__1.bonus_repayment_amount'}
                    placeholder="0"
                    label={'うち、ボーナス返済分'}
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
                    maxLength={6}
                    onBlur={(e) => {
                      if (!!e.target.value && formik.values.p_borrowing_details__1.bonus_repayment_month === '1') {
                        formik.setFieldValue('p_borrowing_details__1.bonus_repayment_month', '2');
                      }
                      if (e.target.value === '' || e.target.value === '0') {
                        formik.setFieldTouched('p_borrowing_details__1.bonus_repayment_amount', false);
                        formik.setFieldValue('p_borrowing_details__1.bonus_repayment_month', '1');
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex' }}>
                    <ApBonusRepaymentModal />
                  </Box>

                  <Stack spacing={1}>
                    <Typography variant="unit" color={'text.main'}>
                      ボーナス返済月
                    </Typography>
                    <ApSelectField
                      placeholder="選択してください"
                      name={'p_borrowing_details__1.bonus_repayment_month'}
                      options={bonusRepaymentMonthOptions}
                      width={200}
                    />
                  </Stack>
                </Stack>
              </ApItemGroup>
              <ApItemGroup label={'お借入期間'} pb={3} px={2}>
                <ApSelectField
                  name={'p_borrowing_details__1.loan_term_year'}
                  placeholder={'--'}
                  options={yearNumOptions}
                  unit={'年'}
                  width={72}
                />
              </ApItemGroup>
              <ApItemGroup label={'返済方法'} pb={3} px={2} helps={[<ApRepaymentMethodModal />]} helpsType={'nowrap'}>
                <ApRadioColumnGroup name={'p_borrowing_details__1.repayment_method'} options={repaymentMethodOptions} />
              </ApItemGroup>
            </Stack>
          </Stack>
          {formik.values.p_application_headers.land_advance_plan === '1' && (
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
                  2回目の融資
                </Typography>
              </Stack>
              <Stack
                sx={{
                  bgcolor: 'white',
                  borderRadius: '7px',
                }}
              >
                <ApItemGroup
                  label={'お借入希望日'}
                  pb={3}
                  px={2}
                  borderTopRightRadius={formik.values.p_application_headers.land_advance_plan === '1' ? 0 : '7px'}
                  borderTopLeftRadius={formik.values.p_application_headers.land_advance_plan === '1' ? 0 : '7px'}
                >
                  <ApSelectFieldYmd name={'p_borrowing_details__2.desired_borrowing_date'} yearOptions={yearOptions} />
                </ApItemGroup>
                <ApItemGroup label={'お借入希望額'} pb={3} px={2}>
                  <Stack spacing={3}>
                    <Stack spacing={1}>
                      <ApNumberInputField
                        name={'p_borrowing_details__2.desired_loan_amount'}
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
                        maxLength={6}
                      />
                      {formik.errors?.p_borrowing_details__2?.desired_loan_amount !==
                        YUP_MESSAGES.TEMPORARY_DESIRED_LOAN_AMOUNT &&
                        formik.values.p_application_headers.land_advance_plan === '1' && (
                          <ApStarHelp label={YUP_MESSAGES.TEMPORARY_DESIRED_LOAN_AMOUNT} />
                        )}
                    </Stack>
                    <ApNumberInputField
                      name={'p_borrowing_details__2.bonus_repayment_amount'}
                      placeholder="0"
                      label={'うち、ボーナス返済分'}
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
                      maxLength={6}
                    />
                  </Stack>
                </ApItemGroup>
              </Stack>
            </Stack>
          )}
        </ApItemGroup>
        <ApItemGroup
          label={'担保提供者がいる方のみ、チェックをつけてください。'}
          helps={[<ApJoinGuarantorModal />]}
          helpsType={'break'}
        >
          <ApCheckboxButton
            name={'p_application_headers.join_guarantor_umu'}
            options={hasJoinGuarantorOptions}
            onChange={(e) => {
              if (e.target.checked && p_application_headers.join_guarantor_umu !== '1' && agentSended) {
                setApplicationInfo((pre) => ({ ...pre, changeJoinGuarantor: true }));
              } else {
                setApplicationInfo((pre) => ({ ...pre, changeJoinGuarantor: false }));
              }
              if (e.target.checked) {
                setApplicationInfo((pre) => ({
                  ...pre,
                  hasJoinGuarantor: true,
                  p_join_guarantors: [
                    {
                      id: '',
                      last_name_kanji: '',
                      first_name_kanji: '',
                      last_name_kana: '',
                      first_name_kana: '',
                      gender: '',
                      rel_to_applicant_a_name: '',
                      birthday: '',
                      mobile_phone: '',
                      home_phone: '',
                      postal_code: '',
                      prefecture_kanji: '',
                      city_kanji: '',
                      district_kanji: '',
                      other_address_kanji: '',
                      prefecture_kana: '',
                      city_kana: '',
                      district_kana: '',
                    },
                  ],
                }));
              } else {
                setApplicationInfo((pre) => ({ ...pre, hasJoinGuarantor: false, p_join_guarantors: [] }));
              }
            }}
          />
        </ApItemGroup>

        <ApItemGroup
          optional
          label={'住信SBIネット銀行の「住宅ローンプラス」を申し込みますか？'}
          helps={[<ApLoanPlusModal />]}
          helpsType={'break'}
        >
          <ApCheckboxButton name={'p_application_headers.loan_plus'} options={loanPlusOptions} />
        </ApItemGroup>
      </ApLayout>
    </FormikProvider>
  );
};
