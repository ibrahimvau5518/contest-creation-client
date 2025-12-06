import React from 'react';
import logo from '../../assets/contesthub.png';
import { NavLink } from 'react-router';
import { IoHome } from 'react-icons/io5';
import { FaInfoCircle, FaTasks } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import { GiProgression } from 'react-icons/gi';
import { HiMenuAlt2 } from 'react-icons/hi';

const NavBar = () => {
  const links = (
    <>
      <li className="font-bold">
        <NavLink className="flex items-center hover:text-yellow-600 transition">
          <IoHome />
          Home
        </NavLink>
      </li>
      <li className="font-bold ">
        <NavLink
          to="/all-contests"
          className="flex items-center hover:text-yellow-600 transition"
        >
          <FaTasks />
          All Contest
        </NavLink>
      </li>
      <li className="font-bold ">
        <NavLink
          to="/leaderboard"
          className="flex items-center hover:text-yellow-600 transition"
        >
          <MdLeaderboard />
          Leaderboard
        </NavLink>
      </li>
      <li className="font-bold ">
        <NavLink
          to="/progress"
          className="flex items-center hover:text-yellow-600 transition"
        >
          <GiProgression />
          Progress
        </NavLink>
      </li>
      <li className="font-bold ">
        <NavLink
          to="/about"
          className="flex items-center hover:text-yellow-600 transition"
        >
          <FaInfoCircle />
          About
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <HiMenuAlt2 className="text-2xl" />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-1">
          <img className="h-10 rounded-full" src={logo} alt="" />
          <NavLink
            to="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-sky-400"
          >
            Contest
            <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-amber-300 font-bold">
              Hub
            </span>
          </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default NavBar;
