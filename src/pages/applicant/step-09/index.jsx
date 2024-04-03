import { ApLayout, ApStepFooter } from '@/containers';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, localApplication } from '@/store';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
  ApErrorScroll,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApSaveDraftButton,
  ApStarHelp,
  ApTextInputField,
  ApUpdateApply,
} from '@/components';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { routeNames } from '@/router/settings';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adSalesPersonResetPasswordVerifyEmail } from '@/services';

export const ApStep09Page = () => {
  const { updateSendedInfo } = useApplicationContext();
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { agentSended } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);

  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { apNextStepId, apPreStepId, p_application_headers } = localApplicationInfo;

  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          required_funds_land_amount: values.p_application_headers.required_funds_land_amount,
          required_funds_house_amount: values.p_application_headers.required_funds_house_amount,
          required_funds_accessory_amount: values.p_application_headers.required_funds_accessory_amount,
          required_funds_additional_amount: values.p_application_headers.required_funds_additional_amount,
          required_funds_refinance_loan_balance: values.p_application_headers.required_funds_refinance_loan_balance,
          required_funds_upgrade_amount: values.p_application_headers.required_funds_upgrade_amount,
          required_funds_loan_plus_amount: values.p_application_headers.required_funds_loan_plus_amount,
          required_funds_total_amount: values.p_application_headers.required_funds_total_amount,
          funding_saving_amount: values.p_application_headers.funding_saving_amount,
          funding_estate_sale_amount: values.p_application_headers.funding_estate_sale_amount,
          funding_other_saving_amount: values.p_application_headers.funding_other_saving_amount,
          funding_relative_donation_amount: values.p_application_headers.funding_relative_donation_amount,
          funding_loan_amount: values.p_application_headers.funding_loan_amount,
          funding_pair_loan_amount: values.p_application_headers.funding_pair_loan_amount,
          funding_other_amount: values.p_application_headers.funding_other_amount,
          funding_other_amount_detail: values.p_application_headers.funding_other_amount_detail,
          funding_total_amount: values.p_application_headers.funding_total_amount,
          funding_self_amount: values.p_application_headers.funding_self_amount,
        },
      };
    });
  };
  const initialValues = {
    p_application_headers: {
      required_funds_land_amount: p_application_headers.required_funds_land_amount,
      required_funds_house_amount: p_application_headers.required_funds_house_amount,
      required_funds_accessory_amount: p_application_headers.required_funds_accessory_amount,
      required_funds_additional_amount: p_application_headers.required_funds_additional_amount,
      required_funds_refinance_loan_balance: p_application_headers.required_funds_refinance_loan_balance,
      required_funds_upgrade_amount: p_application_headers.required_funds_upgrade_amount,
      required_funds_loan_plus_amount: p_application_headers.required_funds_loan_plus_amount,
      required_funds_total_amount: p_application_headers.required_funds_total_amount,
      funding_saving_amount: p_application_headers.funding_saving_amount,
      funding_estate_sale_amount: p_application_headers.funding_estate_sale_amount,
      funding_self_amount: p_application_headers.funding_self_amount,
      funding_other_saving_amount: p_application_headers.funding_other_saving_amount,
      funding_relative_donation_amount: p_application_headers.funding_relative_donation_amount,
      funding_loan_amount: p_application_headers.funding_loan_amount,
      funding_pair_loan_amount: p_application_headers.funding_pair_loan_amount,
      funding_other_amount: p_application_headers.funding_other_amount,
      funding_other_amount_detail: p_application_headers.funding_other_amount_detail,
      funding_total_amount: p_application_headers.funding_total_amount,
    },
  };
  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
        join_guarantor_umu: p_application_headers.join_guarantor_umu,
        land_advance_plan: p_application_headers.land_advance_plan,
        loan_type: p_application_headers.loan_type,
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
          console.log('debug', values);
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

  useEffect(() => {
    const required_funds_total_amount =
      Number(formik.values.p_application_headers.required_funds_land_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.required_funds_house_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.required_funds_accessory_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.required_funds_upgrade_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.required_funds_refinance_loan_balance.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.required_funds_additional_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.required_funds_loan_plus_amount.replaceAll(',', ''));

    const funding_total_amount =
      Number(formik.values.p_application_headers.funding_saving_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.funding_estate_sale_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.funding_other_saving_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.funding_relative_donation_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.funding_loan_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.funding_pair_loan_amount.replaceAll(',', '')) +
      Number(formik.values.p_application_headers.funding_other_amount.replaceAll(',', ''));

    formik.setFieldValue('p_application_headers.required_funds_total_amount', String(required_funds_total_amount));
    formik.setFieldValue('p_application_headers.funding_total_amount', String(funding_total_amount));
  }, [formik.values]);

  useEffect(() => {
    const funding_self_amount =
      Number(formik.values.p_application_headers.funding_saving_amount) +
      Number(formik.values.p_application_headers.funding_estate_sale_amount) +
      Number(formik.values.p_application_headers.funding_other_saving_amount);
    formik.setFieldValue('p_application_headers.funding_self_amount', `${funding_self_amount}`);
  }, [
    formik.values.p_application_headers.funding_saving_amount,
    formik.values.p_application_headers.funding_estate_sale_amount,
    formik.values.p_application_headers.funding_other_saving_amount,
  ]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const { dbData } = useApplicationContext();

  useEffect(() => {
    if (agentSended && dbData) {
      const newData = {
        p_application_headers: {
          required_funds_land_amount: dbData?.p_application_headers?.required_funds_land_amount,
          required_funds_house_amount: dbData?.p_application_headers?.required_funds_house_amount,
          required_funds_accessory_amount: dbData?.p_application_headers?.required_funds_accessory_amount,
          required_funds_additional_amount: dbData?.p_application_headers?.required_funds_additional_amount,
          required_funds_refinance_loan_balance: dbData?.p_application_headers?.required_funds_refinance_loan_balance,
          required_funds_upgrade_amount: dbData?.p_application_headers?.required_funds_upgrade_amount,
          required_funds_loan_plus_amount: dbData?.p_application_headers?.required_funds_loan_plus_amount,
          required_funds_total_amount: dbData?.p_application_headers?.required_funds_total_amount,
          funding_saving_amount: dbData?.p_application_headers?.funding_saving_amount,
          funding_estate_sale_amount: dbData?.p_application_headers?.funding_estate_sale_amount,
          funding_self_amount: dbData?.p_application_headers?.funding_self_amount,
          funding_other_saving_amount: dbData?.p_application_headers?.funding_other_saving_amount,
          funding_relative_donation_amount: dbData?.p_application_headers?.funding_relative_donation_amount,
          funding_loan_amount: dbData?.p_application_headers?.funding_loan_amount,
          funding_pair_loan_amount: dbData?.p_application_headers?.funding_pair_loan_amount,
          funding_other_amount: dbData?.p_application_headers?.funding_other_amount,
          funding_other_amount_detail: dbData?.p_application_headers?.funding_other_amount_detail,
          funding_total_amount: dbData?.p_application_headers?.funding_total_amount,
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
        <ApPageTitle py={8}>{`資金計画について\n教えてください。`}</ApPageTitle>
        <Stack flex={1}>
          <Stack sx={{ px: 4, pb: 4 }}>
            <ApStarHelp
              label={
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant="note" color={'text.main'}>
                    必要資金の項目は
                    <Box
                      component={'span'}
                      sx={{
                        color: 'white',
                        bgcolor: (theme) => theme.palette.gray[250],
                        p: '2px 3px',
                        mx: 1,
                        borderRadius: 1,
                        minWidth: 28,
                        width: 28,
                        height: 16,

                        fontFamily: 'Hiragino Sans',
                        fontSize: 10,
                        fontWeight: 500,
                        lineHeight: '100%',
                        fontStyle: 'normal',
                        letterSpacing: 0.6,
                      }}
                    >
                      任意
                    </Box>
                    です。未入力の場合は、みらいバンクにて補記いたしますのでご安心ください。
                  </Typography>
                </Stack>
              }
            />
          </Stack>

          <Stack spacing={'1px'} direction={'row'} justifyContent={'space-between'} sx={{ bgcolor: 'primary.60' }}>
            <Stack sx={{ width: '50%' }}>
              <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
                <Typography variant="form_item_label" color="white" textAlign={'center'}>
                  必要資金
                </Typography>
              </Stack>
              <Stack flex={1} sx={{ bgcolor: 'white' }}>
                {p_application_headers.loan_target === '6' && (
                  <ApItemGroup optional label={'土地'} labelFontSize={13} pb={3} px={2}>
                    <ApNumberInputField
                      name="p_application_headers.required_funds_land_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}
                {['1', '2', '3', '4', '5', '6'].includes(p_application_headers.loan_target) && (
                  <ApItemGroup
                    optional
                    label={
                      ['1', '2'].includes(p_application_headers.loan_target)
                        ? '物件価格'
                        : ['3', '4'].includes(p_application_headers.loan_target)
                        ? 'マンション価格'
                        : '建物'
                    }
                    labelFontSize={13}
                    pb={3}
                    px={2}
                  >
                    <ApNumberInputField
                      name="p_application_headers.required_funds_house_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}

                {['5', '6'].includes(p_application_headers.loan_target) && (
                  <ApItemGroup optional label={'付帯設備'} labelFontSize={13} pb={3} px={2}>
                    <ApNumberInputField
                      name="p_application_headers.required_funds_accessory_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}

                {p_application_headers.loan_target === '8' && (
                  <ApItemGroup optional label={'増改築費'} labelFontSize={13} pb={3} px={2}>
                    <ApNumberInputField
                      name="p_application_headers.required_funds_upgrade_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}

                {['7', '8'].includes(p_application_headers.loan_target) && (
                  <ApItemGroup optional label={'借換対象ローン残債'} labelFontSize={13} pb={3} px={2}>
                    <ApNumberInputField
                      name="p_application_headers.required_funds_refinance_loan_balance"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}

                <ApItemGroup optional label={'諸費用等'} labelFontSize={13} pb={3} px={2}>
                  <ApNumberInputField
                    name="p_application_headers.required_funds_additional_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
                {p_application_headers.loan_plus === '1' && (
                  <ApItemGroup optional label={'住宅ローンプラス利用'} labelFontSize={13} pb={3} px={2}>
                    <ApNumberInputField
                      name="p_application_headers.required_funds_loan_plus_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}
              </Stack>
            </Stack>
            <Stack sx={{ width: '50%' }}>
              <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
                <Typography variant="form_item_label" color="white" textAlign={'center'}>
                  調達資金
                </Typography>
              </Stack>
              <Stack flex={1} sx={{ bgcolor: 'white' }}>
                <ApItemGroup
                  label={
                    <Stack spacing={1} direction={'row'} alignItems={'flex-end'} sx={{ py: 0 }}>
                      <Typography
                        variant="form_item_label"
                        sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                      >
                        預貯金
                      </Typography>
                      {p_application_headers.loan_type === '2' && (
                        <Typography variant="note" color={'text.main'}>
                          ※お二人分
                        </Typography>
                      )}
                    </Stack>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers.funding_saving_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>

                <ApItemGroup
                  label={
                    <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                      <Typography
                        variant="form_item_label"
                        sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                      >
                        不動産売却代金
                      </Typography>
                      {p_application_headers.loan_type === '2' && (
                        <Typography variant="note" color={'text.main'}>
                          ※お二人分
                        </Typography>
                      )}
                    </Stack>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers.funding_estate_sale_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>

                <ApItemGroup
                  label={
                    <Stack spacing={1}>
                      <Typography
                        variant="form_item_label"
                        sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                      >
                        {['7', '8'].includes(p_application_headers.loan_target)
                          ? 'その他（有価証券等）'
                          : '有価証券売却など'}
                      </Typography>
                      {p_application_headers.loan_type === '2' && (
                        <Typography variant="note" color={'text.main'}>
                          ※お二人分
                        </Typography>
                      )}
                    </Stack>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers.funding_other_saving_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>

                <ApItemGroup
                  label={
                    <Stack spacing={1}>
                      <Typography
                        variant="form_item_label"
                        sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                      >
                        親族からの贈与
                      </Typography>
                      {p_application_headers.loan_type === '2' && (
                        <Typography variant="note" color={'text.main'}>
                          ※お二人が受ける贈与
                        </Typography>
                      )}
                    </Stack>
                  }
                  pb={3}
                  px={2}
                >
                  <ApNumberInputField
                    name="p_application_headers.funding_relative_donation_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>

                <ApItemGroup label={'本件ローン'} labelFontSize={13} pb={3} px={2}>
                  <ApNumberInputField
                    name="p_application_headers.funding_loan_amount"
                    placeholder={'0'}
                    unit={'万円'}
                    maxLength={6}
                    width={1}
                  />
                </ApItemGroup>
                {p_application_headers.loan_type === '2' && (
                  <ApItemGroup label={'ペアローン'} labelFontSize={13} pb={3} px={2}>
                    <ApNumberInputField
                      name="p_application_headers.funding_pair_loan_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                  </ApItemGroup>
                )}
                <ApItemGroup
                  label={
                    <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                      <Typography
                        variant="form_item_label"
                        sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                      >
                        その他
                      </Typography>
                      {p_application_headers.loan_type === '2' && (
                        <Typography variant="note" color={'text.main'}>
                          ※お二人分
                        </Typography>
                      )}
                    </Stack>
                  }
                  labelFontSize={13}
                  pb={3}
                  px={2}
                >
                  <Stack spacing={3}>
                    <ApNumberInputField
                      name="p_application_headers.funding_other_amount"
                      placeholder={'0'}
                      unit={'万円'}
                      maxLength={6}
                      width={1}
                    />
                    {Number(formik.values.p_application_headers.funding_other_amount) > 0 && (
                      <Stack spacing={'6px'}>
                        <ApStarHelp label={'詳細を入力ください。'} />
                        <ApTextInputField name="p_application_headers.funding_other_amount_detail" convertFullWidth />
                      </Stack>
                    )}
                  </Stack>
                </ApItemGroup>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            spacing={'1px'}
            direction={'row'}
            justifyContent={'space-between'}
            sx={{ bgcolor: 'primary.60', mb: 6 }}
          >
            <Stack sx={{ width: '50%' }}>
              <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.60' }}>
                <Typography variant="form_item_label" color="white">
                  {'必要資金　合計'}
                </Typography>
              </Stack>
              <Stack sx={{ px: 2, py: 1, bgcolor: 'white' }}>
                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                  <Stack
                    flex={1}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    sx={{
                      pl: 3,
                      py: 3,
                      px: 3,
                      height: 48,
                      width: 62,
                      borderRadius: 1,
                      bgcolor: 'gray.100',
                      fontFamily: 'Hiragino Sans',
                      fontStyle: 'normal',
                      fontSize: 16,
                      fontWeight: 300,
                      lineHeight: '100%',
                      letterSpacing: 0.6,
                      textAlign: 'right',
                    }}
                  >
                    {Number(formik.values.p_application_headers.required_funds_total_amount).toLocaleString()}
                  </Stack>
                  <Typography variant="unit" color={'text.main'}>
                    万円
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack sx={{ width: '50%' }}>
              <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.60' }}>
                <Typography variant="form_item_label" color="white">
                  {'調達資金　合計'}
                </Typography>
              </Stack>
              <Stack sx={{ px: 2, py: 1, bgcolor: 'white' }}>
                <Stack spacing={1} direction={'row'} alignItems={'center'}>
                  <Stack
                    flex={1}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    sx={{
                      pl: 3,
                      py: 3,
                      px: 3,
                      height: 48,
                      width: 62,
                      borderRadius: 1,
                      bgcolor: 'gray.100',
                      fontFamily: 'Hiragino Sans',
                      fontStyle: 'normal',
                      fontSize: 16,
                      fontWeight: 300,
                      lineHeight: '100%',
                      letterSpacing: 0.6,
                      textAlign: 'right',
                    }}
                  >
                    {Number(formik.values.p_application_headers.funding_total_amount).toLocaleString()}
                  </Stack>
                  <Typography variant="unit" color={'text.main'}>
                    万円
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ApLayout>
    </FormikProvider>
  );
};
