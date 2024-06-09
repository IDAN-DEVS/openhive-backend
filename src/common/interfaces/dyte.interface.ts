export interface IDyteCreateMeetingResponse {
  preferred_region: string;
  id: string;
  title: string;
  record_on_start: boolean;
  live_stream_on_start: boolean;
  persist_chat: boolean;
  summarize_on_end: boolean;
  is_large: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IDyteResponse<T> {
  success: boolean;
  data: T;
}

export interface IDyteAddParticipantResponse {
  token: string;
  id: string;
  name: string;
  custom_participant_id: string;
  preset_id: string;
  sip_enabled: boolean;
  created_at: string;
  updated_at: string;
}
