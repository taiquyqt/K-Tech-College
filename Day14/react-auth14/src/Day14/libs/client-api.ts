
const baseUrl = 'https://server.aptech.io';

const getAccessToken = () => localStorage.getItem('access_token') || '';

const getHeaders = (auth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (auth) {
    headers.Authorization = `Bearer ${getAccessToken()}`;
  }
  return headers;
};

const request = async (
  url: string,
  options: RequestInit = {},
  auth = true
) => {
  const response = await fetch(`${baseUrl}${url}`, {
    headers: getHeaders(auth),
    ...options,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  const data = await response.json();
  return data;
};

const apiClient = {
  get: (url: string, auth = true) => request(url, { method: 'GET' }, auth),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (url: string, body: any, auth = true) =>
    request(url, { method: 'POST', body: JSON.stringify(body) }, auth),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: (url: string, body: any, auth = true) =>
    request(url, { method: 'PATCH', body: JSON.stringify(body) }, auth),
  delete: (url: string, auth = true) =>
    request(url, { method: 'DELETE' }, auth),
};

export default apiClient;
