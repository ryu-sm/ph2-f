import { YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_applicant_persons__1__identity_verification_type: yup
    .string()
    .required(YUP_MESSAGES.RADIO_REQUIRED)
    .test('本人確認書類', YUP_MESSAGES.RADIO_REQUIRED, (field_value, { parent }) => {
      if (field_value === '1') {
        return parent.p_applicant_persons__1__A__01__a.length > 0 && parent.p_applicant_persons__1__A__01__b.length;
      }
      if (field_value === '2') {
        return parent.p_applicant_persons__1__A__02.length > 0;
      }
      if (field_value === '3') {
        return parent.p_applicant_persons__1__A__03__a.length > 0 && parent.p_applicant_persons__1__A__03__b.length;
      }
    }),
});
