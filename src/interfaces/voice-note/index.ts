import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface VoiceNoteInterface {
  id?: string;
  audio_file: string;
  qr_code: string;
  order_id: string;
  created_at?: any;
  updated_at?: any;

  order?: OrderInterface;
  _count?: {};
}

export interface VoiceNoteGetQueryInterface extends GetQueryInterface {
  id?: string;
  audio_file?: string;
  qr_code?: string;
  order_id?: string;
}
