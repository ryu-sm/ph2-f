import { YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_applicant_persons__0: yup.object({
    identity_verification_type: yup
      .string()
      .required(YUP_MESSAGES.RADIO_REQUIRED)
      .test('運転免許証', YUP_MESSAGES.RADIO_REQUIRED, (field_value, { parent }) => {
        if (field_value === '1') {
          return parent.A__01__a.length > 0 && parent.A__01__b.length;
        }
        if (field_value === '2') {
          return parent.A__02.length > 0;
        }
        if (field_value === '3') {
          return parent.A__03__a.length > 0 && parent.A__03__b.length;
        }
      }),
  }),
});
