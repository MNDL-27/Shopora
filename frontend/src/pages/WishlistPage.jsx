import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistPage = () => {
  // This would normally come from state management
  const wishlistItems = [];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <FaHeart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Save your favorite items for later</p>
          <a href="/products" className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Wishlist items would be mapped here */}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
