import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import Product3DViewer from '../components/Product3DViewer';
import { productService } from '../services';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [show3D, setShow3D] = useState(false);
  
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await productService.getById(id);
      setProduct(data);
    } catch (error) {
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }

    try {
      setSubmittingReview(true);
      await productService.createReview(id, { rating, comment });
      toast.success('Review submitted successfully!');
      setRating(5);
      setComment('');
      fetchProduct(); // Refresh product to show new review
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image & 3D Viewer */}
        <div className="relative">
          {/* Toggle Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShow3D(!show3D)}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
            >
              {show3D ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  2D View
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                  3D View
                </>
              )}
            </button>
          </div>

          {/* Image or 3D Viewer */}
          {show3D ? (
            <div className="w-full h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden">
              <Product3DViewer category={product.category} />
            </div>
          ) : (
            <img
              src={product.image || '/placeholder.png'}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          
          <div className="mt-4">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-6">{product.description}</p>

          <div className="mt-6 space-y-2">
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p>
              <span className="font-semibold">Status:</span>{' '}
              {product.countInStock > 0 ? (
                <span className="text-green-600">In Stock ({product.countInStock})</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          {product.countInStock > 0 && (
            <div className="mt-8">
              <label className="block mb-2 font-semibold">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="input-field w-32"
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <button onClick={handleAddToCart} className="btn-primary mt-4 w-full md:w-auto">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Review Form */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          {isAuthenticated ? (
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="input-field"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <button type="submit" disabled={submittingReview} className="btn-primary">
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Please <a href="/login" className="text-primary-600 hover:underline">login</a> to write a review
            </p>
          )}
        </div>

        {/* Reviews List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review._id} className="card p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <Rating rating={review.rating} showReviews={false} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
