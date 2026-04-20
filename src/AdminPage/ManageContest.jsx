import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useRef, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { FaCheck, FaTrash, FaCommentDots, FaRegListAlt, FaClock } from 'react-icons/fa';

const ManageContest = () => {
  const useAxiosSecure = useAxios();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const textRef = useRef();

  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 10;

  const { data: countData } = useQuery({
    queryKey: ['contestCount'],
    queryFn: async () => {
      const res = await useAxiosSecure.get('/contests/count');
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
    data: allCOntest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['allCOntest', currentPage, itemPerPage],
    queryFn: async () => {
      const contest = await useAxiosSecure.get(
        `/contests/admin?page=${currentPage}&size=${itemPerPage}`
      );
      return contest.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-52">
        <span className="loading loading-bars text-[#FFB703] loading-lg"></span>
      </div>
    );
  }

  const twoWork = async id => {
    await useAxiosSecure.put(`/approve/contest/${id}`).then(data => {
      if (data.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Accepted!',
          text: 'Contest has been approved and is now live.',
          confirmButtonColor: '#0ecdb9'
        });
        refetch();
      }
    });
  };

  const handleDelte = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this deletion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e04141',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        useAxiosSecure.delete(`/delete/creator/collection/${id}`).then(data => {
          if (data.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Contest has been removed.', 'success');
            refetch();
          }
        });
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const text = document.getElementById('text');
    let message = text.value;

    const info = {
      comment: message,
    };

    await useAxiosSecure
      .put(`/contest/comment/${id}`, info)
      .then(data => {
        if (data.data.modifiedCount > 0) {
          Swal.fire('Success', 'Feedback sent to host', 'success');
          document.getElementById('my_modal_3').close();
          refetch();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send comment',
        });
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center gap-3">
            <FaRegListAlt className="text-[#0ecdb9]" /> Manage <span className="text-[#FFB703]">Contests</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Approve, review, or remove submitted contests</p>
        </div>
        <div className="flex gap-3">
          <div className="badge border-none bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 gap-2 p-4 text-sm font-semibold rounded-xl">
            Total Contests: {count}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1f2340] shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="table w-full whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300">
              <tr className="border-b-0">
                <th className="py-4 px-6 font-semibold">Contest Info</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">Deadline</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {allCOntest.map(contest => (
                <tr key={contest._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {contest.image && (
                         <img src={contest.image} alt={contest.contestName} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100 dark:bg-gray-800" />
                      )}
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white max-w-[200px] truncate" title={contest.contestName}>
                          {contest.contestName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">By: {contest.hostName || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="badge badge-outline border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium text-xs py-2 px-3">
                      {contest.contestType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      <FaClock className="text-gray-400" />
                      {new Date(contest?.dates).toLocaleDateString('en-GB', options)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`badge border-none font-bold text-xs py-2.5 px-3 uppercase tracking-wider ${
                      contest.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      contest.status === 'accepted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {contest.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {contest.status === 'pending' && (
                        <button
                          onClick={() => twoWork(contest._id)}
                          className="btn btn-sm bg-[#0ecdb9]/10 hover:bg-[#0ecdb9]/20 text-[#0ecdb9] border-none group"
                          title="Approve Contest"
                        >
                          <FaCheck className="group-hover:scale-110 transition-transform" />
                          <span className="hidden xl:inline">Approve</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          document.getElementById('my_modal_3').showModal();
                          setId(contest._id);
                        }}
                        className="btn btn-sm bg-[#FFB703]/10 hover:bg-[#FFB703]/20 text-[#d99b00] border-none group"
                        title="Send Feedback"
                      >
                         <FaCommentDots className="group-hover:scale-110 transition-transform" />
                      </button>

                      <button
                        onClick={() => handleDelte(contest._id)}
                        className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 border-none group"
                        title="Delete Contest"
                      >
                        <FaTrash className="group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-white dark:bg-[#1f2340] border border-gray-100 dark:border-gray-800">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500">✕</button>
            </form>
            <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <FaCommentDots className="text-[#FFB703]" /> Send Feedback
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Provide comments or requested changes for this contest to the host.</p>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <textarea
                id="text"
                ref={textRef}
                className="textarea textarea-bordered w-full h-32 focus:border-[#FFB703] bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 resize-none"
                placeholder="Type your message here..."
                required
              ></textarea>
              <button
                type="submit"
                className="btn bg-[#FFB703] hover:bg-[#e5a400] text-gray-900 border-none font-bold shadow-md shadow-[#FFB703]/20"
              >
                Send Message
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Pagination */}
        {pages.length > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/20">
             <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Showing {(currentPage * itemPerPage) + 1} to {Math.min((currentPage + 1) * itemPerPage, count)} of {count}
            </span>
            <div className="join gap-1 shadow-sm">
              <button 
                onClick={handlePrev} 
                disabled={currentPage === 0}
                className="join-item btn btn-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#FFB703] hover:bg-[#FFB703]/5"
              >
                «
              </button>
              
              {pages.map(page => (
                <button
                  onClick={() => setCurrentPage(page)}
                  key={page}
                  className={`join-item btn btn-sm border-gray-200 dark:border-gray-700 ${
                    currentPage === page 
                    ? 'bg-[#FFB703] border-[#FFB703] text-gray-900 hover:bg-[#e5a400]' 
                    : 'bg-white dark:bg-gray-800 hover:border-[#FFB703] hover:bg-[#FFB703]/5 dark:text-gray-300'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              
              <button 
                onClick={handleNext}
                disabled={currentPage === pages.length - 1} 
                className="join-item btn btn-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-[#FFB703] hover:bg-[#FFB703]/5"
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

export default ManageContest;
