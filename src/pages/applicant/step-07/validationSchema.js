import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  isMCJ: yup.boolean(),
  p_application_headers: yup.object({
    curr_house_lived_year: yup.string(),
    curr_house_lived_month: yup.string(),
    curr_house_residence_type: yup.string(),
    curr_house_floor_area: yup.string(),
    curr_house_owner_name: yup
      .string()
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
      .when('curr_house_residence_type', ([curr_house_residence_type], field) => {
        if (curr_house_residence_type === '4') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    curr_house_owner_rel: yup
      .string()
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
      .when('curr_house_residence_type', ([curr_house_residence_type], field) => {
        if (curr_house_residence_type === '4') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    curr_house_schedule_disposal_type: yup
      .string()
      .when('curr_house_residence_type', ([curr_house_residence_type], field) => {
        if (curr_house_residence_type === '5') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    curr_house_schedule_disposal_type_other: yup
      .string()
      .when('curr_house_schedule_disposal_type', ([curr_house_schedule_disposal_type], field) => {
        if (curr_house_schedule_disposal_type === '99') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    curr_house_shell_scheduled_date: yup.string().matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
    curr_house_shell_scheduled_price: yup
      .string()
      .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value) => {
        if (!field_value) return true;
        return Number(field_value) % 10 === 0;
      }),
    curr_house_loan_balance_type: yup
      .string()
      .when('curr_house_residence_type', ([curr_house_residence_type], field) => {
        if (curr_house_residence_type === '5') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    property_publish_url: yup.string().max(255).matches(REGEX.URL, YUP_MESSAGES.URL_INVALID),
    new_house_acquire_reason: yup.string(),
    new_house_acquire_reason_other: yup.string(),
    new_house_self_resident: yup.string(),
    new_house_self_not_resident_reason: yup
      .string()
      .when('new_house_self_resident', ([new_house_self_resident], field) => {
        if (new_house_self_resident === '0') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    property_business_type: yup.array().of(yup.string()),
    property_prefecture: yup.string(),
    property_city: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    property_district: yup
      .string()
      .max(20)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
    property_apartment_and_room_no: yup
      .string()
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),

    new_house_planned_resident_overview: yup.object({
      others_umu: yup.boolean(),

      others_rel: yup.string().when('others_umu', ([others_umu], field) => {
        if (others_umu) {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    }),
    property_flat_35_plan: yup.string(),
    property_maintenance_type: yup.string(),
    property_flat_35_tech: yup
      .string()
      .test(
        'logic',
        '「Aプラン＋長期優良住宅」を選択の場合は「耐久性・可変性」をご選択ください。',
        (field_value, { options: { context } }) => {
          if (
            context.p_application_headers.property_flat_35_plan === '2' &&
            context.p_application_headers.property_maintenance_type === '1'
          ) {
            return field_value === '4';
          }
          return true;
        }
      ),
  }),
  p_residents: yup.array(
    yup.object({
      last_name_kanji: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
      last_name_kanji: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
      last_name_kana: yup
        .string()
        .required()
        .max(48)
        .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
      first_name_kana: yup
        .string()
        .required()
        .max(48)
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
    })
  ),
});
