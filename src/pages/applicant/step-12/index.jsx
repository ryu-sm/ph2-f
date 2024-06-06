import { Icons } from '@/assets';
import {
  ApImgUpload,
  ApItemGroup,
  ApOrgItem,
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
  adGetSalesCompanyId,
  apGetPapplicationHeadersFiles,
  getChildrenOrgsWithCategory,
  getOrgsCategoryCWithID,
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
    salesPerson,
    user: { salesCompanyOrgId, id },
  } = useRecoilValue(authAtom);

  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { apNextStepId, apPreStepId, p_application_headers } = localApplicationInfo;

  const [accessOrgsID, setAccessOrgsID] = useState([]);
  const [orgsC, setOrgsC] = useState([]);
  const [orgsB, setOrgsB] = useState([]);
  const [orgsE, setOrgsE] = useState([]);

  const updateModal = useBoolean(false);

  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      let orgCName = '';
      let orgBName = '';
      let orgEName = '';
      if (values.p_application_headers.sales_company_id_) {
        const temp = orgsC.find((org) => org.value === values.p_application_headers.sales_company_id_);
        if (temp) {
          orgCName = temp.label;
        }
      }

      if (values.p_application_headers.sales_area_id_) {
        const temp = orgsB.find((org) => org.value === values.p_application_headers.sales_area_id_);
        if (temp) {
          orgBName = temp.label;
        }
      }

      if (values.p_application_headers.sales_exhibition_hall_id_) {
        const temp = orgsE.find((org) => org.value === values.p_application_headers.sales_exhibition_hall_id_);
        if (temp) {
          orgEName = temp.label;
        }
      }
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          vendor_name: values.p_application_headers.vendor_name,
          vendor_phone: values.p_application_headers.vendor_phone,
          vendor_business_card: values.p_application_headers.vendor_business_card,
          sales_host_company_id: values.p_application_headers.sales_host_company_id,
          sales_company: values.p_application_headers.sales_company || orgCName,
          sales_area: values.p_application_headers.sales_area || orgBName,
          sales_exhibition_hall: values.p_application_headers.sales_exhibition_hall || orgEName,
          J: values.p_application_headers.J,
        },
      };
    });
  };
  const initialValues = {
    p_application_headers: {
      sales_company_id_: isSalesPerson ? p_application_headers.sales_company_id : '',
      sales_area_id_: isSalesPerson ? p_application_headers.sales_area_id : '',
      sales_exhibition_hall_id_: isSalesPerson ? p_application_headers.sales_exhibition_hall_id : '',
      vendor_name: p_application_headers.vendor_name,
      vendor_phone: p_application_headers.vendor_phone,
      vendor_business_card: p_application_headers.vendor_business_card,
      sales_host_company_id: p_application_headers.sales_host_company_id,
      sales_company: p_application_headers.sales_company,
      sales_area: p_application_headers.sales_area,
      sales_exhibition_hall: p_application_headers.sales_exhibition_hall,
      J: p_application_headers.J,
    },
  };

  const setUpdateData = (values) => {
    let orgCName = '';
    let orgBName = '';
    let orgEName = '';
    if (values.p_application_headers.sales_company_id_) {
      const temp = orgsC.find((org) => org.value === values.p_application_headers.sales_company_id_);
      if (temp) {
        orgCName = temp.label;
      }
    }

    if (values.p_application_headers.sales_area_id_) {
      const temp = orgsB.find((org) => org.value === values.p_application_headers.sales_area_id_);
      if (temp) {
        orgBName = temp.label;
      }
    }

    if (values.p_application_headers.sales_exhibition_hall_id_) {
      const temp = orgsE.find((org) => org.value === values.p_application_headers.sales_exhibition_hall_id_);
      if (temp) {
        orgEName = temp.label;
      }
    }

    const diffData = isSalesPerson
      ? {
          p_application_headers: {
            sales_company_id: values.p_application_headers.sales_company_id,
            sales_area_id: values.p_application_headers.sales_area_id,
            sales_exhibition_hall_id: values.p_application_headers.sales_exhibition_hall_id,
            vendor_name: values.p_application_headers.vendor_name,
            vendor_phone: values.p_application_headers.vendor_phone,
            vendor_business_card: values.p_application_headers.vendor_business_card,
            sales_host_company_id: values.p_application_headers.sales_host_company_id,
            J: values.p_application_headers.J,
            //
            join_guarantor_umu: p_application_headers.join_guarantor_umu,
            land_advance_plan: p_application_headers.land_advance_plan,
            loan_type: p_application_headers.loan_type,
          },
        }
      : {
          p_application_headers: {
            vendor_name: values.p_application_headers.vendor_name,
            vendor_phone: values.p_application_headers.vendor_phone,
            vendor_business_card: values.p_application_headers.vendor_business_card,
            sales_host_company_id: values.p_application_headers.sales_host_company_id,
            sales_company: values.p_application_headers.sales_company || orgCName,
            sales_area: values.p_application_headers.sales_area || orgBName,
            sales_exhibition_hall: values.p_application_headers.sales_exhibition_hall || orgEName,
            J: values.p_application_headers.J,
            //
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
      }
    },
  });

  // useEffect(() => {
  //   if (!isSalesPerson) {
  //     if (p_application_headers.sales_company) {
  //       const temp = orgsC.find((org) => org.label === p_application_headers.sales_company);
  //       if (temp) {
  //         formik.setFieldValue('p_application_headers.sales_company_id_', temp.value);
  //         formik.setFieldValue('p_application_headers.sales_company', '');
  //       }
  //     }

  //     if (p_application_headers.sales_area) {
  //       const temp = orgsB.find((org) => org.label === p_application_headers.sales_area);
  //       if (temp) {
  //         formik.setFieldValue('p_application_headers.sales_area_id_', temp.value);
  //         formik.setFieldValue('p_application_headers.sales_area', '');
  //       }
  //     }

  //     if (p_application_headers.sales_exhibition_hall) {
  //       const temp = orgsE.find((org) => org.label === p_application_headers.sales_exhibition_hall);
  //       if (temp) {
  //         formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', temp.value);
  //         formik.setFieldValue('p_application_headers.sales_exhibition_hall', '');
  //       }
  //     }
  //   }
  // }, [p_application_headers, isSalesPerson]);

  useEffect(() => {
    if (!isSalesPerson) {
      const tempC = orgsC.find(
        (org) => org.label === formik.values.p_application_headers.sales_company && org.label !== ''
      );
      if (tempC) {
        formik.setFieldValue('p_application_headers.sales_company_id_', tempC.value);
        formik.setFieldValue('p_application_headers.sales_company', '');
      }

      const tempB = orgsB.find(
        (org) => org.label === formik.values.p_application_headers.sales_area && org.label !== ''
      );
      if (tempB) {
        formik.setFieldValue('p_application_headers.sales_area_id_', tempB.value);
        formik.setFieldValue('p_application_headers.sales_area', '');
      }

      const tempE = orgsE.find(
        (org) => org.label === formik.values.p_application_headers.sales_exhibition_hall && org.label !== ''
      );
      if (tempE) {
        formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', tempE.value);
        formik.setFieldValue('p_application_headers.sales_exhibition_hall', '');
      }
    }
  }, [formik.values, isSalesPerson, orgsC, orgsB, orgsE]);

  const fetchOrgsC = async (id) => {
    try {
      const res = await getChildrenOrgsWithCategory(id, 'C');

      if (isSalesPerson) {
        const temp = res.data.filter((org) => accessOrgsID.includes(org.value));

        setOrgsC(temp);
      } else {
        const tempC = res.data.find((org) => org.label === formik.values.p_application_headers.sales_company);
        if (tempC) {
          formik.setFieldValue('p_application_headers.sales_company_id_', tempC.value);
          formik.setFieldValue('p_application_headers.sales_company', '');
        }
        setOrgsC([...res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrgsB = async (id) => {
    try {
      const res = await getChildrenOrgsWithCategory(id, 'B');
      if (isSalesPerson) {
        const temp = res.data.filter((org) => accessOrgsID.includes(org.value));
        setOrgsB([{ value: '', label: '' }, ...temp]);
      } else {
        const tempB = res.data.find((org) => org.label === formik.values.p_application_headers.sales_area);
        if (tempB) {
          formik.setFieldValue('p_application_headers.sales_area_id_', tempB.value);
          formik.setFieldValue('p_application_headers.sales_area', '');
        }
        setOrgsB([{ value: '', label: '' }, ...res.data]);
      }

      if (formik.values.p_application_headers.sales_area_id_) {
        if (!res.data.find((org) => org.value === formik.values.p_application_headers.sales_area_id_)) {
          formik.setFieldValue('p_application_headers.sales_area_id_', '');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrgsE = async (id) => {
    try {
      const res = await getChildrenOrgsWithCategory(id, 'E');
      if (isSalesPerson) {
        const temp = res.data.filter((org) => accessOrgsID.includes(org.value));
        setOrgsE([{ value: '', label: '' }, ...temp]);
      } else {
        const tempE = res.data.find((org) => org.label === formik.values.p_application_headers.sales_exhibition_hall);
        if (tempE) {
          formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', tempE.value);
          formik.setFieldValue('p_application_headers.sales_exhibition_hall', '');
        }
        setOrgsE([{ value: '', label: '' }, ...res.data]);
      }

      if (formik.values.p_application_headers.sales_exhibition_hall_id_) {
        if (!res.data.find((org) => org.value === formik.values.p_application_headers.sales_exhibition_hall_id_)) {
          formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', '');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrgsC(formik.values.p_application_headers.sales_host_company_id);
    fetchOrgsB(
      formik.values.p_application_headers.sales_company_id_ || formik.values.p_application_headers.sales_host_company_id
    );
    fetchOrgsE(
      formik.values.p_application_headers.sales_area_id_ ||
        formik.values.p_application_headers.sales_company_id_ ||
        formik.values.p_application_headers.sales_host_company_id
    );
  }, [
    formik.values.p_application_headers.sales_area_id_,
    formik.values.p_application_headers.sales_company_id_,
    formik.values.p_application_headers.sales_host_company_id,
    formik.values,
    accessOrgsID.length,
    isSalesPerson,
  ]);

  useEffect(() => {
    if (formik.values.p_application_headers.sales_company) {
      formik.setFieldValue('p_application_headers.sales_company_id_', '');
      formik.setFieldValue('p_application_headers.sales_area_id_', '');
      formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', '');
    }
    if (formik.values.p_application_headers.sales_area) {
      formik.setFieldValue('p_application_headers.sales_area_id_', '');
      formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', '');
    }
    if (formik.values.p_application_headers.sales_exhibition_hall) {
      formik.setFieldValue('p_application_headers.sales_exhibition_hall_id_', '');
    }
  }, [formik.values]);

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    delete dataCopy.sales_company_id_;
    delete dataCopy.sales_area_id_;
    delete dataCopy.sales_exhibition_hall_id_;
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

  useEffect(() => {
    if (isSalesPerson) {
      const fetchAccessOrgs = async () => {
        try {
          const res = await adGetSalesCompanyId(salesPerson?.id);
          console.log(res.data);
          setAccessOrgsID(res.data.map((org) => org.id));
        } catch (error) {
          console.log(error);
        }
      };
      fetchAccessOrgs();
    }
  }, [isSalesPerson]);

  const { refreshsendedApllication } = useApplicationContext();

  useEffect(() => {
    if (agentSended) {
      refreshsendedApllication();
    }
  }, []);
  // useEffect(() => {
  //   if (agentSended) {
  //     formik.setValues(initialValues);
  //   }
  // }, [localApplicationInfo]);

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
                      <ApOrgItem
                        showInput={!isSalesPerson}
                        inputName="p_application_headers.sales_company"
                        inputValue={formik.values.p_application_headers.sales_company}
                        selectName="p_application_headers.sales_company_id_"
                        selectValue={formik.values.p_application_headers.sales_company_id_}
                        placeholder={'選択してください'}
                        width={1}
                        justifyContent={'start'}
                        options={orgsC}
                      />
                    </ApItemGroup>
                    <ApItemGroup label={'エリア'} pb={3} px={2}>
                      <ApOrgItem
                        showInput={!isSalesPerson}
                        inputName="p_application_headers.sales_area"
                        inputValue={formik.values.p_application_headers.sales_area}
                        selectName="p_application_headers.sales_area_id_"
                        selectValue={formik.values.p_application_headers.sales_area_id_}
                        placeholder={'選択してください'}
                        width={1}
                        justifyContent={'start'}
                        options={formik.values.p_application_headers.sales_company ? [] : orgsB}
                      />
                    </ApItemGroup>
                    <ApItemGroup label={'展示場'} pb={3} px={2}>
                      <ApOrgItem
                        showInput={!isSalesPerson}
                        inputName="p_application_headers.sales_exhibition_hall"
                        inputValue={formik.values.p_application_headers.sales_exhibition_hall}
                        selectName="p_application_headers.sales_exhibition_hall_id_"
                        selectValue={formik.values.p_application_headers.sales_exhibition_hall_id_}
                        placeholder={'選択してください'}
                        width={1}
                        justifyContent={'start'}
                        options={
                          formik.values.p_application_headers.sales_company ||
                          formik.values.p_application_headers.sales_area
                            ? []
                            : orgsE
                        }
                      />
                    </ApItemGroup>
                    {!isSalesPerson && (
                      <ApItemGroup label={'担当者名'} pb={3} px={2}>
                        <ApTextInputField
                          name="p_application_headers.vendor_name"
                          placeholder={'例：○○さん'}
                          convertFullWidth
                        />
                      </ApItemGroup>
                    )}
                    {!isSalesPerson && (
                      <ApItemGroup label={'携帯電話番号'} pb={3} px={2}>
                        <Stack spacing={'6px'}>
                          <ApPhoneInputField name="p_application_headers.vendor_phone" />
                          <ApStarHelp label={'半角数字でご入力ください。'} />
                        </Stack>
                      </ApItemGroup>
                    )}
                  </Stack>
                </Stack>
              )}
          </Stack>
        </ApItemGroup>
      </ApLayout>
    </FormikProvider>
  );
};
