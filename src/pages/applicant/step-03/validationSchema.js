import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_applicant_persons__0__office_occupation: yup.string(),
  p_applicant_persons__0__office_occupation_other: yup
    .string()
    .test('option', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.p_applicant_persons__0__office_occupation === '99') {
        return !!field_value;
      } else {
        return true;
      }
    }),
  p_applicant_persons__0__office_industry: yup.string(),
  p_applicant_persons__0__office_industry_other: yup
    .string()
    .test('option', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.p_applicant_persons__0__office_industry === '99') {
        return !!field_value;
      } else {
        return true;
      }
    }),
  p_applicant_persons__0__office_occupation_detail: yup.string(),
  p_applicant_persons__0__office_occupation_detail_other: yup
    .string()
    .test('option', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.p_applicant_persons__0__office_occupation_detail === '99') {
        return !!field_value;
      } else {
        return true;
      }
    }),
  p_applicant_persons__0__office_name_kanji: yup
    .string()
    .max(48)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),
  p_applicant_persons__0__office_department: yup
    .string()
    .max(46)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER),

  p_applicant_persons__0__office_phone: yup.string(),

  p_applicant_persons__0__office_postal_code: yup
    .string()
    .matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS),

  p_applicant_persons__0__office_prefecture_kanji: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_applicant_persons__0__office_city_kanji: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH),
  p_applicant_persons__0__office_district_kanji: yup
    .string()
    .max(40)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),
  p_applicant_persons__0__office_other_address_kanji: yup
    .string()
    .max(99)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI),

  p_applicant_persons__0__office_employee_num: yup.string(),

  p_applicant_persons__0__office_joining_date: yup.string().matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
  p_applicant_persons__0__last_year_income: yup.string(),
  p_applicant_persons__1__last_year_bonus_income: yup.string(),
  p_applicant_persons__0__income_sources: yup.array(),
  p_applicant_persons__0__tax_return: yup.string(),
  p_applicant_persons__0__tax_return_reasons: yup
    .array()
    .test('option-required', YUP_MESSAGES.DROPDOWN_REQUIRED, (field_value, { parent }) => {
      if (parent.p_applicant_persons__0__tax_return === '1') {
        return !!field_value?.length;
      } else {
        return true;
      }
    }),
  p_applicant_persons__0__tax_return_reason_other: yup
    .string()
    .test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
      if (parent.p_applicant_persons__0__tax_return_reasons?.includes('99')) {
        return !!field_value;
      } else {
        return true;
      }
    }),
  p_applicant_persons__0__transfer_office: yup.string(),
  p_applicant_persons__0__transfer_office_name_kanji: yup
    .string()
    .max(48)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_name_kana: yup
    .string()
    .max(48)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANA_FULL_WIDTH)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_phone: yup
    .string()
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_postal_code: yup
    .string()
    .matches(REGEX.ZIP_CODE, YUP_MESSAGES.ENTER_ZIPCODE_SEVEN_DIGITS)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_prefecture_kanji: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_city_kanji: yup
    .string()
    .max(20)
    .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_district_kanji: yup
    .string()
    .max(40)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__transfer_office_other_address_kanji: yup
    .string()
    .max(99)
    .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.ADDRESS_KANJI)
    .when('p_applicant_persons__0__transfer_office', ([p_applicant_persons__0__transfer_office], field) => {
      if (p_applicant_persons__0__transfer_office === '1') {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_applicant_persons__0__maternity_paternity_leave: yup.string(),
  p_applicant_persons__0__maternity_paternity_leave_start_date: yup
    .string()
    .when(
      'p_applicant_persons__0__maternity_paternity_leave',
      ([p_applicant_persons__0__maternity_paternity_leave], field) => {
        if (!!p_applicant_persons__0__maternity_paternity_leave) {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_applicant_persons__0__maternity_paternity_leave_end_date: yup
    .string()
    .when(
      'p_applicant_persons__0__maternity_paternity_leave',
      ([p_applicant_persons__0__maternity_paternity_leave], field) => {
        if (!!p_applicant_persons__0__maternity_paternity_leave) {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }
    ),
  p_applicant_persons__0__nursing_leave: yup.string(),
});
