import { Outlet, useNavigation } from 'react-router';
import Navbar from '../ShareComponents/Navbar';
import Footer from '../ShareComponents/Footer';

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div>
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>

      <div className="min-h-[calc(100vh-258px)]">
        {navigation.state === 'submitting' ? (
          <div className="flex justify-center items-center pt-72">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
