import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router';

const AdminPrivate = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminPrivate;
