import axios from 'axios';

const api = axios.create({
  baseURL: 'http://rodrigobrocchi.com.br:3333',
});

export default api;
