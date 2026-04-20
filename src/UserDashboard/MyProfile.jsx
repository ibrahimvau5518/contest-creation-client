import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../hooks/usePublicAxios';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useMyparticipateData from '../hooks/useMyparticipateData';
import useWinnerData from '../hooks/useWinnerData';
import { Cell, Legend, PieChart, Pie } from 'recharts';
import axios from 'axios';

const MyProfile = () => {
  const axiosPublic = usePublicAxios();
  const { user, setLoading } = useContext(AuthContext);
  const [formError, setFormError] = useState('');

  const [mydata] = useMyparticipateData();
  const [data] = useWinnerData();

  const totalParticipated = mydata.length;
  const totalWon = data.length;
  const totalLost = totalParticipated - totalWon;

  const pieData = [
    { name: 'Won', value: totalWon },
    { name: 'Lost', value: totalLost },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const { data: Mydata = {}, refetch } = useQuery({
    queryKey: ['information', user?.email],
    queryFn: async () => {
      const info = await axiosPublic.get(`/user/myProfile/${user?.email}`);
      return info.data;
    },
    enabled: !!user?.email,
  });
  console.log('Imgbb API Key:', import.meta.env.VITE_IMGBB_API_KEY);

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');

    try {
      const name = e.target.name.value;
      const location = e.target.location.value;
      const image = e.target.photo.files[0];

      setLoading(true);

      let imageUrl = Mydata?.image;

      if (image) {
        console.log('Uploading new image:', image);

        const formData = new FormData();
        formData.append('image', image);

        try {
          const imageResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_API_KEY
            }`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
          );

          imageUrl = imageResponse.data.data.display_url;
        } catch (imageUploadError) {
          console.error('Error uploading image:', imageUploadError);
          setFormError('Failed to upload image. Please try again later.');
          return;
        }
      }

      const updateInfo = {
        name,
        location,
        image: imageUrl,
      };

      console.log('Profile data to update:', updateInfo);

      try {
        const response = await axiosPublic.patch(
          `/update/profile/${user?.email}`,
          updateInfo,
        );
        refetch();
        console.log('Profile update response:', response);
        Swal.fire({
          title: 'Profile Updated',
          text: 'Your profile has been successfully updated!',
          icon: 'success',
        });
        e.target.reset();
        document.getElementById('my_modal_3').close();
      } catch (profileUpdateError) {
        console.error('Error updating profile:', profileUpdateError);
        setFormError(
          'Profile update failed. Please check your input and try again.',
        );
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setFormError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8 animate-fade-in pb-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 border border-white/10">
        <div className="absolute inset-0 bg-[url('https://egamlio.vercel.app/images/dashboard-banner-bg.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#ffda75] drop-shadow-md mb-2">
              Hi {Mydata?.name || user?.displayName || 'User'}, Welcome Back!
            </h1>
            <p className="text-gray-300 text-lg">
              Manage your details and track your contest statistics here.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-sm bg-white dark:bg-[#111827] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all hover:shadow-2xl">
            <div className="h-32 bg-gradient-to-r from-[#FFB703] to-[#f4a000]"></div>
            <div className="flex justify-center -mt-16 relative">
              <img
                src={
                  Mydata?.image ||
                  user?.photoURL ||
                  'https://via.placeholder.com/150'
                }
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-[#111827] bg-white shadow-md z-10 p-1"
              />
            </div>
            <div className="p-8 pt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-1">
                {Mydata?.name || user?.displayName || 'Set your name'}
              </h2>
              <p className="text-sm font-medium text-[#FFB703] bg-[#FFB703]/10 inline-block px-3 py-1 rounded-full mb-4">
                {Mydata.role || 'Participant'}
              </p>

              <div className="space-y-3 mb-6 block text-left">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#FFB703]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="truncate">
                    {user?.email || Mydata?.email || 'your.email@example.com'}
                  </span>
                </div>
                {Mydata.location && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#FFB703]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{Mydata.location}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() =>
                  document.getElementById('my_modal_3').showModal()
                }
                className="w-full py-3 rounded-xl font-bold text-gray-900 bg-[#FFB703] hover:bg-[#e6a500] hover:shadow-lg transition-all flex justify-center items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 w-full flex-grow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#FFB703]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Performance Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 flex flex-col items-center">
                <span className="text-blue-500 font-medium mb-1">
                  Total Participated
                </span>
                <p className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">
                  {totalParticipated}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40 p-6 rounded-2xl border border-green-200 dark:border-green-800 flex flex-col items-center">
                <span className="text-green-500 font-medium mb-1">
                  Contests Won
                </span>
                <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">
                  {totalWon}
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/40 p-6 rounded-2xl border border-red-200 dark:border-red-800 flex flex-col items-center sm:col-span-2 lg:col-span-1">
                <span className="text-red-500 font-medium mb-1">Win Rate</span>
                <p className="text-4xl font-extrabold text-red-600 dark:text-red-400">
                  {totalParticipated > 0
                    ? ((totalWon / totalParticipated) * 100).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
            </div>

            {totalParticipated > 0 && (
              <div className="flex justify-center bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </div>
            )}
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-gray-900 max-w-md p-8 rounded-3xl relative">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => document.getElementById('my_modal_3').close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
              Edit Profile
            </h3>

            <div className="space-y-5">
              <div className="form-control">
                <label className="label pb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Profile Image
                  </span>
                </label>
                <input
                  type="file"
                  name="photo"
                  id="image"
                  accept="image/*"
                  className="file-input file-input-bordered w-full h-12 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFB703]/10 file:text-[#FFB703] hover:file:bg-[#FFB703]/20"
                />
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={Mydata?.name || user?.displayName || ''}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full h-12 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFB703]/50 focus:border-[#FFB703]"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </span>
                </label>
                <input
                  name="location"
                  defaultValue={Mydata?.location || ''}
                  type="text"
                  placeholder="e.g. New York, USA"
                  className="input input-bordered w-full h-12 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFB703]/50 focus:border-[#FFB703]"
                />
              </div>
            </div>

            {formError && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-800 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {formError}
              </div>
            )}

            <div className="mt-8 flex gap-3 flex-col sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => document.getElementById('my_modal_3').close()}
                className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 border-none font-medium h-12 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-[#FFB703] hover:bg-[#e6a500] text-gray-900 border-none font-bold h-12 px-8 shadow-lg shadow-[#FFB703]/30 rounded-xl transition-all hover:-translate-y-0.5"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
