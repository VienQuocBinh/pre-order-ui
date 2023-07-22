import axios from "axios";

const BASE_URL = 'http://18.143.102.131:44391/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;