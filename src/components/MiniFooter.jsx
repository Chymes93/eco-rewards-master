import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const MiniFooter = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container-responsive mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-poppins text-center sm:text-left">
          &copy; {new Date().getFullYear()} Ecorewards. All Rights Reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-poppins">Follow Us</span>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaSquareXTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MiniFooter;
