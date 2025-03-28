'use client';

import { HTMLAttributes, memo } from 'react';
import { dir } from 'i18next';

import useLocale from '@/hooks/useLocale';

export type Props = HTMLAttributes<HTMLHtmlElement>;

const HTML = memo((props: Props) => {
  const locale = useLocale();
  return <html lang={locale} dir={dir(locale)} {...props} />
});

HTML.displayName = 'HTML';

export default HTML;
