import { Link, useLoaderData, useNavigate } from 'react-router';
import Countdown from 'react-countdown';
import { useContext, useState, useEffect } from 'react';
import usePublicAxios from '../hooks/usePublicAxios';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Details = () => {
  const singleData = useLoaderData();
  const axiosPublic = usePublicAxios();
  const [over, setOver] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const contestDate = new Date(singleData?.dates);
    if (contestDate < new Date()) {
      setOver(true);
    }
  }, [singleData]);

  const Completionist = () => <span className="text-red-500 font-bold">Ended</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setOver(true);
      return <Completionist />;
    } else {
      return (
        <span className="font-mono text-[#FFB703] font-bold">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  const handleRegister = () => {
    const registerInfo = {
      contestName: singleData?.contestName,
      contestType: singleData?.contestType,
      description: singleData?.description,
      price: singleData?.price,
      prize: singleData?.prize,
      task: singleData?.task,
      image: singleData?.image,
      hostName: singleData?.hostName,
      hostEmail: singleData?.hostEmail,
      participated: singleData?.participated,
      status: singleData?.status,
      comments: singleData?.comments,
      dates: singleData?.dates,
      hostImage: singleData?.hostImage,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      ContestId: singleData?._id,
    };

    axiosPublic
      .post('/register/contest', registerInfo)
      .then(response => {
        if (response.data) {
          navigate('/register');
        }
      })
      .catch(error => console.error('Registration error:', error));
  };

  const contestDate = new Date(singleData?.dates);
  const milliseconds = contestDate - new Date();

  return (
    <div className="bg-base-100 dark:bg-[#1f2340] min-h-screen pb-12">
      {/* Hero Section */}
      <div
        className="hero min-h-[40vh] md:min-h-[50vh] relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://egamlio.vercel.app/images/index-overlay.png)',
        }}
      >
        <div className="hero-overlay bg-black/60 backdrop-blur-sm"></div>
        <div className="hero-content text-center text-neutral-content relative z-10 w-full px-4">
          <div className="max-w-2xl pt-16 md:pt-24 mt-8 md:mt-0">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold capitalize tracking-tight text-white mb-4">
              Contest Details
            </h1>
            <div className="w-24 h-1 bg-[#FFB703] mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Details Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white dark:bg-[#151515] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 md:p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={singleData.image}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              alt="Contest"
            />
          </div>
          
          {/* Info Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 pb-8 lg:px-0 lg:pb-0">
            <div className="flex flex-wrap items-center gap-3 mb-4">
               <span className="bg-[#FFB703]/20 text-[#FFB703] px-4 py-1.5 rounded-full text-sm font-bold border border-[#FFB703]/30">
                 {singleData?.contestType || 'Contest'}
               </span>
               <span className="bg-[#0ecdb9]/20 text-[#0ecdb9] px-4 py-1.5 rounded-full text-sm font-bold border border-[#0ecdb9]/30">
                 {singleData?.participated} Participants
               </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {singleData.contestName}
            </h1>  
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">Description</span>
                {singleData?.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                  <span className="block text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Prize Pool</span>
                  <span className="text-xl font-bold text-[#FFB703]">{singleData?.prize} {typeof singleData.prize === 'number' && '$'}</span>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                  <span className="block text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Entry Fee</span>
                  <span className="text-xl font-bold text-[#0ecdb9]">{singleData?.price > 0 ? `${singleData?.price} $` : 'Free'}</span>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10 sm:col-span-2">
                  <span className="block text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Deadline</span>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-lg">
                      {milliseconds > 0 ? (
                        <Countdown date={Date.now() + milliseconds} renderer={renderer} />
                      ) : (
                        <Completionist />
                      )}
                    </span>
                    <span className="text-sm text-gray-400">({over ? 'Not Available' : contestDate.toLocaleDateString()})</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-white/10 mt-4">
                <span className="font-bold text-gray-900 dark:text-white block mb-2 text-lg">Task Requirements</span>
                <p className="text-sm md:text-base">{singleData?.task}</p>
              </div>
            </div>

            {/* Winner Over Section */}
            {over && singleData?.participateUserPhoto && (
              <div className="mt-8 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white text-center shadow-lg border border-blue-500/30">
                <div className="inline-block p-1 bg-white/20 rounded-full mb-3 backdrop-blur-md">
                  <img
                    src={singleData?.participateUserPhoto}
                    alt="Winner"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#0ecdb9] object-cover shadow-xl"
                  />
                </div>
                <h3 className="text-lg font-medium text-blue-200 uppercase tracking-widest text-xs mb-1">Contest Winner</h3>
                <h2 className="text-xl md:text-2xl font-bold text-[#0ecdb9]">
                  {singleData?.participateUserName}
                </h2>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex flex-wrap gap-4 items-center">
              {over ? (
                <div className="w-full sm:w-auto bg-red-500/10 text-red-500 font-bold py-3 px-8 rounded-xl text-center border border-red-200 dark:border-red-500/30">
                  Registration Closed
                </div>
              ) : (
                <div onClick={handleRegister} className="w-full sm:w-auto cursor-pointer group">
                  <div className="btn bg-[#0ecdb9] hover:bg-[#0ca898] text-white border-none font-bold rounded-xl px-10 py-3 shadow-lg shadow-[#0ecdb9]/30 transform group-hover:-translate-y-1 transition-all h-auto text-lg w-full">
                    Register Now
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
