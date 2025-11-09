import { Link } from 'react-router-dom';
import Rating from './Rating';
import { formatPrice } from '../utils/helpers';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 p-4">
        {/* Product Image */}
        <Link to={`/product/${product._id}`} className="relative overflow-hidden w-full sm:w-64 flex-shrink-0">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Icon */}
          <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-gray-50">
            <FaHeart className="text-gray-600 text-sm" />
          </button>

          {/* Out of Stock Overlay */}
          {product.countInStock === 0 && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-gray-600 font-medium">Out of Stock</span>
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Category/Brand */}
            <Link to={`/products?category=${product.category}`} className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white uppercase tracking-wide">
              {product.category || product.brand}
            </Link>

            {/* Product Name */}
            <Link to={`/product/${product._id}`}>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="mt-2">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>

            {/* Description (only in list view) */}
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {product.description || 'Discover our premium electronics with the latest features and technology.'}
            </p>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>

            {product.countInStock > 0 && (
              <button
                onClick={handleAddToCart}
                className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 py-3 px-8 text-sm font-semibold uppercase transition-colors"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Default)
  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-gray-50">
          <FaHeart className="text-gray-600 text-sm" />
        </button>

        {/* Add to Cart Button - Appears on Hover */}
        {product.countInStock > 0 && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 right-3 bg-black text-white py-2 px-4 text-sm font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-900"
          >
            Add to Cart
          </button>
        )}

        {/* Out of Stock Overlay */}
        {product.countInStock === 0 && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-gray-600 font-medium">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category/Brand */}
        <Link to={`/products?category=${product.category}`} className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white uppercase tracking-wide">
          {product.category || product.brand}
        </Link>

        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2">
          <Rating rating={product.rating} numReviews={product.numReviews} size="small" />
        </div>

        {/* Price */}
        <div className="mt-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
