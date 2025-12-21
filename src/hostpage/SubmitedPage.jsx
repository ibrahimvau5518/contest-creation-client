import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router';

const SubmitedPage = () => {
  const { user, setTitle } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { data: postedData = [], isLoading } = useQuery({
    queryKey: ['mydata', user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/host/contest/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl  text-center font-extrabold capitalize">
        Contest Submitted Page
      </h1>

      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-[#0ecdb9]">
              <tr>
                <th>Contents Title</th>
                <th>Prize</th>
                <th>End Date (M / D / Y)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(postedData) &&
                postedData.map(item => (
                  <tr key={item._id}>
                    <th
                      onClick={() => {
                        setTitle(item?.contestName);
                        navigate('/dashboard/submission');
                      }}
                      className="underline hover:cursor-pointer"
                    >
                      {item?.contestName}
                    </th>
                    <td>{item?.prize}</td>
                    <td>{new Date(item?.dates).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmitedPage;
