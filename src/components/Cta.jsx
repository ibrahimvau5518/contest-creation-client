import React from 'react';
import { Link } from 'react-router';

const Cta = () => {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center bg-cover bg-bottom bg-base-100 dark:bg-[#1f2340]">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl text-center text-[#FFB703] font-bold">
          Ready to test your skills?
        </h2>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed md:leading-loose">
          Step into a world of exciting competitions where your skills truly
          matter. Explore a wide range of contests designed to test your
          creativity, knowledge, and problem-solving abilities. Whether you're a
          beginner looking to learn or an experienced participant aiming to
          dominate the leaderboard, there’s always a challenge waiting for you.
          <br /><br />
          Join contests in just a few clicks, compete with participants from
          around the world, and track your progress in real time. Each competition
          is an opportunity to improve your abilities, gain recognition, and push
          your limits further than ever before. With engaging challenges, fair
          competition, and rewarding experiences, you’ll never run out of ways to
          grow and prove yourself.
          <br /><br />
          Don’t just watch others succeed — be part of the action. Discover
          contests that match your interests, participate actively, and climb your
          way to the top. Your journey toward becoming a top competitor starts    
          right here.
        </p>
        <div className="pt-4">
          <Link to={'/allContest'}>
            <button className="btn bg-[#FFB703] hover:bg-[#e5a400] text-gray-900 font-bold border-none rounded-full px-8 shadow-lg shadow-[#FFB703]/30">Explore Contests</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cta;
