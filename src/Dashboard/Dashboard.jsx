import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="relative min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-64 lg:ml-72 transition-all duration-300 w-full">
        <div className="max-w-[1600px] mx-auto mt-16 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
