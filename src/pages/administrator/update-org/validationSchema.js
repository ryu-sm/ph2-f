import { YUP_MESSAGES } from '@/constant';
import { yup } from '@/libs';

export const validationSchema = yup.object({
  sales_person_id: yup.string().required(YUP_MESSAGES.DROPDOWN_SELECT_REQUIRED).label('連携会社'),
  org_id: yup.string(),
});
