// ProductFilter.tsx
import React, { useState } from 'react';
import { ProductFilters } from '../services/productService';

interface ProductFilterProps {
  onFilter: (filters: ProductFilters) => void;
  categories: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilter, categories }) => {
  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFilters(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? Number(value) : undefined) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    onFilter({});
  };

  return (
    <div className="p-5">
      <h2 className="text-[#555555] text-xl font-semibold mb-5 border-b border-[#555555] pb-2">Filter Products</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="search" className="block text-[#555555] font-medium mb-1">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search || ''}
              onChange={handleChange}
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] placeholder-[#555555] bg-white bg-opacity-80"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-[#555555] font-medium mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={filters.category || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] bg-white bg-opacity-80"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="minPrice" className="block text-[#555555] font-medium mb-1">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice || ''}
              onChange={handleChange}
              min="0"
              placeholder="Min price"
              className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] placeholder-[#555555] bg-white bg-opacity-80"
            />
          </div>
          
          <div>
            <label htmlFor="maxPrice" className="block text-[#555555] font-medium mb-1">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice || ''}
              onChange={handleChange}
              min="0"
              placeholder="Max price"
              className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] placeholder-[#555555] bg-white bg-opacity-80"
            />
          </div>
          
          <div>
            <label htmlFor="minRating" className="block text-[#555555] font-medium mb-1">Min Rating</label>
            <input
              type="number"
              id="minRating"
              name="minRating"
              value={filters.minRating || ''}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              placeholder="Min rating"
              className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] placeholder-[#555555] bg-white bg-opacity-80"
            />
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-[#555555] font-medium mb-1">Sort By</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy || 'createdAt'}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] bg-white bg-opacity-80"
              >
                <option value="createdAt">Date</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
              
              <select
                id="sortOrder"
                name="sortOrder"
                value={filters.sortOrder || 'desc'}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#555555] rounded-md focus:outline-none focus:ring-2 focus:ring-[#555555] bg-white bg-opacity-80"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6 pt-4 border-t border-[#555555]">
          <button 
            type="button" 
            onClick={handleReset}
            className="px-4 py-2 bg-white text-[#555555] border border-[#555555] rounded font-medium hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-[#555555] text-white rounded font-medium hover:bg-[#444444] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
