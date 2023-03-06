import { FC } from 'react';
import HackerScreen from '../animations/HackerScreen';
import About from '../about/About';

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="flex flex-col justify-start h-screen space-y-14">
      <div className="flex flex-row justify-between items-center h-auto">
        <HackerScreen className="bg-black text-orange-200" title="TWITTER " />
        <HackerScreen className="bg-black text-blue-400" title="LINKEDIN" />
        <HackerScreen className="bg-black text-white" title="GITHUB" />
      </div>
      <div className="flex flex-col justify-center items-center h-auto">
        <About name="Adil" age={4} occupation={'codeeeee'} />
      </div>
    </div>
  );
};

export default Home;
