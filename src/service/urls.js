const baseURl = 'https://api.escuelajs.co/api/'; // temel url

const URLS = {
  baseURl,
  products: 'v1/products', // 50 ürün
  singleProduct: id => `v1/products/4${id}`, // tek ürün
  categories: 'v1/categories',
};

export default URLS;
