import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';

import { AdEditInput, AdGroupRadio, AdSelectRadios } from '@/components/administrator';
import { useSalesPersonOptions } from '@/hooks';
import { diffObj } from '@/utils';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apGetSalesCompanyOrgs } from '@/services';
import { Stack } from '@mui/material';
import { ContentEditFileGroup } from '../../common/content-edit-file-group';
import { identityVerificationOptions } from './options';
import { UploadItem } from '../../common/upload-item';

export const Item09 = () => {
  const {
    preliminaryInfo: { p_uploaded_files, p_applicant_persons__1 },
    preliminarySnap,
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const {
    changeJoinGuarantor,
    changeToIncomeTotalizer,
    p_application_headers,
    p_application_banks,
    p_borrowing_details__1,
    p_borrowing_details__2,
    p_join_guarantors,
  } = preliminarySnap;

  const initialValues = {
    p_uploaded_files: {
      p_applicant_persons__1__A__01__a: p_uploaded_files.p_applicant_persons__1__A__01__a,
      p_applicant_persons__1__A__01__b: p_uploaded_files.p_applicant_persons__1__A__01__b,
      p_applicant_persons__1__A__02: p_uploaded_files.p_applicant_persons__1__A__02,
      p_applicant_persons__1__A__03__a: p_uploaded_files.p_applicant_persons__1__A__03__a,
      p_applicant_persons__1__A__03__b: p_uploaded_files.p_applicant_persons__1__A__03__b,
      p_applicant_persons__1__B__a: p_uploaded_files.p_applicant_persons__1__B__a,
      p_applicant_persons__1__B__b: p_uploaded_files.p_applicant_persons__1__B__b,
      p_applicant_persons__1__C__01: p_uploaded_files.p_applicant_persons__1__C__01,
      p_applicant_persons__1__C__02: p_uploaded_files.p_applicant_persons__1__C__02,
      p_applicant_persons__1__C__03: p_uploaded_files.p_applicant_persons__1__C__03,
      p_applicant_persons__1__C__04: p_uploaded_files.p_applicant_persons__1__C__04,
      p_applicant_persons__1__C__05: p_uploaded_files.p_applicant_persons__1__C__05,
      p_applicant_persons__1__D__01: p_uploaded_files.p_applicant_persons__1__D__01,
      p_applicant_persons__1__D__02: p_uploaded_files.p_applicant_persons__1__D__02,
      p_applicant_persons__1__D__03: p_uploaded_files.p_applicant_persons__1__D__03,
      p_applicant_persons__1__E: p_uploaded_files.p_applicant_persons__1__E,
      p_applicant_persons__1__F__01: p_uploaded_files.p_applicant_persons__1__F__01,
      p_applicant_persons__1__F__02: p_uploaded_files.p_applicant_persons__1__F__02,
      p_applicant_persons__1__F__03: p_uploaded_files.p_applicant_persons__1__F__03,
      p_applicant_persons__1__K: p_uploaded_files.p_applicant_persons__1__K,

      p_applicant_persons__1__H__a: p_uploaded_files.p_applicant_persons__1__H__a,
      p_applicant_persons__1__H__b: p_uploaded_files.p_applicant_persons__1__H__b,
    },
    p_applicant_persons__1: {
      identity_verification_type: p_applicant_persons__1.identity_verification_type,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_uploaded_files: {
        ...values.p_uploaded_files,
      },
      p_applicant_persons__1: {
        identity_verification_type: values.identity_verification_type,
      },
      ...(changeToIncomeTotalizer && {
        p_application_headers: {
          created_at: p_application_headers?.created_at,
          apply_date: p_application_headers?.apply_date,
          move_scheduled_date: p_application_headers?.move_scheduled_date,
          loan_target: p_application_headers?.loan_target,
          land_advance_plan: p_application_headers?.land_advance_plan,
          loan_type: p_application_headers?.loan_type,
          pair_loan_last_name: p_application_headers?.pair_loan_last_name,
          pair_loan_first_name: p_application_headers?.pair_loan_first_name,
          pair_loan_rel_name: p_application_headers?.pair_loan_rel_name,
          pair_loan_rel: p_application_headers?.pair_loan_rel,
          join_guarantor_umu: p_application_headers?.join_guarantor_umu,
          loan_plus: p_application_headers?.loan_plus,
        },
        p_application_banks,
        p_borrowing_details__1: {
          desired_borrowing_date: p_borrowing_details__1?.desired_borrowing_date,
          desired_loan_amount: p_borrowing_details__1?.desired_loan_amount,
          bonus_repayment_amount: p_borrowing_details__1?.bonus_repayment_amount,
          bonus_repayment_month: p_borrowing_details__1?.bonus_repayment_month,
          loan_term_year: p_borrowing_details__1?.loan_term_year,
          repayment_method: p_borrowing_details__1?.repayment_method,
        },
        p_borrowing_details__2: {
          desired_borrowing_date: p_borrowing_details__2?.desired_borrowing_date,
          desired_loan_amount: p_borrowing_details__2?.desired_loan_amount,
          bonus_repayment_amount: p_borrowing_details__2?.bonus_repayment_amount,
        },
        p_applicant_persons__1: {
          ...preliminarySnap.p_applicant_persons__1,
          ...values.p_applicant_persons__1,
        },
      }),
      ...(changeJoinGuarantor && {
        p_join_guarantors: p_join_guarantors,
      }),
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSave(setUpdateData(values));
    },
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          ...formik.values.p_application_headers,
        },
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          ...formik.values.p_uploaded_files,
        },
      };
    });
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup
        isEditable={isEditable}
        hiddenTitle
        hiddenLine
        handleSave={() => {
          if (changeToIncomeTotalizer) {
            formik.handleSubmit();
          } else {
            handleSave(setUpdateData(formik.values));
          }
        }}
      >
        <Stack
          direction={'row'}
          spacing={4}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          overflow={'auto'}
        >
          <Stack flex={1} spacing={4}>
            <ContentEditFileGroup category={'A'}>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                <AdGroupRadio
                  name="p_applicant_persons__1.identity_verification_type"
                  options={identityVerificationOptions}
                />

                {formik.values.p_applicant_persons__1.identity_verification_type === '1' && (
                  <Stack spacing={2}>
                    <UploadItem name="p_uploaded_files.p_applicant_persons__1__A__01__a" />
                    <UploadItem name="p_uploaded_files.p_applicant_persons__1__A__01__b" />
                  </Stack>
                )}
                {formik.values.p_applicant_persons__1.identity_verification_type === '2' && (
                  <UploadItem name="p_uploaded_files.p_applicant_persons__1__A__02" />
                )}
                {formik.values.p_applicant_persons__1.identity_verification_type === '3' && (
                  <Stack spacing={2}>
                    <UploadItem name="p_uploaded_files.p_applicant_persons__1__A__03__a" />
                    <UploadItem name="p_uploaded_files.p_applicant_persons__1__A__03__b" />
                  </Stack>
                )}
              </Stack>
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'B'}>
              <UploadItem name="p_uploaded_files.p_applicant_persons__1__B__a" subTitle="健康保険証〈表面〉" />
              <UploadItem name="p_uploaded_files.p_applicant_persons__1__B__b" subTitle="健康保険証〈裏面〉" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'C'}>
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__C__01"
                isMultiple={true}
                subTitle="源泉徴収票（前年度分）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__C__02"
                isMultiple={true}
                subTitle="源泉徴収票（前々年度分）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__C__03"
                isMultiple={true}
                subTitle="確定申告書（1期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__C__04"
                isMultiple={true}
                subTitle="確定申告書（2期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__C__05"
                isMultiple={true}
                subTitle="確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'D'}>
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__D__01"
                isMultiple={true}
                subTitle="会社の決算報告書（1期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__D__02"
                isMultiple={true}
                subTitle="会社の決算報告書（2期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__D__03"
                isMultiple={true}
                subTitle="会社の決算報告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'E'}>
              <UploadItem name="p_uploaded_files.p_applicant_persons__1__E" isMultiple={true} subTitle="雇用契約書" />
            </ContentEditFileGroup>
          </Stack>
          <Stack flex={1} spacing={4}>
            <ContentEditFileGroup category={'F'}>
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__F__01"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（1期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__F__02"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（2期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__1__F__03"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'G'}>
              <UploadItem name="G" isMultiple={true} subTitle="チラシ・パンフレット" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'H'}>
              <UploadItem name={'p_uploaded_files.p_applicant_persons__1__H__a'} subTitle="在留カード 〈表面〉" />
              <UploadItem name={'p_uploaded_files.p_applicant_persons__1__H__b'} subTitle="在留カード 〈裏面〉" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'K'}>
              <UploadItem name="p_uploaded_files.p_applicant_persons__1__K" />
            </ContentEditFileGroup>
          </Stack>
        </Stack>
      </ContentEditGroup>
    </FormikProvider>
  );
};
