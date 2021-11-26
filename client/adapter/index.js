import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost.com'
});

export default instance;