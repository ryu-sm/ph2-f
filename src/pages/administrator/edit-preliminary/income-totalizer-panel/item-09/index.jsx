import { FormikProvider, useFormik } from 'formik';
import { AdGroupRadio } from '@/components/administrator';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useEffect } from 'react';

import { Stack } from '@mui/material';
import { ContentEditFileGroup } from '../../common/content-edit-file-group';
import { identityVerificationOptions } from './options';
import { UploadItem } from '../../common/upload-item';
import { diffObj } from '@/utils';
import { tab09SchemaI } from '../../fullSchema';

export const Item09 = () => {
  const {
    preliminaryInfo: { p_applicant_persons__1, apply_type },
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
    p_applicant_persons__1: {
      identity_verification_type: p_applicant_persons__1.identity_verification_type,
      A__01__a: p_applicant_persons__1.A__01__a,
      A__01__b: p_applicant_persons__1.A__01__b,
      A__02: p_applicant_persons__1.A__02,
      A__03__a: p_applicant_persons__1.A__03__a,
      A__03__b: p_applicant_persons__1.A__03__b,
      B__a: p_applicant_persons__1.B__a,
      B__b: p_applicant_persons__1.B__b,
      C__01: p_applicant_persons__1.C__01,
      C__02: p_applicant_persons__1.C__02,
      C__03: p_applicant_persons__1.C__03,
      C__04: p_applicant_persons__1.C__04,
      C__05: p_applicant_persons__1.C__05,
      D__01: p_applicant_persons__1.D__01,
      D__02: p_applicant_persons__1.D__02,
      D__03: p_applicant_persons__1.D__03,
      E: p_applicant_persons__1.E,
      F__01: p_applicant_persons__1.F__01,
      F__02: p_applicant_persons__1.F__02,
      F__03: p_applicant_persons__1.F__03,
      K: p_applicant_persons__1.K,
      S: p_applicant_persons__1.S,
      H__a: p_applicant_persons__1.H__a,
      H__b: p_applicant_persons__1.H__b,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__1: {
        ...diffObj(initialValues.p_applicant_persons__1, values.p_applicant_persons__1),
      },
      ...(changeToIncomeTotalizer && {
        p_application_headers: {
          ...p_application_headers,
        },
        p_application_banks: p_application_banks,
        p_borrowing_details__1: {
          ...p_borrowing_details__1,
        },
        p_borrowing_details__2: {
          ...p_borrowing_details__2,
        },
        p_applicant_persons__1: {
          ...preliminarySnap.p_applicant_persons__1,
          ...diffObj(initialValues.p_applicant_persons__1, values.p_applicant_persons__1),
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
    validationSchema: tab09SchemaI,
    onSubmit: (values) => {
      handleSave(setUpdateData(values));
    },
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_applicant_persons__1: {
          ...pre.p_applicant_persons__1,
          ...formik.values.p_applicant_persons__1,
        },
      };
    });
  }, [formik.values]);

  console.log(p_applicant_persons__1);

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
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '運転免許書〈表面〉',
                        key: `p_applicant_persons.A__01__a.${p_applicant_persons__1.id}`,
                      }}
                      name="p_applicant_persons__1.A__01__a"
                    />
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '運転免許書〈裏面〉',
                        key: `p_applicant_persons.A__01__b.${p_applicant_persons__1.id}`,
                      }}
                      name="p_applicant_persons__1.A__01__b"
                    />
                  </Stack>
                )}
                {formik.values.p_applicant_persons__1.identity_verification_type === '2' && (
                  <UploadItem
                    isDisabled={!isEditable}
                    upConfig={{
                      title: 'マイナンバーカード〈表面〉',
                      key: `p_applicant_persons.A__02.${p_applicant_persons__1.id}`,
                    }}
                    name="p_applicant_persons__1.A__02"
                  />
                )}
                {formik.values.p_applicant_persons__1.identity_verification_type === '3' && (
                  <Stack spacing={2}>
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '住民基本台帳カード〈表面〉',
                        key: `p_applicant_persons.A__03__a.${p_applicant_persons__1.id}`,
                      }}
                      name="p_applicant_persons__1.A__03__a"
                    />
                    <UploadItem
                      isDisabled={!isEditable}
                      upConfig={{
                        title: '住民基本台帳カード〈裏面〉',
                        key: `p_applicant_persons.A__03__b.${p_applicant_persons__1.id}`,
                      }}
                      name="p_applicant_persons__1.A__03__b"
                    />
                  </Stack>
                )}
              </Stack>
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'B'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.B__a.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.B__a"
                subTitle="健康保険証〈表面〉"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.B__b.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.B__b"
                subTitle="健康保険証〈裏面〉"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'C'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.C__01.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.C__01"
                subTitle="源泉徴収票（前年度分）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.C__02.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.C__02"
                subTitle="源泉徴収票（前々年度分）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.C__03.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.C__03"
                subTitle="確定申告書（1期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.C__04.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.C__04"
                subTitle="確定申告書（2期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.C__05.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.C__05"
                subTitle="確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'D'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.D__01.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.D__01"
                subTitle="会社の決算報告書（1期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.D__02.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.D__02"
                subTitle="会社の決算報告書（2期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.D__03.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.D__03"
                subTitle="会社の決算報告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'E'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.E.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.E"
                subTitle="雇用契約書"
              />
            </ContentEditFileGroup>
          </Stack>
          <Stack flex={1} spacing={4}>
            <ContentEditFileGroup category={'F'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.F__01.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.F__01"
                subTitle="会社の決算報告書 または経営する親族の確定申告書（1期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.F__02.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.F__02"
                subTitle="会社の決算報告書 または経営する親族の確定申告書（2期前）"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.F__03.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.F__03"
                subTitle="会社の決算報告書 または経営する親族の確定申告書（3期前）"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'H'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.H__a.${p_applicant_persons__1.id}`,
                }}
                name={'p_applicant_persons__1.H__a'}
                subTitle="在留カード 〈表面〉"
              />
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  key: `p_applicant_persons.H__b.${p_applicant_persons__1.id}`,
                }}
                name={'p_applicant_persons__1.H__b'}
                subTitle="在留カード 〈裏面〉"
              />
            </ContentEditFileGroup>
            <ContentEditFileGroup category={'K'}>
              <UploadItem
                isDisabled={!isEditable}
                upConfig={{
                  title: 'その他',
                  key: `p_applicant_persons.K.${p_applicant_persons__1.id}`,
                }}
                name="p_applicant_persons__1.K"
              />
            </ContentEditFileGroup>
            {apply_type == '2' && (
              <ContentEditFileGroup category={'S'}>
                <UploadItem isDisabled={apply_type === '2'} name="p_applicant_persons__1.S" />
              </ContentEditFileGroup>
            )}
          </Stack>
        </Stack>
      </ContentEditGroup>
    </FormikProvider>
  );
};
