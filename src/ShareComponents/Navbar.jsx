import { Link, NavLink, useNavigate } from 'react-router';
import './Navbar.css';
import { FaLongArrowAltRight, FaRegUserCircle } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useRole from '../hooks/useRole';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logout, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOut = async () => {
    try {
      await logout();
      Swal.fire({
        title: 'Logged Out',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setLoading(false);
    }
  };

  const [role] = useRole();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/allContest', label: 'All Contests' },
    { to: '/LeaderBoard', label: 'Leaderboard' },
    { to: '/upcoming', label: 'Upcoming' },
    { to: '/news', label: 'News' },
    { to: '/about', label: 'About' },
  ];

  return (
    <div className="fixed w-full z-[100] transition-all duration-300 top-0">
      <div
        className={`transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-[#111827]/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 py-2' : 'bg-transparent py-4'}`}
      >
        <div className="max-w-[1600px] mx-auto navbar px-4 md:px-8">
          {/* Navbar Start - Mobile menu & Logo */}
          <div className="navbar-start w-full lg:w-auto flex justify-between lg:justify-start items-center">
            <div className="dropdown lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white dark:bg-[#1f2340] rounded-2xl w-56 flex flex-col gap-2 border border-gray-100 dark:border-gray-800"
              >
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 font-semibold rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#FFB703]/10 text-[#FFB703]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </ul>
            </div>

            <Link
              to="/"
              className="flex justify-center items-center gap-3 active:scale-95 transition-transform"
            >
              <img
                src="https://i.ibb.co.com/1GyvJWD9/contesthub.png"
                alt="logo"
                className="w-10 md:w-12 h-10 md:h-12 rounded-full shadow-sm object-cover bg-white dark:bg-gray-800"
              />
              <p
                className={`font-extrabold text-xl md:text-2xl tracking-tight ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
              >
                Contest<span className="text-[#FFB703]">Hub</span>
              </p>
            </Link>

            {/* Mobile placeholder to balance flex-between */}
            <div className="w-10 lg:hidden"></div>
          </div>

          {/* Navbar Center - Desktop Links */}
          <div className="navbar-center hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FFB703] text-gray-900 shadow-md shadow-[#FFB703]/20'
                        : `${isScrolled ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10' : 'text-gray-200 hover:bg-white/10 hover:text-white'}`
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* Navbar End - Theme & Auth */}
          <div className="navbar-end w-auto flex items-center gap-3 sm:gap-4">
            {user ? (
              <div
                title={user?.displayName}
                onClick={() => setShow(!show)}
                className="relative cursor-pointer"
              >
                <div className="avatar">
                  <div
                    className={`w-10 sm:w-11 rounded-full border-2 transition-all p-0.5 ${isScrolled ? 'border-gray-200 dark:border-gray-700 hover:border-[#FFB703]' : 'border-white/30 hover:border-[#FFB703]'}`}
                  >
                    <img
                      src={user?.photoURL || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>

                {show && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShow(false)}
                    ></div>
                    <div className="absolute top-14 right-0 z-50 w-56 p-2 rounded-2xl bg-white dark:bg-[#1f2340] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col gap-1 transform transition-all origin-top-right">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 mb-2">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-0.5">
                          {role || 'Participant'}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 px-1">
                        {role === 'admin' && (
                          <Link
                            to="/dashBoard/ManageUser"
                            className="px-3 py-2 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#FFB703] transition-colors"
                          >
                            Dashboard
                          </Link>
                        )}
                        {role === 'host' && (
                          <Link
                            to="/dashBoard/AddContest"
                            className="px-3 py-2 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#FFB703] transition-colors"
                          >
                            Dashboard
                          </Link>
                        )}
                        {(role === 'participant' || !role) && (
                          <Link
                            to="/dashBoard/participate"
                            className="px-3 py-2 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#FFB703] transition-colors"
                          >
                            Dashboard
                          </Link>
                        )}

                        <Link
                          to="/dashBoard/myProfile"
                          className="px-3 py-2 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#FFB703] transition-colors"
                        >
                          My Profile
                        </Link>
                      </div>

                      <div className="mt-2 px-1 pb-1">
                        <button
                          onClick={handleOut}
                          className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors group"
                        >
                          Log Out
                          <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#FFB703] hover:bg-[#e5a400] text-gray-900 rounded-full font-bold shadow-md shadow-[#FFB703]/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base">
                  Log In <FaLongArrowAltRight className="ml-1" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
