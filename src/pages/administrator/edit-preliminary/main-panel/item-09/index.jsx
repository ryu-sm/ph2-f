import { FormikProvider, useFormik } from 'formik';

import { AdGroupRadio } from '@/components/administrator';

import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useEffect } from 'react';
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
      p_applicant_persons__0: {
        identity_verification_type: values.p_applicant_persons__0.identity_verification_type,
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
        p_applicant_persons__0: {
          ...pre.p_applicant_persons__0,
          ...formik.values.p_applicant_persons__0,
        },
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          ...formik.values.p_uploaded_files,
        },
        p_borrowings: formik.values.p_borrowings,
      };
    });
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
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '運転免許書〈表面〉',
                        key: `p_uploaded_files.p_applicant_persons__0__A__01__a`,
                      }}
                      name="p_uploaded_files.p_applicant_persons__0__A__01__a"
                    />
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '運転免許書〈裏面〉',
                        key: `p_uploaded_files.p_applicant_persons__0__A__01__b`,
                      }}
                      name="p_uploaded_files.p_applicant_persons__0__A__01__b"
                    />
                  </Stack>
                )}
                {formik.values.p_applicant_persons__0.identity_verification_type === '2' && (
                  <UploadItem
                    isDisabled={!isEditable}
                    upConfig={{
                      title: 'マイナンバーカード〈表面〉',
                      key: `p_uploaded_files.p_applicant_persons__0__A__02`,
                    }}
                    name="p_uploaded_files.p_applicant_persons__0__A__02"
                  />
                )}
                {formik.values.p_applicant_persons__0.identity_verification_type === '3' && (
                  <Stack spacing={2}>
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '住民基本台帳カード〈表面〉',
                        key: `p_uploaded_files.p_applicant_persons__0__A__03__a`,
                      }}
                      name="p_uploaded_files.p_applicant_persons__0__A__03__a"
                    />
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '住民基本台帳カード〈裏面〉',
                        key: `p_uploaded_files.p_applicant_persons__0__A__03__b`,
                      }}
                      name="p_uploaded_files.p_applicant_persons__0__A__03__b"
                    />
                  </Stack>
                )}
              </Stack>
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'B'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__B__a`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__B__a"
                subTitle="健康保険証〈表面〉"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__B__b`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__B__b"
                subTitle="健康保険証〈裏面〉"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'C'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__C__01`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__C__01"
                isMultiple={true}
                subTitle="源泉徴収票（前年度分）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__C__02`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__C__02"
                isMultiple={true}
                subTitle="源泉徴収票（前々年度分）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__C__03`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__C__03"
                isMultiple={true}
                subTitle="確定申告書（1期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__C__04`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__C__04"
                isMultiple={true}
                subTitle="確定申告書（2期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__C__05`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__C__05"
                isMultiple={true}
                subTitle="確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'D'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__D__01`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__D__01"
                isMultiple={true}
                subTitle="会社の決算報告書（1期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__D__02`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__D__02"
                isMultiple={true}
                subTitle="会社の決算報告書（2期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__D__03`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__D__03"
                isMultiple={true}
                subTitle="会社の決算報告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'E'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__E`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__E"
                isMultiple={true}
                subTitle="雇用契約書"
              />
            </ContentEditFileGroup>
          </Stack>
          <Stack flex={1} spacing={4}>
            <ContentEditFileGroup category={'F'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__F__01`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__F__01"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（1期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__F__02`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__F__02"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（2期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__F__03`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__F__03"
                isMultiple={true}
                subTitle="会社の決算報告書 または経営する親族の確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'G'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.G`,
                }}
                name="p_uploaded_files.G"
                isMultiple={true}
                subTitle="チラシ・パンフレット"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'H'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__H__a`,
                }}
                name={'p_uploaded_files.p_applicant_persons__0__H__a'}
                subTitle="在留カード 〈表面〉"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__H__b`,
                }}
                name={'p_uploaded_files.p_applicant_persons__0__H__b'}
                subTitle="在留カード 〈裏面〉"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'I'}>
              {formik.values.p_borrowings.map((item, index) => (
                <UploadItem
                  isDisabled={!isEditable}
                  key={item.id}
                  upConfig={{
                    p_borrowingsTitle: `${index + 1}件目の借入`,
                    key: `p_borrowings.p_borrowings__I.${item.id}`,
                  }}
                  name={`p_borrowings[${index}].p_borrowings__I`}
                  isMultiple={true}
                  subTitle={`${index + 1}件目の借入`}
                />
              ))}
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'J'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.J`,
                }}
                name="p_uploaded_files.J"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'K'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.p_applicant_persons__0__K`,
                }}
                name="p_uploaded_files.p_applicant_persons__0__K"
                isMultiple={true}
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'S'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_uploaded_files.S`,
                }}
                name="p_uploaded_files.S"
              />
            </ContentEditFileGroup>
          </Stack>
        </Stack>
      </ContentEditGroup>
    </FormikProvider>
  );
};
