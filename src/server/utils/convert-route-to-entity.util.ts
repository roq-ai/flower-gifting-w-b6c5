const mapping: Record<string, string> = {
  orders: 'order',
  organizations: 'organization',
  users: 'user',
  'voice-notes': 'voice_note',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
