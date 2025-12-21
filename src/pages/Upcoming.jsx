import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../hooks/usePublicAxios';

const Upcoming = () => {
  const axiospublic = usePublicAxios();

  const { data = [], isLoading } = useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      const result = await axiospublic.get('/upcoming');
      return result.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className=" text-4xl font-extrabold text-center pt-24 capitalize">
        Upcoming contest
      </h1>

      <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map(item => (
          <div
            key={item._id}
            className="card p-5 bg-[#1f2340] text-gray-400 shadow-xl overflow-hidden rounded-xl"
          >
            <figure>
              <img
                src={item?.image}
                alt={item.contestName}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body p-5">
              <div className="flex justify-between items-start gap-2">
                <h2 className="card-title text-[#FFB703] font-bold leading-tight">
                  {item?.contestName}
                </h2>
                <span className="badge bg-[#FFB703] text-[10px] font-bold uppercase py-3">
                  Upcoming
                </span>
              </div>
              <p className="text-sm mt-2">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
