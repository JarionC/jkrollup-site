import apiClient from './app';

export default {
  signup(user) {
    return apiClient.signup(user);
  }
};
