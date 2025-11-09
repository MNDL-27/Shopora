const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Us</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Welcome to SHOPORA, your premier destination for quality electronics and gadgets.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Founded with a passion for innovation and technology, SHOPORA has been serving customers worldwide 
            with the latest and greatest in electronics. We believe in providing not just products, but complete 
            solutions that enhance your digital lifestyle.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            To deliver exceptional quality products at competitive prices while providing outstanding customer 
            service. We strive to make technology accessible and enjoyable for everyone.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>Wide selection of premium electronics and gadgets</li>
            <li>Competitive prices and regular sales</li>
            <li>Fast and reliable shipping</li>
            <li>Expert customer support</li>
            <li>Quality guarantee on all products</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
