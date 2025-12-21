import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router'; // 🔹 react-router-dom

const HostPrivate = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isLoading] = useRole(); // 🔹 clearer variable name
  const location = useLocation();

  // ----------------- Loading State -----------------
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ----------------- Authenticated + Host -----------------
  if (user && role === 'host') {
    return children;
  }

  // ----------------- Not Authorized -----------------
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default HostPrivate;
