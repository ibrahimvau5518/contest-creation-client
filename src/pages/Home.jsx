import Banner from '../components/Banner';
import Cta from '../components/Cta';
import HomeContest from '../components/HomeContest';
import Howitworks from '../components/Howitworks';
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
      <Howitworks></Howitworks>
      <InsPire></InsPire>
      <Slider></Slider>
      <Cta></Cta>
      <Sponsor></Sponsor>
    </div>
  );
};

export default Home;
