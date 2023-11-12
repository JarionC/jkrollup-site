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
  },


  sendCustomRequest(formName, formEmail, formPhone, formBudget, formDate, formNotes, formFile) {
    var formData = new FormData();

    formData.append("name", formName);
    formData.append("email", formEmail);
    formData.append("phone", formPhone);
    formData.append("budget", formBudget);
    formData.append("date", formDate);
    formData.append("notes", formNotes);
    formData.append("file", formFile);

    return apiClient.post('/customrequest',formData)
  },

  sendContact(formName, formEmail, formPhone, formMessage) {
    var formData = new FormData();

    formData.append("name", formName);
    formData.append("email", formEmail);
    formData.append("phone", formPhone);
    formData.append("message", formMessage);

    return apiClient.post('/contact', formData);
  }
};
