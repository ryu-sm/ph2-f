import { Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { DocsCategoryItem } from './docs-category-item';
import { GroupRadio } from './group-radio';
import { UploadItem } from './upload-item';

export const DocsDownload = () => {
  const initialValues = {
    p_applicant_persons__0__H__a: [],
    p_applicant_persons__0__H__b: [],
    // STEP04
    p_applicant_persons__1__H__a: [],
    p_applicant_persons__1__H__b: [],
    // STEP07
    G: [],
    // STEP10
    p_applicant_persons__0__A__01__a: [],
    p_applicant_persons__0__A__01__b: [],
    p_applicant_persons__0__A__02: [],
    p_applicant_persons__0__A__03__a: [],
    p_applicant_persons__0__A__03__b: [],
    p_applicant_persons__0__B__a: [],
    p_applicant_persons__0__B__b: [],
    p_applicant_persons__0__C__01: [],
    p_applicant_persons__0__C__02: [],
    p_applicant_persons__0__C__03: [],
    p_applicant_persons__0__C__04: [],
    p_applicant_persons__0__C__05: [],
    p_applicant_persons__0__D__01: [],
    p_applicant_persons__0__D__02: [],
    p_applicant_persons__0__D__03: [],
    p_applicant_persons__0__E: [],
    p_applicant_persons__0__F__01: [],
    p_applicant_persons__0__F__02: [],
    p_applicant_persons__0__F__03: [],
    p_applicant_persons__0__K: [],
    // STEP11
    p_applicant_persons__1__A__01__a: [],
    p_applicant_persons__1__A__01__b: [],
    p_applicant_persons__1__A__02: [],
    p_applicant_persons__1__A__03__a: [],
    p_applicant_persons__1__A__03__b: [],
    p_applicant_persons__1__B__a: [],
    p_applicant_persons__1__B__b: [],
    p_applicant_persons__1__C__01: [],
    p_applicant_persons__1__C__02: [],
    p_applicant_persons__1__C__03: [],
    p_applicant_persons__1__C__04: [],
    p_applicant_persons__1__C__05: [],
    p_applicant_persons__1__D__01: [],
    p_applicant_persons__1__D__02: [],
    p_applicant_persons__1__D__03: [],
    p_applicant_persons__1__E: [],
    p_applicant_persons__1__F__01: [],
    p_applicant_persons__1__F__02: [],
    p_applicant_persons__1__F__03: [],
    p_applicant_persons__1__K: [],
    p_applicant_persons__0__I__01: [],
    p_applicant_persons__0__I__02: [],
    p_applicant_persons__0__I__03: [],
    p_applicant_persons__0__I__04: [],
    p_applicant_persons__0__I__05: [],
    p_applicant_persons__0__I__06: [],
    p_applicant_persons__0__I__07: [],
    p_applicant_persons__0__I__08: [],
    // STEP12
    J: [],
    // STEP13
    S: [],
    K: [],
  };
  const formik = useFormik({
    initialValues,
  });
  const [selectValue, setSelectValue] = useState('');
  const isIncomeTotalizer = false;

  const dynamicFields = Array.from({ length: 8 }, (_, index) => ({
    name: `p_applicant_persons__0__I__0${index + 1}`,
    subTitle: `${index + 1}件目の借入`,
  }));
  return (
    <FormikProvider value={formik}>
      <Stack
        maxHeight={'100%'}
        flexGrow={1}
        overflow={'auto'}
        pb={10}
        direction={'row'}
        spacing={4}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Stack flex={1} spacing={4}>
          <DocsCategoryItem category="A">
            <Stack direction={'row'} justifyContent={'space-between'}>
              <GroupRadio value={selectValue} setValue={setSelectValue} />
              <Stack spacing={3}>
                {selectValue === 'card_number' ? (
                  <UploadItem name="p_applicant_persons__0__A__02" />
                ) : (
                  <>
                    <UploadItem
                      name={
                        selectValue === 'driver_license'
                          ? 'p_applicant_persons__0__A__01__a'
                          : 'p_applicant_persons__0__A__03__a'
                      }
                    />
                    <UploadItem
                      name={
                        selectValue === 'driver_license'
                          ? 'p_applicant_persons__0__A__01__b'
                          : 'p_applicant_persons__0__A__03__b'
                      }
                    />
                  </>
                )}
              </Stack>
            </Stack>
          </DocsCategoryItem>

          <DocsCategoryItem category="B">
            <UploadItem name="p_applicant_persons__0__B__a" subTitle="健康保険証〈表面〉" />
            <UploadItem name="p_applicant_persons__0__B__b" subTitle="健康保険証〈裏面〉" />
          </DocsCategoryItem>

          <DocsCategoryItem category="C">
            <UploadItem name="p_applicant_persons__0__C__01" isMultiple={true} subTitle="源泉徴収票（前年度分）" />
            <UploadItem name="p_applicant_persons__0__C__02" isMultiple={true} subTitle="源泉徴収票（前々年度分）" />
            <UploadItem name="p_applicant_persons__0__C__03" isMultiple={true} subTitle="確定申告書（1期前）" />
            <UploadItem name="p_applicant_persons__0__C__04" isMultiple={true} subTitle="確定申告書（2期前）" />
            <UploadItem name="p_applicant_persons__0__C__05" isMultiple={true} subTitle="確定申告書（3期前）" />
          </DocsCategoryItem>

          <DocsCategoryItem category="D">
            <UploadItem name="p_applicant_persons__0__D__01" isMultiple={true} subTitle="会社の決算報告書（1期前）" />
            <UploadItem name="p_applicant_persons__0__D__02" isMultiple={true} subTitle="会社の決算報告書（2期前）" />
            <UploadItem name="p_applicant_persons__0__D__03" isMultiple={true} subTitle="会社の決算報告書（3期前）" />
          </DocsCategoryItem>

          <DocsCategoryItem category="E">
            <UploadItem name="p_applicant_persons__0__E" isMultiple={true} subTitle="雇用契約書" />
          </DocsCategoryItem>
        </Stack>

        <Stack flex={1} spacing={4}>
          <DocsCategoryItem category="F">
            <UploadItem
              name="p_applicant_persons__0__F__01"
              isMultiple={true}
              subTitle="会社の決算報告書 または経営する親族の確定申告書（1期前）"
            />
            <UploadItem
              name="p_applicant_persons__0__F__02"
              isMultiple={true}
              subTitle="会社の決算報告書 または経営する親族の確定申告書（2期前）"
            />
            <UploadItem
              name="p_applicant_persons__0__F__03"
              isMultiple={true}
              subTitle="会社の決算報告書 または経営する親族の確定申告書（3期前）"
            />
          </DocsCategoryItem>

          <DocsCategoryItem category="G">
            <UploadItem name="G" isMultiple={true} subTitle="チラシ・パンフレット" />
          </DocsCategoryItem>

          <DocsCategoryItem category="H">
            <UploadItem
              name={isIncomeTotalizer ? 'p_applicant_persons__1__H__a' : 'p_applicant_persons__0__H__a'}
              subTitle="在留カード 〈表面〉"
            />
            <UploadItem
              name={isIncomeTotalizer ? 'p_applicant_persons__1__H__b' : 'p_applicant_persons__0__H__b'}
              subTitle="在留カード 〈裏面〉"
            />
          </DocsCategoryItem>

          <DocsCategoryItem category="I">
            {dynamicFields.map(
              (item) =>
                formik.values[item.name] &&
                formik.values[item.name].length > 0 && (
                  <UploadItem key={item.name} name={item.name} isMultiple={true} subTitle={item.subTitle} />
                )
            )}
          </DocsCategoryItem>

          <DocsCategoryItem category="J">
            <UploadItem name="J" />
          </DocsCategoryItem>

          <DocsCategoryItem category="K">
            <UploadItem name="K" />
          </DocsCategoryItem>

          <DocsCategoryItem category="S">
            <UploadItem name="S" />
          </DocsCategoryItem>
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
