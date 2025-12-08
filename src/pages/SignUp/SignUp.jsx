import { Link, useLocation, useNavigate } from 'react-router';
// import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
// import RegisterAnime from '../../assets/Register-Anime.json';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Social from '../../components/Social/Social';

const SignUp = () => {
  const { createUser, profileUpdate } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(res => {
        profileUpdate(data.name, data.photo).then(() => {
          const userData = {
            name: data.name,
            email: data.email,
            role: 'guest',
          };
          axiosSecure.post('/users', userData).then(res => {
            console.log(res.data);
            if (res.data) {
              toast.success('sign up successfully!');
              navigate(
                location?.state?.from?.pathname
                  ? location?.state?.from?.pathname
                  : '/',
                { replace: true }
              );
            }
          });
        });
      })
      .catch(err => {
        console.log(err.message);
        toast.error(err.message);
      });
  };
  return (
    <div className="overflow-hidden  flex flex-col-reverse md:flex-row max-w-7xl mx-auto  p-3 md:p-16">
      <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-3xl md:text-4xl text-center font-medium text-gray-700">
          Sign Up!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Type your name..."
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              {...register('photo', { required: true })}
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photo && (
              <span className="text-red-600">Photo is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Type your email..."
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 16,
                pattern:
                  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
              })}
              name="password"
              placeholder="Password"
              className="input input-bordered"
            />
            {errors.password?.type === 'required' && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className="text-red-500">
                Password must be 6 characters.
              </span>
            )}
            {errors.password?.type === 'maxLength' && (
              <span className="text-red-500">
                Password must be less then 16 characters.
              </span>
            )}
            {errors.password?.type === 'pattern' && (
              <span className="text-red-500">
                Password must be have a capital letter , a small letter and also
                have a special characters.
              </span>
            )}
          </div>

          <input
            className="bg-[#1d3557] btn btn-block text-white hover:bg-[#457b9d] mt-4"
            type="submit"
            value="Sign Up"
          />
        </form>
        <p className="text-blue-700 mt-2 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold hover:font-bold hover:underline"
          >
            login please
          </Link>
        </p>
        <div className="divider divider-neutral">OR</div>
        <Social></Social>
      </div>
      <div className="md:w-1/2">
        {/* <Lottie animationData={RegisterAnime}></Lottie> */}
      </div>
    </div>
  );
};

export default SignUp;
