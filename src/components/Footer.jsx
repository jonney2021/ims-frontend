const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; {currentYear} Mesurina Inventory Management System. All
              rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:bg-gray-700 px-2 py-1 rounded">
              Privacy Policy
            </a>
            <a href="#" className="hover:bg-gray-700 px-2 py-1 rounded">
              Terms of Service
            </a>
            <a href="#" className="hover:bg-gray-700 px-2 py-1 rounded">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
