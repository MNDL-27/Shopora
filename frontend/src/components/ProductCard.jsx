import { Link } from 'react-router-dom';
import Rating from './Rating';
import { formatPrice } from '../utils/helpers';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product._id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.countInStock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}
        {product.countInStock > 0 && product.countInStock < 10 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {product.countInStock} left
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.brand}</p>
        
        <Rating rating={product.rating} numReviews={product.numReviews} />
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.price)}
          </span>
          
          {product.countInStock > 0 && (
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200"
              aria-label="Add to cart"
            >
              <FaShoppingCart />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
