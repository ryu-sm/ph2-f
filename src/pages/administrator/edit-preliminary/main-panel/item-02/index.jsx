import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { formatJapanDate } from '@/utils';
import { useEffect } from 'react';
import {
  AdEditFullWidthInput,
  AdPhoneInputField,
  AdSelectRadios,
  AdZipCodeInput,
  DayPicker,
} from '@/components/administrator';
import { genderOptions, nationalityOptions } from './options';
import { diffObj } from '@/utils';
import { PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { tab02Schema } from '../../fullSchema';
import dayjs from 'dayjs';

export const Item02 = () => {
  const {
    preliminaryInfo: { p_applicant_persons__0 },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_applicant_persons__0: {
      last_name_kanji: p_applicant_persons__0?.last_name_kanji,
      first_name_kanji: p_applicant_persons__0?.first_name_kanji,
      last_name_kana: p_applicant_persons__0?.last_name_kana,
      first_name_kana: p_applicant_persons__0?.first_name_kana,
      gender: p_applicant_persons__0?.gender,
      birthday: p_applicant_persons__0?.birthday,
      nationality: p_applicant_persons__0?.nationality,
      mobile_phone: p_applicant_persons__0?.mobile_phone,
      home_phone: p_applicant_persons__0?.home_phone,
      emergency_contact: p_applicant_persons__0?.emergency_contact,
      postal_code: p_applicant_persons__0?.postal_code,
      prefecture_kanji: p_applicant_persons__0?.prefecture_kanji,
      city_kanji: p_applicant_persons__0?.city_kanji,
      district_kanji: p_applicant_persons__0?.district_kanji,
      other_address_kanji: p_applicant_persons__0?.other_address_kanji,
      prefecture_kana: p_applicant_persons__0?.prefecture_kana,
      city_kana: p_applicant_persons__0?.city_kana,
      district_kana: p_applicant_persons__0?.district_kana,
      other_address_kana: p_applicant_persons__0?.other_address_kana,
      email: p_applicant_persons__0?.email,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__0: {
        ...diffObj(initialValues.p_applicant_persons__0, values.p_applicant_persons__0),
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: tab02Schema,
    validateOnChange: false,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await handleSave(setUpdateData(values));
    },
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_applicant_persons__0: {
          ...pre.p_applicant_persons__0,
          ...formik.values.p_applicant_persons__0,
        },
      };
    });
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup isEditable={isEditable} handleSave={formik.handleSubmit}>
        <EditRow
          label={'お名前（姓）'}
          upConfig={{
            key: `p_applicant_persons.last_name_kanji.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.last_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.last_name_kanji
            )
          }
        />
        <EditRow
          label={'お名前（名）'}
          upConfig={{
            key: `p_applicant_persons.first_name_kanji.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.first_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.first_name_kanji
            )
          }
        />
        <EditRow
          label={'お名前（姓）（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.last_name_kana.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.last_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.last_name_kana
            )
          }
        />
        <EditRow
          label={'お名前（名）（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.first_name_kana.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.first_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.first_name_kana
            )
          }
        />
        <EditRow
          label={'性別'}
          upConfig={{
            key: `p_applicant_persons.gender.${p_applicant_persons__0?.id}`,
            options: genderOptions,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.gender" options={genderOptions} />
            ) : (
              genderOptions.find((item) => item.value === formik.values.p_applicant_persons__0.gender)?.label
            )
          }
        />
        <EditRow
          label={'生年月日'}
          upConfig={{
            key: `p_applicant_persons.birthday.${p_applicant_persons__0?.id}`,
            formatJaDate: true,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <DayPicker
                name="p_applicant_persons__0.birthday"
                minDate={dayjs().subtract(65, 'y')}
                maxDate={dayjs().subtract(18, 'y')}
              />
            ) : (
              formatJapanDate(formik.values.p_applicant_persons__0.birthday, true)
            )
          }
        />
        <EditRow
          label={'現在の国籍'}
          upConfig={{
            key: `p_applicant_persons.nationality.${p_applicant_persons__0?.id}`,
            options: nationalityOptions,
          }}
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.nationality" options={nationalityOptions} />
            ) : (
              nationalityOptions.find((item) => item.value === formik.values.p_applicant_persons__0.nationality)?.label
            )
          }
        />
        <EditRow
          label={'電話番号携帯'}
          upConfig={{
            key: `p_applicant_persons.mobile_phone.${p_applicant_persons__0?.id}`,
          }}
          isLogicRequired
          field={
            isEditable ? (
              <AdPhoneInputField
                name="p_applicant_persons__0.mobile_phone"
                convertHalfWidth
                onBlur={() => formik.setFieldTouched('p_applicant_persons__0.home_phone', true)}
              />
            ) : (
              formik.values.p_applicant_persons__0.mobile_phone
            )
          }
        />
        <EditRow
          label={'電話番号自宅'}
          upConfig={{
            key: `p_applicant_persons.home_phone.${p_applicant_persons__0?.id}`,
          }}
          isLogicRequired
          field={
            isEditable ? (
              <AdPhoneInputField
                name="p_applicant_persons__0.home_phone"
                convertHalfWidth
                onBlur={() => formik.setFieldTouched('p_applicant_persons__0.mobile_phone', true)}
              />
            ) : (
              formik.values.p_applicant_persons__0.home_phone
            )
          }
        />
        <EditRow
          label={'緊急連絡先'}
          upConfig={{
            key: `p_applicant_persons.emergency_contact.${p_applicant_persons__0?.id}`,
          }}
          isAddendum
          field={
            isEditable ? (
              <AdPhoneInputField name="p_applicant_persons__0.emergency_contact" convertHalfWidth />
            ) : (
              formik.values.p_applicant_persons__0.emergency_contact
            )
          }
        />
        <EditRow
          label={'郵便番号'}
          upConfig={{
            key: `p_applicant_persons.postal_code.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdZipCodeInput
                name="p_applicant_persons__0.postal_code"
                setPrefectureKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.prefecture_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__0.prefecture_kanji', touched);
                }}
                setCityKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.city_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__0.city_kanji', touched);
                }}
                setDistrictKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.district_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__0.district_kanji', touched);
                }}
                setOtherAddressKanji={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.other_address_kanji', value);
                  formik.setFieldTouched('p_applicant_persons__0.other_address_kanji', touched);
                }}
                setPrefectureKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.prefecture_kana', value);
                  formik.setFieldTouched('p_applicant_persons__0.prefecture_kana', touched);
                }}
                setCityKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.city_kana', value);
                  formik.setFieldTouched('p_applicant_persons__0.city_kana', touched);
                }}
                setDistrictKana={(value, touched) => {
                  formik.setFieldValue('p_applicant_persons__0.district_kana', value);
                  formik.setFieldTouched('p_applicant_persons__0.district_kana', touched);
                }}
              />
            ) : (
              formik.values.p_applicant_persons__0.postal_code
            )
          }
        />
        <EditRow
          label={'都道府県'}
          upConfig={{
            key: `p_applicant_persons.prefecture_kanji.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          hasPleft={isEditable}
          field={
            isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.prefecture_kanji" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_applicant_persons__0.prefecture_kanji)?.label
            )
          }
        />
        <EditRow
          label={'市区郡'}
          upConfig={{
            key: `p_applicant_persons.city_kanji.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.city_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.city_kanji
            )
          }
        />
        <EditRow
          label={'町村丁目'}
          upConfig={{
            key: `p_applicant_persons.district_kanji.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.district_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.district_kanji
            )
          }
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号'}
          upConfig={{
            key: `p_applicant_persons.other_address_kanji.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.other_address_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.other_address_kanji
            )
          }
        />
        <EditRow
          label={'都道府県（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.prefecture_kana.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.prefecture_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.prefecture_kana
            )
          }
        />
        <EditRow
          label={'市区郡（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.city_kana.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.city_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.city_kana
            )
          }
        />
        <EditRow
          label={'町村丁目（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.district_kana.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.district_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.district_kana
            )
          }
        />
        <EditRow
          label={'丁目以下・建物名・部屋番号（フリガナ）'}
          upConfig={{
            key: `p_applicant_persons.other_address_kana.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          isAddendum
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.other_address_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.other_address_kana
            )
          }
        />
        <EditRow
          label={'ご連絡先用メールアドレス'}
          upConfig={{
            key: `p_applicant_persons.email.${p_applicant_persons__0?.id}`,
          }}
          isRequired
          field={
            isEditable ? (
              <AdEditFullWidthInput name="p_applicant_persons__0.email" />
            ) : (
              formik.values.p_applicant_persons__0.email
            )
          }
        />
      </ContentEditGroup>
    </FormikProvider>
  );
};
