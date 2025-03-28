import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/Icon';
import { Language } from '@/types/localization';
import Image from 'next/image';
import { StructuredText, StructuredTextDocument } from 'react-datocms';
import { performRequest } from '@/lib/datocms';
import { ComponentProps } from 'react';

type Result = {
  homepage: {
    landTitle: string;
    landSubtitle: string;
    landTabs: Array<{
      id: string;
      title: string;
      content: StructuredTextDocument;
      picture: {
        url: string;
        width: number;
        height: number;
        blurUpThumb: string;
      }
      pois: Array<{
        id: string;
        label: string;
        icon: {
          name: ComponentProps<typeof Icon>['name'];
        }
      }>
    }>
  }
}

const getLocationQuery = (locale: Language) => `
query {
  homepage(locale: ${locale}) {
    landTitle
    landSubtitle
    landTabs {
      id
      title
      content {
        value
      }
      picture {
        blurUpThumb
        height
        url
        width
      }
      pois {
        id
        label
        icon {
          name
        }
      }
    }
  }
}`;

type Props = {
  language: Language;
}

const Location = async ({ language }: Props) => {
  const { homepage: { landTitle, landSubtitle, landTabs } } = await performRequest<Result>(getLocationQuery(language));
  return (
    <section id="location" className="py-20 md:py-32 bg-natural-pattern">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl font-serif">{landTitle}</h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            {landSubtitle}
          </p>
        </div>
        <Tabs defaultValue={landTabs[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            {landTabs.map(({ id, title }) => (
              <TabsTrigger value={id} key={id}>{title}</TabsTrigger>
            ))}
          </TabsList>
          {landTabs.map(({ id, content, picture, pois }) => (
            <TabsContent value={id} className="pt-8" key={id}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={picture.url}
                    blurDataURL={picture.blurUpThumb}
                    alt="Gorges de l'Ardèche"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <StructuredText data={content} />
                  <ul className="space-y-4">
                    {pois.map(({id, label, icon}) => (
                      <li className="flex items-center gap-3" key={id}>
                        <Icon name={icon.name} className="h-5 w-5 text-primary" />
                        <span className="text-lg">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Location;
