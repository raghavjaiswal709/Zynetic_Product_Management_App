import api from './api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const getProducts = async (filters: ProductFilters = {}) => {
  try {
    const response = await api.get('/products', { params: filters });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product');
  }
};

export const createProduct = async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

export const updateProduct = async (id: string, productData: Partial<Omit<Product, '_id' | 'createdAt' | 'updatedAt'>>) => {
  try {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};
