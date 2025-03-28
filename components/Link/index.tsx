'use client';

import NextLink from 'next/link';
import { type ComponentProps, memo, useMemo } from 'react';

import type { Language } from '@/types/localization';
import { ReactElement } from 'react';

type NextLinkProps = ComponentProps<typeof NextLink>;

type Props = Omit<NextLinkProps, 'locale'> & {
  locale: Language;
}

const isAbsolute = (href: NextLinkProps['href']): boolean => {
  const url = href.toString();
  const isAbsoluteUrl = !!url.match(/^https?:\/\//);
  if (isAbsoluteUrl) {
    console.warn('External URL’s should use <a> element rather than link component', url);
  }

  return isAbsoluteUrl;
};

const hasLocale = (href: NextLinkProps['href'], locale: Language): boolean => {
  const url = href.toString();
  const hasLocale = !!url.match(new RegExp(`^/${locale}`));
  if (hasLocale) {
    console.warn('The locale should never be provided manually through the `href` prop', url);
  }

  return hasLocale;
}

const localize = (href: NextLinkProps['href'], locale: Language): string => `/${locale}/${href}`.replace(/\/+/g, '/');

const Link = ({scroll = true, locale, href, ...rest}: Props): ReactElement => {
  const url = useMemo(() => {
    if (isAbsolute(href)) {
      return href;
    }
    if (hasLocale(href, locale)) {
      return href;
    }

    return localize(href, locale);
  }, [locale, href]);

  return <NextLink href={url} scroll={scroll} {...rest} />;
};

export default memo(Link);
export type { Props as LinkProps };
