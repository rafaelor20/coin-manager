import api from './api';

export async function resetPassword( body ) {
  const response = await api.post('/auth/reset-password', body);
  return response.data;
}
