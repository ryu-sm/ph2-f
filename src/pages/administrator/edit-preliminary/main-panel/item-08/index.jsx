import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { AdEditInput, AdSelectRadios } from '@/components/administrator';
import { useSalesPersonOptions } from '@/hooks';
import { diffObj } from '@/utils';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apGetSalesCompanyOrgs } from '@/services';

export const Item08 = () => {
  const [orgs, setOrgs] = useState([]);
  const {
    preliminaryInfo: { p_application_headers },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

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
  });

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

  const getOrgs = useCallback(async () => {
    try {
      const res = await apGetSalesCompanyOrgs();

      const tempOrgs = res.data.map((item) => ({
        value: item.id,
        pid: item.pid,
        label: item.name,
        category: item.category,
      }));
      setOrgs(tempOrgs);
    } catch (error) {
      console.error(error);
    }
  }, []);

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

  const salesPersonOptions = useSalesPersonOptions(formik.values.p_application_headers.sales_exhibition_hall_id);

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={() => handleSave(setUpdateData(formik.values))}>
        <EditRow
          label={'提携会社'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_application_headers.sales_company_id"
                options={salesCompanyOptions}
                onChange={() => {
                  formik.setFieldValue('p_application_headers.sales_area_id', '');
                  formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
                }}
              />
            ) : (
              salesCompanyOptions.find((item) => item.value === formik.values.p_application_headers.sales_company_id)
                ?.label
            )
          }
          error={formik.errors?.p_application_headers?.sales_company_id}
        />
        <EditRow
          label={'エリア'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios
                name="p_application_headers.sales_area_id"
                options={salesAreaOptions}
                onChange={() => {
                  formik.setFieldValue('p_application_headers.sales_exhibition_hall_id', '');
                }}
              />
            ) : (
              salesAreaOptions.find((item) => item.value === formik.values.p_application_headers.sales_area_id)?.label
            )
          }
          error={formik.errors?.p_application_headers?.sales_area_id}
        />
        <EditRow
          label={'営業所・展示場'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_application_headers.sales_exhibition_hall_id" options={exhibitionHallOptions} />
            ) : (
              exhibitionHallOptions.find(
                (item) => item.value === formik.values.p_application_headers.sales_exhibition_hall_id
              )?.label
            )
          }
          error={formik.errors?.p_application_headers?.sales_exhibition_hall_id}
        />
        <EditRow
          label={'担当者名 (情報共有者)'}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_application_headers.s_sales_person_id" options={salesPersonOptions} />
            ) : (
              salesPersonOptions.find((item) => item.value === formik.values.p_application_headers.s_sales_person_id)
                ?.label
            )
          }
          error={formik.errors?.p_application_headers?.s_sales_person_id}
        />
        <EditRow
          label={'担当者名'}
          field={
            isEditable ? (
              <AdEditInput name="p_application_headers.vendor_name" convertFullWidth />
            ) : (
              formik.values.p_application_headers.vendor_name
            )
          }
          error={formik.errors?.p_application_headers?.vendor_name}
        />
        <EditRow
          label={'携帯電話番号'}
          field={
            isEditable ? (
              <AdEditInput name="p_application_headers.vendor_phone" convertHalfWidth />
            ) : (
              formik.values.p_application_headers.vendor_phone
            )
          }
          error={formik.errors?.p_application_headers?.vendor_phone}
        />
        <EditRow
          label={'携帯電話番号（マスターデータ）'}
          field={
            salesPersonOptions.find((item) => item.value === formik.values.p_application_headers.s_sales_person_id)
              ?.mobile_phone
          }
        />
        <EditRow
          label={'メールアドレス'}
          field={
            salesPersonOptions.find((item) => item.value === formik.values.p_application_headers.s_sales_person_id)
              ?.email
          }
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
