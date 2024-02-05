import { FormikProvider, useFormik, getIn } from 'formik';
import { useSpContext } from '@/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SpBlock, SpGroup, SpLayout, SpStepFooter } from '@/layouts/sp-end';
import { Box, Button, Center, HStack, Stack, Text, useDisclosure, useTheme } from '@chakra-ui/react';
import {
  SpCheckboxGroup,
  SpInputField,
  SpModalWrapper,
  SpNotifyTitle,
  SpPageTitle,
  SpSelect,
  SpSelectYM,
  SpSelectYMD,
} from '@/components/sp-end';
import { userPaths } from '@/routers/users/paths';
import { parseStepId } from '@/utils';
import {
  bonusRepaymentMonthOptions,
  hasJoinGuarantorOptions,
  landAadvancePlanOptions,
  loanPlusOptions,
  loanTargetOptions,
  loanTargetOptions__,
  loanTypeOptions,
  repaymentMethodOptions,
  yearNumOptions,
  yearOptions,
} from './option';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { spGetBanks } from '@/api/user-api';
import SpRadioGroup from '@/components/sp-end/radio-group';
import { SpRight, SpSmileIcon } from '@/assets/svgs';
import SpModalWaringIcon from '@/assets/svgs/sp-modal-waring';
import { configs } from '@/configs';

export default function SpStep1() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pairLoanModal = useDisclosure();
  const {
    user,
    getNextStepUrl,
    updateSpLocalState,
    updateCurrCompletedStepID,
    //
    is_mcj,
    p_application_headers__move_scheduled_date,
    p_application_banks__s_bank_ids,
    p_application_headers__loan_target,
    p_application_headers__land_advance_plan,
    p_application_headers__loan_type,
    p_application_headers__pair_loan_last_name,
    p_application_headers__pair_loan_first_name,
    p_application_headers__pair_loan_rel_name,
    p_borrowing_details__1__desired_borrowing_date,
    p_borrowing_details__1__desired_loan_amount,
    p_borrowing_details__1__bonus_repayment_amount,
    p_borrowing_details__1__bonus_repayment_month,
    p_borrowing_details__1__loan_term_year,
    p_borrowing_details__1__repayment_method,
    p_borrowing_details__2__desired_borrowing_date,
    p_borrowing_details__2__desired_loan_amount,
    p_borrowing_details__2__bonus_repayment_amount,
    p_application_headers__join_guarantor_type,
    p_application_headers__loan_plus,
  } = useSpContext();

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      p_application_headers__move_scheduled_date,
      p_application_banks__s_bank_ids,
      p_application_headers__loan_target__: 0,
      p_application_headers__loan_target,
      p_application_headers__land_advance_plan,
      p_application_headers__loan_type,
      p_application_headers__pair_loan_last_name,
      p_application_headers__pair_loan_first_name,
      p_application_headers__pair_loan_rel_name,
      p_borrowing_details__1__desired_borrowing_date,
      p_borrowing_details__1__desired_loan_amount,
      p_borrowing_details__1__bonus_repayment_amount,
      p_borrowing_details__1__bonus_repayment_month,
      p_borrowing_details__1__loan_term_year,
      p_borrowing_details__1__repayment_method,
      p_borrowing_details__2__desired_borrowing_date,
      p_borrowing_details__2__desired_loan_amount,
      p_borrowing_details__2__bonus_repayment_amount,
      p_application_headers__join_guarantor_type,
      p_application_headers__loan_plus,
    },
    validationSchema: Yup.object({
      p_application_headers__move_scheduled_date: Yup.string().matches(REGEX.ym, '入居予定年月を選択してください。'),
      p_application_banks__s_bank_ids: Yup.array().of(Yup.number()).min(1, 'どれか1つを選択してください。'),
      p_application_headers__loan_target: Yup.string().required('どれか1つを選択してください。'),
      p_application_headers__land_advance_plan: Yup.string().when(
        'p_application_headers__loan_target',
        (p_application_headers__loan_target, field) =>
          p_application_headers__loan_target == 2 ? field.required('どれか1つを選択してください。') : field
      ),
      p_application_headers__loan_type: Yup.string().nullable(),
      p_application_headers__pair_loan_last_name: Yup.string().nullable(),
      p_application_headers__pair_loan_first_name: Yup.string().nullable(),
      p_application_headers__pair_loan_rel_name: Yup.string().nullable(),
      p_borrowing_details__1__desired_borrowing_date: Yup.string().matches(
        REGEX.ymd,
        'お借入希望日を選択してください。'
      ),
      p_borrowing_details__1__desired_loan_amount: Yup.number()
        .required('この項目を入力してください。')
        .test('--', '金額は10万円単位で入力してください', (field) => +(field || 0) % 10 === 0),
      p_borrowing_details__1__bonus_repayment_amount: Yup.number().nullable(),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const [bankOptions, setBankOptions] = useState([]);
  const getSpBanks = useCallback(async () => {
    try {
      const res = await spGetBanks();
      setBankOptions(res.data);
    } catch (error) {
      alert(error);
    }
  }, []);
  useEffect(() => {
    getSpBanks();
  }, [getSpBanks]);

  const handleOnRight = useCallback(async () => {
    try {
      const stepId = parseStepId(pathname);
      if (user?.agent_sended) {
      } else {
        navigate(getNextStepUrl(stepId));
      }
      updateCurrCompletedStepID(stepId);
    } catch (error) {}
  }, []);

  const handleOnLeft = useCallback(() => {
    navigate(userPaths.top);
  }, []);

  useEffect(() => {
    updateSpLocalState({
      is_mcj: formik.values.p_application_banks__s_bank_ids.includes(
        bankOptions.find((item) => item.code === configs.MCJ_CODE)?.value
      ),
    });
  }, [formik.values.p_application_banks__s_bank_ids.length]);

  useEffect(() => {
    updateSpLocalState({
      has_application_b:
        formik.values.p_application_headers__loan_type === 3 || formik.values.p_application_headers__loan_type === 4,
      has_join_guarantor: formik.values.p_application_headers__join_guarantor_type === 1,
    });
  }, [formik.values.p_application_headers__join_guarantor_type, formik.values.p_application_headers__loan_type]);

  useEffect(() => {
    if (formik.isSubmitting && !formik.isValidating) {
      const errorNames = Object.keys(formik.errors).reduce((prev, key) => {
        if (getIn(formik.errors, key)) {
          prev.push(key);
        }

        return prev;
      }, []);

      if (errorNames.length && typeof document !== 'undefined') {
        let errorElement;

        errorNames.forEach((errorKey) => {
          const selector = `[name="${errorKey}"]`;
          if (!errorElement) {
            errorElement = document.querySelector(selector);
            return;
          }
        });

        setTimeout(() => {
          if (errorElement) {
            if (errorElement.type === 'hidden') {
              errorElement.parentElement?.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            } else {
              errorElement.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            }
          }
        }, 100);
      }
    }
  }, [formik.isSubmitting, formik.isValidating, formik.errors, formik.touched]);

  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasStepHeader={true}>
      <FormikProvider value={formik}>
        <SpPageTitle>{`まずは、お借入のご希望を\nお聞かせください。`}</SpPageTitle>
        <SpGroup title={'入居予定年月'}>
          <SpSelectYM name="p_application_headers__move_scheduled_date" yearOptions={yearOptions} />
        </SpGroup>
        <SpGroup title={'借入を申し込む金融機関を選択してください'} helper={'複数選択可'}>
          <SpCheckboxGroup
            id="p_application_banks__s_bank_ids"
            name="p_application_banks__s_bank_ids"
            options={bankOptions}
            onChange={(value) => {
              const temp = value.map((item) => parseInt(item));
              formik.setFieldValue('p_application_banks__s_bank_ids', temp);
            }}
          />
        </SpGroup>
        <SpGroup title={'お借入の目的'}>
          <SpRadioGroup
            name="p_application_headers__loan_target__"
            options={loanTargetOptions__}
            value={formik.values.p_application_headers__loan_target__}
            onChange={(value) => {
              if (!!value) {
                formik.setFieldValue('p_application_headers__loan_target', parseInt(value));
              } else {
                formik.setFieldValue('p_application_headers__loan_target', '');
              }
              formik.setFieldValue('p_application_headers__loan_target__', parseInt(value));
            }}
          />
        </SpGroup>
        {!formik.values.p_application_headers__loan_target__ && (
          <SpGroup title={'資金の使いみち'}>
            <SpRadioGroup
              name="p_application_headers__loan_target"
              options={loanTargetOptions}
              value={formik.values.p_application_headers__loan_target}
              onChange={(value) => formik.setFieldValue('p_application_headers__loan_target', parseInt(value))}
            />
          </SpGroup>
        )}
        {formik.values.p_application_headers__loan_target == 2 && (
          <SpGroup
            title={'土地先行プランをご希望ですか？'}
            helper={'土地先行プランは住信SBIネット銀行でご利用できます'}
          >
            <SpRadioGroup
              name="p_application_headers__land_advance_plan"
              options={landAadvancePlanOptions}
              value={formik.values.p_application_headers__land_advance_plan}
              onChange={(value) => formik.setFieldValue('p_application_headers__land_advance_plan', parseInt(value))}
            />
          </SpGroup>
        )}
        <SpGroup title={'お借入形態'}>
          <SpRadioGroup
            name="p_application_headers__loan_type"
            options={loanTypeOptions}
            value={formik.values.p_application_headers__loan_type}
            onChange={(value) => {
              formik.setFieldValue('p_application_headers__loan_type', parseInt(value));
              if (parseInt(value) === 2) {
                pairLoanModal.onOpen();
              } else {
                formik.setFieldValue('p_application_headers__pair_loan_last_name', '');
                formik.setFieldValue('p_application_headers__pair_loan_first_name', '');
                formik.setFieldValue('p_application_headers__pair_loan_rel_name', '');
              }
            }}
          />
          {formik.values.p_application_headers__loan_type === 2 && (
            <Box pt={'32px'}>
              <SpBlock title={'ペアローンのお相手について'}>
                <SpGroup title={'お名前'} isMini={true}>
                  <Stack spacing={'12px'}>
                    <SpInputField name="p_application_headers__pair_loan_last_name" placeholder={'姓'} />
                    <SpInputField name="p_application_headers__pair_loan_first_name" placeholder={'姓'} />
                  </Stack>
                </SpGroup>
                <SpGroup title={'続柄'} isMini={true}>
                  <SpInputField name="p_application_headers__pair_loan_rel_name" placeholder={'例：妻'} />
                </SpGroup>
              </SpBlock>
            </Box>
          )}
          <SpModalWrapper isOpen={pairLoanModal.isOpen}>
            <SpNotifyTitle icon={<SpSmileIcon />} title={`ペアローンを\nお申し込みの方へ`} variant="sp_20_130_bold" />
            <Box borderTop={'1px dashed'} borderBottom={'1px dashed'} borderColor={'sp.primary.60'} py={'16px'}>
              <HStack spacing={'8px'}>
                <Box minW={'24px'}>
                  <SpModalWaringIcon />
                </Box>
                <Text variant={'sp_14_170'} color={'sp.gray.200'}>
                  {'ペアローンを組むお相手も、別途仮審査申込が必要です。'}
                </Text>
              </HStack>
            </Box>
            {is_mcj && (
              <Box borderBottom={'1px dashed'} borderColor={'sp.primary.60'} py={'16px'}>
                <HStack spacing={'8px'}>
                  <Box minW={'24px'}>
                    <SpModalWaringIcon />
                  </Box>
                  <Text variant={'sp_14_170'} color={'sp.gray.200'}>
                    {
                      'ペアローンは住信SBIネット銀行でご利用いただけます。日本住宅ローンではペアローンをお取り扱いしておりませんのでご了承ください。'
                    }
                  </Text>
                </HStack>
              </Box>
            )}
            <Center pt={'24px'}>
              <Button
                variant={'sp_solid_secondary'}
                size={'md'}
                w={'160px'}
                rightIcon={
                  <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                    <SpRight color={theme.colors.sp.primary[100]} />
                  </Box>
                }
                onClick={pairLoanModal.onClose}
              >
                とじる
              </Button>
            </Center>
          </SpModalWrapper>
        </SpGroup>
        <SpGroup title={'お借入内容'}>
          <Stack spacing={'12px'}>
            <SpBlock
              title={
                formik.values.p_application_headers__loan_target === 2 &&
                formik.values.p_application_headers__land_advance_plan === 1
                  ? '1回目の融資'
                  : null
              }
            >
              <SpGroup
                title={'お借入希望日'}
                isMini={true}
                isFirst={
                  !(
                    formik.values.p_application_headers__loan_target === 2 &&
                    formik.values.p_application_headers__land_advance_plan === 1
                  )
                }
              >
                <SpSelectYMD name="p_borrowing_details__1__desired_borrowing_date" yearOptions={yearOptions} />
              </SpGroup>
              <SpGroup title={'お借入希望額'} isMini={true}>
                <Stack spacing={'12px'}>
                  <Stack spacing={'6px'}>
                    <SpInputField
                      name="p_borrowing_details__1__desired_loan_amount"
                      placeholder={'0'}
                      width={'156px'}
                      align={'end'}
                      unit={true}
                    />
                    {formik.values.p_application_headers__loan_target === 2 &&
                      formik.values.p_application_headers__land_advance_plan === 1 && (
                        <Text variant={'sp_12_150'}>
                          ※1回目と2回目のお借入希望額の合計が500万円〜2億円になるようにご入力ください。
                        </Text>
                      )}
                  </Stack>

                  <Stack spacing={'6px'}>
                    <Text variant={'sp_16_100'}>うち、ボーナス返済分</Text>
                    <SpInputField
                      name="p_borrowing_details__1__bonus_repayment_amount"
                      placeholder={'0'}
                      width={'156px'}
                      align={'end'}
                      unit={true}
                    />
                  </Stack>
                  <Stack spacing={'6px'}>
                    <Text variant={'sp_16_100'}>ボーナス返済月</Text>
                    <SpSelect
                      name="p_borrowing_details__1__bonus_repayment_month"
                      options={bonusRepaymentMonthOptions}
                      align={'start'}
                      width={'200px'}
                    />
                  </Stack>
                </Stack>
              </SpGroup>
              <SpGroup title={'お借入期間'} isMini={true}>
                <SpSelect
                  name="p_borrowing_details__1__loan_term_year"
                  options={yearNumOptions}
                  align={'start'}
                  width={'72px'}
                  unit={'年'}
                />
              </SpGroup>
              <SpGroup title={'返済方法'} isMini={true}>
                <SpRadioGroup
                  name="p_borrowing_details__1__repayment_method"
                  options={repaymentMethodOptions}
                  value={formik.values.p_borrowing_details__1__repayment_method}
                  onChange={(value) =>
                    formik.setFieldValue('p_borrowing_details__1__repayment_method', parseInt(value))
                  }
                />
              </SpGroup>
            </SpBlock>
            {formik.values.p_application_headers__loan_target === 2 &&
              formik.values.p_application_headers__land_advance_plan === 1 && (
                <SpBlock title={'2回目の融資'}>
                  <SpGroup title={'お借入希望日'} isMini={true}>
                    <SpSelectYMD name="p_borrowing_details__2__desired_borrowing_date" yearOptions={yearOptions} />
                  </SpGroup>
                  <SpGroup title={'お借入希望額'} isMini={true}>
                    <Stack spacing={'12px'}>
                      <Stack spacing={'6px'}>
                        <HStack>
                          <SpInputField
                            name="p_borrowing_details__2__desired_loan_amount"
                            placeholder={'0'}
                            width={'156px'}
                            type={'number'}
                            align={'end'}
                          />
                          <HStack alignItems={'start'}>
                            <Text variant={'sp_16_100'}>万円</Text>
                            <Text variant={'sp_12_150'}>※10万円単位</Text>
                          </HStack>
                        </HStack>
                        <Text variant={'sp_12_150'}>
                          ※1回目と2回目のお借入希望額の合計が500万円〜2億円になるようにご入力ください。
                        </Text>
                      </Stack>

                      <Stack spacing={'6px'}>
                        <Text variant={'sp_16_100'}>うち、ボーナス返済分</Text>
                        <HStack>
                          <SpInputField
                            name="p_borrowing_details__2__bonus_repayment_amount"
                            placeholder={'0'}
                            width={'156px'}
                            type={'number'}
                            align={'end'}
                          />
                          <HStack alignItems={'start'}>
                            <Text variant={'sp_16_100'}>万円</Text>
                            <Text variant={'sp_12_150'}>※10万円単位</Text>
                          </HStack>
                        </HStack>
                      </Stack>
                    </Stack>
                  </SpGroup>
                </SpBlock>
              )}
          </Stack>
        </SpGroup>
        <SpGroup title={'担保提供者がいる方のみ、チェックをつけてください。'}>
          <SpCheckboxGroup
            name="p_application_headers__join_guarantor_type"
            options={hasJoinGuarantorOptions}
            onChange={(value) => {
              if (value.length) {
                formik.setFieldValue('p_application_headers__join_guarantor_type', parseInt(value[0]));
              } else {
                formik.setFieldValue('p_application_headers__join_guarantor_type', '');
              }
            }}
          />
        </SpGroup>
        <SpGroup isOption={true} title={'住信SBIネット銀行の「住宅ローンプラス」を申し込みますか？'}>
          <SpCheckboxGroup
            name="p_application_headers__loan_plus"
            options={loanPlusOptions}
            onChange={(value) => {
              if (value.length) {
                formik.setFieldValue('p_application_headers__loan_plus', parseInt(value[0]));
              } else {
                formik.setFieldValue('p_application_headers__loan_plus', '');
              }
            }}
          />
        </SpGroup>
        <SpStepFooter onLeft={handleOnLeft} onRight={formik.handleSubmit} />
        <Box h={'100px'}></Box>
      </FormikProvider>
    </SpLayout>
  );
}
