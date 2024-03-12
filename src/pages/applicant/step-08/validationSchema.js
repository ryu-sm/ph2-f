import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  isMCJ: yup.boolean(),
  hasIncomeTotalizer: yup.boolean(),
  p_borrowings: yup.array(
    yup.object({
      self_input: yup.string(),
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
    rent_to_be_paid_land_borrower: yup
      .string()
      .test('option-required', YUP_MESSAGES.RADIO_REQUIRED, (field_value, { options: { context } }) => {
        if (context.hasIncomeTotalizer && context.p_application_headers.rent_to_be_paid_land) {
          return !!field_value;
        }
        return true;
      }),
    rent_to_be_paid_house: yup.string(),
    rent_to_be_paid_house_borrower: yup
      .string()
      .test('option-required', YUP_MESSAGES.RADIO_REQUIRED, (field_value, { options: { context } }) => {
        if (context.hasIncomeTotalizer && context.p_application_headers.rent_to_be_paid_house) {
          return !!field_value;
        }
        return true;
      }),
  }),
});
