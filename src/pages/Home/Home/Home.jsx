import React from 'react';
import Banner from '../Banner/Banner';
import Popular from '../../Popular/Popular';
import Latest from '../../Latest/Latest';
import BestContest from '../../BestContest/BestContest';

const Home = () => {
  return (
    <div className='mx-5'>
      <Banner></Banner>
      <Popular></Popular>
      <Latest></Latest>
      <BestContest></BestContest>
    </div>
  );
};

export default Home;
<h1>This is home</h1>;
