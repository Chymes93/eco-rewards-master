import React from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../assets/Qr1.png';

const Footer = () => {
  return (
    <footer className="text-black w-full font-poppins bg-white shadow-inner">
      <div className="container-responsive mx-auto px-4 sm:px-6 py-12">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and Branding */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Ecorewards Logo" className="w-12 h-12" />
              <span className="text-2xl sm:text-3xl font-regular font-itim">
                Ecorewards
              </span>
            </div>
            <p className="text-gray-600 text-sm text-center sm:text-left mt-2 max-w-xs">
              Join our community of eco-conscious individuals making a
              difference for our planet.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
              Contact Us
            </h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 mt-1 text-eco-green flex-shrink-0" />
                <span className="text-sm">
                  No 18, Glass House, Adenyi Jones, Ikeja, Lagos, Nigeria
                </span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-3 text-eco-green flex-shrink-0" />
                <a
                  href="mailto:ecorewards@gmail.com"
                  className="text-sm hover:text-eco-green transition-colors duration-200"
                >
                  ecorewards@gmail.com
                </a>
              </p>
              <div className="space-y-2">
                <p className="flex items-center">
                  <FaPhone className="w-5 h-5 mr-3 text-eco-green flex-shrink-0" />
                  <a
                    href="tel:+2347057223021"
                    className="text-sm hover:text-eco-green transition-colors duration-200"
                  >
                    +234 705 722 3021
                  </a>
                </p>
                <p className="flex items-center pl-8">
                  <a
                    href="tel:+2348109573422"
                    className="text-sm hover:text-eco-green transition-colors duration-200"
                  >
                    +234 810 957 3422
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0 text-center sm:text-left">
              &copy; {new Date().getFullYear()} Ecorewards. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">Follow Us</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eco-green transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaSquareXTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
