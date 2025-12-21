import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="p-10 text-white bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between gap-10 px-5">
        <aside className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.ibb.co/1GyvJWD9/contesthub.png"
              alt="ContestHub Logo"
              className="w-12 rounded-full"
            />
            <h1 className="text-2xl font-bold text-[#FFB703]">
              Contest<span className="text-white">Hub</span>
            </h1>
          </div>
          <p className="text-gray-300 mb-4">
            Contest Creation Platform Industries Ltd. <br />
            Providing reliable tech solutions since 1988
          </p>

          <div className="flex gap-5 text-2xl mb-4">
            <Link aria-label="Google" className="hover:text-[#FFB703]">
              <FaGoogle />
            </Link>
            <Link aria-label="Facebook" className="hover:text-[#FFB703]">
              <FaFacebook />
            </Link>
            <Link aria-label="Twitter" className="hover:text-[#FFB703]">
              <FaTwitter />
            </Link>
            <Link aria-label="LinkedIn" className="hover:text-[#FFB703]">
              <FaLinkedin />
            </Link>
          </div>

          <p className="text-gray-400 text-sm">
            &copy; 2024 ContestHub Ltd. All rights reserved.
          </p>
        </aside>

        <nav className="flex flex-1 justify-between gap-10">
          <div>
            <h6 className="footer-title text-white font-semibold mb-3">
              Services
            </h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="link link-hover hover:text-[#FFB703]">Branding</a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">Design</a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">
                  Marketing
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">
                  Advertisement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="footer-title text-white font-semibold mb-3">
              Company
            </h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="link link-hover hover:text-[#FFB703]">About Us</a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">Contact</a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">Jobs</a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="footer-title text-white font-semibold mb-3">
              Legal
            </h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="link link-hover hover:text-[#FFB703]">
                  Terms of Use
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="link link-hover hover:text-[#FFB703]">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
