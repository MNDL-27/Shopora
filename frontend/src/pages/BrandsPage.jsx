const BrandsPage = () => {
  const brands = [
    { name: 'Apple', logo: '🍎', description: 'Premium technology products' },
    { name: 'Samsung', logo: '📱', description: 'Innovative electronics' },
    { name: 'Sony', logo: '🎮', description: 'Entertainment & gaming' },
    { name: 'LG', logo: '📺', description: 'Home appliances & displays' },
    { name: 'Dell', logo: '💻', description: 'Computing solutions' },
    { name: 'HP', logo: '🖨️', description: 'Technology products' },
    { name: 'Canon', logo: '📷', description: 'Imaging & optical products' },
    { name: 'Nikon', logo: '📸', description: 'Photography equipment' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Our Brands</h1>
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">Sale</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Discover products from world-leading technology brands
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-6xl mb-4">{brand.logo}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{brand.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
