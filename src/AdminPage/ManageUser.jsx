import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useState } from 'react';
import {
  FaUserShield,
  FaTrashAlt,
  FaBan,
  FaCheckCircle,
  FaUserEdit,
} from 'react-icons/fa';

const ManageUser = () => {
  const axiosSecure = useAxios();
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 10;

  const { data: countData } = useQuery({
    queryKey: ['userCount'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/count');
      return res.data;
    },
  });

  const count = countData?.count || 0;
  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = numberOfPage > 0 ? [...Array(numberOfPage).keys()] : [];

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['allUser', currentPage, itemPerPage],
    queryFn: async () => {
      const users = await axiosSecure.get(
        `/users?page=${currentPage}&size=${itemPerPage}`,
      );
      return users.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-52">
        <span className="loading loading-bars text-[#0ecdb9] loading-lg"></span>
      </div>
    );
  }

  const changeRole = (id, role) => {
    Swal.fire({
      title: 'Update Role?',
      text: `Change this user's role to ${role}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0ecdb9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then(result => {
      if (result.isConfirmed) {
        const info = {
          newRole: role,
        };

        axiosSecure.put(`/update/user/role/${id}`, info).then(data => {
          if (data.data) {
            Swal.fire('Updated!', 'User role has been updated.', 'success');
            refetch();
          }
        });
      }
    });
  };

  const handleBlock = (id, status) => {
    const actionText = status === 'block' ? 'Block' : 'Unblock';
    const actionIcon = status === 'block' ? 'warning' : 'info';

    Swal.fire({
      title: `${actionText} User?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} this user?`,
      icon: actionIcon,
      showCancelButton: true,
      confirmButtonColor: status === 'block' ? '#e04141' : '#0ecdb9',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${actionText}!`,
    }).then(result => {
      if (result.isConfirmed) {
        const info = {
          newStatus: status,
        };

        axiosSecure.put(`/block/user/${id}`, info).then(data => {
          if (data.data) {
            Swal.fire(
              'Success!',
              `User has been ${actionText.toLowerCase()}ed.`,
              'success',
            );
            refetch();
          }
        });
      }
    });
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e04141',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/users/${id}`).then(data => {
          if (data.data) {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
            <FaUserShield className="text-[#FFB703]" /> Manage{' '}
            <span className="text-[#0ecdb9]">Users</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            View and manage user roles and access
          </p>
        </div>
        <div className="badge border-none bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 gap-2 p-4 text-sm font-semibold rounded-xl">
          Total Users: {count}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1f2340] shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300">
              <tr className="border-b-0">
                <th className="py-4 px-6 font-semibold">User Info</th>
                <th className="py-4 px-6 font-semibold">Role</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Manage Role</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {data.map(user => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {user?.image || user?.photoURL || user?.photo ? (
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                            <img
                              src={user.image || user.photoURL || user.photo}
                              alt={user.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder shadow-sm">
                          <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full w-10 h-10">
                            <span className="text-xs font-bold">
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`badge border-none capitalize text-xs font-bold py-2 ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                          : user.role === 'host'
                            ? 'bg-[#FFB703]/20 text-[#d99b00]'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {user.role || 'participant'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-bold ${
                        user.status === 'block'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {user.status === 'block' ? <FaBan /> : <FaCheckCircle />}
                      {user.status === 'block' ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="dropdown dropdown-bottom dropdown-end lg:dropdown-right">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm bg-[#0ecdb9]/10 hover:bg-[#0ecdb9]/20 text-[#0ecdb9] border-none rounded-lg flex items-center gap-2"
                      >
                        <FaUserEdit /> Role
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-xl bg-white dark:bg-gray-800 rounded-xl w-40 border border-gray-100 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-200 mt-1"
                      >
                        <li>
                          <a
                            onClick={() => changeRole(user._id, 'admin')}
                            className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600"
                          >
                            Admin
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => changeRole(user._id, 'host')}
                            className="hover:bg-[#FFB703]/10 hover:text-[#d99b00]"
                          >
                            Host
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => changeRole(user._id, 'participant')}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Participant
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user?.status === 'verified' || !user?.status ? (
                        <button
                          onClick={() => handleBlock(user._id, 'block')}
                          className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 tooltip"
                          data-tip="Block User"
                        >
                          <FaBan className="text-lg" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(user._id, 'verified')}
                          className="btn btn-sm btn-ghost text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 px-2 tooltip"
                          data-tip="Unblock User"
                        >
                          <FaCheckCircle className="text-lg" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm btn-ghost text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 tooltip"
                        data-tip="Delete User"
                      >
                        <FaTrashAlt className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages.length > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/20">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Showing {currentPage * itemPerPage + 1} to{' '}
              {Math.min((currentPage + 1) * itemPerPage, count)} of {count}
            </span>
            <div className="join gap-1 shadow-sm">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="join-item btn btn-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#0ecdb9] hover:bg-[#0ecdb9]/5"
              >
                «
              </button>

              {pages.map(page => (
                <button
                  onClick={() => setCurrentPage(page)}
                  key={page}
                  className={`join-item btn btn-sm border-gray-200 dark:border-gray-700 ${
                    currentPage === page
                      ? 'bg-[#0ecdb9] border-[#0ecdb9] text-white hover:bg-[#0ba898]'
                      : 'bg-white dark:bg-gray-800 hover:border-[#0ecdb9] hover:bg-[#0ecdb9]/5 dark:text-gray-300'
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === pages.length - 1}
                className="join-item btn btn-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#0ecdb9] hover:bg-[#0ecdb9]/5"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
