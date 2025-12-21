import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router'; // 🔹 react-router-dom
import useVerified from '../hooks/useVerified';

const AdminPrivate = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(); // clearer variable name
  const { isLoading: isVerifiedLoading } = useVerified(); // optional verified check
  const location = useLocation();

  const token = localStorage.getItem('access-token'); // check JWT token

  // ----------------- Loading State -----------------
  if (loading || isRoleLoading || isVerifiedLoading || !user) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ----------------- Authenticated + Admin -----------------
  if (token && role === 'admin') {
    return children;
  }

  // ----------------- Not Authorized -----------------
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminPrivate;
