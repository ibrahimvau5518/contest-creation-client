import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router';
import { ImSpinner9 } from 'react-icons/im';
import { FaCalendarAlt, FaImage, FaTrophy, FaTasks, FaMoneyBillWave, FaTags, FaHeading, FaAlignLeft } from 'react-icons/fa';

const ContestAdd = () => {
  const [startDate, setStartDate] = useState(new Date());

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    const image = e.target.image.files[0];
    if (!image) {
      return Swal.fire('Please choose a picture');
    }

    const formData = new FormData();
    formData.append('image', image);
    try {
      setLoading(true);
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const imageUrl = imageResponse.data.data.display_url;

      const contestInfo = {
        contestName: data?.contestName,
        contestType: data?.contestType,
        description: data?.description,
        price: data?.price,
        prize: data?.prize,
        task: data?.task,
        image: imageUrl,
        hostName: user?.displayName,
        hostEmail: user?.email,
        participated: 0,
        status: 'pending',
        comments: 'improved It',
        dates: startDate,
        hostImage: user?.photoURL,
      };
      await axiosSecure.post('/host/contest', contestInfo).then(data => {
        if (data.data) {
          Swal.fire({
            icon: 'success',
            title: 'Contest Added',
            text: 'Wait for admin approval!',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/myContest');
        }
        e.target.reset();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Create New <span className="text-[#FFB703]">Contest</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Fill in the details below to host a new contest</p>
      </div>

      <div className="bg-white dark:bg-[#1f2340] shadow-2xl rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* Contest Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaHeading className="text-[#0ecdb9]" /> Contest Name</span>
            </label>
            <input
              {...register('contestName', { required: true })}
              type="text"
              placeholder="Enter contest name"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] focus:ring-2 focus:ring-[#0ecdb9]/20 transition-all"
            />
            {errors.contestName && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaImage className="text-[#FFB703]" /> Cover Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#FFB703] transition-all"
              required
            />
          </div>

          {/* Contest Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaTags className="text-[#0ecdb9]" /> Category / Tag</span>
            </label>
            <select
              {...register('contestType', { required: true })}
              className="select select-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-all"
              defaultValue=""
            >
              <option disabled value="">Select Category</option>
              <option>Image Design Contests</option>
              <option>Article Writing</option>
              <option>Marketing Strategy</option>
              <option>Digital Advertisement</option>
              <option>Gaming Review</option>
              <option>Book Review</option>
              <option>Business Idea</option>
              <option>Movie Review</option>
            </select>
            {errors.contestType && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaCalendarAlt className="text-[#FFB703]" /> Deadline</span>
            </label>
            <div className="relative w-full">
              <DatePicker
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#FFB703] transition-all"
                selected={startDate}
                onChange={date => setStartDate(date)}
                minDate={new Date()}
              />
            </div>
          </div>

          {/* Prize Money */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaTrophy className="text-[#0ecdb9]" /> Prize Money</span>
            </label>
            <input
              {...register('prize', { required: true })}
              type="text"
              placeholder="e.g., $500 or iPhone 15"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-all"
            />
            {errors.prize && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          {/* Contest Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaMoneyBillWave className="text-[#FFB703]" /> Entry Fee ($)</span>
            </label>
            <input
              type="number"
              {...register('price', { required: true, min: 0 })}
              placeholder="0 for free"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#FFB703] transition-all"
            />
            {errors.price && <span className="text-red-500 text-sm mt-1">Provide a valid amount</span>}
          </div>

          {/* Task */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaTasks className="text-[#0ecdb9]" /> Submission Task Instructions</span>
            </label>
            <textarea
              {...register('task', { required: true })}
              className="textarea textarea-bordered h-24 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-all resize-none"
              placeholder="Detail what participants need to submit..."
            ></textarea>
            {errors.task && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FaAlignLeft className="text-[#FFB703]" /> Contest Description</span>
            </label>
            <textarea
              {...register('description', { required: true })}
              className="textarea textarea-bordered h-32 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:border-[#FFB703] transition-all resize-none"
              placeholder="Comprehensive description of the contest, rules, and guidelines."
            ></textarea>
            {errors.description && <span className="text-red-500 text-sm mt-1">This field is required</span>}
          </div>

          {/* Submit Button */}
          <div className="form-control md:col-span-2 mt-4">
            <button 
              type="submit" 
              className="btn bg-gradient-to-r from-[#0ecdb9] to-[#0ba898] hover:from-[#0ba898] hover:to-[#098e80] text-white border-none text-lg font-bold w-full h-14 rounded-xl shadow-lg shadow-[#0ecdb9]/30 transition-all transform hover:-translate-y-1"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2"><ImSpinner9 className="animate-spin text-xl" /> Processing...</span>
              ) : (
                'Create Contest'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContestAdd;
