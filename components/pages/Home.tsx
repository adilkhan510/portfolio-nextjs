import { FC } from 'react';
import HackerScreen from '../animations/HackerScreen';

export interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="flex flex-col justify-start h-screen space-y-14">
      <div className="flex flex-row justify-between items-center h-auto">
        <HackerScreen className="bg-black text-orange-200" title="TWITTER" />
        <HackerScreen className="bg-black text-blue-400" title="LINKEDIN" />
        <HackerScreen className="bg-black text-white" title="GITHUB" />
      </div>
      <div>hello</div>
    </div>
  );
};

export default Home;
