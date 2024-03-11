import { Button, Stack, Typography } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { formatJapanDate, formatMoney } from '@/utils';

import {
  AdEditInput,
  AdNumericInput,
  AdSelectCheckbox,
  AdSelectRadios,
  DayPicker,
  MonthPicker,
} from '@/components/administrator';
import {
  bonusRepaymentMonthOptions,
  hasJoinGuarantorOptions,
  landAadvancePlanOptions,
  loanPlusOptions,
  loanTargetOptions,
  loanTargetOptions_,
  loanTypeOptions,
  pairLoanRelOptions,
  repaymentMethodOptions,
  yearNumOptions,
  yearOptions,
} from './options';
import { useBankMaster } from '@/hooks/use-bank-master';
import dayjs from 'dayjs';
import { useApUpdateApplyInfo, useSalesPersonOptions } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { MCJ_CODE } from '@/configs';
import { AdSaveButton } from '@/components/administrator/button';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apGetSalesCompanyOrgs } from '@/services';

export const Item08 = () => {
  const [orgs, setOrgs] = useState([]);
  const {
    preliminaryInfo: { p_application_headers },
    setPreliminarySnap,
  } = usePreliminaryContext();

  const initialValues = {
    p_application_headers: {
      sales_company_id: p_application_headers.sales_company_id,
      sales_area_id: p_application_headers.sales_area_id,
      sales_exhibition_hall_id: p_application_headers.sales_exhibition_hall_id,
      s_sales_person_id: p_application_headers.s_sales_person_id,
      vendor_name: p_application_headers.vendor_name,
      vendor_phone: p_application_headers.vendor_phone,
    },
  };

  const updateApply = useApUpdateApplyInfo();

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
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateApply(p_application_headers.apply_no, setUpdateData(values));
        toast.success('申込内容を更新しました。');
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });
  const isEditable = useMemo(() => {
    return true;
  }, []);

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
      <ContentEditGroup isEditable={true} handleSave={formik.handleSubmit}>
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
