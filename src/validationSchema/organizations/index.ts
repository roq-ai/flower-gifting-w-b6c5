import * as yup from 'yup';
import { orderValidationSchema } from 'validationSchema/orders';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  order: yup.array().of(orderValidationSchema),
});
