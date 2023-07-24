import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BACK_END_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  signup(user) {
    return apiClient.post('/signup', user);
  },
  signin(credentials) {
    return apiClient.post('/signin', credentials);
  },
  register(registrationId, referer){
    return apiClient.post(`/registration/${registrationId}`, referer);
  }
};
