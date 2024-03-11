import { BANK_NOT_VALID_DAYS } from '@/configs';
import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';
import { isWeekend } from '@/utils';

export const validationSchema = yup.object({
  p_application_headers: yup.object({
    move_scheduled_date: yup.string().matches(REGEX.YM, YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('入居予定年月'),
    loan_target: yup.string().required(YUP_MESSAGES.RADIO_REQUIRED),
    land_advance_plan: yup
      .string()
      .when('loan_target', ([loan_target], field) =>
        loan_target === '6' ? field.required(YUP_MESSAGES.RADIO_REQUIRED) : field
      ),
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
  }),

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
