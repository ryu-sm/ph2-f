import { YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
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
