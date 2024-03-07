import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_applicant_persons__0: yup.object({
    last_name_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    first_name_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    last_name_kana: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_FULL_ONLY_WIDTH),
    first_name_kana: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_FULL_ONLY_WIDTH),

    birthday: yup
      .string()
      .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .matches(REGEX.YMD, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .label('生年月日'),
    nationality: yup.string(),

    mobile_phone: yup.string().test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      return !!field_value || !!parent.home_phone;
    }),
    home_phone: yup.string().test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      return !!field_value || !!parent.mobile_phone;
    }),
    postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS),
    prefecture_kanji: yup
      .string()
      .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .max(8)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
      .label('都道府県'),
    city_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(20)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    district_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
    other_address_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
    email: yup.string().max(128).matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP).label('メールアドレス'),
  }),
});
