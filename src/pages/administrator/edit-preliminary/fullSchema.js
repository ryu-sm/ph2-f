import { BANK_NOT_VALID_DAYS } from '@/configs';
import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup, dayjs } from '@/libs';
import { isWeekend } from '@/utils';

export const tab01Schema = yup.object({
  p_application_headers: yup.object({
    created_at: yup.string(),
    pair_loan_last_name: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
      .label('お名前 姓'),
    pair_loan_first_name: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
      .label('お名前 名'),
    pair_loan_rel_name: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.SP_KANJI_FULL_WIDTH)
      .label('続柄'),
    move_scheduled_date: yup
      .string()
      .matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .test(
        'MONTH_AFTER_LOAN_DESIRED_BORROWING_DATE',
        YUP_MESSAGES.PLEASE_SELECT_MONTH_AFTER_LOAN_DESIRED_BORROWING_DATE,
        (field_value, { options: { context } }) => {
          if (!!field_value && !!context) {
            return dayjs(field_value).isSameOrAfter(
              dayjs(context.p_borrowing_details__1?.desired_borrowing_date || undefined),
              'month'
            );
          }
          return true;
        }
      )
      .label('入居予定年月'),
    loan_target: yup
      .string()
      .required('お借入の目的で「物件の購入・建築」を選択する時は、資金の使いみちを選択する必要があります。'),
    land_advance_plan: yup
      .string()
      .when('loan_target', ([loan_target], field) =>
        loan_target === '6'
          ? field.required(
              '資金の使いみちで「土地を購入後に建物新築」を選択する場合、土地先行プラン希望有無は必須項目になりますので、ご選択ください。'
            )
          : field
      ),
    loan_type: yup.string(),
  }),
  // 借入详细
  p_borrowing_details__1: yup.object({
    desired_borrowing_date: yup
      .string()
      .test('not-available-days', YUP_MESSAGES.PLEASE_SELECT_BANK_BUSINESS_DAY, async (field_value) => {
        if (!field_value) return true;
        const [year, month, day] = field_value.split('/');

        if (isWeekend(field_value) || BANK_NOT_VALID_DAYS.includes(`${month}/${day}`)) {
          return false;
        }
        try {
          const publicHolidays = JSON.parse(localStorage.getItem('publicHolidays'))[year];
          if (publicHolidays.find((o) => o.date === `${year}-${month}-${day}`)) {
            return false;
          } else {
            return true;
          }
        } catch (error) {
          return true;
        }
      })
      .test(
        'DESIRED_LOAN_DATE_MUST_BE_MORE_THAN_APPLICATION_DATE',
        YUP_MESSAGES.DESIRED_LOAN_DATE_MUST_BE_MORE_THAN_APPLICATION_DATE,
        (field_value, { options: { context } }) => {
          if (!!field_value && !!context) {
            if (field_value === context.p_borrowing_details__1) {
              return dayjs(value).isAfter(dayjs(context.p_application_headers.created_at), 'date');
            }
            return true;
          }
          return true;
        }
      )
      .matches(REGEX.YMD, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .label('お借入希望日'),
    desired_loan_amount: yup
      .string()
      .required()
      .test(
        'loan_amount_self',
        YUP_MESSAGES.ABOUT_TEMPORARY_DESIRED_LOAN_AMOUNT,
        (field_value, { options: { context } }) => {
          if (context.p_application_headers.land_advance_plan !== '1') {
            return 500 <= Number(field_value) && Number(field_value) <= 20000;
          }
          return true;
        }
      )
      .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value) => Number(field_value) % 10 === 0)
      .test(
        'loan_amount_with_two',
        YUP_MESSAGES.TEMPORARY_DESIRED_LOAN_AMOUNT,
        (field_value, { options: { context } }) => {
          if (
            context.p_application_headers.land_advance_plan === '1' &&
            !!context.p_borrowing_details__2.desired_loan_amount
          ) {
            return (
              500 <= Number(field_value) + Number(context.p_borrowing_details__2.desired_loan_amount) &&
              Number(field_value) + Number(context.p_borrowing_details__2.desired_loan_amount) <= 20000
            );
          }
          return true;
        }
      )
      .label('お借入希望額'),

    bonus_repayment_amount: yup
      .string()
      .test('zero_check', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
        if (parent.bonus_repayment_month !== '1') {
          return Number(field_value) > 0;
        } else {
          return true;
        }
      })
      .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value) => {
        if (!!field_value) {
          return Number(field_value) % 10 === 0;
        } else {
          return true;
        }
      })
      .test('test-temporary-desired-loan-amount', YUP_MESSAGES.DESIRED_LOAN_AMOUNT_HALF, (field_value, { parent }) => {
        if (!parent.desired_loan_amount || !field_value) return true;
        return Number(field_value) <= Number(parent.desired_loan_amount) / 2;
      }),
    loan_term_year: yup.string().required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('お借入期間'),
    repayment_method: yup.string().required(YUP_MESSAGES.RADIO_REQUIRED),
  }),
  p_borrowing_details__2: yup.object({
    desired_borrowing_date: yup
      .string()
      .test('not-available-days', YUP_MESSAGES.PLEASE_SELECT_BANK_BUSINESS_DAY, async (field_value) => {
        if (!field_value) return true;
        const [year, month, day] = field_value.split('/');

        if (isWeekend(field_value) || BANK_NOT_VALID_DAYS.includes(`${month}/${day}`)) {
          return false;
        }
        try {
          const publicHolidays = JSON.parse(localStorage.getItem('publicHolidays'))[year];
          if (publicHolidays.find((o) => o.date === `${year}-${month}-${day}`)) {
            return false;
          } else {
            return true;
          }
        } catch (error) {
          return true;
        }
      })
      .matches(REGEX.YMD, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .label('お借入希望日'),
    desired_loan_amount: yup
      .string()
      .test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { options: { context } }) => {
        if (context.p_application_headers.land_advance_plan === '1') {
          return !!field_value;
        } else {
          return true;
        }
      })
      .test(
        'loan_amount_self',
        YUP_MESSAGES.ABOUT_TEMPORARY_DESIRED_LOAN_AMOUNT,
        (field_value, { options: { context } }) => {
          if (context.p_application_headers.land_advance_plan === '1') {
            return 500 <= Number(field_value) && Number(field_value) <= 20000;
          } else {
            return true;
          }
        }
      )
      .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value, { options: { context } }) => {
        if (context.p_application_headers.land_advance_plan === '1' && !!field_value) {
          return Number(field_value) % 10 === 0;
        } else {
          return true;
        }
      })
      .test(
        'loan_amount_with_two',
        YUP_MESSAGES.TEMPORARY_DESIRED_LOAN_AMOUNT,
        (field_value, { options: { context } }) => {
          if (
            context.p_application_headers.land_advance_plan === '1' &&
            !!context.p_borrowing_details__1.desired_loan_amount
          ) {
            return (
              500 <= Number(field_value) + Number(context.p_borrowing_details__1.desired_loan_amount) &&
              Number(field_value) + Number(context.p_borrowing_details__1.desired_loan_amount) <= 20000
            );
          } else {
            return true;
          }
        }
      )
      .label('お借入希望額'),
    bonus_repayment_amount: yup
      .string()
      .test('divisible-by-10', YUP_MESSAGES.ENTER_UNITS_100000YEN, (field_value, { options: { context } }) => {
        if (context.p_application_headers.land_advance_plan === '1' && !!field_value) {
          return Number(field_value) % 10 === 0;
        } else {
          return true;
        }
      })
      .test('test-temporary-desired-loan-amount', YUP_MESSAGES.DESIRED_LOAN_AMOUNT_HALF, (field_value, { parent }) => {
        if (!parent.desired_loan_amount || !field_value) return true;
        return Number(field_value) <= Number(parent.desired_loan_amount) / 2;
      }),
  }),
});

export const tab02Schema = yup.object({
  p_applicant_persons__0: yup.object({
    last_name_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    first_name_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    last_name_kana: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    first_name_kana: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),

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
    postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE),
    prefecture_kanji: yup
      .string()
      .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .max(8)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
      .label('都道府県'),
    city_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(20)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    district_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    other_address_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),

    prefecture_kana: yup
      .string()
      .max(8)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    city_kana: yup.string().max(20).matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    district_kana: yup
      .string()
      .max(30)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),
    other_address_kana: yup
      .string()
      .max(138)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),

    email: yup.string().max(128).matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP).label('メールアドレス'),
  }),
});

export const tab03Schema = yup.object({
  p_applicant_persons__0: yup.object({
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
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    office_name_kana: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),
    office_department: yup
      .string()
      .max(46)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),

    office_phone: yup.string(),

    office_postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE),

    office_prefecture_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    office_city_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    office_district_kanji: yup
      .string()
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    office_other_address_kanji: yup
      .string()
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),

    office_prefecture_kana: yup
      .string()
      .max(8)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    office_city_kana: yup
      .string()
      .max(20)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    office_district_kana: yup
      .string()
      .max(30)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),
    office_other_address_kana: yup
      .string()
      .max(138)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),

    office_employee_num: yup.string(),

    office_joining_date: yup.string().matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),

    last_year_income: yup.string(),
    before_last_year_bonus_income: yup.string(),
    last_year_bonus_income: yup.string(),
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
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER)
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
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER)
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
      .matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE)
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
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
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
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_district_kanji: yup
      .string()
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER)
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
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER)
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

export const tab04Schema = yup.object({
  p_join_guarantors: yup.array(
    yup.object({
      last_name_kanji: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(48)
        .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      first_name_kanji: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(48)
        .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      last_name_kana: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(48)
        .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
      first_name_kana: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(48)
        .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
      gender: yup.string(),
      rel_to_applicant_a_name: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      rel_to_applicant_a: yup.string(),
      rel_to_applicant_a_other: yup.string(),
      birthday: yup.string().required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('生年月日'),
      mobile_phone: yup.string().test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
        return !!field_value || !!parent.home_phone;
      }),
      home_phone: yup.string().test('option-required', YUP_MESSAGES.REQUIRED, (field_value, { parent }) => {
        return !!field_value || !!parent.mobile_phone;
      }),
      emergency_contact: yup.string(),

      postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE),
      prefecture_kanji: yup
        .string()
        .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
        .max(8)
        .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
        .label('都道府県'),
      city_kanji: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(20)
        .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      district_kanji: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(40)
        .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
      other_address_kanji: yup
        .string()
        .required(YUP_MESSAGES.REQUIRED)
        .max(99)
        .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
      email: yup.string(),
    })
  ),
});

export const tab05Schema = yup.object({
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
  }),
  p_residents: yup.array(
    yup.object({
      last_name_kanji: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      last_name_kanji: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
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
      rel_to_applicant_a_name: yup.string().max(48).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      nationality: yup.string(),
      birthday: yup.string().matches(REGEX.YMD, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),
      loan_from_japan_house_finance_agency: yup.string(),
      contact_phone: yup.string(),
      postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE),
      prefecture_kanji: yup.string().max(8).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      city_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
      district_kanji: yup
        .string()
        .max(40)
        .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
      other_address_kanji: yup
        .string()
        .max(99)
        .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    })
  ),
});

export const tab06Schema = yup.object({
  isMCJ: yup.boolean(),
  hasIncomeTotalizer: yup.boolean(),
  p_borrowings: yup.array(
    yup.object({
      borrower: yup.string().test(
        'option-required',
        YUP_MESSAGES.RADIO_REQUIRED,
        (
          field_value,
          {
            options: {
              context: { hasIncomeTotalizer },
            },
          }
        ) => {
          if (hasIncomeTotalizer) {
            return !!field_value;
          } else {
            return true;
          }
        }
      ),
      type: yup
        .string()
        .when('self_input', ([self_input], field) => {
          if (self_input === '1') {
            return field.required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED);
          } else {
            return field;
          }
        })
        .label('お借入の種類'),
      lender: yup
        .string()
        .max(40)
        .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.SP_KANJI_FULL_WIDTH_HAVE_NUMBER)
        .when('self_input', ([self_input], field) => {
          if (self_input === '1') {
            return field.required(YUP_MESSAGES.REQUIRED);
          } else {
            return field;
          }
        }),
      borrowing_from_house_finance_agency: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '1') {
          return field.required(YUP_MESSAGES.RADIO_REQUIRED);
        } else {
          return field;
        }
      }),
      loan_start_date: yup
        .string()
        .matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
        .when('self_input', ([self_input], field) => {
          if (self_input === '1') {
            return field.required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED);
          } else {
            return field;
          }
        })
        .when('type', ([type], field) => {
          if (type === '2') {
            return field.label('当初カード契約年月');
          } else {
            return field.label('当初借入年月');
          }
        }),
      loan_amount: yup.string().when('self_input', ([self_input], field) => {
        if (self_input === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
      curr_loan_balance_amount: yup.string().when('self_input', ([self_input], field) => {
        if (self_input === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
      annual_repayment_amount: yup.string().when('self_input', ([self_input], field) => {
        if (self_input === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),

      loan_end_date: yup
        .string()
        .matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
        .when(['self_input', 'type'], ([self_input, type], field) => {
          if (self_input === '1' && type !== '2') {
            return field.required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED);
          } else {
            return field;
          }
        })
        .when('type', ([type], field) => {
          if (type === '2') {
            return field.label('最終期限');
          } else {
            return field.label('最終返済年月');
          }
        }),
      scheduled_loan_payoff: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type !== '4') {
          return field.required(YUP_MESSAGES.RADIO_REQUIRED);
        } else {
          return field;
        }
      }),
      loan_business_target: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '4') {
          return field.required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('お借入の目的');
        } else {
          return field;
        }
      }),
      loan_business_target_other: yup.string().when('loan_business_target', ([loan_business_target], field) => {
        if (loan_business_target === '99') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),

      loan_purpose: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '2') {
          return field.required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('お借入の目的');
        } else {
          return field;
        }
      }),
      loan_purpose_other: yup.string().when('loan_purpose', ([loan_purpose], field) => {
        if (loan_purpose === '99') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
      category: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '2') {
          return field.required(YUP_MESSAGES.RADIO_REQUIRED);
        } else {
          return field;
        }
      }),

      card_expiry_date: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '2') {
          return field.required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('カード有効期限');
        } else {
          return field;
        }
      }),
      rental_room_num: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '3') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
      common_housing: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type === '3') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),

      estate_setting: yup.string().when(['self_input', 'type'], ([self_input, type], field) => {
        if (self_input === '1' && type !== '1' && type !== '2') {
          return field.required(YUP_MESSAGES.RADIO_REQUIRED);
        } else {
          return field;
        }
      }),
    })
  ),
  p_application_headers: yup.object({
    curr_borrowing_status: yup.string(),

    refund_source_type: yup.array().test(
      'option-required',
      YUP_MESSAGES.RADIO_REQUIRED,
      (
        field_vale,
        {
          options: {
            context: { isMCJ, p_borrowings },
          },
        }
      ) => {
        if (isMCJ) {
          if (p_borrowings?.some((item) => item.scheduled_loan_payoff === '1')) {
            return !!field_vale.length;
          }
          return true;
        } else {
          return true;
        }
      }
    ),
    refund_source_type_other: yup.string().when('refund_source_type', ([refund_source_type], field) => {
      if (refund_source_type.includes('99')) {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),

    refund_source_content: yup.string(),
    refund_source_amount: yup.string(),
    rent_to_be_paid_land: yup.string(),
    rent_to_be_paid_land_borrower: yup.string().when('rent_to_be_paid_land', ([rent_to_be_paid_land], field) => {
      if (!!rent_to_be_paid_land) {
        return field.required(YUP_MESSAGES.RADIO_REQUIRED);
      } else {
        return field;
      }
    }),
    rent_to_be_paid_house: yup.string(),
    rent_to_be_paid_house_borrower: yup.string().when('rent_to_be_paid_house', ([rent_to_be_paid_house], field) => {
      if (!!rent_to_be_paid_house) {
        return field.required(YUP_MESSAGES.RADIO_REQUIRED);
      } else {
        return field;
      }
    }),
  }),
});

export const tab07Schema = yup.object({
  p_application_headers: yup.object({
    required_funds_land_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_house_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_accessory_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_upgrade_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_refinance_loan_balance: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_additional_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_loan_plus_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    required_funds_total_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_saving_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_estate_sale_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_other_saving_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_relative_donation_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_loan_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_pair_loan_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_other_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
    funding_other_amount_detail: yup.string().when('funding_other_amount', ([funding_other_amount], field) => {
      if (Number(funding_other_amount) > 0) {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
    funding_total_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  }),
});

export const tab02SchemaI = yup.object({
  p_applicant_persons__1: yup.object({
    last_name_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    first_name_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    last_name_kana: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    first_name_kana: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(48)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),

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
    postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE),
    prefecture_kanji: yup
      .string()
      .required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED)
      .max(8)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
      .label('都道府県'),
    city_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(20)
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    district_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    other_address_kanji: yup
      .string()
      .required(YUP_MESSAGES.REQUIRED)
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),

    prefecture_kana: yup
      .string()
      .max(8)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    city_kana: yup.string().max(20).matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    district_kana: yup
      .string()
      .max(30)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),
    other_address_kana: yup
      .string()
      .max(138)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),

    email: yup.string().max(128).matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP).label('メールアドレス'),
  }),
});

export const tab03SchemaI = yup.object({
  p_applicant_persons__0: yup.object({
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
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    office_name_kana: yup
      .string()
      .max(48)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),
    office_department: yup
      .string()
      .max(46)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),

    office_phone: yup.string(),

    office_postal_code: yup.string().matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE),

    office_prefecture_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    office_city_kanji: yup.string().max(20).matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH),
    office_district_kanji: yup
      .string()
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),
    office_other_address_kanji: yup
      .string()
      .max(99)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER),

    office_prefecture_kana: yup
      .string()
      .max(8)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    office_city_kana: yup
      .string()
      .max(20)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_SPACE, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_SPACE),
    office_district_kana: yup
      .string()
      .max(30)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),
    office_other_address_kana: yup
      .string()
      .max(138)
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER),

    office_employee_num: yup.string(),

    office_joining_date: yup.string().matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED),

    last_year_income: yup.string(),
    before_last_year_bonus_income: yup.string(),
    last_year_bonus_income: yup.string(),
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
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER)
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
      .matches(REGEX.KANA_HALF_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANA_HALF_WIDTH_HAVE_NUMBER)
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
      .matches(REGEX.ZIP_CODE, YUP_MESSAGES.ZIP_CODE)
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
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
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
      .matches(REGEX.KANJI_FULL_WIDTH, YUP_MESSAGES.KANJI_FULL_WIDTH)
      .when('transfer_office', ([transfer_office], field) => {
        if (transfer_office === '1') {
          return field.required(YUP_MESSAGES.REQUIRED);
        } else {
          return field;
        }
      }),
    transfer_office_district_kanji: yup
      .string()
      .max(40)
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER)
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
      .matches(REGEX.KANJI_FULL_WIDTH_HAVE_NUMBER, YUP_MESSAGES.KANJI_FULL_WIDTH_HAVE_NUMBER)
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
