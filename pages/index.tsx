import WithContainer from '../components/WithContainer/';
import HackerScreen from '../components/animations/HackerScreen';
import HomeLayout from '../components/layout/home';

export default function Home() {
  return (
    <HomeLayout>
      <WithContainer>
        <HackerScreen />
      </WithContainer>
    </HomeLayout>
  );
}
