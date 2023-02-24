import { useRouter } from 'next/router';
import HomeLayout from '../components/layout/home';

export default function Home() {
  const router = useRouter();

  return <HomeLayout></HomeLayout>;
}
