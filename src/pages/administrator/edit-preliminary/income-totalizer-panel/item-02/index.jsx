import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { formatJapanDate } from '@/utils';
import { useEffect } from 'react';
import {
  AdEditFullWidthInput,
  AdEditInput,
  AdPhoneInputField,
  AdSelectRadios,
  AdZipCodeInput,
  DayPicker,
} from '@/components/administrator';
import { genderOptions, nationalityOptions, relToApplicantAOptions } from './options';
import { diffObj } from '@/utils';
import { PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab02SchemaI } from '../../fullSchema';
import dayjs from 'dayjs';
import { infoGroupTabAtom } from '@/store';
import { useSetRecoilState } from 'recoil';

export const Item02 = () => {
  const setInfoGroupTab = useSetRecoilState(infoGroupTabAtom);
  const {
    preliminaryInfo: { p_application_headers, p_applicant_persons__1 },
    preliminarySnap: { changeJoinGuarantor, changeToIncomeTotalizer },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_applicant_persons__1: {
      last_name_kanji: p_applicant_persons__1?.last_name_kanji,
      first_name_kanji: p_applicant_persons__1?.first_name_kanji,
      last_name_kana: p_applicant_persons__1?.last_name_kana,
      first_name_kana: p_applicant_persons__1?.first_name_kana,
      gender: p_applicant_persons__1?.gender,
      birthday: p_applicant_persons__1?.birthday,
      nationality: p_applicant_persons__1?.nationality,
      mobile_phone: p_applicant_persons__1?.mobile_phone,
      home_phone: p_applicant_persons__1?.home_phone,
      emergency_contact: p_applicant_persons__1?.emergency_contact,
      postal_code: p_applicant_persons__1?.postal_code,
      prefecture_kanji: p_applicant_persons__1?.prefecture_kanji,
      city_kanji: p_applicant_persons__1?.city_kanji,
      district_kanji: p_applicant_persons__1?.district_kanji,
      other_address_kanji: p_applicant_persons__1?.other_address_kanji,
      prefecture_kana: p_applicant_persons__1?.prefecture_kana,
      city_kana: p_applicant_persons__1?.city_kana,
      district_kana: p_applicant_persons__1?.district_kana,
      other_address_kana: p_applicant_persons__1?.other_address_kana,
      email: p_applicant_persons__1?.email,
      rel_to_applicant_a_name: p_applicant_persons__1?.rel_to_applicant_a_name,
      rel_to_applicant_a: p_applicant_persons__1?.rel_to_applicant_a,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__1: {
        ...diffObj(initialValues.p_applicant_persons__1, values.p_applicant_persons__1),
      },
      p_application_headers: {
        loan_type: p_application_headers?.loan_type,
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab02SchemaI,
    // validateOnMount: changeToIncomeTotalizer,
    // enableReinitialize: true,
    onSubmit: async (values) => {
      if (changeToIncomeTotalizer) {
        setInfoGroupTab(3);
      } else {
        handleSave(setUpdateData(values));
      }
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

  useEffect(() => {
    formik.validateForm();
    console.log(formik.values);
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'お名前（姓）'}
          upConfig={{
            key: `p_applicant_persons.last_name_kanji.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.last_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.last_name_kanji
            )
          }
        />
        <EditRow
          label={'お名前（名）'}
          upConfig={{
            key: `p_applicant_persons.first_name_kanji.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.first_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.first_name_kanji
            )
          }
        />
        <EditRow
          label={'お名前（姓）（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.last_name_kana.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.last_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.last_name_kana
            )
          }
        />
        <EditRow
          label={'お名前（名）（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.first_name_kana.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.first_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.first_name_kana
            )
          }
        />

        <EditRow
          label={'性別'}
          upConfig={{
            key: `p_applicant_persons.gender.${p_applicant_persons__1?.id}`,
            options: genderOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.gender" options={genderOptions} />
            ) : (
              genderOptions.find((item) => item.value === formik.values.p_applicant_persons__1.gender)?.label
            )
          }
        />

        <EditRow
          label={'続柄'}
          upConfig={{
            key: `p_applicant_persons.rel_to_applicant_a_name.${p_applicant_persons__1?.id}`,
          }}
          isLogicRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.rel_to_applicant_a_name" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.rel_to_applicant_a_name
            )
          }
          subField={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.rel_to_applicant_a" options={relToApplicantAOptions} />
            ) : (
              relToApplicantAOptions.find(
                (item) => item.value === formik.values.p_applicant_persons__1.rel_to_applicant_a_name
              )?.label
            )
          }
        />

        <EditRow
          label={'現在の国籍'}
          upConfig={{
            key: `p_applicant_persons.nationality.${p_applicant_persons__1?.id}`,
            options: nationalityOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.nationality" options={nationalityOptions} />
            ) : (
              nationalityOptions.find((item) => item.value === formik.values.p_applicant_persons__1.nationality)?.label
            )
          }
        />
        <EditRow
          label={'電話番号携帯'}
          upConfig={{
            key: `p_applicant_persons.mobile_phone.${p_applicant_persons__1?.id}`,
          }}
          isLogicRequired
          field={
            isEditable ? (
              <AdPhoneInputField name="p_applicant_persons__1.mobile_phone" convertHalfWidth />
            ) : (
              formik.values.p_applicant_persons__1.mobile_phone
            )
          }
        />
        <EditRow
          label={'電話番号自宅'}
          upConfig={{
            key: `p_applicant_persons.home_phone.${p_applicant_persons__1?.id}`,
          }}
          isLogicRequired
          field={
            isEditable ? (
              <AdPhoneInputField name="p_applicant_persons__1.home_phone" convertHalfWidth />
            ) : (
              formik.values.p_applicant_persons__1.home_phone
            )
          }
        />
        <EditRow
          label={'緊急連絡先'}
          upConfig={{
            key: `p_applicant_persons.emergency_contact.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdPhoneInputField name="p_applicant_persons__1.emergency_contact" convertHalfWidth />
            ) : (
              formik.values.p_applicant_persons__1.emergency_contact
            )
          }
        />
        <EditRow
          label={'生年月日'}
          upConfig={{
            key: `p_applicant_persons.birthday.${p_applicant_persons__1?.id}`,
            formatJaDate: true,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <DayPicker
                name="p_applicant_persons__1.birthday"
                minDate={dayjs().subtract(65, 'y')}
                maxDate={dayjs().subtract(18, 'y')}
              />
            ) : (
              formatJapanDate(formik.values.p_applicant_persons__1.birthday, true)
            )
          }
        />
        <EditRow
          label={'郵便番号'}
          upConfig={{
            key: `p_applicant_persons.postal_code.${p_applicant_persons__1?.id}`,
          }}
          field={
            isEditable ? (
              <AdZipCodeInput
                name="p_applicant_persons__1.postal_code"
                setPrefectureKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.prefecture_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.prefecture_kanji', touched);
                }}
                setCityKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.city_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.city_kanji', touched);
                }}
                setDistrictKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.district_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.district_kanji', touched);
                }}
                setOtherAddressKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.other_address_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__1.other_address_kanji', touched);
                }}
                setPrefectureKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.prefecture_kana', value);
                  formik.setFieldTouched('p_applicant_persons__1.prefecture_kana', touched);
                }}
                setCityKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.city_kana', value);
                  formik.setFieldTouched('p_applicant_persons__1.city_kana', touched);
                }}
                setDistrictKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__1.district_kana', value);
                  formik.setFieldTouched('p_applicant_persons__1.district_kana', touched);
                }}
              />
            ) : (
              formik.values.p_applicant_persons__1.postal_code
            )
          }
        />
        <EditRow
          label={'都道府県'}
          upConfig={{
            key: `p_applicant_persons.prefecture_kanji.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__1.prefecture_kanji" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_applicant_persons__1.prefecture_kanji)?.label
            )
          }
        />
        <EditRow
          label={'市区郡'}
          upConfig={{
            key: `p_applicant_persons.city_kanji.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.city_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.city_kanji
            )
          }
        />
        <EditRow
          label={'町村丁目'}
          upConfig={{
            key: `p_applicant_persons.district_kanji.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.district_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.district_kanji
            )
          }
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号'}
          upConfig={{
            key: `p_applicant_persons.other_address_kanji.${p_applicant_persons__1?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.other_address_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.other_address_kanji
            )
          }
        />
        <EditRow
          label={'都道府県（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.prefecture_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.prefecture_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.prefecture_kana
            )
          }
        />
        <EditRow
          label={'市区郡（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.city_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.city_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.city_kana
            )
          }
        />
        <EditRow
          label={'町村丁目（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.district_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.district_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.district_kana
            )
          }
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.other_address_kana.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.other_address_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__1.other_address_kana
            )
          }
        />
        <EditRow
          label={'ご連絡先用メールアドレス'}
          upConfig={{
            key: `p_applicant_persons.email.${p_applicant_persons__1?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__1.email" />
            ) : (
              formik.values.p_applicant_persons__1.email
            )
          }
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
