import { Icons } from '@/assets';
import {
  ApImgUpload,
  ApItemGroup,
  ApPageTitle,
  ApPhoneInputField,
  ApRadioRowGroup,
  ApSaveDraftButton,
  ApSelectField,
  ApStarHelp,
  ApTextInputField,
  ApUpdateApply,
} from '@/components';
import { CONSENT_URL } from '@/configs';
import { ApLayout, ApStepFooter } from '@/containers';
import {
  apGetPapplicationHeadersFiles,
  getChildrenOrgsWithCategory,
  getOrgsInfos,
  getOrgsWithCategories,
} from '@/services';
import { authAtom, localApplication } from '@/store';
import { Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { inputOptions } from './options';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { routeNames } from '@/router/settings';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { diffObj } from '@/utils';

export const ApStep12Page = () => {
  const { updateSendedInfo } = useApplicationContext();
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const {
    agentSended,
    user: { salesCompanyOrgId, id },
  } = useRecoilValue(authAtom);

  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { apNextStepId, apPreStepId, p_application_headers } = localApplicationInfo;

  const [orgsC, setOrgsC] = useState([]);
  const [orgsB, setOrgsB] = useState([]);
  const [orgsE, setOrgsE] = useState([]);

  const updateModal = useBoolean(false);

  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          sales_company_id: values.p_application_headers.sales_company_id,
          sales_area_id: values.p_application_headers.sales_area_id,
          sales_exhibition_hall_id: values.p_application_headers.sales_exhibition_hall_id,
          vendor_name: values.p_application_headers.vendor_name,
          vendor_phone: values.p_application_headers.vendor_phone,
          vendor_business_card: values.p_application_headers.vendor_business_card,
          J: values.p_application_headers.J,
        },
      };
    });
  };
  const initialValues = {
    p_application_headers: {
      sales_company_id: p_application_headers.sales_company_id,
      sales_area_id: p_application_headers.sales_area_id,
      sales_exhibition_hall_id: p_application_headers.sales_exhibition_hall_id,
      vendor_name: p_application_headers.vendor_name,
      vendor_phone: p_application_headers.vendor_phone,
      vendor_business_card: p_application_headers.vendor_business_card,
      J: p_application_headers.J,
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

  useEffect(() => {
    if (salesCompanyOrgId && !formik.values.p_application_headers.vendor_business_card) {
      formik.setFieldValue('p_application_headers.vendor_business_card', '0');
    }
  }, [salesCompanyOrgId]);

  const fetchOrgsB = async (sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_company_id, 'B');
      setOrgsB([{ value: '', label: '' }, ...res.data]);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  const fetchOrgsE = async (sales_company_id, sales_area_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_area_id || sales_company_id, 'E');
      setOrgsE([{ value: '', label: '' }, ...res.data]);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (salesCompanyOrgId || p_application_headers.sales_company_id) {
        try {
          const res = await getOrgsCategoryCWithID(salesCompanyOrgId || p_application_headers.sales_company_id);

          setOrgsC([{ value: res.data?.sales_company_id, label: res.data?.sales_company_name }]);
          if (res.data?.sales_company_id) {
            await fetchOrgsB(res.data?.sales_company_id);
          }
          if (res.data?.sales_company_id) {
            await fetchOrgsE(res.data?.sales_company_id, res.data?.sales_area_id);
          }
          if (
            !p_application_headers.sales_company_id &&
            !p_application_headers.sales_area_id &&
            !p_application_headers.sales_exhibition_hall_id
          ) {
            formik.setFieldValue('p_application_headers.sales_company_id', res.data?.sales_company_id);
            formik.setFieldValue('p_application_headers.sales_area_id', res.data?.sales_area_id);
            formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', res.data?.sales_exhibition_hall_id);
          }
        } catch (error) {
          console.log(error);
          // toast.error(API_500_ERROR);
        }
      } else {
        try {
          const res = await getOrgsWithCategories('C');

          setOrgsC(res.data);
          setOrgsB([{ value: '', label: '' }]);
          setOrgsE([{ value: '', label: '' }]);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

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

  const fetchPapplicationHeadersFiles = async () => {
    try {
      const res = await apGetPapplicationHeadersFiles(id);
      formik.setFieldValue('p_application_headers.J', res.data?.J);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (agentSended) {
      fetchPapplicationHeadersFiles();
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

  console.log(formik.values);

  return (
    <FormikProvider value={formik}>
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
        <ApPageTitle py={8}>{`提携先企業（住宅メーカー・\n不動産会社等）の\n担当者を教えてください`}</ApPageTitle>
        {!formik.values.p_application_headers.vendor_business_card && (
          <Stack spacing={4} sx={{ px: 4, pb: 8 }}>
            <Typography variant="note">{`本件住宅ローンの借入申込に関わる事務（個人情報の受け渡しを含む）は提携先企業が行います。\n\nまた、みらいバンクは審査終了や審査結果の連絡を提携先企業に対して行います。\n\n詳しくは、既に同意いただいている以下の書類をよくお読みください。`}</Typography>
            <Stack
              spacing={1}
              direction={'row'}
              alignItems={'center'}
              component={Link}
              href={CONSENT_URL}
              target="_blank"
            >
              <Icons.ApPdfOutlineMainIcon sx={{ width: 20, height: 20 }} />
              <Typography variant="help" lineHeight={'150%'}>
                {'個人情報の取扱いに関する同意書 兼 表明および確約書'}
              </Typography>
            </Stack>
            <Stack
              spacing={1}
              direction={'row'}
              alignItems={'center'}
              component={Link}
              href={CONSENT_URL}
              target="_blank"
            >
              <Icons.ApPdfOutlineMainIcon sx={{ width: 20, height: 20 }} />
              <Typography variant="help" lineHeight={'150%'}>
                {'銀行代理業にかかる確認書　兼　個人情報の取扱い等に関する同意書'}
              </Typography>
            </Stack>
          </Stack>
        )}
        <ApItemGroup label={'担当者の名刺はありますか？'} note={'※名刺添付で入力を省略できます'}>
          <Stack spacing={3}>
            <ApRadioRowGroup name="p_application_headers.vendor_business_card" height={30} options={inputOptions} />
            {formik.values.p_application_headers.vendor_business_card === '1' && (
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
                    label={
                      <Typography variant="notify" lineHeight={'130%'} color={'text.main'}>
                        営業担当者の名刺をアップロードしてください。
                      </Typography>
                    }
                    pb={3}
                    px={2}
                    borderTopRightRadius={'7px'}
                    borderTopLeftRadius={'7px'}
                  >
                    <ApImgUpload name="p_application_headers.J" singleFile />
                  </ApItemGroup>
                </Stack>
              </Stack>
            )}
            {formik.values.p_application_headers.vendor_business_card === '0' &&
              orgsC.length >= 0 &&
              orgsB.length >= 0 &&
              orgsE.length >= 0 && (
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
                      担当者情報
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      bgcolor: 'white',
                      borderRadius: '7px',
                    }}
                  >
                    <ApItemGroup
                      label={
                        <Typography variant="form_item_label" color={'text.main'}>
                          提携先企業
                          <Typography variant="note" color={'text.main'}>
                            （不動産会社・住宅メーカー等）
                          </Typography>
                        </Typography>
                      }
                      pb={3}
                      px={2}
                    >
                      <ApSelectField
                        name="p_application_headers.sales_company_id"
                        placeholder={'選択してください'}
                        width={1}
                        justifyContent={'start'}
                        options={orgsC}
                        // onChange={handleChangCompany}
                      />
                    </ApItemGroup>
                    <ApItemGroup label={'エリア'} pb={3} px={2}>
                      <ApSelectField
                        name="p_application_headers.sales_area_id"
                        placeholder={'選択してください'}
                        width={1}
                        justifyContent={'start'}
                        options={orgsB}
                        // onChange={handleChangArea}
                      />
                    </ApItemGroup>
                    <ApItemGroup label={'展示場'} pb={3} px={2}>
                      <ApSelectField
                        name="p_application_headers.sales_exhibition_hall_id"
                        placeholder={'選択してください'}
                        width={1}
                        justifyContent={'start'}
                        options={orgsE}
                      />
                    </ApItemGroup>
                    <ApItemGroup label={'担当者名'} pb={3} px={2}>
                      <ApTextInputField
                        name="p_application_headers.vendor_name"
                        placeholder={'例：○○さん'}
                        convertFullWidth
                      />
                    </ApItemGroup>
                    <ApItemGroup label={'携帯電話番号'} pb={3} px={2}>
                      <Stack spacing={'6px'}>
                        <ApPhoneInputField name="p_application_headers.vendor_phone" />
                        <ApStarHelp label={'半角数字でご入力ください。'} />
                      </Stack>
                    </ApItemGroup>
                  </Stack>
                </Stack>
              )}
          </Stack>
        </ApItemGroup>
      </ApLayout>
    </FormikProvider>
  );
};
