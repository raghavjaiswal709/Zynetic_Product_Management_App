import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../services/productService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-[#1e2022] rounded-lg shadow-md overflow-hidden">
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover p-1 rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#c9d6df]">{product.name}</h3>
        <p className="text-sm text-gray-200 mt-1">{product.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-extrabold text-[#c9d6df]">₹{product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm text-gray-200">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Link 
          to={`/products/${product._id}`}
          className="block w-full text-center mt-3 py-2 bg-[#c9d6df] text-[#1e2022] rounded hover:bg-[#c9d6df]/80"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
