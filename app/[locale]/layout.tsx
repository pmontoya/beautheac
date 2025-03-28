import { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import React from 'react';

import MainNavigation from '@/components/MainNavigation';
import { performRequest } from '@/lib/datocms';
import { Language } from '@/types/localization';

import '@/app/globals.css';

type CMSResult = {
  site: {
    globalSeo: {
      siteName: string;
      titleSuffix: string;
      fallbackSeo: {
        description: string;
        title: string;
      };
    };
  };
};

const getSeoQuery = (locale: string) => `
query {
  site: _site(locale: ${locale}) {
    globalSeo {
      siteName
      titleSuffix
      fallbackSeo {
        description
        title
      }
    }
  }
}`;

type MetadataProps = {
  params: Promise<{ locale: Language }>;
};

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
  const { locale } = await params;
  const { site: { globalSeo } } = await performRequest<CMSResult>(getSeoQuery(locale));

  return {
    title: `${globalSeo.fallbackSeo.title} - ${globalSeo.titleSuffix}`,
    description: globalSeo.fallbackSeo.description,
  };
};

type Props = PropsWithChildren<{
  params: Promise<{ locale: Language }>;
}>;

const Layout = async ({ params, children }: Props) => {
  const { locale } = await params;
  const { site: { globalSeo } } = await performRequest<CMSResult>(getSeoQuery(locale));
  return (
    <>
      <MainNavigation title={globalSeo.siteName} language={locale} />
      <main className="flex-1">{children}</main>
    </>
  );
};

export default Layout;
