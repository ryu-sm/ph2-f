import { BANK_NOT_VALID_DAYS } from '@/configs';
import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';
import { isWeekend } from '@/utils';

export const validationSchema = yup.object({
  p_application_headers__required_funds_land_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_house_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_accessory_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_upgrade_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_refinance_loan_balance: yup
    .number()
    .max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_additional_amount: yup
    .number()
    .max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_loan_plus_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__required_funds_total_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_saving_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_estate_sale_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_other_saving_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_relative_donation_amount: yup
    .number()
    .max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_loan_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_pair_loan_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_other_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
  p_application_headers__funding_other_amount_detail: yup
    .string()
    .when('p_application_headers__funding_other_amount', ([p_application_headers__funding_other_amount], field) => {
      if (Number(p_application_headers__funding_other_amount) > 0) {
        return field.required(YUP_MESSAGES.REQUIRED);
      } else {
        return field;
      }
    }),
  p_application_headers__funding_total_amount: yup.number().max(99999, '99,999万円以下に入力してください。'),
});
