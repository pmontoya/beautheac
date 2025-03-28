import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/localization';
import { performRequest } from '@/lib/datocms';
import { getDictionary } from '@/lib/dictionary';

type Result = {
  homepage: {
    title: string;
    subtitle: string;
    mainPicture: {
      url: string;
      width: number;
      height: number;
      blurUpThumb: string;
    }
  }
}
const getTitleQuery = (locale: Language) => `
query {
  homepage(locale: ${locale}) {
    title
    subtitle
    mainPicture {
      url
      width
      height
      blurUpThumb
    }
  }
}`;

type Props = {
  language: Language;
}

const Title = async ({language}: Props) => {
  const { homepage: { mainPicture, title, subtitle } } = await performRequest<Result>(getTitleQuery(language));
  const { t } = await getDictionary(language);
  return (<section className="relative h-[90vh] flex items-center justify-center">
    <Image
      src={mainPicture.url}
      blurDataURL={mainPicture.blurUpThumb}
      priority
      alt="La Ferme de Beautheac"
      fill
      className="object-cover brightness-[0.65]"
    />
    <div className="container relative z-10 flex flex-col items-center text-center space-y-6">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-white font-serif">
        {title}
      </h1>
      <p className="max-w-[700px] text-xl text-white md:text-2xl font-serif italic">
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button size="lg" className="text-lg">
          {t('homepage.buttons.book_now_label')}
        </Button>
      </div>
    </div>
  </section>);
};

export default Title;
