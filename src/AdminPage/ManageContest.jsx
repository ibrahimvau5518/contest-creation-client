import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useRef, useState } from 'react';
import useAxios from '../hooks/useAxios';

const ManageContest = () => {
  const useAxiosSecure = useAxios();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
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
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const twoWork = async id => {
    await useAxiosSecure.put(`/approve/contest/${id}`).then(data => {
      if (data.data.modifiedCount > 0) {
        Swal.fire('Accepted!', 'Contest has been approved.', 'success');
        refetch();
      }
    });
  };

  const handleDelte = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        useAxiosSecure.delete(`/delete/creator/collection/${id}`).then(data => {
          if (data.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
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
          Swal.fire('Success', 'Comment sent successfully', 'success');
          document.getElementById('my_modal_3').close();
          refetch();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-center">---My Contest---</h2>
      <div className="overflow-x-auto">
        <table className="table  mt-2">
          <thead className="bg-[#0ecdb9]">
            <tr>
              <th>ContestName</th>
              <th>contestType</th>
              <th>status</th>
              <th>date</th>
              <th>Action</th>
              <th>Send comments</th>
            </tr>
          </thead>
          <tbody>

            {allCOntest.map(contest => (
              <tr key={contest._id}>
                <th title={contest._id}>{contest.contestName}</th>
                <td>{contest.contestType}</td>
                <td>{contest.status}</td>
                <td>
                  {new Date(contest?.dates).toLocaleDateString(
                    'en-GB',
                    options
                  )}
                </td>
                <td>
                  {contest.status === 'pending' && (
                    <button
                      onClick={() => twoWork(contest._id)}
                      className="btn bg-[#41b8e0] text-white"
                    >
                      confirm
                    </button>
                  )}

                  <button
                    onClick={() => handleDelte(contest._id)}
                    className="btn bg-[#41b8e0] text-white"
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => {
                      document.getElementById('my_modal_3').showModal();
                      setId(contest._id);
                    }}
                    className="btn bg-[#41b8e0] text-white"
                  >
                    send comments
                  </button>

                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg capitalize text-center">
                        send massage
                      </h3>
                      <form method="dialog">
                        
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                        <textarea
                          id="text"
                          ref={textRef}
                          className="textarea  textarea-info w-full"
                          placeholder="Bio"
                        ></textarea>
                        <button
                          onClick={handleUpdate}
                          className="btn bg-[#41b8e0] text-white w-full"
                        >
                          send
                        </button>
                      </form>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <div className="flex justify-center  py-10 space-x-2">
          <button onClick={handlePrev} className="btn bg-[#41b8e0]">
            Prev
          </button>

          {pages.map(page => (
            <button
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`btn bg-[#41b8e0] text-black ${
                currentPage === page && 'bg-orange-400'
              } `}
            >
              {page}
            </button>
          ))}
          <button onClick={handleNext} className="btn bg-[#41b8e0] text-black">
            Next
          </button>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default ManageContest;
