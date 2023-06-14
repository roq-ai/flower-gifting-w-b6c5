import { VoiceNoteInterface } from 'interfaces/voice-note';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  flower_sender_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  voice_note?: VoiceNoteInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    voice_note?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  flower_sender_id?: string;
  organization_id?: string;
}
