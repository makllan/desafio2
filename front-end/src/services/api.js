import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getProducts = () => api.get('/products');
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const checkout = (checkoutRequest) => api.post('/cart/checkout', checkoutRequest);

export default api;
