import { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ImSpinner9 } from 'react-icons/im';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage, FaShieldAlt } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import usePublicAxios from '../hooks/usePublicAxios';

const Register = () => {
  const { createUser, googleLog, loading, setLoading } = useContext(AuthContext);
  const [display, setDisplay] = useState(false);
  const [set, setNow] = useState(true);
  const navigate = useNavigate();
  const axiosPublic = usePublicAxios();

  useEffect(() => {
    loadCaptchaEnginge(6, '#0ecdb9');
  }, []);

  const handleVerify = e => {
    let user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value, false) == true) {
      setNow(true);
    } else {
      setNow(false);
    }
  };

  const handleSUbmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.files[0];
    const password = e.target.password.value;
    const formData = new FormData();
    formData.append('image', image);

    if (!name) return toast.error('Please enter a name');
    if (!email) return toast.error('Please enter an email');
    if (!password) return toast.error('Please enter a password');
    if (!set) return toast.error('Invalid Captcha');
    if (password.length < 6) return toast.error('Length must be at least 6 characters');
    if (!/^(?=.*[A-Z])/.test(password)) return toast.error('Must have an uppercase letter in the password');

    try {
      setLoading(true);
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      const imageUrl = imageResponse.data.data.display_url;

      createUser(email, password).then(data => {
        const currentUser = data.user;
        updateProfile(currentUser, {
          displayName: name,
          photoURL: imageUrl,
        }).then(() => {
          const userInfo = {
            name,
            image: imageUrl,
            status: 'verified',
            role: 'participant',
            email,
          };

          axiosPublic.post('/users', userInfo).then(data => console.log(data.data));

          Swal.fire({
            title: 'Registration completely successful!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          navigate('/');
          e.target.reset();
        });
      });
    } catch (error) {
      toast.error('Registration Failed, invalid info!');
      setLoading(false);
    }
  };

  const handleGogleLogIn = () => {
    googleLog()
      .then(data => {
        const currentUser = data.user;
        const userInfo = {
          name: currentUser?.displayName,
          image: currentUser?.photoURL,
          status: 'verified',
          role: 'participant',
          email: currentUser?.email,
        };

        axiosPublic.post('/users', userInfo).then(data => console.log(data.data));

        Swal.fire({
          title: 'Google Login successful!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/');
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Google login failed!',
        });
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-24 dark:bg-[#111827] transition-colors duration-300 relative overflow-hidden">
      <Toaster />
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#0ecdb9]/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#FFB703]/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-lg z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="bg-white/80 dark:bg-[#1f2340]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20 dark:border-gray-800 w-full">      

          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="inline-block mb-4">
              <img src="https://i.ibb.co.com/1GyvJWD9/contesthub.png" alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full shadow-lg" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              Create an Account
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Join ContestHub today and start exploring
            </p>
          </div>

          <form onSubmit={handleSUbmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="input input-bordered w-full pl-11 bg-gray-50 dark:bg-gray-800/50 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="input input-bordered w-full pl-11 bg-gray-50 dark:bg-gray-800/50 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Image */}
            <div className="form-control">
               <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaImage className="text-gray-400" />
                </div>
                <input
                  type="file"
                  name="image"
                  required
                  accept="image/*"
                  className="file-input file-input-bordered w-full pl-12 bg-gray-50 dark:bg-gray-800/50 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={display ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Password (Min 6 chars + Uppercase)"
                  className="input input-bordered w-full pl-11 pr-12 bg-gray-50 dark:bg-gray-800/50 dark:text-white dark:border-gray-700 focus:border-[#0ecdb9] transition-colors text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setDisplay(!display)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#0ecdb9] transition-colors focus:outline-none"
                >
                  {display ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Captcha */}
            <div className="form-control bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-3 flex justify-center sm:justify-start transform scale-[0.85] sm:scale-100 origin-center sm:origin-left">
                 <LoadCanvasTemplate reloadColor="#0ecdb9" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaShieldAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  onBlur={handleVerify}
                  required
                  placeholder="Enter the captcha code above"
                  className="input input-bordered w-full pl-11 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-600 focus:border-[#0ecdb9] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            <button
               type="submit"
               className="btn bg-gradient-to-r from-[#0ecdb9] to-[#0ba898] hover:from-[#0ba898] hover:to-[#098e80] text-white border-none w-full text-base sm:text-lg font-bold shadow-lg shadow-[#0ecdb9]/30 h-12 sm:h-14 rounded-xl mt-4 transition-transform active:scale-[0.98]"
               disabled={loading}
            >
              {loading ? <ImSpinner9 className="animate-spin text-xl" /> : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>    
            <span className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">OR</span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>    
          </div>

          <button
            onClick={handleGogleLogIn}
            disabled={loading}
            className="btn btn-outline w-full mt-4 sm:mt-6 flex items-center gap-3 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 h-12 sm:h-14 rounded-xl group transition-all"
          >
            <FcGoogle className="text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm sm:text-base">Sign up with Google</span>
          </button>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0ecdb9] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
