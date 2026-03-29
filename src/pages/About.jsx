import React from 'react';
import { Link } from 'react-router';


const About = () => {
  return (
    <div
      className="hero-content"
      style={{
        backgroundImage:
          'url(https://i.ibb.co.com/SwtNY5y6/wave-background-abstract-gradient-design-483537-3688.avif)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md pt-40 text-start text-white text">
        <h1 className="text-3xl text-center font-bold text-[#FFB703]">
          ABOUT THIS PLATFORM
        </h1>

        <p className="py-6">
          ContestHub is a competitive platform where creators host contests and
          participants showcase their skills. Anyone can explore ongoing
          contests and view submitted works.
        </p>

        <p className="py-6">
          To ensure fairness and transparency, all submissions are reviewed
          under controlled rules. Participants compete equally, and results are
          verified by admins before winners are announced.
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
  );
};

export default About;