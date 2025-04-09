// ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { getProducts, ProductFilters, Product } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    limit: 1000 // Set a very high limit to fetch all products
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(filters);
      setProducts(data.products);
      if (categories.length === 0) {
        const uniqueCategories = Array.from(
          new Set(data.products.map((p: Product) => p.category))
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters: ProductFilters) => {
    // Preserve the high limit when applying new filters
    setFilters({...newFilters, limit: 1000});
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="flex flex-row h-[calc(100vh-64px)]">
      <div className=" bg-[#c9d6df] mt-5 h-full ">
        <ProductFilter onFilter={handleFilter} categories={categories} />
      </div>
      <div className="w-full p-6">
        <h1 className="text-[#1e2022] text-4xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center mt-8 text-gray-600">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
