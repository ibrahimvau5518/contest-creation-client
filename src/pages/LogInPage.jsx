import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { ImSpinner9 } from 'react-icons/im';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const LogInPage = () => {
  const [display, setDisplay] = useState(false);
  const { logIn, googleLog, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogIn = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await logIn(email, password);
      Swal.fire({
        title: 'Welcome Back!',
        text: 'Login successful',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
      e.target.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed! Please check your credentials.',
      });
      console.error(error);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      await googleLog();
      Swal.fire({
        title: 'Success!',
        text: 'Google login successful',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Google login failed!',
      });
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 dark:bg-[#111827] transition-colors duration-300 relative overflow-hidden">    
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-[#FFB703]/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-[#0ecdb9]/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="bg-white/80 dark:bg-[#1f2340]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20 dark:border-gray-800">      

          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="inline-block mb-3 sm:mb-4">
              <img src="https://i.ibb.co.com/1GyvJWD9/contesthub.png" alt="Logo" className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full shadow-lg" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Sign in to continue to ContestHub
            </p>
          </div>

          <form onSubmit={handleLogIn} className="space-y-4 sm:space-y-5">
            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 text-sm sm:text-base" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="input input-bordered w-full h-12 sm:h-14 pl-10 sm:pl-11 bg-gray-50 dark:bg-gray-800/50 dark:text-white dark:border-gray-700 focus:border-[#FFB703] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1 sm:py-2">
                <span className="label-text font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 text-sm sm:text-base" />
                </div>
                <input
                  type={display ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="input input-bordered w-full h-12 sm:h-14 pl-10 sm:pl-11 pr-10 sm:pr-12 bg-gray-50 dark:bg-gray-800/50 dark:text-white dark:border-gray-700 focus:border-[#FFB703] transition-colors text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setDisplay(!display)}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-[#FFB703] transition-colors focus:outline-none"
                >
                  {display ? <FaEyeSlash className="text-base sm:text-lg" /> : <FaEye className="text-base sm:text-lg" />}
                </button>
              </div>
            </div>

            <button
               type="submit"
               className="btn bg-gradient-to-r from-[#FFB703] to-[#e5a400] hover:from-[#e5a400] hover:to-[#cc9300] text-gray-900 border-none w-full text-base sm:text-lg font-bold shadow-lg shadow-[#FFB703]/30 h-12 sm:h-14 rounded-xl mt-4 transition-transform active:scale-[0.98]"
               disabled={loading}
            >
              {loading ? <ImSpinner9 className="animate-spin text-xl" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>    
            <span className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">OR</span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>    
          </div>

          <button
            onClick={googleLogin}
            disabled={loading}
            className="btn btn-outline w-full mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 h-12 sm:h-14 rounded-xl group transition-all"
          >
            <FcGoogle className="text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm sm:text-base">Continue with Google</span>
          </button>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#FFB703] font-bold hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
