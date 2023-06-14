import * as yup from 'yup';

export const voiceNoteValidationSchema = yup.object().shape({
  audio_file: yup.string().required(),
  qr_code: yup.string().required(),
  order_id: yup.string().nullable().required(),
});
