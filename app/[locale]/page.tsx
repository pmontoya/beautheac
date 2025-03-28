import { ParamsWithLanguage } from '@/types/localization';
import Title from '@/app/_components/title';
import About from '@/app/_components/about';
import WayOfLife from '@/app/_components/wayOfLife';
import Location from '@/app/_components/location';

type Props = {
  params: Promise<ParamsWithLanguage>;
}

const Home = async ({ params }: Props) => {
  const { locale } = await params;
  return (
    <main>
      <Title language={locale} />
      <About language={locale} />
      <WayOfLife language={locale} />
      <Location language={locale} />
    </main>
  );
};

export default Home;
