import React from 'react';
import { Link } from 'react-router';

const Cta = () => {
  return (
    <div className=" py-25 text-center bg-cover bg-bottom bg-[#1f2340]">
      <h2 className="text-4xl text-center text-[#FFB703] pb-5 font-bold">
        Ready to test your skills?
      </h2>
      <p className="text-center px-10 pb-5 text-white">
        Step into a world of exciting competitions where your skills truly
        matter. Explore a wide range of contests designed to test your
        creativity, knowledge, and problem-solving abilities. Whether you're a
        beginner looking to learn or an experienced participant aiming to
        dominate the leaderboard, there’s always a challenge waiting for you.
        <br />
        Join contests in just a few clicks, compete with participants from
        around the world, and track your progress in real time. Each competition
        is an opportunity to improve your abilities, gain recognition, and push
        your limits further than ever before. With engaging challenges, fair
        competition, and rewarding experiences, you’ll never run out of ways to
        grow and prove yourself.
        <br />
        Don’t just watch others succeed — be part of the action. Discover
        contests that match your interests, participate actively, and climb your
        way to the top. Your journey toward becoming a top competitor starts
        right here. <br />
      </p>
      <Link to={'/allContest'}>
        <button className="btn bg-[#FFB703]">Explore Contests</button>
      </Link>
    </div>
  );
};

export default Cta;