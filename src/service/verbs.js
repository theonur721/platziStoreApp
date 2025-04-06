import instance from './instance';

const get = async (url, params = {}) => {
  const response = await instance.get(url, {params});
  return response.data;
};

const post = async (url, data) => {
  const response = await instance.post(url, data);
  return response.data;
};

const put = async (url, data) => {
  const response = await instance.put(url, data);
  return response.data;
};

const del = async url => {
  const response = await instance.delete(url);
  return response.data;
};

export default {
  get,
  post,
  put,
  del,
};
