import URLS from './urls';
import verbs from './verbs';

const getAllProducts = () => {
  return verbs.get(URLS.products);
};

const getProduct = () => {
  return verbs.get(URLS.singleProduct);
};

const getCategories = () => {
  return verbs.get(URLS.categories);
};

const searchProductByTitle = title => {
  return verbs.get(URLS.searchProduct(title));
};

export default {
  getAllProducts,
  getProduct,
  getCategories,
  searchProductByTitle,
};
