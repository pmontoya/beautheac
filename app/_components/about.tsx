import { Language } from '@/types/localization';
import { performRequest } from '@/lib/datocms';
import { StructuredText, StructuredTextDocument } from 'react-datocms';
import Image from 'next/image';

type Result = {
  homepage: {
    aboutTitle: string;
    aboutContent: StructuredTextDocument;
    aboutPicture: {
      url: string;
      width: number;
      height: number;
      blurUpThumb: string;
    }
  }
}

const getAboutQuery = (locale: Language) => `
query {
  homepage(locale: ${locale}) {
    aboutContent {
      value
    }
    aboutTitle
    aboutPicture {
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

const About = async ({ language }: Props) => {
  const { homepage: { aboutTitle, aboutContent, aboutPicture } } = await performRequest<Result>(getAboutQuery(language));
  return (
    <section id="about" className="bg-natural-pattern py-20 md:py-32">
      <div className="container grid gap-12 md:grid-cols-2 md:gap-16 items-center">
        <div className="space-y-6 structured-text">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl font-serif">{aboutTitle}</h2>
          <StructuredText data={aboutContent} />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={aboutPicture.url}
            blurDataURL={aboutPicture.blurUpThumb}
            priority
            alt="À propose de La Ferme de Beautheac"
            width={aboutPicture.width}
            height={aboutPicture.height}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
