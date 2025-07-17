'use client';

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { ShoppingCart, Eye, CreditCard, X } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const LoadingSpinner = memo(() => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang tải sản phẩm...</p>
      </div>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const ProductCard = memo(({ product, index, onViewDetails }: { 
  product: Product; 
  index: number; 
  onViewDetails: (product: Product) => void;
}) => {
  const handleViewClick = useCallback(() => {
    onViewDetails(product);
  }, [product, onViewDetails]);

  const imageSrc = useMemo(() => 
    product.images[0] || product.category.image, 
    [product.images, product.category.image]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          width={340}
          height={340}
          quality={80}
          priority={index < 4}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+kN9P90af6DvYdvcs8gtu9t8yUOmz3M4xwOXGCfHH7u4vFbw/kBP7HJJGLuMFrGd1LvUmyqDGdnYJmfX9ZaRiCkd/5D7HdEuv5tZmUdnLCbKM/qnONHUmJ8kYBxQPx37O/9vvvx4dLqf0a/wCzr5W6lGFzduJcpJ5+6iuL8YZhyO9yyfNYaRwU4j8KSr8gH2sJr3w5JEJDFYHKlLdKKjFnU9pWlfHRHUuJmPMj2fqNYvvZGKvmN6tNBktYbWGvHSCfJFOLzHCCIQtuJvFUGfJkqLgzSGYqKYCaLEAqgqKMKLxpGmVoO2MqCxKpavCzxCkVG5WPzjMfTMvNmL8P9/8AJ7rNKtPLKSKmK7mNTyxmkZhxUAWxvCbJQdyoNzMoKQdNDSrI3QnJlzNWGzZJbFDvxfOZJGMpNNAXl3rTrCUhJDGQrI6KYIqJJLNnrQrJI5gKaVAd4yGaY7bpFSZsKzBUVk1hbXUbFgBDGGGcYDYBrGjsQqVUEFRUDa5YvJFxjgRqzOKJDFgdY6kEGGsEEGGGGEGGGGGGGGGGGGGGGGG..."
        />
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h1 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.title}
        </h1>

        <h2 className="text-blue-600 font-bold text-lg mb-2">
          ${product.price.toLocaleString()}
        </h2>

        <h3 className="text-gray-600 text-xs mb-3 line-clamp-2">
          {product.description}
        </h3>

        <div className="space-y-2">
          <button className="w-full bg-[#FFD500] text-black py-2 px-4 rounded-lg hover:bg-[#ffb700] transition-colors duration-200 flex items-center justify-center space-x-2 font-medium">
            <CreditCard size={16} />
            <span>Mua ngay</span>
          </button>

          <div className="flex space-x-2">
            <button className="flex-1 py-2 px-3 rounded-lg border-2 bg-white border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium">
              <ShoppingCart size={14} />
              <span>Thêm</span>
            </button>

            <button
              onClick={handleViewClick}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <Eye size={14} />
              <span>Xem thêm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

const ProductModal = memo(({ product, index, onClose }: { 
  product: Product; 
  index: number;
  onClose: () => void;
}) => {
  const imageSrc = useMemo(() => 
    product.images[0] || product.category.image, 
    [product.images, product.category.image]
  );

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; 
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
          aria-label="Đóng modal"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  width={340}
                  height={340}
                  quality={80}
                  priority={index < 4}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {product.category.name}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                ${product.price.toLocaleString()}
              </h2>

              <h3 className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </h3>

              <div className="space-y-3">
                <button className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium">
                  <CreditCard size={18} />
                  <span>Mua ngay</span>
                </button>

                <button className="w-full bg-white border-2 border-blue-500 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium">
                  <ShoppingCart size={18} />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      
      const response = await fetch('https://api.escuelajs.co/api/v1/products', {
        cache: 'force-cache',
        next: { revalidate: 60 } 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.slice(0, 10));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } 
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedProduct(null);
  }, []);

  const productsGrid = useMemo(() => 
    products.map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
        index={index}
        onViewDetails={handleViewDetails}
      />
    )), [products, handleViewDetails]
  );

  if (products.length === 0 && !error) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-medium">Có lỗi xảy ra</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Sản phẩm nổi bật
          </h1>
          <p className="text-gray-600 mt-2">
            Khám phá {products.length} sản phẩm chất lượng cao
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsGrid}
        </div>

        {showModal && selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            index={0}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Products;