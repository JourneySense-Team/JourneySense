import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Adjust this to your backend URL
  withCredentials: true,
});

export default instance;
