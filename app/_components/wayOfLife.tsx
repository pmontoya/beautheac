import { ComponentProps } from 'react';
import { Language } from '@/types/localization';
import { performRequest } from '@/lib/datocms';
import Icon from '@/components/Icon';

type Result = {
  homepage: {
    wayOfLifeTitle: string;
    wayOfLifeSubtitle: string;
    wayOfLifeServices: Array<{
      title: string;
      icon: {
        name: ComponentProps<typeof Icon>['name']
      };
    }>;
  };
}

const getWayOfLifeQuery = (locale: Language) => `
query {
  homepage(locale: ${locale}) {
    wayOfLifeSubtitle
    wayOfLifeTitle
    wayOfLifeServices {
      title
      icon {
        name
      }
    }
  }
}`;

type Props = {
  language: Language;
}

const WayOfLife = async ({ language }: Props) => {
  const { homepage: { wayOfLifeTitle, wayOfLifeSubtitle, wayOfLifeServices } } = await performRequest<Result>(getWayOfLifeQuery(language));
  return (
    <section id="amenities" className="py-20 md:py-32">
      <div className="container space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl font-serif">{wayOfLifeTitle}</h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            {wayOfLifeSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:sm:grid-cols-none md:grid-flow-col md:auto-cols-auto gap-8">
          {wayOfLifeServices.map(({ title, icon }) => (
            <div key={title} className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-secondary/50 rounded-full">
                <Icon name={icon.name} className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WayOfLife;
