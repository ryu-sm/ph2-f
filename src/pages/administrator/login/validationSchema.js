import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  email: yup.string().matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP).required().label('登録メールアドレス'),
  password: yup
    .string()
    .required()
    .min(8, YUP_MESSAGES.PASSWORD_MIN)
    .max(20, YUP_MESSAGES.PASSWORD_MAX)
    .matches(REGEX.PASSWORD, YUP_MESSAGES.PASSWORD_MATCHES)
    .label('パスワード'),
});
