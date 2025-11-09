import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import Pagination from '../components/Pagination';
import { productService } from '../services';
import { toast } from 'react-toastify';
import { debounce } from '../utils/helpers';
import { FaThLarge, FaList, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });
  
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '',
    brand: searchParams.get('brand') || '',
    rating: searchParams.get('rating') || '',
  });

  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get('page')) || 1,
    totalPages: 1,
    total: 0,
  });

  const categories = ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Cameras', 'Gaming', 'Wearables', 'Accessories'];
  const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Canon', 'Nikon'];
  const priceRanges = [
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $2000', min: 1000, max: 2000 },
    { label: 'Over $2000', min: 2000, max: 999999 },
  ];
  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...filters,
      };
      
      const { data } = await productService.getAll(params);
      setProducts(data.products || []);
      setPagination({
        currentPage: data.page || 1,
        totalPages: data.pages || 1,
        total: data.total || 0,
      });
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = debounce((value) => {
    setFilters({ ...filters, keyword: value });
    setPagination({ ...pagination, currentPage: 1 });
    updateURL({ ...filters, keyword: value, page: 1 });
  }, 500);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPagination({ ...pagination, currentPage: 1 });
    updateURL({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    updateURL({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateURL = (params) => {
    const filtered = Object.entries(params).filter(([_, v]) => v !== '');
    setSearchParams(Object.fromEntries(filtered));
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
      brand: '',
      rating: '',
    });
    setPagination({ ...pagination, currentPage: 1 });
    setSearchParams({});
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const setPriceRange = (min, max) => {
    const newFilters = { ...filters, minPrice: min.toString(), maxPrice: max.toString() };
    setFilters(newFilters);
    setPagination({ ...pagination, currentPage: 1 });
    updateURL({ ...newFilters, page: 1 });
  };

  const hasActiveFilters = filters.category || filters.brand || filters.minPrice || filters.maxPrice || filters.rating;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Home / <span className="text-gray-900 dark:text-white font-medium">Electronics & Gadgets</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Electronics & Gadgets</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover our latest collection of premium electronics</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">Filters</h2>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium flex items-center gap-1"
                  >
                    <FaTimes className="text-xs" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Search Filter */}
              <div className="mb-6">
                <SearchBox
                  value={filters.keyword}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                />
              </div>

              {/* Categories Filter */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <button
                  onClick={() => toggleSection('category')}
                  className="flex items-center justify-between w-full mb-4 text-left"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white uppercase text-sm tracking-wide">Categories</h3>
                  {expandedSections.category ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {expandedSections.category && (
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === ''}
                        onChange={() => handleFilterChange('category', '')}
                        className="w-4 h-4 text-gray-900 focus:ring-gray-900 dark:text-white"
                      />
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                        All Categories
                      </span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === cat}
                          onChange={() => handleFilterChange('category', cat)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900 dark:text-white"
                        />
                        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full mb-4 text-left"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white uppercase text-sm tracking-wide">Price</h3>
                  {expandedSections.price ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {expandedSections.price && (
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.minPrice === range.min.toString() && filters.maxPrice === range.max.toString()}
                          onChange={() => setPriceRange(range.min, range.max)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900 dark:text-white"
                        />
                        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                          {range.label}
                        </span>
                      </label>
                    ))}
                    {/* Custom Price Range */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase">Custom Range</p>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Brand Filter */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <button
                  onClick={() => toggleSection('brand')}
                  className="flex items-center justify-between w-full mb-4 text-left"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white uppercase text-sm tracking-wide">Brand</h3>
                  {expandedSections.brand ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {expandedSections.brand && (
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.brand === brand}
                          onChange={(e) => handleFilterChange('brand', e.target.checked ? brand : '')}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900 dark:text-white rounded"
                        />
                        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="pb-6">
                <button
                  onClick={() => toggleSection('rating')}
                  className="flex items-center justify-between w-full mb-4 text-left"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white uppercase text-sm tracking-wide">Rating</h3>
                  {expandedSections.rating ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {expandedSections.rating && (
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating.toString()}
                          onChange={() => handleFilterChange('rating', rating.toString())}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900 dark:text-white"
                        />
                        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <span key={i} className="text-gray-300 dark:text-gray-600">★</span>
                          ))}
                          <span className="ml-2">& up</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pagination.total}</span> products
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                  >
                    <FaThLarge />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border-l border-gray-300 dark:border-gray-600 ${viewMode === 'list' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <Loader />
            ) : products.length > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8' 
                  : 'space-y-6 mb-8'
                }>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearFilters} 
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded font-semibold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
