import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaMoon, FaSun, FaEnvelope, FaPhone, FaHeart, FaExchangeAlt, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-xs">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            {/* Left Side */}
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <Link to="#" className="hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
                <FaEnvelope className="text-xs" />
                <span>NEWSLETTER</span>
              </Link>
              <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">CONTACT US</Link>
              <Link to="/faqs" className="hover:text-gray-900 dark:hover:text-white">FAQS</Link>
              <span className="text-gray-400">FREE SHIPPING FOR ALL ORDERS OF $150</span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <Link to="/compare" className="hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
                <FaExchangeAlt className="text-xs" />
                <span>0</span>
                <span>COMPARE</span>
              </Link>
              <Link to="/wishlist" className="hover:text-gray-900 dark:hover:text-white flex items-center gap-1">
                <FaHeart className="text-xs" />
                <span>0</span>
                <span>WISHLIST</span>
              </Link>
              {user ? (
                <Link to="/profile" className="hover:text-gray-900 dark:hover:text-white uppercase">
                  {user.name}
                </Link>
              ) : (
                <Link to="/login" className="hover:text-gray-900 dark:hover:text-white">LOGIN / REGISTER</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 group">
              <span className="transform group-hover:scale-110 transition-transform">🛒</span>
              <span>SHOPORA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white uppercase">
                Home
              </Link>
              <Link to="/products" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white uppercase">
                Shop
              </Link>
              
              {/* Pages Dropdown */}
              <div className="relative group">
                <button className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white uppercase flex items-center gap-1">
                  Pages
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      About Us
                    </Link>
                    <Link to="/brands" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                      Brands
                      <span className="absolute right-4 top-2 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded">Sale</span>
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                      Contact Us
                      <span className="absolute right-4 top-2 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded">Sale</span>
                    </Link>
                    <Link to="/faqs" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      FAQs
                    </Link>
                    <Link to="/landing" className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Landing Pages
                    </Link>
                    <Link to="/lookbook" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Lookbook
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Wish list
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
              <button className="text-sm text-green-600 dark:text-green-500 font-bold hover:underline uppercase">
                SPECIAL OFFER
              </button>
              <button className="text-sm text-gray-700 dark:text-gray-300 font-bold hover:underline uppercase">
                PURCHASE THEME
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Login Button */}
              {!user && (
                <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/" className="block py-2 text-sm font-semibold hover:text-gray-900 dark:hover:text-white uppercase" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/products" className="block py-2 text-sm font-semibold hover:text-gray-900 dark:hover:text-white uppercase" onClick={toggleMenu}>
                Shop
              </Link>
              
              {/* Pages Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Pages</p>
                <Link to="/about" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>
                  About Us
                </Link>
                <Link to="/brands" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>
                  Brands <span className="text-xs text-red-600">Sale</span>
                </Link>
                <Link to="/contact" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>
                  Contact Us <span className="text-xs text-red-600">Sale</span>
                </Link>
                <Link to="/faqs" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>
                  FAQs
                </Link>
                <Link to="/landing" className="block py-2 text-sm text-red-600 dark:text-red-400" onClick={toggleMenu}>
                  Landing Pages
                </Link>
                <Link to="/lookbook" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>
                  Lookbook
                </Link>
                <Link to="/wishlist" className="block py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>
                  Wish list
                </Link>
              </div>
              
              {user ? (
                <>
                  <Link to="/profile" className="block py-2 text-sm font-semibold hover:text-gray-900 dark:hover:text-white uppercase" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left py-2 text-sm font-semibold hover:text-gray-900 dark:hover:text-white uppercase">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block py-2 text-sm font-semibold hover:text-gray-900 dark:hover:text-white uppercase" onClick={toggleMenu}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Search Bar Below Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Search Box */}
            <div className="flex-1 flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <input 
                type="text" 
                placeholder="Search for products"
                className="flex-1 px-4 py-3 text-sm focus:outline-none dark:bg-gray-800 dark:text-white"
              />
              <select className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-l border-gray-300 dark:border-gray-600 text-sm focus:outline-none dark:text-white">
                <option>SELECT CATEGORY</option>
                <option>Furniture</option>
                <option>Cooking</option>
                <option>Accessories</option>
                <option>Fashion</option>
                <option>Electronics</option>
              </select>
              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 transition-colors">
                <FaSearch />
              </button>
            </div>

            {/* 24/7 Support */}
            <div className="hidden lg:flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <FaPhone className="text-xl" />
              <div>
                <div className="text-xs font-semibold uppercase">24/7 SUPPORT</div>
                <div className="text-sm font-bold">+71 099 321 312</div>
              </div>
            </div>

            {/* Cart Info */}
            <Link to="/cart" className="hidden lg:flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors">
              <FaShoppingCart className="text-2xl text-gray-700 dark:text-gray-300" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">$0.00</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">0 items</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
