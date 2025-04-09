import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, updateProduct, getProducts } from '../services/productService';
import ProductForm from '../components/ProductForm';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, categoriesData] = await Promise.all([
          getProduct(id!),
          getProducts({ limit: 1000 })
        ]);
        
        setProduct(productData);
        
        const uniqueCategories = Array.from(
          new Set(categoriesData.products.map((p: any) => p.category))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (productData: any) => {
    try {
      setSaving(true);
      setError(null);
      await updateProduct(id!, productData);
      navigate(`/products/${id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error && !saving) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!product && !loading) return <div className="text-center mt-8">Product not found</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 gap-56">
      {/* Left side image */}
      <div className="hidden md:block w-1/4 bg-cover bg-center items-center justify-center relative left-60 top-40">
        <img 
          src="/addproduct.png" 
          alt="Edit Product" 
          className="object-cover h-[500px]"
        />
      </div>
      
      {/* Right side form */}
      <div className="w-full md:w-3/4 px-8 py-12 flex flex-col">
        <div className="mb-6">
          <Link 
            to={`/products/${id}`} 
            className="inline-block px-4 py-2 ml-[170px] bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow"
          >
            &larr; Back to Product
          </Link>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <ProductForm 
            initialData={product} 
            onSubmit={handleSubmit} 
            loading={saving}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
