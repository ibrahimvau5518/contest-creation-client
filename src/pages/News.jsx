import { Link } from 'react-router';

const News = () => {
  return (
    <div
      className="hero min-h-screen text-white"
      style={{
        backgroundImage:
          'url(https://i.ibb.co.com/SwtNY5y6/wave-background-abstract-gradient-design-483537-3688.avif)',
        height: '650px',
      }}
    >
      <div className="hero-content">
        <div className="max-w-md pt-40">
          <h1 className="text-3xl font-bold text-[#FFB703]">RECENT NEWS</h1>

          <p className="py-6">
            ContestHub is officially live 🎉 Stay connected for updates about
            new contests, feature releases, and platform improvements. Follow
            our official channel for the latest announcements.
          </p>

          <p className="py-6">
            Subscribe to the{' '}
            <Link
              className="text-[#FFB703] hover:underline"
              to="https://www.linkedin.com/"
            >
              ContestHub LinkedIn channel
            </Link>{' '}
            to never miss important contest updates.
          </p>

          <h1 className="text-3xl font-bold text-[#FFB703]">
            ABOUT THIS PLATFORM
          </h1>

          <p className="py-6">
            ContestHub is a competitive platform where creators host contests
            and participants showcase their skills. Anyone can explore ongoing
            contests and view submitted works.
          </p>

          <p className="py-6">
            To ensure fairness and transparency, all submissions are reviewed
            under controlled rules. Participants compete equally, and results
            are verified by admins before winners are announced.
          </p>

          <p className="py-6">
            Looking for currently active contests? Visit the{' '}
            <Link className="text-[#FFB703] hover:underline" to="/allContest">
              contests section
            </Link>{' '}
            and join before the deadlines close.
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
