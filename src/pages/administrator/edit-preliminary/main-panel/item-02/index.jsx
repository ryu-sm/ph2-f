import { Button, Stack, Typography } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';

import { formatJapanDate } from '@/utils';
import { useEffect, useMemo } from 'react';
import { AdEditInput, AdSelectRadios, DayPicker } from '@/components/administrator';
import { genderOptions, nationalityOptions, yearOptions } from './options';

import dayjs from 'dayjs';
import { useApUpdateApplyInfo } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR, PREFECTURES } from '@/constant';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';

export const Item02 = () => {
  const {
    preliminaryInfo: { p_application_headers, p_applicant_persons__0 },
  } = usePreliminaryContext();

  const initialValues = {
    p_applicant_persons__0: {
      last_name_kanji: p_applicant_persons__0.last_name_kanji,
      first_name_kanji: p_applicant_persons__0.first_name_kanji,
      last_name_kana: p_applicant_persons__0.last_name_kana,
      first_name_kana: p_applicant_persons__0.first_name_kana,
      gender: p_applicant_persons__0.gender,
      birthday: p_applicant_persons__0.birthday,
      nationality: p_applicant_persons__0.nationality,
      mobile_phone: p_applicant_persons__0.mobile_phone,
      home_phone: p_applicant_persons__0.home_phone,
      emergency_contact: p_applicant_persons__0.emergency_contact,
      postal_code: p_applicant_persons__0.postal_code,
      prefecture_kanji: p_applicant_persons__0.prefecture_kanji,
      city_kanji: p_applicant_persons__0.city_kanji,
      district_kanji: p_applicant_persons__0.district_kanji,
      other_address_kanji: p_applicant_persons__0.other_address_kanji,
      prefecture_kana: p_applicant_persons__0.prefecture_kana,
      city_kana: p_applicant_persons__0.city_kana,
      district_kana: p_applicant_persons__0.district_kana,
      other_address_kana: p_applicant_persons__0.other_address_kana,
      email: p_applicant_persons__0.email,
    },
  };
  const updateApply = useApUpdateApplyInfo();
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

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <Stack width={'100%'} marginTop={'16px'} height={'calc(100dvh - 320px)'}>
        <Stack width={'100%'} direction={'row'} justifyContent={'flex-end'}>
          <Button
            sx={{
              width: 200,
              padding: '6px 16px',
              bgcolor: 'secondary.main',
              color: 'white',
              boxShadow: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'secondary.main', opacity: 0.8 },
            }}
            onClick={formik.handleSubmit}
          >
            保存
          </Button>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          width={'100%'}
          borderBottom={'1px solid '}
          borderColor={'gray.100'}
        >
          <Typography
            variant="edit_content_title"
            sx={{ fontWeight: 500, color: 'gray.100', flex: 1, textAlign: 'center' }}
          >
            入力項目
          </Typography>
          <Typography
            variant="edit_content_title"
            sx={{ fontWeight: 500, color: 'gray.100', flex: 2, textAlign: 'center' }}
          >
            入力内容
          </Typography>
        </Stack>
        <Stack width={1} overflow={'auto'} pb={'10px'}>
          <EditRow label={'お名前（姓）'} isRequired error={formik.errors?.p_applicant_persons__0?.last_name_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.last_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.last_name_kanji
            )}
          </EditRow>
          <EditRow label={'お名前（名）'} isRequired error={formik.errors?.p_applicant_persons__0?.first_name_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.first_name_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.first_name_kanji
            )}
          </EditRow>
          <EditRow
            label={'お名前（姓）（フリガナ）'}
            isRequired
            error={formik.errors?.p_applicant_persons__0?.last_name_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.last_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.last_name_kana
            )}
          </EditRow>
          <EditRow
            label={'お名前（名）（フリガナ）'}
            isRequired
            error={formik.errors?.p_applicant_persons__0?.first_name_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.first_name_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.first_name_kana
            )}
          </EditRow>
          <EditRow
            label={'性別'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_applicant_persons__0?.gender}
          >
            {isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.gender" options={genderOptions} />
            ) : (
              genderOptions.find((item) => item.value === formik.values.p_applicant_persons__0.gender)?.label
            )}
          </EditRow>
          <EditRow
            label={'生年月日'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_applicant_persons__0?.birthday}
          >
            {isEditable ? (
              <DayPicker
                name="p_applicant_persons__0.birthday"
                minDate={dayjs().subtract(65, 'y')}
                maxDate={dayjs().subtract(18, 'y')}
              />
            ) : (
              formatJapanDate(formik.values.p_applicant_persons__0.birthday, true)
            )}
          </EditRow>
          <EditRow
            label={'現在の国籍'}
            hasPleft={isEditable}
            error={formik.errors?.p_applicant_persons__0?.nationality}
          >
            {isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.nationality" options={nationalityOptions} />
            ) : (
              nationalityOptions.find((item) => item.value === formik.values.p_applicant_persons__0.nationality)?.label
            )}
          </EditRow>
          <EditRow label={'電話番号携帯'} isLogicRequired error={formik.errors?.p_applicant_persons__0?.mobile_phone}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.mobile_phone" />
            ) : (
              formik.values.p_applicant_persons__0.mobile_phone
            )}
          </EditRow>
          <EditRow label={'電話番号自宅'} isLogicRequired error={formik.errors?.p_applicant_persons__0?.home_phone}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.home_phone" />
            ) : (
              formik.values.p_applicant_persons__0.home_phone
            )}
          </EditRow>
          <EditRow label={'緊急連絡先'} isAddendum error={formik.errors?.p_applicant_persons__0?.emergency_contact}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.emergency_contact" />
            ) : (
              formik.values.p_applicant_persons__0.emergency_contact
            )}
          </EditRow>
          <EditRow label={'郵便番号'} isRequired error={formik.errors?.p_applicant_persons__0?.postal_code}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.postal_code" />
            ) : (
              formik.values.p_applicant_persons__0.postal_code
            )}
          </EditRow>
          <EditRow
            label={'都道府県'}
            isRequired
            hasPleft={isEditable}
            error={formik.errors?.p_applicant_persons__0?.prefecture_kanji}
          >
            {isEditable ? (
              <AdSelectRadios name="p_applicant_persons__0.prefecture_kanji" options={PREFECTURES} />
            ) : (
              PREFECTURES.find((item) => item.value === formik.values.p_applicant_persons__0.prefecture_kanji)?.label
            )}
          </EditRow>
          <EditRow label={'市区郡'} isRequired error={formik.errors?.p_applicant_persons__0?.city_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.city_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.city_kanji
            )}
          </EditRow>
          <EditRow label={'町村丁目'} isRequired error={formik.errors?.p_applicant_persons__0?.district_kanji}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.district_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.district_kanji
            )}
          </EditRow>
          <EditRow
            label={'丁目以下・建物名・部屋番号'}
            isRequired
            error={formik.errors?.p_applicant_persons__0?.other_address_kanji}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.other_address_kanji" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.other_address_kanji
            )}
          </EditRow>
          <EditRow
            label={'都道府県（フリガナ）'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.prefecture_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.prefecture_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.prefecture_kana
            )}
          </EditRow>
          <EditRow
            label={'市区郡（フリガナ）'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.city_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.city_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.city_kana
            )}
          </EditRow>
          <EditRow
            label={'町村丁目（フリガナ）'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.district_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.district_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.district_kana
            )}
          </EditRow>
          <EditRow
            label={'丁目以下・建物名・部屋番号（フリガナ）'}
            isRequired
            isAddendum
            error={formik.errors?.p_applicant_persons__0?.other_address_kana}
          >
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.other_address_kana" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.other_address_kana
            )}
          </EditRow>
          <EditRow label={'ご連絡先用メールアドレス'} isRequired error={formik.errors?.p_applicant_persons__0?.email}>
            {isEditable ? (
              <AdEditInput name="p_applicant_persons__0.email" convertFullWidth />
            ) : (
              formik.values.p_applicant_persons__0.email
            )}
          </EditRow>
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
