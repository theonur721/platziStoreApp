import axios from 'axios';
import URLS from './urls';

const instance = axios.create({
  baseURL: URLS.baseURl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
