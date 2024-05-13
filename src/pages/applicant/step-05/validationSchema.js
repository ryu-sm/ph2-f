import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_applicant_persons__1: yup.object({
    office_occupation: yup.string(),
    office_occupation_other: yup.string().test('option', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.office_occupation === '99') {
        return !!field_value;
      } else {
        return true;
      }
    }),
    office_industry: yup.string(),
    office_industry_other: yup.string().test('option', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.office_industry === '99') {
        return !!field_value;
      } else {
        return true;
      }
    }),
    office_occupation_detail: yup.string(),
    office_occupation_detail_other: yup.string().test('option', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.office_occupation_detail === '99') {
        return !!field_value;
      } else {
        return true;
      }
    }),
    office_name_kanji: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
    office_department: yup
      .string()
      .max(46)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),

    office_phone: yup.string(),

    office_postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS),

    office_prefecture_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    office_city_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
    office_district_kanji: yup.string().max(60).matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
    office_other_address_kanji: yup
      .string()
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),

    office_employee_num: yup.string(),

    office_joining_date: yup.string().matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
    last_year_income: yup.string(),
    p_applicant_persons__1__last_year_bonus_income: yup.string(),
    income_sources: yup.array(),
    tax_return: yup.string(),
    tax_return_reasons: yup
      .array()
      .test('option-required', YUP_MESSAGES.DROPDOWN_REQUIRED, (field_value, { parent }) => {
        if (parent.tax_return === '1') {
          return !!field_value?.length;
        } else {
          return true;
        }
      }),
    tax_return_reason_other: yup.string().test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.tax_return_reasons?.includes('99')) {
        return !!field_value;
      } else {
        return true;
      }
    }),
    transfer_office: yup.string(),
    transfer_office_name_kanji: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_name_kana: yup
      .string()
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_phone: yup.string().when('transfer_office', ([transfer_office], field) => {
      if (transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
    transfer_office_postal_code: yup
      .string()
      .matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_prefecture_kanji: yup
      .string()
      .max(20)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_city_kanji: yup
      .string()
      .max(20)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_district_kanji: yup
      .string()
      .max(60)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_other_address_kanji: yup
      .string()
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    maternity_paternity_leave: yup.string(),
    maternity_paternity_leave_start_date: yup
      .string()
      .when('maternity_paternity_leave', ([maternity_paternity_leave], field) => {
        if (!!maternity_paternity_leave) {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    maternity_paternity_leave_end_date: yup
      .string()
      .when('maternity_paternity_leave', ([maternity_paternity_leave], field) => {
        if (!!maternity_paternity_leave) {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    nursing_leave: yup.string(),
  }),
});
