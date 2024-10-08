import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} IMS All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="#" className="hover:bg-gray-700 px-2 py-1 rounded">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:bg-gray-700 px-2 py-1 rounded">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:bg-gray-700 px-2 py-1 rounded">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
