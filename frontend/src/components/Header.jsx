import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
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
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Shopora
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Products
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <FaUser />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    My Orders
                  </Link>
                  {isAdmin && (
                    <>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Admin Dashboard
                      </Link>
                    </>
                  )}
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/" onClick={toggleMenu} className="block hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <Link to="/products" onClick={toggleMenu} className="block hover:text-primary-600 dark:hover:text-primary-400">
              Products
            </Link>
            <Link to="/cart" onClick={toggleMenu} className="block hover:text-primary-600 dark:hover:text-primary-400">
              Cart ({cartCount})
            </Link>
            
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {user ? (
              <>
                <Link to="/profile" onClick={toggleMenu} className="block hover:text-primary-600 dark:hover:text-primary-400">
                  Profile
                </Link>
                <Link to="/orders" onClick={toggleMenu} className="block hover:text-primary-600 dark:hover:text-primary-400">
                  My Orders
                </Link>
                {isAdmin && (
                  <Link to="/admin/products" onClick={toggleMenu} className="block hover:text-primary-600 dark:hover:text-primary-400">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={() => { logout(); toggleMenu(); }} className="block text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="block btn-primary inline-block">
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
