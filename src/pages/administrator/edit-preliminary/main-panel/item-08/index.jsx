import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { AdEditFullWidthInput, AdEditInput, AdSelectRadios } from '@/components/administrator';

import { diffObj } from '@/utils';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  adGetAccessSalesPersonOptions,
  adGetSalesPersonInfo,
  adUpdatePreliminarySalesAreaId,
  adUpdatePreliminarySalesExhibitionHallId,
  adUpdatePreliminarySalesPersonId,
  getChildrenOrgsWithCategory,
  getOrgsWithCategories,
} from '@/services';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@/store';
import { useIsManager } from '@/hooks';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';

export const Item08 = () => {
  const isManager = useIsManager();
  const [salesPersonInfo, setSalesPersonInfo] = useState({});
  const {
    preliminaryInfo: { p_application_headers },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();
  const {
    salesPerson: { orgs },
  } = useRecoilValue(authAtom);
  const initialValues = {
    p_application_headers: {
      sales_company_id: p_application_headers?.sales_company_id,
      sales_area_id: p_application_headers?.sales_area_id,
      sales_exhibition_hall_id: p_application_headers?.sales_exhibition_hall_id,
      s_sales_person_id: p_application_headers?.s_sales_person_id,
      vendor_name: p_application_headers?.vendor_name,
      vendor_phone: p_application_headers?.vendor_phone,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_application_headers: {
        ...diffObj(initialValues.p_application_headers, values.p_application_headers),
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
      const tempAccessOrgs = [];
      for (let org of orgs) {
        const resC = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'C');
        const resB = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'B');
        const resE = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'E');

        [...resC.data, ...resB.data, ...resE.data].forEach((item) => {
          tempAccessOrgs.push({ ...item, role: org?.role });
        });
      }
      setAccessOrgs(tempAccessOrgs);
      console.log(9999, tempAccessOrgs);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (!isManager) {
      fetchAccessOrgs();
    }
  }, [orgs]);

  const fetchSalesCompanyOptions = async () => {
    try {
      const res = await getOrgsWithCategories('C');
      setSalesCompanyOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesAreaOptions = async (sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_company_id, 'B');
      console.log(res.data);
      setSalesAreaOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesExhibitionHallOptions = async (sales_area_id, sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_area_id || sales_company_id, 'E');
      console.log(res.data);
      setSalesExhibitionHallOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesPersonOptions = async (sales_exhibition_hall_id, sales_area_id, sales_company_id) => {
    try {
      const res = await adGetAccessSalesPersonOptions(sales_exhibition_hall_id || sales_area_id || sales_company_id);
      setSalesPersonOptions(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchSalesCompanyOptions();
    fetchSalesAreaOptions(formik.values.p_application_headers.sales_company_id);
    fetchSalesExhibitionHallOptions(
      formik.values.p_application_headers.sales_area_id,
      formik.values.p_application_headers.sales_company_id
    );
    fetchSalesPersonOptions(
      formik.values.p_application_headers.sales_exhibition_hall_id,
      formik.values.p_application_headers.sales_area_id,
      formik.values.p_application_headers.sales_company_id
    );
  }, []);

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

  const handleChangeSalesCompany = useCallback(async (sales_company_id) => {
    formik.setFieldValue('p_application_headers.sales_area_id', '');
    formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
    formik.setFieldValue('p_application_headers.s_sales_person_id', '');
    await fetchSalesAreaOptions(sales_company_id);
    await fetchSalesExhibitionHallOptions(sales_company_id);
    await fetchSalesPersonOptions(sales_company_id);
  }, []);

  const handleChangeSalesArea = useCallback(async (sales_area_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(
        sales_area_id || formik.values.p_application_headers.sales_company_id,
        'E'
      );
      setSalesExhibitionHallOptions(res.data);
      if (!res.data?.find((item) => item?.value === formik.values.p_application_headers.sales_exhibition_hall_id)) {
        formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
      } else {
        const res = await adGetAccessSalesPersonOptions(
          formik.values.p_application_headers.sales_exhibition_hall_id ||
            sales_area_id ||
            formik.values.p_application_headers.sales_company_id
        );
        setSalesPersonOptions(res.data);
        if (!res.data?.find((item) => item?.value === formik.values.p_application_headers.s_sales_person_id)) {
          formik.setFieldValue('p_application_headers.s_sales_person_id', '');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
    }
  }, []);

  const handleChangeSalesExhibitionHall = useCallback(async (sales_exhibition_hall_id) => {
    try {
      const res = await adGetAccessSalesPersonOptions(
        sales_exhibition_hall_id ||
          formik.values.p_application_headers.sales_area_id ||
          formik.values.p_application_headers.sales_company_id
      );
      setSalesPersonOptions(res.data);
      if (!res.data?.find((item) => item?.value === formik.values.p_application_headers.s_sales_person_id)) {
        formik.setFieldValue('p_application_headers.s_sales_person_id', '');
      }
    } catch (error) {
      console.log(error);
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
    }
  }, []);

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          ...formik.values.p_application_headers,
        },
      };
    });
  }, [formik.values]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formik.values.p_application_headers.s_sales_person_id) {
          const res = await adGetSalesPersonInfo(formik.values.p_application_headers.s_sales_person_id);
          setSalesPersonInfo(res.data);
        }
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    };
    fetchData();
  }, [formik.values.p_application_headers.s_sales_person_id]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'提携会社'}
          upConfig={{
            key: `p_application_headers.sales_company_id.${p_application_headers?.id}`,
            options: salesCompanyOptions,
          }}
          hasPleft={isEditable && isManager}
          field={
            isEditable && isManager ? (
              <AdSelectRadios
                name="p_application_headers.sales_company_id"
                options={salesCompanyOptions}
                hasFilter
                onChange={handleChangeSalesCompany}
              />
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
            options: salesAreaOptions,
          }}
          hasPleft={isEditable && checkEnableSalesArea}
          field={
            isEditable && checkEnableSalesArea ? (
              <AdSelectRadios
                name="p_application_headers.sales_area_id"
                options={salesAreaOptions}
                hasFilter
                onChange={handleChangeSalesArea}
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
            options: salesExhibitionHallOptions,
          }}
          hasPleft={isEditable && checkEnableSalesExhibitionHall}
          field={
            isEditable && checkEnableSalesExhibitionHall ? (
              <AdSelectRadios
                name="p_application_headers.sales_exhibition_hall_id"
                options={salesExhibitionHallOptions}
                hasFilter
                onChange={handleChangeSalesExhibitionHall}
              />
            ) : (
              salesExhibitionHallOptions.find(
                (item) => item.value === formik.values.p_application_headers.sales_exhibition_hall_id
              )?.label
            )
          }
        />
        <EditRow
          label={'担当者名 (情報共有者)'}
          upConfig={{
            key: `p_application_headers.s_sales_person_id.${p_application_headers?.id}`,
            options: salesPersonOptions,
          }}
          hasPleft={isEditable && checkEnableSalesPerson}
          field={
            isEditable && checkEnableSalesPerson ? (
              <AdSelectRadios name="p_application_headers.s_sales_person_id" options={salesPersonOptions} hasFilter />
            ) : (
              salesPersonOptions.find((item) => item.value === formik.values.p_application_headers.s_sales_person_id)
                ?.label
            )
          }
        />
        <EditRow
          label={'担当者名'}
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
          label={'携帯電話番号'}
          upConfig={{
            key: `p_application_headers.vendor_phone.${p_application_headers?.id}`,
          }}
          field={
            isEditable ? (
              <AdEditInput name="p_application_headers.vendor_phone" convertHalfWidth />
            ) : (
              formik.values.p_application_headers.vendor_phone
            )
          }
        />
        <EditRow label={'携帯電話番号（マスターデータ）'} field={salesPersonInfo?.mobile_phone} />
        <EditRow label={'メールアドレス'} field={salesPersonInfo?.email} />
      </ContentEditGroup>
    </FormikProvider>
  );
};
