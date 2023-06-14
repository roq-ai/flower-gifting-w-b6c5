import * as yup from 'yup';
import { voiceNoteValidationSchema } from 'validationSchema/voice-notes';

export const orderValidationSchema = yup.object().shape({
  flower_sender_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
  voice_note: yup.array().of(voiceNoteValidationSchema),
});
