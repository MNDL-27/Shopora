import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaShippingFast, FaLock, FaUndo, FaHeadset } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { productService } from '../services';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('new');
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const sidebarRef = useRef(null);
  const { t } = useTranslation();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { 
      id: 'furniture', 
      name: 'Furniture', 
      icon: '🛋️',
      subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Office']
    },
    { 
      id: 'cooking', 
      name: 'Cooking', 
      icon: '🍳',
      subcategories: ['Cookware', 'Bakeware', 'Kitchen Tools', 'Appliances']
    },
    { 
      id: 'accessories', 
      name: 'Accessories', 
      icon: '⌚',
      subcategories: ['Watches', 'Jewelry', 'Bags', 'Belts']
    },
    { 
      id: 'fashion', 
      name: 'Fashion', 
      icon: '�',
      subcategories: ['Men', 'Women', 'Kids', 'Shoes']
    },
    { 
      id: 'clocks', 
      name: 'Clocks', 
      icon: '⏰',
      subcategories: ['Wall Clocks', 'Desk Clocks', 'Smart Clocks']
    },
    { 
      id: 'lighting', 
      name: 'Lighting', 
      icon: '💡',
      subcategories: ['Table Lamps', 'Floor Lamps', 'Ceiling Lights', 'LED Lights']
    },
    { 
      id: 'toys', 
      name: 'Toys', 
      icon: '🧸',
      subcategories: ['Action Figures', 'Dolls', 'Board Games', 'Educational']
    },
    { 
      id: 'handmade', 
      name: 'Hand Made', 
      icon: '✋',
      subcategories: ['Crafts', 'Art', 'Decorations']
    },
    { 
      id: 'minimalism', 
      name: 'Minimalism', 
      icon: '⚪',
      subcategories: ['Decor', 'Furniture', 'Art']
    },
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: '🔌',
      subcategories: ['Phones', 'Tablets', 'Laptops', 'Audio', 'Cameras', 'Gaming']
    },
    { 
      id: 'cars', 
      name: 'Cars', 
      icon: '🚗',
      subcategories: ['Accessories', 'Parts', 'Electronics']
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Update sidebar height when component mounts or categories change
    if (sidebarRef.current) {
      setSidebarHeight(sidebarRef.current.offsetHeight);
    }
  }, [categories, loading]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [featured, topRated] = await Promise.all([
        productService.getAll({ limit: 12 }),
        productService.getTopRated(),
      ]);
      setFeaturedProducts(featured.data.products || []);
      setTopRatedProducts(topRated.data || []);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(p => p.category?.toLowerCase().includes(selectedCategory));

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Top Promotional Banner with Red Triangular Design */}
      <div className="bg-white dark:bg-gray-800 relative" style={{height: '70px', marginTop: '0'}}>
        {/* Red Triangular Shapes - Left Side */}
        <div className="absolute left-0 top-0 bottom-0" style={{width: '35%'}}>
          <svg width="100%" height="100%" viewBox="0 0 400 70" preserveAspectRatio="none">
            <polygon points="0,0 120,0 0,70" fill="#DC2626" />
            <polygon points="100,0 220,0 120,70" fill="#DC2626" />
            <polygon points="200,0 320,0 240,70" fill="#DC2626" />
            <polygon points="300,0 400,0 360,70" fill="#DC2626" />
          </svg>
        </div>
        
        {/* Red Triangular Shapes - Right Side */}
        <div className="absolute right-0 top-0 bottom-0" style={{width: '35%'}}>
          <svg width="100%" height="100%" viewBox="0 0 400 70" preserveAspectRatio="none">
            <polygon points="0,0 100,0 40,70" fill="#DC2626" />
            <polygon points="80,0 200,0 120,70" fill="#DC2626" />
            <polygon points="180,0 300,0 240,70" fill="#DC2626" />
            <polygon points="280,0 400,0 400,70" fill="#DC2626" />
          </svg>
        </div>
        
        {/* Black Center Banner */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black text-white px-6 md:px-10 py-2 md:py-3 shadow-xl" style={{transform: 'skewX(-3deg)'}}>
            <div style={{transform: 'skewX(3deg)'}} className="text-center">
              <h2 className="text-lg md:text-2xl font-black tracking-wider leading-tight">BLACK FRIDAY</h2>
              <p className="text-xs md:text-sm font-bold">SAVE UP 50%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Sidebar - Browse Categories */}
          <div ref={sidebarRef} className="lg:col-span-1 flex flex-col">
            <div className="bg-green-700 text-white px-4 py-3 font-bold uppercase text-sm flex items-center justify-between">
              <span>BROWSE CATEGORIES</span>
              <span>▼</span>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-sm flex-grow">
              {categories.slice(1).map((category) => (
                <div key={category.id} className="relative group">
                  <Link
                    to={`/products?category=${category.id}`}
                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 group-hover:text-green-700 dark:group-hover:text-green-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    {category.subcategories && (
                      <span className="text-gray-400 text-xs">›</span>
                    )}
                  </Link>
                  
                  {/* Subcategories Dropdown - Shows on Hover */}
                  {category.subcategories && (
                    <div className="absolute left-full top-0 ml-0 w-56 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {category.subcategories.map((subcat, index) => (
                          <Link
                            key={index}
                            to={`/products?category=${category.id}&subcategory=${subcat.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-700 dark:hover:text-green-500 transition-colors"
                          >
                            {subcat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 flex">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              
              {/* Large Hero Banner */}
              <div 
                className="lg:col-span-2 bg-gray-900 text-white relative overflow-hidden shadow-lg"
                style={{ height: sidebarHeight > 0 ? `${sidebarHeight}px` : 'auto', minHeight: '400px' }}
              >
                {/* Yellow BLACK FRIDAY SALE tape design - Top */}
                <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-black text-center py-2 text-xs md:text-sm font-black transform -rotate-1 overflow-hidden shadow-md z-20">
                  <div className="flex gap-6 md:gap-12 justify-around animate-pulse">
                    <span>BLACK FRIDAY</span>
                    <span>SALE</span>
                    <span>SALE</span>
                    <span>SALE</span>
                    <span>SALE</span>
                    <span>SALE</span>
                    <span>BLACK FRIDAY</span>
                  </div>
                </div>
                
                {/* Yellow BLACK FRIDAY SALE tape design - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black text-center py-2 text-xs md:text-sm font-black transform rotate-1 overflow-hidden shadow-md z-20">
                  <div className="flex gap-6 md:gap-12 justify-around">
                    <span>SALE</span>
                    <span>BLACK FRIDAY</span>
                    <span>SALE</span>
                    <span>BLACK FRIDAY</span>
                    <span>SALE</span>
                    <span>BLACK FRIDAY</span>
                    <span>SALE</span>
                  </div>
                </div>
                
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                  <p className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">SAVE UP 30%</p>
                  <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                    BIG SALE
                  </h1>
                  <div className="flex gap-3">
                    <Link to="/products" className="bg-white text-black px-6 py-3 text-sm font-bold uppercase hover:bg-gray-200 transition border-2 border-white">
                      SHOP NOW
                    </Link>
                    <Link to="/products" className="bg-transparent text-white px-6 py-3 text-sm font-bold uppercase hover:bg-white/10 transition border-2 border-white">
                      VIEW MORE
                    </Link>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute right-8 bottom-20 text-6xl opacity-20">🎁</div>
                <div className="absolute right-24 top-24 text-4xl opacity-20">📦</div>
              </div>

              {/* Right Sidebar - Top Sellers */}
              <div 
                className="bg-white dark:bg-gray-800 shadow-sm p-6"
                style={{ height: sidebarHeight > 0 ? `${sidebarHeight}px` : 'auto', minHeight: '400px' }}
              >
                <h3 className="text-lg font-bold uppercase mb-4 text-gray-900 dark:text-white">TOP SELLERS</h3>
                <div className="space-y-4">
                  {topRatedProducts.slice(0, 3).map((product) => (
                    <Link key={product._id} to={`/products/${product._id}`} className="flex gap-3 group">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Most Popular Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 pb-4 border-b-2 border-gray-900 dark:border-white inline-block">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wide">
              MOST POPULAR FOR MAN
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {featuredProducts.slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Electronic Category */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 pb-4 border-b-2 border-gray-900 dark:border-white inline-block">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wide">
              SHOP BY CATEGORY
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.slice(1, 7).map((category) => {
              const count = featuredProducts.filter(p => p.category?.toLowerCase().includes(category.id)).length;
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="bg-white dark:bg-gray-700 p-6 text-center hover:shadow-lg transition-all group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="font-bold text-sm uppercase mb-2 text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{count} products</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 hover:shadow-xl transition-all group" style={{minHeight: '220px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">Discount</p>
              <h3 className="text-2xl font-black mb-4">Sports Shoes</h3>
              <Link to="/products" className="text-sm font-bold underline group-hover:no-underline">VIEW MORE →</Link>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-8 hover:shadow-xl transition-all group" style={{minHeight: '220px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">Arrivals</p>
              <h3 className="text-2xl font-black mb-4">Headphones</h3>
              <Link to="/products" className="text-sm font-bold underline group-hover:no-underline">VIEW MORE →</Link>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-8 hover:shadow-xl transition-all group" style={{minHeight: '220px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">Smart</p>
              <h3 className="text-2xl font-black mb-4">Weekend</h3>
              <Link to="/products" className="text-sm font-bold underline group-hover:no-underline">VIEW MORE →</Link>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 hover:shadow-xl transition-all group" style={{minHeight: '220px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">Save 20%</p>
              <h3 className="text-2xl font-black mb-4">Autumn Sale</h3>
              <Link to="/products" className="text-sm font-bold underline group-hover:no-underline">VIEW MORE →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular For Woman */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 pb-4 border-b-2 border-gray-900 dark:border-white inline-block">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wide">
              MOST POPULAR FOR WOMAN
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topRatedProducts.slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products and Most Popular Section */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left - Sale Products with Discount Banner */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg mb-6 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                  Learn how to get a 30% discount on all products.
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Senectus ullamcorper lacus a euismod vestibulum habitasse.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold uppercase mb-4 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-2 inline-block">
                  SALE PRODUCTS
                </h3>
                <div className="space-y-4 mt-4">
                  {featuredProducts.slice(0, 1).map((product) => (
                    <div key={product._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                      <Link to={`/products/${product._id}`} className="block">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover mb-3"
                        />
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</p>
                        <div className="mt-3 text-center">
                          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">OFFER ENDS IN:</div>
                          <div className="flex gap-2 justify-center text-sm font-bold">
                            <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <span className="text-red-600 dark:text-red-500">53</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Days</span>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <span className="text-red-600 dark:text-red-500">01</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Hr</span>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <span className="text-red-600 dark:text-red-500">09</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Min</span>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              <span className="text-red-600 dark:text-red-500">18</span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Sec</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Most Popular Products */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h3 className="text-lg font-bold uppercase mb-4 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-2 inline-block">
                  MOST POPULAR
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topRatedProducts.slice(0, 4).map((product) => (
                  <div key={product._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
                    <Link to={`/products/${product._id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover mb-3"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">{product.category}</p>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building Tools Section with Tabs */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="pb-4 border-b-2 border-gray-900 dark:border-white inline-block mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wide">
                BUILDING TOOLS
              </h2>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('new')}
                className={`pb-3 text-sm font-bold uppercase transition-colors relative ${
                  activeTab === 'new'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                NEW
                {activeTab === 'new' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`pb-3 text-sm font-bold uppercase transition-colors relative ${
                  activeTab === 'featured'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                FEATURED
                {activeTab === 'featured' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('top')}
                className={`pb-3 text-sm font-bold uppercase transition-colors relative ${
                  activeTab === 'top'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                TOP SELLERS
                {activeTab === 'top' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"></span>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {(activeTab === 'top' ? topRatedProducts : featuredProducts).slice(0, 10).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Banners */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 hover:shadow-xl transition-all" style={{minHeight: '250px'}}>
              <p className="text-sm uppercase mb-3 font-semibold tracking-wider opacity-90">Adapters</p>
              <h3 className="text-4xl font-black mb-6">For Camera Lenses</h3>
              <Link to="/products" className="text-sm font-bold underline hover:no-underline">READ MORE →</Link>
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white p-10 hover:shadow-xl transition-all" style={{minHeight: '250px'}}>
              <p className="text-sm uppercase mb-3 font-semibold tracking-wider opacity-90">Accessories</p>
              <h3 className="text-4xl font-black mb-6">For Photographers</h3>
              <Link to="/products" className="text-sm font-bold underline hover:no-underline">READ MORE →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Column Banners */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white p-8 hover:shadow-xl transition-all" style={{minHeight: '200px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">Discounts 30%</p>
              <h3 className="text-2xl font-black">For Men Watches</h3>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white p-8 hover:shadow-xl transition-all" style={{minHeight: '200px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">New Tents</p>
              <h3 className="text-2xl font-black">Accessories Hiking</h3>
            </div>
            <div className="bg-gradient-to-br from-rose-600 to-rose-800 text-white p-8 hover:shadow-xl transition-all" style={{minHeight: '200px'}}>
              <p className="text-xs uppercase mb-2 font-semibold tracking-wider">Buy 2 Devices</p>
              <h3 className="text-2xl font-black">With 5% discount</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-gray-200 dark:border-gray-700 py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            <div>
              <FaShippingFast className="text-4xl mx-auto mb-3 text-gray-700 dark:text-gray-300" />
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-900 dark:text-white">FREE SHIPPING</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Carrier information.</p>
            </div>
            <div>
              <FaLock className="text-4xl mx-auto mb-3 text-gray-700 dark:text-gray-300" />
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-900 dark:text-white">ONLINE PAYMENT</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Payment methods.</p>
            </div>
            <div>
              <FaHeadset className="text-4xl mx-auto mb-3 text-gray-700 dark:text-gray-300" />
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-900 dark:text-white">24/7 SUPPORT</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Unlimited help desk.</p>
            </div>
            <div>
              <FaShoppingCart className="text-4xl mx-auto mb-3 text-gray-700 dark:text-gray-300" />
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-900 dark:text-white">100% SAFE</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">View our benefits.</p>
            </div>
            <div>
              <FaUndo className="text-4xl mx-auto mb-3 text-gray-700 dark:text-gray-300" />
              <h4 className="font-bold text-sm uppercase mb-1 text-gray-900 dark:text-white">FREE RETURNS</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Track or cancel orders.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
