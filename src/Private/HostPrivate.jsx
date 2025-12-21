import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router';

const HostPrivate = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isLoading] = useRole(); 
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && (role === 'host' || role === 'admin')) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default HostPrivate;
