import React, { useState, useEffect } from 'react';
import { Product } from '../services/productService';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (productData: Partial<Product>) => void;
  loading: boolean;
  categories: string[]; // Add categories prop
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, loading, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    rating: 0,
    imageUrl: '',
  });
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || '',
        price: initialData.price || 0,
        rating: initialData.rating || 0,
        imageUrl: initialData.imageUrl || '',
      });
      
      // Check if the category is in the existing categories
      if (initialData.category && !categories.includes(initialData.category)) {
        setIsNewCategory(true);
        setNewCategory(initialData.category || '');
      }
    }
  }, [initialData, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === 'new') {
      setIsNewCategory(true);
      setFormData(prev => ({
        ...prev,
        category: ''
      }));
    } else {
      setIsNewCategory(false);
      setFormData(prev => ({
        ...prev,
        category: value
      }));
    }
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewCategory(value);
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="form-label">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="form-input"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="form-label">Category</label>
        <div className="space-y-2">
          <select
            id="categorySelect"
            value={isNewCategory ? 'new' : formData.category}
            onChange={handleCategoryChange}
            className="form-input"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
            <option value="new">Add new category</option>
          </select>
          
          {isNewCategory && (
            <input
              type="text"
              id="category"
              name="newCategory"
              value={newCategory}
              onChange={handleNewCategoryChange}
              placeholder="Enter new category"
              required
              className="form-input"
            />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="form-input"
          />
        </div>
        
        <div>
          <label htmlFor="rating" className="form-label">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="form-input"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="imageUrl" className="form-label">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : initialData?._id ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
