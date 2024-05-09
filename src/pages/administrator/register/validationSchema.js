import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  name: yup.string().required().label('お名前'),
  password: yup
    .string()
    .required()
    .min(8, YUP_MESSAGES.PASSWORD_MIN)
    .max(20, YUP_MESSAGES.PASSWORD_MAX)
    .matches(REGEX.PASSWORD, YUP_MESSAGES.PASSWORD_MATCHES)
    .label('パスワード'),
  password_confirm: yup
    .string()
    .when('password', (password, field) =>
      password ? field.required().oneOf([yup.ref('password')], YUP_MESSAGES.PASSWORD_CONFIRM_FOR_RESET) : field
    )
    .label('パスワード（確認用）'),
});
