import { Link } from 'react-router';

const News = () => {
  return (
    <div className="hero min-h-screen bg-[#1f2340] text-white">
      <div className="hero-content">
        <div className="max-w-md pt-40">
          <h1 className="text-3xl font-bold">RECENT NEWS</h1>

          <p className="py-6">
            ContestHub is officially live 🎉 Stay connected for updates about
            new contests, feature releases, and platform improvements. Follow
            our official channel for the latest announcements.
          </p>

          <p className="py-6">
            Subscribe to the{' '}
            <Link
              className="text-teal-300 hover:underline"
              to="https://www.linkedin.com/"
            >
              ContestHub LinkedIn channel
            </Link>{' '}
            to never miss important contest updates.
          </p>

          <h1 className="text-3xl font-bold">ABOUT THIS PLATFORM</h1>

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
            <Link className="text-teal-300 hover:underline" to="/allData">
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
