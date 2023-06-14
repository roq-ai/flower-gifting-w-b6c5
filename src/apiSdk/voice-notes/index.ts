import axios from 'axios';
import queryString from 'query-string';
import { VoiceNoteInterface, VoiceNoteGetQueryInterface } from 'interfaces/voice-note';
import { GetQueryInterface } from '../../interfaces';

export const getVoiceNotes = async (query?: VoiceNoteGetQueryInterface) => {
  const response = await axios.get(`/api/voice-notes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVoiceNote = async (voiceNote: VoiceNoteInterface) => {
  const response = await axios.post('/api/voice-notes', voiceNote);
  return response.data;
};

export const updateVoiceNoteById = async (id: string, voiceNote: VoiceNoteInterface) => {
  const response = await axios.put(`/api/voice-notes/${id}`, voiceNote);
  return response.data;
};

export const getVoiceNoteById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/voice-notes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVoiceNoteById = async (id: string) => {
  const response = await axios.delete(`/api/voice-notes/${id}`);
  return response.data;
};
