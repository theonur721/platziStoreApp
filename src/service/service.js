import URLS from './urls';
import verbs from './verbs';

const getAllProducts = () => {
  return verbs.get(URLS.products);
};

const getProduct = () => {
  return verbs.get(URLS.singleProduct);
};

export default {
  getAllProducts,
  getProduct,
};
