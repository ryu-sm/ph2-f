import { BANK_NOT_VALID_DAYS } from '@/configs';
import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';
import { isWeekend } from '@/utils';

export const validationSchema = yup.object({
  p_applicant_persons__0__last_name_kanji: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(48)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_applicant_persons__0__first_name_kanji: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(48)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_applicant_persons__0__last_name_kana: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(48)
    .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_FULL_ONLY_WIDTH),
  p_applicant_persons__0__first_name_kana: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(48)
    .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_FULL_ONLY_WIDTH),
  p_applicant_persons__0__gender: yup.string(),
  p_applicant_persons__0__birthday: yup
    .string()
    .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
    .matches(REGEX.YMD)
    .label('生年月日'),
  p_applicant_persons__0__nationality: yup.string(),
  p_applicant_persons__0__mobile_phone: yup
    .string()
    .test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      return !!field_value || !!parent.p_applicant_persons__0__home_phone;
    }),
  p_applicant_persons__0__home_phone: yup
    .string()
    .test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      return !!field_value || !!parent.p_applicant_persons__0__mobile_phone;
    }),
  p_applicant_persons__0__postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS),
  p_applicant_persons__0__prefecture_kanji: yup
    .string()
    .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
    .max(8)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
    .label('都道府県'),
  p_applicant_persons__0__city_kanji: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_applicant_persons__0__district_kanji: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(40)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
  p_applicant_persons__0__other_address_kanji: yup
    .string()
    .required(YUP_MESSAGES.REQUIRED)
    .max(99)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
  p_applicant_persons__0__email: yup
    .string()
    .max(128)
    .matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP)
    .label('メールアドレス'),
});
