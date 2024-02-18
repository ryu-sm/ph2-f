import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_application_headers__curr_house_lived_year: yup.string(),
  p_application_headers__curr_house_lived_month: yup.string(),
  p_application_headers__curr_house_residence_type: yup.string(),
  p_application_headers__curr_house_floor_area: yup.string(),
  p_application_headers__curr_house_owner_name: yup
    .string()
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '4') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_owner_rel: yup
    .string()
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '4') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_schedule_disposal_type: yup
    .string()
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '5') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_schedule_disposal_type_other: yup
    .string()
    .when(
      'p_application_headers__curr_house_schedule_disposal_type',
      ([p_application_headers__curr_house_schedule_disposal_type], field) => {
        if (p_application_headers__curr_house_schedule_disposal_type === '99') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_shell_scheduled_date: yup
    .string()
    .matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
  p_application_headers__curr_house_shell_scheduled_price: yup
    .string()
    .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value) => {
      if (!field_value) return true;
      return Number(field_value) % 10 === 0;
    }),
  p_application_headers__curr_house_loan_balance_type: yup
    .string()
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '5') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__property_publish_url: yup.string().max(255).matches(REGEX.URL, YUP_MESSAGES.URL_INVALID),
  p_application_headers__new_house_acquire_reason: yup.string(),
  p_application_headers__new_house_acquire_reason_other: yup.string(),
  p_application_headers__new_house_self_resident: yup.string(),
  p_application_headers__new_house_self_not_resident_reason: yup
    .string()
    .when(
      'p_application_headers__new_house_self_resident',
      ([p_application_headers__new_house_self_resident], field) => {
        if (p_application_headers__new_house_self_resident === '0') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__property_business_type: yup.array().of(yup.string()),
  p_application_headers__property_prefecture: yup.string(),
  p_application_headers__property_city: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_application_headers__property_district: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
  p_application_headers__property_apartment_and_room_no: yup
    .string()
    .max(40)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
});

export const validationSchemaMcj = yup.object({
  p_application_headers__curr_house_lived_year: yup.string(),
  p_application_headers__curr_house_lived_month: yup.string(),
  p_application_headers__curr_house_residence_type: yup.string(),
  p_application_headers__curr_house_floor_area: yup.string(),
  p_application_headers__curr_house_owner_name: yup
    .string()
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '4') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_owner_rel: yup
    .string()
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '4') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_schedule_disposal_type: yup
    .string()
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '5') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_schedule_disposal_type_other: yup
    .string()
    .when(
      'p_application_headers__curr_house_schedule_disposal_type',
      ([p_application_headers__curr_house_schedule_disposal_type], field) => {
        if (p_application_headers__curr_house_schedule_disposal_type === '99') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__curr_house_shell_scheduled_date: yup
    .string()
    .matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
  p_application_headers__curr_house_shell_scheduled_price: yup
    .string()
    .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value) => {
      if (!field_value) return true;
      return Number(field_value) % 10 === 0;
    }),
  p_application_headers__curr_house_loan_balance_type: yup
    .string()
    .when(
      'p_application_headers__curr_house_residence_type',
      ([p_application_headers__curr_house_residence_type], field) => {
        if (p_application_headers__curr_house_residence_type === '5') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__property_publish_url: yup.string().max(255).matches(REGEX.URL, YUP_MESSAGES.URL_INVALID),
  p_application_headers__new_house_acquire_reason: yup.string(),
  p_application_headers__new_house_acquire_reason_other: yup.string(),
  p_application_headers__new_house_self_resident: yup.string(),
  p_application_headers__new_house_self_not_resident_reason: yup
    .string()
    .when(
      'p_application_headers__new_house_self_resident',
      ([p_application_headers__new_house_self_resident], field) => {
        if (p_application_headers__new_house_self_resident === '0') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_application_headers__property_business_type: yup.array().of(yup.string()),
  p_application_headers__property_prefecture: yup.string(),
  p_application_headers__property_city: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_application_headers__property_district: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
  p_application_headers__property_apartment_and_room_no: yup
    .string()
    .max(40)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
  p_residents: yup.object({
    last_name_kanji: yup.string().trim().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    last_name_kanji: yup.string().trim().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    last_name_kana: yup
      .string()
      .max(48)
      .required()
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    first_name_kana: yup
      .string()
      .max(48)
      .required()
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    rel_to_applicant_a_name: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    nationality: yup.string(),
    birthday: yup.string().matches(REGEX.YMD, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
    loan_from_japan_house_finance_agency: yup.string(),
    contact_phone: yup.string(),
    postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS),
    prefecture_kanji: yup.string().max(8).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    city_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    district_kanji: yup.string().max(40).matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
    other_address_kanji: yup.string().max(99).matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
  }),
});
