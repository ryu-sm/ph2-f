import { YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  isSalesPerson: yup.bool(),
  p_application_headers: yup.object({
    loan_type: yup.string(),
  }),
  p_applicant_persons__0: yup.object({
    S: yup
      .array()
      .test('p_applicant_persons__0.S', '※サインしてください。', (field_value, { options: { context } }) => {
        if (context.isSalesPerson) {
          return field_value?.length > 0;
        }
        return true;
      }),
  }),

  p_applicant_persons__1: yup.object({
    S: yup
      .array()
      .test('p_applicant_persons__1.S', '※サインしてください。', (field_value, { options: { context } }) => {
        console.log(context);
        if (context.isSalesPerson && ['3', '4'].includes(context.p_application_headers.loan_type)) {
          return field_value?.length > 0;
        }
        return true;
      }),
  }),
});
