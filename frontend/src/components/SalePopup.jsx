import { useState, useEffect } from 'react';
import { FaTimes, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SalePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const products = [
    {
      name: 'Off-Shoulder Knit Sweater',
      price: 'Rs. 6,300.00',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
      badge: null
    },
    {
      name: 'Draped Mock Neck Tee',
      price: 'From Rs. 4,500.00',
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop',
      badge: 'NEW'
    },
    {
      name: 'V-Neck Wool Blend Sweater',
      price: 'Rs. 6,800.00',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
      badge: null
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('salePopupSeen');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('salePopupSeen', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('STYLE20');
    setCopiedCode(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FaTimes className="text-gray-600 dark:text-gray-300" />
        </button>

        <div className="relative h-96">
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop"
            alt="Fashion Model"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Special Picks for You
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            We've handpicked a few styles we think you'll love. Use code <span className="font-semibold text-gray-900 dark:text-white">STYLE20</span> for 20% OFF your order today.
          </p>

          <div className="flex items-center border-2 border-gray-900 dark:border-white rounded-full px-4 py-2 mb-4">
            <span className="flex-1 text-center font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">
              STYLE20
            </span>
            <button
              onClick={handleCopyCode}
              className="ml-4 hover:scale-110 transition-transform"
            >
              <FaCopy className={`text-lg ${copiedCode ? 'text-green-600' : 'text-gray-900 dark:text-white'}`} />
            </button>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 py-3 rounded font-semibold uppercase tracking-wide transition-colors text-sm"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalePopup;