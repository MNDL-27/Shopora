import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SalePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was closed in this session
    const popupClosed = sessionStorage.getItem('salePopupClosed');
    
    if (!popupClosed) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('salePopupClosed', 'true');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={closePopup}
      />

      {/* Popup Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto animate-scale-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Close popup"
          >
            <FaTimes className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Image */}
            <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-red-800 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4">
                  <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    Limited Time Offer
                  </span>
                </div>
                <h2 className="text-6xl font-black mb-2">
                  BLACK
                </h2>
                <h2 className="text-6xl font-black mb-4">
                  FRIDAY
                </h2>
                <div className="text-4xl font-bold mb-4">
                  SAVE UP TO
                </div>
                <div className="text-7xl font-black text-yellow-400">
                  50%
                </div>
                <div className="mt-6 text-lg">
                  On Selected Items
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                🎉 Mega Sale is Here!
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Don't miss out on our biggest sale of the year! Get amazing discounts on electronics, gadgets, and more.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Up to 50% off on selected products</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Free shipping on orders over $150</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Special deals on top brands</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
                  Sale ends in:
                </div>
                <div className="flex justify-center gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600">53</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                  </div>
                  <div className="text-2xl font-bold">:</div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">01</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                  </div>
                  <div className="text-2xl font-bold">:</div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">09</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Mins</div>
                  </div>
                  <div className="text-2xl font-bold">:</div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">18</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Secs</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  to="/products"
                  onClick={closePopup}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold text-center uppercase transition-colors"
                >
                  Shop Now
                </Link>
                <button
                  onClick={closePopup}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default SalePopup;
