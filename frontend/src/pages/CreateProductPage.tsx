import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct, getProducts } from '../services/productService';
import ProductForm from '../components/ProductForm';

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProducts({ limit: 1000 });
        const uniqueCategories = Array.from(
          new Set(data.products.map((p: any) => p.category))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (err: any) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (productData: any) => {
    try {
      setLoading(true);
      setError(null);
      const newProduct = await createProduct(productData);
      navigate(`/products/${newProduct._id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 gap-56">
      {/* Left side image */}
      <div className="hidden md:block w-1/4 bg-cover bg-center items-center justify-center relative left-60 top-40" style={{ }}>
        <img 
          src="/addproduct.png" 
          alt="Product Creation" 
          className=" object-cover h-[500px]"
        />
      </div>
      
      {/* Right side form */}
      <div className="w-full md:w-3/4 px-8 py-12 flex flex-col">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-block px-4 py-2 ml-[170px] bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow"
          >
            &larr; Back to Products
          </Link>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Product</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <ProductForm 
            onSubmit={handleSubmit} 
            loading={loading} 
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
