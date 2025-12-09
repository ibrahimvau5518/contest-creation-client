import Banner from '../components/Banner';
import HomeContest from '../components/HomeContest';
import InsPire from '../components/InsPire';
import Promote from '../components/Promote';
import Slider from '../components/Slider';
import Sponsor from './Sponsar';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HomeContest></HomeContest>
      <Promote></Promote>
      <InsPire></InsPire>
      <Slider></Slider>
      <Sponsor></Sponsor>
    </div>
  );
};

export default Home;
