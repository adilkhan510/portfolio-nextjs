import WithContainer from '../components/WithContainer/';
import HomeLayout from '../components/layout/home';
import Home from '../components/pages/Home';

export default function Index() {
  return (
    <HomeLayout>
      <WithContainer>
        <Home />
      </WithContainer>
    </HomeLayout>
  );
}
