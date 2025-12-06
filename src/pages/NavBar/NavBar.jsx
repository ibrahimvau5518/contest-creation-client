import React from 'react';
import logo from '../../assets/contesthub.png';
import { NavLink } from 'react-router';

const NavBar = () => {
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>Home</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-1">
          <img className="h-20 rounded-full" src={logo} alt="" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-sky-400">
            Contest
            <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-amber-300 font-bold">
              Hub
            </span>
          </h1>
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
