import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  email: yup.string().max(128).matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP).required().label('登録メールアドレス'),
  new_email: yup
    .string()
    .max(128)
    .matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP)
    .required()
    .when('email', (email, field) =>
      email ? field.notOneOf([yup.ref('email')], YUP_MESSAGES.EMAIL_AP_NEW_EMAIL) : field
    )
    .label('登録メールアドレス'),
  new_email_confirm: yup
    .string()
    .when('new_email', (new_email, field) =>
      new_email ? field.required().oneOf([yup.ref('new_email')], YUP_MESSAGES.EMAIL_AP_NEW_EMAIL_CONFIRM) : field
    )
    .label('登録メールアドレス'),
});
