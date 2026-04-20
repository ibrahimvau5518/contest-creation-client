import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <aside className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 inline-block">
              <img
                src="https://i.ibb.co.com/1GyvJWD9/contesthub.png"
                alt="ContestHub Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-50 dark:bg-gray-800"
              />
              <h1 className="text-2xl font-extrabold tracking-tight text-[#FFB703]">
                Contest
                <span className="text-gray-900 dark:text-white">Hub</span>
              </h1>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
              Empowering creators and innovators through a reliable contest
              creation platform. Building community-driven solutions since 1988.
            </p>

            <div className="flex gap-4 text-xl">
              <Link
                aria-label="Google"
                className="p-2.5 bg-gray-100 hover:bg-[#FFB703] dark:bg-gray-800 dark:hover:bg-[#FFB703] hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaGoogle className="w-5 h-5" />
              </Link>
              <Link
                aria-label="Facebook"
                className="p-2.5 bg-gray-100 hover:bg-[#FFB703] dark:bg-gray-800 dark:hover:bg-[#FFB703] hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link
                aria-label="Twitter"
                className="p-2.5 bg-gray-100 hover:bg-[#FFB703] dark:bg-gray-800 dark:hover:bg-[#FFB703] hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                aria-label="LinkedIn"
                className="p-2.5 bg-gray-100 hover:bg-[#FFB703] dark:bg-gray-800 dark:hover:bg-[#FFB703] hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </aside>

          <div>
            <h6 className="text-gray-900 dark:text-white font-bold mb-5 tracking-wide uppercase text-sm">
              Services
            </h6>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Branding
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Design
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Marketing
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Advertisement
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-gray-900 dark:text-white font-bold mb-5 tracking-wide uppercase text-sm">
              Company
            </h6>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Contact
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Jobs
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Press Kit
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-gray-900 dark:text-white font-bold mb-5 tracking-wide uppercase text-sm">
              Legal
            </h6>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Terms of Use
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFB703] dark:hover:text-[#FFB703] transition-colors cursor-pointer inline-flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB703] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{' '}
                  Cookie Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} ContestHub. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Created by Ibrahim</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
