import WithContainer from '../components/WithContainer/';
import HomeLayout from '../components/layout/home';
import Home from '../components/pages/Home';
import Background from '../components/background/Background';

export default function Index() {
  return (
    <div>
      <HomeLayout>
        <WithContainer>
          <Home />
        </WithContainer>
      </HomeLayout>
    </div>
  );
}
