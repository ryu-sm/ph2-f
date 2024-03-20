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
import { apApplicationFile, apGetSalesCompanyOrgs } from '@/services';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom, authAtom } from '@/store';
import { Link, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { inputOptions } from './options';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { routeNames } from '@/router/settings';
import { useApUpdateApplyInfo, useBoolean, useIsSalesPerson } from '@/hooks';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { diffObj } from '@/utils';

export const ApStep12Page = () => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const {
    user: { salesCompanyOrgId },
  } = useRecoilValue(authAtom);
  const [orgs, setOrgs] = useState([]);
  const { applyNo, agentSended } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);
  const { p_uploaded_files, p_application_headers } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();
  const setLocalData = (values) => {
    setApplicationInfo((pre) => {
      return {
        ...pre,
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          J: values.p_uploaded_files.J,
        },
        p_application_headers: {
          ...pre.p_application_headers,
          sales_company_id: values.p_application_headers.sales_company_id,
          sales_area_id: values.p_application_headers.sales_area_id,
          sales_exhibition_hall_id: values.p_application_headers.sales_exhibition_hall_id,
          vendor_name: values.p_application_headers.vendor_name,
          vendor_phone: values.p_application_headers.vendor_phone,
        },
      };
    });
  };
  const initialValues = {
    p_uploaded_files: {
      J: p_uploaded_files.J,
    },
    p_application_headers: {
      sales_company_id: p_application_headers.sales_company_id,
      sales_area_id: p_application_headers.sales_area_id,
      sales_exhibition_hall_id: p_application_headers.sales_exhibition_hall_id,
      vendor_name: p_application_headers.vendor_name,
      vendor_phone: p_application_headers.vendor_phone,
    },
    input_type: '',
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
      },
      p_uploaded_files: {
        ...diffObj(initialValues.p_uploaded_files, values.p_uploaded_files),
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        if (agentSended) {
          await updateApply(applyNo, setUpdateData(values));
          updateModal.onTrue();
        } else {
          setLocalData(values);
          navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apNextStepId}`);
        }
      } catch (error) {
        console.log(error);
        toast.error(API_500_ERROR);
      }
    },
  });

  useEffect(() => {
    if (salesCompanyOrgId) {
    } else {
    }
  }, [salesCompanyOrgId]);

  const sendedFile = useCallback(async () => {
    if (agentSended) {
      try {
        const res = await apApplicationFile(applyNo);
        formik.setFieldValue('p_uploaded_files.J', res.data.J);
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
    delete dataCopy.input_type;
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
  const getOrgs = useCallback(async () => {
    try {
      const res = await apGetSalesCompanyOrgs(salesCompanyOrgId);

      const tempOrgs = res.data.map((item) => ({
        value: item.id,
        pid: item.pid,
        label: item.name,
        category: item.category,
      }));
      setOrgs(tempOrgs);
      if (salesCompanyOrgId) {
        formik.setFieldValue(
          'p_application_headers.sales_company_id',
          tempOrgs.find((item) => item.category === 'C').value
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [salesCompanyOrgId]);

  useEffect(() => {
    getOrgs();
  }, []);
  const salesCompanyOptions = useMemo(() => {
    return orgs.filter((item) => item.category === 'C');
  }, [orgs]);

  const salesAreaOptions = useMemo(() => {
    if (!formik.values.p_application_headers.sales_company_id) return [{ value: '', label: '' }];
    return [{ value: '', label: '' }].concat(
      orgs.filter((item) => item.category === 'B' && item.pid === formik.values.p_application_headers.sales_company_id)
    );
  }, [orgs, formik.values.p_application_headers.sales_company_id]);

  const exhibitionHallOptions = useMemo(() => {
    if (!formik.values.p_application_headers.sales_area_id) return [{ value: '', label: '' }];
    return [{ value: '', label: '' }].concat(
      orgs.filter((item) => item.category === 'E' && item.pid === formik.values.p_application_headers.sales_area_id)
    );
  }, [orgs, formik.values.p_application_headers.sales_area_id]);

  useEffect(() => {
    if (
      p_application_headers.sales_company_id ||
      p_application_headers.sales_area_id ||
      p_application_headers.sales_exhibition_hall_id ||
      p_application_headers.vendor_name ||
      p_application_headers.vendor_phone
    ) {
      formik.setFieldValue('input_type', '2');
    }
  }, [
    p_application_headers.sales_company_id,
    p_application_headers.sales_area_id,
    p_application_headers.sales_exhibition_hall_id,
    p_application_headers.vendor_name,
    p_application_headers.vendor_phone,
  ]);

  return (
    <FormikProvider value={formik}>
      <ApLayout
        hasMenu
        hasStepBar
        // pb={18}
        bottomContent={
          <>
            <ApSaveDraftButton pageInfo={parseVaildData} />
            <ApStepFooter left={handelLeft} right={formik.handleSubmit} rightLabel={agentSended && '保存'} />
          </>
        }
      >
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle py={8}>{`提携先企業（住宅メーカー・\n不動産会社等）の\n担当者を教えてください`}</ApPageTitle>
        {!formik.values.input_type && (
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
            <ApRadioRowGroup name="input_type" height={30} options={inputOptions} />
            {formik.values.input_type === '1' && (
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
                    <ApImgUpload name="p_uploaded_files.J" singleFile />
                  </ApItemGroup>
                </Stack>
              </Stack>
            )}
            {formik.values.input_type === '2' && orgs.length > 0 && (
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
                      options={salesCompanyOptions}
                      onChange={(e) => {
                        formik.setFieldValue('p_application_headers.sales_area_id', '');
                        formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
                      }}
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'エリア'} pb={3} px={2}>
                    <ApSelectField
                      name="p_application_headers.sales_area_id"
                      placeholder={'選択してください'}
                      width={1}
                      justifyContent={'start'}
                      options={salesAreaOptions}
                      onChange={(e) => {
                        formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
                      }}
                    />
                  </ApItemGroup>
                  <ApItemGroup label={'展示場'} pb={3} px={2}>
                    <ApSelectField
                      name="p_application_headers.sales_exhibition_hall_id"
                      placeholder={'選択してください'}
                      width={1}
                      justifyContent={'start'}
                      options={exhibitionHallOptions}
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
