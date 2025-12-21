import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router'; // 🔹 react-router-dom

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // ----------------- Loading State -----------------
  if (loading) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ----------------- Authenticated User -----------------
  if (user) {
    return children;
  }

  // ----------------- Not Authenticated -----------------
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Private;
