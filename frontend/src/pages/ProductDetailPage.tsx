import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, deleteProduct } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const data = await getProduct(productId);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteProduct(id!);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
      setDeleteLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (!product) return <div className="text-center mt-8">Product not found</div>;

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-10 mt-10">
        <Link to="/" className="text-white p-2 px-4 rounded-lg bg-[#1e2022]/40  hover:underline">
          &larr; Back to Products
        </Link>
      </div>

      <div className="bg-white h-[60vh] rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {product.imageUrl ? (
            <div className="md:w-1/2 ml-12 mt-20">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          ) : (
            <div className="md:w-1/2 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          
          <div className="p-6 md:w-1/2 ml-28 mt-16">
            <h1 className="text-6xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-xl font-semibold px-2.5 py-0.5 rounded">
                {product.category}
              </span>
              <div className="flex items-center ml-4">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{product.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-green-600 mb-4">
            ₹{product.price.toFixed(2)}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description || 'No description available.'}</p>
            </div>
            
            {isAuthenticated && isAdmin && (
              <div className="flex space-x-3">
                <Link 
                  to={`/products/${product._id}/edit`}
                  className="btn btn-primary flex-1 text-center"
                >
                  Edit Product
                </Link>
                <button 
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="btn btn-danger flex-1"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Product'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
