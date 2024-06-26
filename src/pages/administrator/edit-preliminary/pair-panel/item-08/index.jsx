import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { AdEditFullWidthInput, AdPhoneInputField, AdSelectRadios } from '@/components/administrator';

import { diffObj } from '@/utils';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  adGetAccessSalesPersonOptions,
  adGetSalesPersonBelowOrgs,
  adGetSalesPersonInfo,
  adGetSalesPersonOrgs,
  getChildrenOrgsWithCategory,
  getOrgsWithCategories,
} from '@/services';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store';
import { useIsManager } from '@/hooks';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { Box, Stack, Typography } from '@mui/material';
import { ContentEditGroupSub } from '../../common/content-edit-group-sub';

export const Item08 = () => {
  const isManager = useIsManager();
  const [salesPersonInfo, setSalesPersonInfo] = useState({});
  const {
    preliminaryInfo: { p_application_headers },
    setPreliminarySnap,
    handleSave,
  } = usePreliminaryContext();
  const { salesPerson } = useRecoilValue(authAtom);
  const initialValues = {
    p_application_headers: {
      sales_company_id: p_application_headers?.sales_company_id,
      sales_area_id: p_application_headers?.sales_area_id,
      sales_exhibition_hall_id: p_application_headers?.sales_exhibition_hall_id,
      s_sales_person_id: p_application_headers?.s_sales_person_id,
      vendor_name: p_application_headers?.vendor_name,
      vendor_phone: p_application_headers?.vendor_phone,
      sales_host_company_id: p_application_headers.sales_host_company_id,
      sales_company: p_application_headers.sales_company,
      sales_area: p_application_headers.sales_area,
      sales_exhibition_hall: p_application_headers.sales_exhibition_hall,
    },
  };
  const isEditable = false;

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
    enableReinitialize: true,
    onSubmit: async (values) => {
      await handleSave(setUpdateData(values));
    },
  });
  const [salesCompanyOptions, setSalesCompanyOptions] = useState([]);
  const [salesAreaOptions, setSalesAreaOptions] = useState([]);
  const [salesExhibitionHallOptions, setSalesExhibitionHallOptions] = useState([]);
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);

  const [accessOrgs, setAccessOrgs] = useState([]);

  const fetchAccessOrgs = async () => {
    try {
      const res = await adGetSalesPersonBelowOrgs();
      const tempAccessOrgs = [];
      for (let org of res.data) {
        const resC = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'C');
        const resB = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'B');
        const resE = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'E');

        [...resC.data, ...resB.data, ...resE.data].forEach((item) => {
          tempAccessOrgs.push({ ...item, role: org?.role });
        });
      }
      setAccessOrgs(tempAccessOrgs);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (!isManager) {
      fetchAccessOrgs();
    }
  }, [salesPerson.id]);

  const fetchSalesCompanyOptions = async (id) => {
    try {
      const res = await getChildrenOrgsWithCategory(id, 'C');
      setSalesCompanyOptions(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  const fetchSalesAreaOptions = async (id) => {
    try {
      const res = await getChildrenOrgsWithCategory(id, 'B');
      setSalesAreaOptions(res.data);
      if (formik.values.p_application_headers.sales_area_id) {
        if (!res.data.find((org) => org.value === formik.values.p_application_headers.sales_area_id)) {
          formik.setFieldValue('p_application_headers.sales_area_id', '');
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  const fetchSalesExhibitionHallOptions = async (id) => {
    try {
      const res = await getChildrenOrgsWithCategory(id, 'E');
      setSalesExhibitionHallOptions(res.data);
      if (formik.values.p_application_headers.sales_exhibition_hall_id) {
        if (!res.data.find((org) => org.value === formik.values.p_application_headers.sales_exhibition_hall_id)) {
          formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  const fetchSalesPersonOptions = async (id) => {
    try {
      const res = await adGetAccessSalesPersonOptions(id);
      console.log(8888, `${id}`);
      console.log(8888, res.data);
      setSalesPersonOptions(res.data);
      if (formik.values.p_application_headers.s_sales_person_id) {
        if (!res.data.find((sp) => sp.value === formik.values.p_application_headers.s_sales_person_id)) {
          formik.setFieldValue('p_application_headers.s_sales_person_id', '');
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchSalesCompanyOptions(formik.values.p_application_headers.sales_host_company_id);
    fetchSalesAreaOptions(
      formik.values.p_application_headers.sales_company_id || formik.values.p_application_headers.sales_host_company_id
    );

    fetchSalesExhibitionHallOptions(
      formik.values.p_application_headers.sales_area_id ||
        formik.values.p_application_headers.sales_company_id ||
        formik.values.p_application_headers.sales_host_company_id
    );
    fetchSalesPersonOptions(
      formik.values.p_application_headers.sales_exhibition_hall_id ||
        formik.values.p_application_headers.sales_area_id ||
        formik.values.p_application_headers.sales_company_id ||
        formik.values.p_application_headers.sales_host_company_id
    );
  }, [
    formik.values.p_application_headers.sales_exhibition_hall_id,
    formik.values.p_application_headers.sales_area_id,
    formik.values.p_application_headers.sales_company_id,
    formik.values.p_application_headers.sales_host_company_id,
  ]);

  console.log(accessOrgs);

  const checkEnableSalesArea = useMemo(() => {
    if (isManager) return true;
    return accessOrgs.find((accessOrg) => accessOrg?.category === 'C' && accessOrg?.role === 9);
  }, [accessOrgs]);

  const checkEnableSalesExhibitionHall = useMemo(() => {
    if (isManager) return true;
    const accessOrgsID = [];
    accessOrgs.forEach((item) => {
      if (item?.role === 9) {
        accessOrgsID.push(item?.value);
      }
    });
    return accessOrgs.find(
      (accessOrg) =>
        accessOrg?.category === 'B' &&
        accessOrg?.role === 9 &&
        accessOrgsID.includes(formik.values.p_application_headers.sales_area_id)
    );
  }, [accessOrgs, formik.values.p_application_headers.sales_area_id]);

  const checkEnableSalesPerson = useMemo(() => {
    if (isManager) return true;
    const accessOrgsID = [];
    accessOrgs.forEach((item) => {
      if (item?.role === 9) {
        accessOrgsID.push(item?.value);
      }
    });
    return accessOrgs.find(
      (accessOrg) =>
        accessOrg?.category === 'E' &&
        accessOrg?.role === 9 &&
        accessOrgsID.includes(formik.values.p_application_headers.sales_exhibition_hall_id)
    );
  }, [accessOrgs, formik.values.p_application_headers.sales_exhibition_hall_id]);

  // const handleChangeSalesCompany = useCallback(async (sales_company_id) => {
  //   formik.setFieldValue('p_application_headers.sales_area_id', '');
  //   formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
  //   formik.setFieldValue('p_application_headers.s_sales_person_id', '');
  //   await fetchSalesAreaOptions(sales_company_id);
  //   await fetchSalesExhibitionHallOptions(sales_company_id);
  //   await fetchSalesPersonOptions(sales_company_id);
  // }, []);

  // const handleChangeSalesArea = useCallback(async (sales_area_id) => {
  //   try {
  //     const res = await getChildrenOrgsWithCategory(
  //       sales_area_id || formik.values.p_application_headers.sales_company_id,
  //       'E'
  //     );
  //     setSalesExhibitionHallOptions(res.data);
  //     if (!res.data?.find((item) => item?.value === formik.values.p_application_headers.sales_exhibition_hall_id)) {
  //       formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
  //     } else {
  //       const res = await adGetAccessSalesPersonOptions(
  //         formik.values.p_application_headers.sales_exhibition_hall_id ||
  //           sales_area_id ||
  //           formik.values.p_application_headers.sales_company_id
  //       );
  //       setSalesPersonOptions(res.data);
  //       if (!res.data?.find((item) => item?.value === formik.values.p_application_headers.s_sales_person_id)) {
  //         formik.setFieldValue('p_application_headers.s_sales_person_id', '');
  //       }
  //     }
  //   } catch (error) {
  //     toast.error('サーバーとの通信に失敗しました。再度お試しください。');
  //   }
  // }, []);

  // const handleChangeSalesExhibitionHall = useCallback(async (sales_exhibition_hall_id) => {
  //   try {
  //     const res = await adGetAccessSalesPersonOptions(
  //       sales_exhibition_hall_id ||
  //         formik.values.p_application_headers.sales_area_id ||
  //         formik.values.p_application_headers.sales_company_id
  //     );
  //     setSalesPersonOptions(res.data);
  //     if (!res.data?.find((item) => item?.value === formik.values.p_application_headers.s_sales_person_id)) {
  //       formik.setFieldValue('p_application_headers.s_sales_person_id', '');
  //     }
  //   } catch (error) {
  //     toast.error('サーバーとの通信に失敗しました。再度お試しください。');
  //   }
  // }, []);

  const handleChangSalesPerson = useCallback(async (s_sales_person_id) => {
    try {
      if (!s_sales_person_id) return;
      const res = await adGetSalesPersonOrgs(s_sales_person_id);
      console.log(res.data);
      const orgC = res.data.find((org) => org.category === 'C');
      const orgB = res.data.find((org) => org.category === 'B');
      const orgE = res.data.find((org) => org.category === 'E');
      if (!!orgC && orgC?.id !== formik.values.p_application_headers.sales_company_id) {
        console.log(111);
        formik.setFieldValue('p_application_headers.sales_company_id', orgC?.id);
      }
      if (!!orgB && orgB?.id !== formik.values.p_application_headers.sales_area_id) {
        console.log(222);
        formik.setFieldValue('p_application_headers.sales_area_id', orgB?.id);
      }
      if (!!orgE && orgE?.id !== formik.values.p_application_headers.sales_exhibition_hall_id) {
        console.log(333);
        formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', orgE?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   setPreliminarySnap((pre) => {
  //     return {
  //       ...pre,
  //       p_application_headers: {
  //         ...pre.p_application_headers,
  //         ...formik.values.p_application_headers,
  //       },
  //     };
  //   });
  // }, [formik.values]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formik.values.p_application_headers.s_sales_person_id) {
          const res = await adGetSalesPersonInfo(formik.values.p_application_headers.s_sales_person_id);
          setSalesPersonInfo(res.data);
        } else {
          setSalesPersonInfo({});
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [formik.values.p_application_headers.s_sales_person_id]);

  const [allOrgs, setAllOrgs] = useState([]);
  const [allSalesPersons, setAllSalesPersons] = useState([]);

  const fetchAllOrgsOptions = async () => {
    try {
      const res = await getOrgsWithCategories('C,B,E');
      console.log(res.data);
      setAllOrgs(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  const fetchAllSalesPersonOptions = async () => {
    try {
      const res = await adGetAccessSalesPersonOptions(formik.values.p_application_headers.sales_host_company_id);
      setAllSalesPersons(res.data);
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchAllOrgsOptions();
    fetchAllSalesPersonOptions();
  }, [formik.values.p_application_headers.sales_host_company_id]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'提携会社'}
          upConfig={{
            key: `p_application_headers.sales_company_id.${p_application_headers?.id}`,
            options: allOrgs,
          }}
          hasPleft={isEditable && isManager}
          field={
            isEditable && isManager ? (
              <AdSelectRadios name="p_application_headers.sales_company_id" options={salesCompanyOptions} hasFilter />
            ) : (
              salesCompanyOptions.find((item) => item.value === formik.values.p_application_headers.sales_company_id)
                ?.label
            )
          }
        />
        <EditRow
          label={'エリア'}
          upConfig={{
            key: `p_application_headers.sales_area_id.${p_application_headers?.id}`,
            options: allOrgs,
          }}
          hasPleft={isEditable && checkEnableSalesArea}
          field={
            isEditable && checkEnableSalesArea ? (
              <AdSelectRadios
                name="p_application_headers.sales_area_id"
                options={salesAreaOptions}
                cancelable
                hasFilter
              />
            ) : (
              salesAreaOptions.find((item) => item.value === formik.values.p_application_headers.sales_area_id)?.label
            )
          }
        />
        <EditRow
          label={'営業所・展示場'}
          upConfig={{
            key: `p_application_headers.sales_exhibition_hall_id.${p_application_headers?.id}`,
            options: allOrgs,
          }}
          hasPleft={isEditable && checkEnableSalesExhibitionHall}
          field={
            isEditable && checkEnableSalesExhibitionHall ? (
              <AdSelectRadios
                name="p_application_headers.sales_exhibition_hall_id"
                options={salesExhibitionHallOptions}
                cancelable
                hasFilter
              />
            ) : (
              salesExhibitionHallOptions.find(
                (item) => item.value === formik.values.p_application_headers.sales_exhibition_hall_id
              )?.label
            )
          }
        />
        <EditRow
          label={'担当者名'}
          upConfig={{
            key: `p_application_headers.s_sales_person_id.${p_application_headers?.id}`,
            options: allSalesPersons,
          }}
          hasPleft={isEditable && checkEnableSalesPerson}
          field={
            isEditable && checkEnableSalesPerson ? (
              <AdSelectRadios
                name="p_application_headers.s_sales_person_id"
                options={salesPersonOptions}
                cancelable
                hasFilter
                onChange={handleChangSalesPerson}
              />
            ) : (
              salesPersonOptions.find((item) => item.value === formik.values.p_application_headers.s_sales_person_id)
                ?.label
            )
          }
        />
        <EditRow label={'携帯電話番号'} field={salesPersonInfo?.mobile_phone} />
        <EditRow label={'メールアドレス'} field={salesPersonInfo?.email} />

        {isManager && (
          <ContentEditGroupSub label={'申込人入力データ'}>
            <EditRow
              label={'提携会社（入力）'}
              upConfig={{
                key: `p_application_headers.sales_company.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_application_headers.sales_company" convertFullWidth />
                ) : (
                  formik.values.p_application_headers.sales_company
                )
              }
            />
            <EditRow
              label={'エリア（入力）'}
              upConfig={{
                key: `p_application_headers.sales_area.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_application_headers.sales_area" convertFullWidth />
                ) : (
                  formik.values.p_application_headers.sales_area
                )
              }
            />
            <EditRow
              label={'営業所・展示場（入力）'}
              upConfig={{
                key: `p_application_headers.sales_exhibition_hall.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_application_headers.sales_exhibition_hall" convertFullWidth />
                ) : (
                  formik.values.p_application_headers.sales_exhibition_hall
                )
              }
            />
            <EditRow
              label={'担当者名（入力）'}
              upConfig={{
                key: `p_application_headers.vendor_name.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdEditFullWidthInput name="p_application_headers.vendor_name" convertFullWidth />
                ) : (
                  formik.values.p_application_headers.vendor_name
                )
              }
            />
            <EditRow
              label={'携帯電話番号（入力）'}
              upConfig={{
                key: `p_application_headers.vendor_phone.${p_application_headers?.id}`,
              }}
              field={
                isEditable ? (
                  <AdPhoneInputField name="p_application_headers.vendor_phone" convertHalfWidth />
                ) : (
                  formik.values.p_application_headers.vendor_phone
                )
              }
            />
          </ContentEditGroupSub>
        )}
      </ContentEditGroup>
    </FormikProvider>
  );
};
