import WithContainer from '../components/WithContainer/';
import HomeLayout from '../components/layout/home';

export default function Home() {
  return (
    <HomeLayout>
      <WithContainer className="bg-black text-green-900">
        <div className="text-white text-7xl">hello</div>
        <div className=" text-7xl">hello</div>
      </WithContainer>
    </HomeLayout>
  );
}
