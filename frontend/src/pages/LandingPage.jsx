const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Welcome to SHOPORA</h1>
        <p className="text-2xl mb-8 opacity-90">Your Premium Electronics Destination</p>
        <div className="flex gap-4 justify-center">
          <a href="/products" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </a>
          <a href="/about" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
