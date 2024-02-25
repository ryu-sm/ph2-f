import { YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  p_applicant_persons__1: yup.object({
    identity_verification_type: yup
      .string()
      .required(YUP_MESSAGES.RADIO_REQUIRED)
      .test(
        '運転免許証',
        YUP_MESSAGES.RADIO_REQUIRED,
        (
          field_value,
          {
            options: {
              context: { p_uploaded_files },
            },
          }
        ) => {
          if (field_value === '1') {
            return (
              p_uploaded_files.p_applicant_persons__1__A__01__a.length > 0 &&
              p_uploaded_files.p_applicant_persons__1__A__01__b.length
            );
          }
          if (field_value === '2') {
            return p_uploaded_files.p_applicant_persons__1__A__02.length > 0;
          }
          if (field_value === '3') {
            return (
              p_uploaded_files.p_applicant_persons__1__A__03__a.length > 0 &&
              p_uploaded_files.p_applicant_persons__1__A__03__b.length
            );
          }
        }
      ),
  }),
});
