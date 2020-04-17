import axios from 'axios';

const requestsService = axios.create({
  baseURL: `${process.env.API_URL}/requests`,
  withCredentials: true
});

export const fetchRequests = async () => {
  const { data } = await requestsService.get('/');
  console.log('response', data);
  return data.requests;
};

export const makeRequest = async game => {
  if (game.ESRB === '') {
    game.ESRB = 'RP';
  }
  const { data } = await requestsService.post('/', game);
  return data.message;
};

export const updateRequestStatus = async (id, status) => {
  console.log('actualizando', id, 'a ', status);
  const { data } = await requestsService.put(`/${id}`, { status });
  console.log('response al update', data);
  return data.request;
};
