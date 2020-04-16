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
  const { data } = await requestsService.post('/', game);
  console.log(data);
  return data.message;
};

export const updateRequestStatus = async (id, status) => {
  console.log('actualizando', id, 'a ', status);
  const { data } = await requestsService.put(`/${id}`, { status });
  console.log('response al update', data);
  return data.request;
};
