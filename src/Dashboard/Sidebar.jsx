import { useContext, useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { AiOutlineBars } from 'react-icons/ai';
import { NavLink, useNavigate, Link } from 'react-router';
import { SiTicktick } from 'react-icons/si';
import { MdHomeWork, MdManageAccounts } from 'react-icons/md';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { FaClipboardList, FaUser } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { RiStickyNote2Fill } from 'react-icons/ri';
import { TfiCup } from 'react-icons/tfi';
import useRole from '../hooks/useRole';

const Sidebar = () => {
  const { logout, setLoading, user } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const [isPosition] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          title: 'LogOut success',
          text: 'You have been logged out!',
          icon: 'success',
        });
        navigate('/');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        setLoading(false);
      });
  };

  if (!user) {
    return null;
  }

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 font-semibold group ${
      isActive
        ? 'bg-[#FFB703] text-gray-900 shadow-md shadow-[#FFB703]/20 translate-x-1'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
    }`;

  return (
    <>
      <div className="bg-white dark:bg-[#111827] text-gray-800 dark:text-white flex justify-between md:hidden border-b border-gray-200 dark:border-gray-800 shadow-sm fixed w-full z-20 top-0">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <div className="flex justify-center items-center gap-2">
                <img
                  src="https://i.ibb.co.com/1GyvJWD9/contesthub.png"
                  alt="Logo"
                  className="w-10 rounded-full"
                />
                <p className="text-[#FFB703] font-bold text-xl">Contest<span className="text-gray-900 dark:text-white">Hub</span></p> 
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg m-2 transition-colors"
        >
          <AiOutlineBars className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>
      </div>

      <div
        className={`z-30 md:fixed flex flex-col justify-between bg-white dark:bg-[#111827] text-gray-800 dark:text-white w-64 lg:w-72 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        } md:translate-x-0 transition duration-300 ease-in-out border-r border-gray-100 dark:border-gray-800 shadow-xl md:shadow-none h-screen overflow-y-auto mt-16 md:mt-0`}
      >
        <div>
          <div className="mb-6">
            <div className="w-full hidden md:flex py-2 px-2 rounded-2xl justify-center items-center mx-auto hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <Link to="/">
                <div className="flex justify-center items-center gap-3">        
                  <img
                    src="https://i.ibb.co.com/1GyvJWD9/contesthub.png"
                    alt="Logo"
                    className="w-12 rounded-full shadow-sm"
                  />
                  <p className="text-[#FFB703] font-extrabold text-2xl tracking-tight">
                    Contest<span className="text-gray-900 dark:text-white">Hub</span>
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="mt-6 flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <img src={user?.photoURL || 'https://via.placeholder.com/100'} className="w-16 h-16 rounded-full border-2 border-white dark:border-[#111827] shadow-sm mb-2 object-cover" alt="Profile" />
                <p className="font-bold text-gray-800 dark:text-white">{user?.displayName || 'User'}</p>
                <div className="mt-1 px-3 py-1 bg-[#FFB703]/10 text-[#FFB703] text-xs font-bold uppercase rounded-full tracking-wider shadow-sm">
                  {isPosition || 'Participant'}
                </div>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="space-y-1">
              {isPosition === 'admin' && (
                <>
                  <NavLink to="/" className={navLinkClasses}>
                    <MdHomeWork className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Home</span>
                  </NavLink>

                  <NavLink to="/dashBoard/myProfile" className={navLinkClasses}>
                    <FaUser className="w-5 h-5 shrink-0" />
                    <span className="mx-4">My Profile</span>        
                  </NavLink>

                  <NavLink to="/dashboard/ManageUser" end className={navLinkClasses}>
                    <MdManageAccounts className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Manage User</span>       
                  </NavLink>

                  <NavLink to="/dashboard/ManageContests" className={navLinkClasses}>
                    <BsFillHouseAddFill className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Manage Contests</span>   
                  </NavLink>
                </>
              )}

              {(isPosition === 'host' || isPosition === 'admin') && (
                <>
                  <NavLink to="/dashboard/AddContest" className={navLinkClasses}>
                    <IoIosAddCircle className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Add Contest</span>       
                  </NavLink>
                  
                  <NavLink to="/dashboard/myContest" className={navLinkClasses}>
                    <FaClipboardList className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Created Contest</span>   
                  </NavLink>

                  <NavLink to="/dashboard/submitted" className={navLinkClasses}>
                    <SiTicktick className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Contest Submitted</span> 
                  </NavLink>
                </>
              )}

              {isPosition === 'user' && (
                <>
                  <NavLink to="/dashboard/participate" className={navLinkClasses}>
                    <RiStickyNote2Fill className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Participated Contest</span>
                  </NavLink>

                  <NavLink to="/dashboard/WinningContest" className={navLinkClasses}>
                    <TfiCup className="w-5 h-5 shrink-0" />
                    <span className="mx-4">Winning Contest</span>   
                  </NavLink>

                  <NavLink to="/dashBoard/myProfile" className={navLinkClasses}>
                    <FaUser className="w-5 h-5 shrink-0" />
                    <span className="mx-4">My Profile</span>        
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"   
          >
            <GrLogout className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
            <span className="mx-4">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
