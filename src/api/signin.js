import apiClient from './app';

export default {
  signin(credentials) {
    return apiClient.signin(credentials);
  }
};
