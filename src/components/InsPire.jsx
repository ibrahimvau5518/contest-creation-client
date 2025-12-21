import { FaLongArrowAltRight } from 'react-icons/fa';
import usePublicAxios from '../hooks/usePublicAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const InsPire = () => {
  const axiosPublic = usePublicAxios();
  const { data = [] } = useQuery({
    queryKey: ['winnerData'],
    queryFn: async () => {
      const result = await axiosPublic.get('/total/winner');
      return result.data;
    },
  });

  return (
    <div className="">
      <div
        className="hero min-h-screen bg-fixed bg-[#1f2340] bg-top  text-white"
        style={{
          backgroundImage:
            'url(https://i.ibb.co.com/SwtNY5y6/wave-background-abstract-gradient-design-483537-3688.avif)',
          height: '650px',
        }}
      >
        <div className="hero-overlay "></div>
        <div className="hero-content  text-neutral-content grid grid-cols-1 md:grid-cols-2 justify-center items-center">
          <div
            data-aos="zoom-in-right"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="max-w-md"
          >
            <h4 className="uppercase text-xl text-[#FFB703]">
              BECOME A SUCCESSFUL Person
            </h4>
            <h1 className="mb-5 text-5xl font-bold uppercase">
              GET THE contest <br /> YOU WANT
            </h1>
            <p className="mb-5 text-[#FFB703]">Total Winner : {data?.length}</p>
            <p className="mb-5">
              Unleash your potential with ContestHub! Participate in a wide
              range of contests, improve your skills, and take your talents to
              the next level on our innovative platform.
            </p>
            <Link to={'/login'}>
              <button className="btn bg-[#FFB703]">
                LogIn Now <FaLongArrowAltRight></FaLongArrowAltRight>
              </button>
            </Link>
          </div>

          <div
            data-aos="zoom-in-left"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="md:flex gap-3"
          >
            <div className="">
              {data.slice(0, 1).map(item => (
                <div key={item._id} className="bg-[#1b1d4d] p-8 rounded-xl">
                  <img
                    src={item?.participateUserPhoto}
                    alt=""
                    className="w-28 h-28 rounded-full ml-10"
                  />
                  <h2 className="text-center mt-3">
                    {' '}
                    Winner || {item?.contestName}
                  </h2>
                </div>
              ))}
              <div className="bg-[#1b1d4d] p-8 mt-3 rounded-xl">
                <img
                  src="https://egamlio.vercel.app/images/icon/feature-icon-2.png"
                  className="ml-10"
                  alt=""
                />
                <h2 className="text-center mt-3">Responsive</h2>
              </div>
            </div>

            <div className="md:mt-5">
              <div className="bg-[#1b1d4d] p-8 mt-3 rounded-xl">
                <img
                  src="https://egamlio.vercel.app/images/icon/feature-icon-3.png"
                  alt=""
                />
                <h2 className="text-center">Winner</h2>
              </div>
              <div className="bg-[#1b1d4d] p-8 mt-3 rounded-xl">
                <img
                  src="https://egamlio.vercel.app/images/icon/feature-icon-4.png"
                  alt=""
                />
                <h2 className="text-center">Endurance</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsPire;
