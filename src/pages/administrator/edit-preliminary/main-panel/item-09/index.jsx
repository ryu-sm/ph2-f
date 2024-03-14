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
    preliminaryInfo: { p_uploaded_files, p_applicant_persons__0, p_borrowings },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_uploaded_files: {
      p_applicant_persons__0__A__01__a: p_uploaded_files.p_applicant_persons__0__A__01__a,
      p_applicant_persons__0__A__01__b: p_uploaded_files.p_applicant_persons__0__A__01__b,
      p_applicant_persons__0__A__02: p_uploaded_files.p_applicant_persons__0__A__02,
      p_applicant_persons__0__A__03__a: p_uploaded_files.p_applicant_persons__0__A__03__a,
      p_applicant_persons__0__A__03__b: p_uploaded_files.p_applicant_persons__0__A__03__b,
      p_applicant_persons__0__B__a: p_uploaded_files.p_applicant_persons__0__B__a,
      p_applicant_persons__0__B__b: p_uploaded_files.p_applicant_persons__0__B__b,
      p_applicant_persons__0__C__01: p_uploaded_files.p_applicant_persons__0__C__01,
      p_applicant_persons__0__C__02: p_uploaded_files.p_applicant_persons__0__C__02,
      p_applicant_persons__0__C__03: p_uploaded_files.p_applicant_persons__0__C__03,
      p_applicant_persons__0__C__04: p_uploaded_files.p_applicant_persons__0__C__04,
      p_applicant_persons__0__C__05: p_uploaded_files.p_applicant_persons__0__C__05,
      p_applicant_persons__0__D__01: p_uploaded_files.p_applicant_persons__0__D__01,
      p_applicant_persons__0__D__02: p_uploaded_files.p_applicant_persons__0__D__02,
      p_applicant_persons__0__D__03: p_uploaded_files.p_applicant_persons__0__D__03,
      p_applicant_persons__0__E: p_uploaded_files.p_applicant_persons__0__E,
      p_applicant_persons__0__F__01: p_uploaded_files.p_applicant_persons__0__F__01,
      p_applicant_persons__0__F__02: p_uploaded_files.p_applicant_persons__0__F__02,
      p_applicant_persons__0__F__03: p_uploaded_files.p_applicant_persons__0__F__03,
      p_applicant_persons__0__K: p_uploaded_files.p_applicant_persons__0__K,

      p_applicant_persons__0__H__a: p_uploaded_files.p_applicant_persons__0__H__a,
      p_applicant_persons__0__H__b: p_uploaded_files.p_applicant_persons__0__H__b,
      G: p_uploaded_files.G,
      J: p_uploaded_files.J,
      S: p_uploaded_files.S,
    },
    p_applicant_persons__0: {
      identity_verification_type: p_applicant_persons__0.identity_verification_type,
    },
    p_borrowings: p_borrowings,
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_uploaded_files: {
        ...values.p_uploaded_files,
      },
      p_borrowings: values.p_borrowings,
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
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
        p_borrowings: formik.values.p_borrowings,
      };
    });
  }, [formik.values]);

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <ContentEditGroup
        isEditable={isEditable}
        hiddenTitle
        hiddenLine
        handleSave={() => handleSave(setUpdateData(formik.values))}
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
                  name="p_applicant_persons__0.identity_verification_type"
                  options={identityVerificationOptions}
                />

                {formik.values.p_applicant_persons__0.identity_verification_type === '1' && (
                  <Stack spacing={2}>
                    <UploadItem name="p_uploaded_files.p_applicant_persons__0__A__01__a" />
                    <UploadItem name="p_uploaded_files.p_applicant_persons__0__A__01__b" />
                  </Stack>
                )}
                {formik.values.p_applicant_persons__0.identity_verification_type === '2' && (
                  <UploadItem name="p_uploaded_files.p_applicant_persons__0__A__02" />
                )}
                {formik.values.p_applicant_persons__0.identity_verification_type === '3' && (
                  <Stack spacing={2}>
                    <UploadItem name="p_uploaded_files.p_applicant_persons__0__A__03__a" />
                    <UploadItem name="p_uploaded_files.p_applicant_persons__0__A__03__b" />
                  </Stack>
                )}
              </Stack>
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'B'}>
              <UploadItem name="p_uploaded_files.p_applicant_persons__0__B__a" subTitle="健康保険証〈表面〉" />
              <UploadItem name="p_uploaded_files.p_applicant_persons__0__B__b" subTitle="健康保険証〈裏面〉" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'C'}>
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__C__01"
                isMultiple={true}
                subTitle="源泉徴収票（前年度分）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__C__02"
                isMultiple={true}
                subTitle="源泉徴収票（前々年度分）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__C__03"
                isMultiple={true}
                subTitle="確定申告書（1期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__C__04"
                isMultiple={true}
                subTitle="確定申告書（2期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__C__05"
                isMultiple={true}
                subTitle="確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'D'}>
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__D__01"
                isMultiple={true}
                subTitle="会社の決算報告書（1期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__D__02"
                isMultiple={true}
                subTitle="会社の決算報告書（2期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__D__03"
                isMultiple={true}
                subTitle="会社の決算報告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'E'}>
              <UploadItem name="p_uploaded_files.p_applicant_persons__0__E" isMultiple={true} subTitle="雇用契約書" />
            </ContentEditFileGroup>
          </Stack>
          <Stack flex={1} spacing={4}>
            <ContentEditFileGroup category={'F'}>
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__F__01"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（1期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__F__02"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（2期前）"
              />
              <UploadItem
                name="p_uploaded_files.p_applicant_persons__0__F__03"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'G'}>
              <UploadItem name="G" isMultiple={true} subTitle="チラシ・パンフレット" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'H'}>
              <UploadItem name={'p_uploaded_files.p_applicant_persons__0__H__a'} subTitle="在留カード 〈表面〉" />
              <UploadItem name={'p_uploaded_files.p_applicant_persons__0__H__b'} subTitle="在留カード 〈裏面〉" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'I'}>
              {formik.values.p_borrowings.map((item, index) => (
                <UploadItem
                  key={item.id}
                  name={`p_borrowings[${index}].p_borrowings__I`}
                  isMultiple={true}
                  subTitle={`${index + 1}件目の借入`}
                />
              ))}
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'J'}>
              <UploadItem name="p_uploaded_files.J" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'K'}>
              <UploadItem name="p_uploaded_files.p_applicant_persons__0__K" />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'S'}>
              <UploadItem name="p_uploaded_files.S" />
            </ContentEditFileGroup>
          </Stack>
        </Stack>
      </ContentEditGroup>
    </FormikProvider>
  );
};
