import { useContext, useRef } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
import NumberCounter from 'number-counter';

const Banner = () => {
  const textRef = useRef();
  const navigate = useNavigate();

  const { setInputData } = useContext(AuthContext);
  const handleClick = () => {
    const value = textRef.current.value;
    setInputData(value);

    textRef.current.value = '';

    navigate('/allContest');
  };

  return (
    <div>
      <div
        className="hero bg-fixed "
        style={{
          backgroundImage:
            'url(https://i.ibb.co.com/SwtNY5y6/wave-background-abstract-gradient-design-483537-3688.avif)',
          height: '650px',
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-5 mt-20 md:mt-12">
          <div
            className="space-y-2 md:ml-16"
            data-aos="zoom-in-left"
            data-aos-duration="1800"
          >
            <h1 className="text-2xl md:text-6xl font-bold text-white">
              ELEVATE <br /> YOUR TALENT.
            </h1>
            <p className="mb-5 text-white">
              Compete, grow, and unlock your potential in the contests you love
              most.
            </p>

            <div className="relative">
              <input
                type="text"
                ref={textRef}
                placeholder="Search Contests"
                className="input input-bordered w-full  h-14"
              />

              <button
                onClick={handleClick}
                className="btn bg-[#FFB703] border-none text-white absolute right-1 w-18 mt-1 "
              >
                search
              </button>
            </div>
          </div>
          <div data-aos="zoom-in-left" data-aos-duration="1800">
            <img
              src="https://i.ibb.co.com/R4PBXwyR/Png-Item-1246858.png"
              className="p-5"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex justify-center -mt-3  md:-mt-12   ">
          <div className="stats shadow px-5 z-10 bg-[#1b1d4d] border-2 border-white">
            <div className="stat">
              <div className="stat-figure text-white">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png"
                  alt=""
                  className="w-12"
                />
              </div>
              <div className="stat-title text-[#FFB703]">Total Contest</div>

              <NumberCounter
                end={50}
                delay={5}
                postFix="+"
                className="stat-value text-white"
              >
                25.6K
              </NumberCounter>
            </div>

            <div className="stat ">
              <div className="stat-figure text-secondary">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="w-12"
                />
              </div>
              <div className="stat-title text-[#FFB703]">Users</div>
              <NumberCounter
                end={100}
                delay={5}
                postFix="K"
                className="stat-value text-white"
              ></NumberCounter>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
                      className="w-12"
                    />
                  </div>
                </div>
              </div>
              <div className=" text-[#FFB703]">Champions</div>
              <NumberCounter
                end={100}
                delay={5}
                postFix="+"
                className="stat-value text-white"
              ></NumberCounter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
