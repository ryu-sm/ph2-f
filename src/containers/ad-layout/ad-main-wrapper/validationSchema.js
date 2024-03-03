import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  password: yup
    .string()
    .required()
    .min(8, YUP_MESSAGES.PASSWORD_MIN)
    .max(20, YUP_MESSAGES.PASSWORD_MAX)
    .matches(REGEX.PASSWORD, YUP_MESSAGES.PASSWORD_MATCHES)
    .label('現在のパスワード'),
  new_password: yup
    .string()
    .required()
    .min(8, YUP_MESSAGES.PASSWORD_MIN)
    .max(20, YUP_MESSAGES.PASSWORD_MAX)
    .matches(REGEX.PASSWORD, YUP_MESSAGES.PASSWORD_MATCHES)
    .label('新しいパスワード'),
  new_password_confirm: yup
    .string()
    .when('new_password', (new_password, field) =>
      new_password ? field.required().oneOf([yup.ref('new_password')], YUP_MESSAGES.PASSWORD_CONFIRM_FOR_RESET) : field
    )
    .label('新しいパスワード（確認用）'),
});
