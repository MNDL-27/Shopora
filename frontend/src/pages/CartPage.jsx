import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeFromCart, getCartTotal, getCartCount } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to get started!</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product._id} className="card p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                <img
                  src={item.product.image || '/placeholder.png'}
                  alt={item.product.name}
                  className="w-full md:w-32 h-32 object-cover rounded-lg"
                />

                {/* Details */}
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product._id}`}
                    className="text-xl font-semibold hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{item.product.brand}</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                      disabled={item.quantity >= item.product.countInStock}
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                  >
                    <FaTrash />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Items ({getCartCount()}):</span>
                <span className="font-semibold">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">
                  {getCartTotal() > 50 ? 'FREE' : formatPrice(10)}
                </span>
              </div>
              <hr className="border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary-600 dark:text-primary-400">
                  {formatPrice(getCartTotal() + (getCartTotal() > 50 ? 0 : 10))}
                </span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full mb-3">
              Proceed to Checkout
            </button>
            
            <Link to="/products" className="btn-secondary w-full block text-center">
              Continue Shopping
            </Link>

            {getCartTotal() < 50 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                Add {formatPrice(50 - getCartTotal())} more for FREE shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
