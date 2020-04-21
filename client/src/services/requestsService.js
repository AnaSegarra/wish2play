import axios from 'axios';

const requestsService = axios.create({
  baseURL: `${process.env.API_URL}/requests`,
  withCredentials: true
});

export const fetchRequests = async () => {
  const { data } = await requestsService.get('/');
  return data.requests;
};

export const makeRequest = async game => {
  try {
    const { data } = await requestsService.post('/', game);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateRequestStatus = async (id, status) => {
  console.log('el id de la request', id);
  const { data } = await requestsService.put(`/${id}`, { status });
  return data.request;
};
