import { REGEX, YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  email: yup.string().matches(REGEX.EMAIL, YUP_MESSAGES.EMAIL_AP).required().label('登録メールアドレス'),
});
