import { NavLink } from 'react-router';
import { FaHouse, FaLightbulb, FaTrophy } from 'react-icons/fa6';
import { GiProgression } from 'react-icons/gi';
import { FcAbout } from 'react-icons/fc';
const Navlinks = () => {
  return (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'md:text-xl font-bold text-amber-500  border border-amber-500'
              : 'text-black font-bold md:text-lg'
          }
          to="/"
        >
          <FaHouse></FaHouse>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'md:text-xl font-bold text-amber-500  border border-amber-500'
              : 'text-black font-bold md:text-lg'
          }
          to="allContest"
        >
          <FaLightbulb></FaLightbulb>
          All Contest
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'md:text-xl font-bold text-amber-500  border border-amber-500'
              : 'text-black font-bold md:text-lg'
          }
          to="leaderBoard"
        >
          <FaTrophy />
          Leader Board
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'md:text-xl font-bold text-amber-500  border border-amber-500'
              : 'text-black font-bold md:text-lg'
          }
          to="progress"
        >
          <GiProgression />
          Progress
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'md:text-xl font-bold text-amber-500  border border-amber-500'
              : 'text-black font-bold md:text-lg'
          }
          to="about"
        >
          <FcAbout />
          About
        </NavLink>
      </li>
    </>
  );
};

export default Navlinks;
