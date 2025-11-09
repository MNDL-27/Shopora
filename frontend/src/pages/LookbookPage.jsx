const LookbookPage = () => {
  const collections = [
    {
      title: 'Summer Collection 2025',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      description: 'Discover our latest summer gadgets'
    },
    {
      title: 'Tech Workspace',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      description: 'Perfect setup for productivity'
    },
    {
      title: 'Gaming Paradise',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      description: 'Ultimate gaming experience'
    },
    {
      title: 'Smart Home',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
      description: 'Connected living solutions'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Lookbook</h1>
        <p className="text-gray-600 dark:text-gray-400">Explore our curated collections and get inspired</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
            <img 
              src={collection.image} 
              alt={collection.title}
              className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
              <p className="text-white/90">{collection.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LookbookPage;
